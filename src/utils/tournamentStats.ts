// src/utils/tournamentStats.ts

import { GROUPS } from "../data/groups";
import { PLAYOFF_SLOTS } from "../data/playoffTeams";
import { KNOCKOUT_MATCHES } from "../data/knockoutMatches";
import { getTeamTier, type TeamTier } from "../data/teamLevels";

import type { Group, GroupMatch, Team } from "../types/worldcup";
import type { RoundName } from "../types/knockout";
import type { KnockoutState, PlayoffSelection } from "./autoPrediction";

import { computeStandings, type StandingRow } from "./groupUtils";

/* =========================================================
   STAGES
   ========================================================= */

export type Stage =
  | "groups"
  | "roundOf32"
  | "roundOf16"
  | "quarters"
  | "semis"
  | "thirdPlace"
  | "final"
  | "champion";

const INITIAL_STAGE: Stage = "groups";

function stageValue(stage: Stage): number {
  switch (stage) {
    case "groups":
      return 0;
    case "roundOf32":
      return 1;
    case "roundOf16":
      return 2;
    case "quarters":
      return 3;
    case "semis":
      return 4;
    case "thirdPlace":
      return 5;
    case "final":
      return 6;
    case "champion":
      return 7;
    default:
      return 0;
  }
}

function maxStage(a: Stage, b: Stage): Stage {
  return stageValue(b) > stageValue(a) ? b : a;
}

/* =========================================================
   ELIMINATION
   ========================================================= */

export type EliminationInfo = {
  eliminated: boolean;
  eliminatedIn: Stage | null;
  eliminatedBy: {
    teamId: string;
    tier: TeamTier;
    goalDiff: number;
  } | null;
};

/* =========================================================
   TEAM TOURNAMENT STATS
   ========================================================= */

export type TeamTournamentStats = {
  team: Team;
  groupId: string;

  tier: TeamTier;
  stageReached: Stage;

  elimination: EliminationInfo;

  // Para revelación: a quién eliminó
  scalps: { teamId: string; tier: TeamTier; stage: Stage }[];

  // Mérito en grupos
  groupPosition: 1 | 2 | 3 | 4 | null;
  groupStrength: number; // mayor = grupo más duro (según tiers)

  played: number;
  won: number;
  drawn: number;
  lost: number;

  goalsFor: number;
  goalsAgainst: number;
  goalDiff: number;

  points: number;
};

/* =========================================================
   PLAYOFF RESOLUTION
   ========================================================= */

/**
 * Resuelve placeholders de repechaje en base a la selección del usuario.
 * Importante:
 * - No se traduce nombre acá (eso va por i18n).
 * - Si hay ganador: reemplazamos id + flagCode.
 */
function resolveTeamBase(team: Team, playoffSelection: PlayoffSelection): Team {
  if (!team.playoffSlotId) return team;

  const selectedId = playoffSelection[team.playoffSlotId] ?? null;
  if (!selectedId) return team;

  const slot = PLAYOFF_SLOTS.find((s) => s.id === team.playoffSlotId);
  const winner = slot?.candidates.find((c) => c.id === selectedId);

  if (!winner) return team;

  return {
    ...team,
    id: winner.id,
    name: winner.id, // ✅ consistente con tu proyecto: el name visible se resuelve luego vía i18n
    flagCode: winner.flagCode,
  };
}

/* =========================================================
   CREATE / ENSURE
   ========================================================= */

function tierStrength(tier: TeamTier): number {
  // más alto = más fuerte (S > A > B > C > D)
  if (tier === "S") return 5;
  if (tier === "A") return 4;
  if (tier === "B") return 3;
  if (tier === "C") return 2;
  return 1; // D
}

function ensureStatsEntry(
  map: Map<string, TeamTournamentStats>,
  team: Team,
  groupId: string
): TeamTournamentStats {
  const existing = map.get(team.id);
  if (existing) return existing;

  const tier = getTeamTier(team.id);

  const created: TeamTournamentStats = {
    team,
    groupId,
    tier,

    stageReached: INITIAL_STAGE,

    elimination: {
      eliminated: false,
      eliminatedIn: null,
      eliminatedBy: null,
    },

    scalps: [],

    groupPosition: null,
    groupStrength: 0,

    played: 0,
    won: 0,
    drawn: 0,
    lost: 0,

    goalsFor: 0,
    goalsAgainst: 0,
    goalDiff: 0,

    points: 0,
  };

  map.set(team.id, created);
  return created;
}

/* =========================================================
   GROUPS → STATS + STANDINGS (POSITION / STRENGTH)
   ========================================================= */

function buildStandingsByGroup(
  matchesByGroup: Record<string, GroupMatch[]>,
  playoffSelection: PlayoffSelection
): Record<string, StandingRow[]> {
  const result: Record<string, StandingRow[]> = {};

  for (const group of GROUPS as Group[]) {
    const matches = matchesByGroup[group.id] ?? [];

    result[group.id] = computeStandings(group, matches, (team) =>
      resolveTeamBase(team, playoffSelection)
    );
  }

  return result;
}

function applyGroupPositionAndStrength(
  statsMap: Map<string, TeamTournamentStats>,
  standingsByGroup: Record<string, StandingRow[]>,
  playoffSelection: PlayoffSelection
) {
  for (const group of GROUPS as Group[]) {
    // Fuerza del grupo = suma de strength tier de los 4 equipos (ya resueltos)
    const realTeams = group.teams.map((t) =>
      resolveTeamBase(t, playoffSelection)
    );

    const strength = realTeams.reduce(
      (acc, t) => acc + tierStrength(getTeamTier(t.id)),
      0
    );

    const rows = standingsByGroup[group.id] ?? [];
    rows.forEach((row, idx) => {
      const pos = (idx + 1) as 1 | 2 | 3 | 4;

      const stat = statsMap.get(row.team.id);
      if (!stat) return;

      stat.groupPosition = pos;
      stat.groupStrength = strength;
    });
  }
}

function applyGroupMatchToStats(
  statsMap: Map<string, TeamTournamentStats>,
  group: Group,
  match: GroupMatch,
  playoffSelection: PlayoffSelection
) {
  const { homeTeamId, awayTeamId, homeGoals, awayGoals } = match;
  if (homeGoals == null || awayGoals == null) return;

  const homeBase = group.teams.find((t) => t.id === homeTeamId);
  const awayBase = group.teams.find((t) => t.id === awayTeamId);
  if (!homeBase || !awayBase) return;

  const homeTeam = resolveTeamBase(homeBase, playoffSelection);
  const awayTeam = resolveTeamBase(awayBase, playoffSelection);

  const homeStats = ensureStatsEntry(statsMap, homeTeam, group.id);
  const awayStats = ensureStatsEntry(statsMap, awayTeam, group.id);

  homeStats.played += 1;
  awayStats.played += 1;

  homeStats.goalsFor += homeGoals;
  homeStats.goalsAgainst += awayGoals;
  homeStats.goalDiff = homeStats.goalsFor - homeStats.goalsAgainst;

  awayStats.goalsFor += awayGoals;
  awayStats.goalsAgainst += homeGoals;
  awayStats.goalDiff = awayStats.goalsFor - awayStats.goalsAgainst;

  if (homeGoals > awayGoals) {
    homeStats.won += 1;
    homeStats.points += 3;
    awayStats.lost += 1;
  } else if (awayGoals > homeGoals) {
    awayStats.won += 1;
    awayStats.points += 3;
    homeStats.lost += 1;
  } else {
    homeStats.drawn += 1;
    awayStats.drawn += 1;
    homeStats.points += 1;
    awayStats.points += 1;
  }
}

/* =========================================================
   KNOCKOUT → STATS + SCALPS
   ========================================================= */

const ROUND_LOSER_ELIMINATED_IN: Record<RoundName, Stage> = {
  "16vos": "roundOf32",
  "8vos": "roundOf16",
  "4tos": "quarters",
  Semis: "semis",
  Final: "final",
  "3er puesto": "thirdPlace",
};

const ROUND_WINNER_REACHES: Record<RoundName, Stage> = {
  "16vos": "roundOf16",
  "8vos": "quarters",
  "4tos": "semis",
  Semis: "final",
  Final: "champion",
  "3er puesto": "thirdPlace",
};

function applyKnockoutResultsToStats(
  stats: TeamTournamentStats[],
  knockoutState: KnockoutState
): TeamTournamentStats[] {
  const statsById = new Map(stats.map((s) => [s.team.id, s] as const));

  for (const match of KNOCKOUT_MATCHES) {
    const res = knockoutState[match.id];
    if (!res) continue;

    const { homeTeamId, awayTeamId, homeGoals, awayGoals, winnerTeamId } = res;

    if (
      !homeTeamId ||
      !awayTeamId ||
      homeGoals == null ||
      awayGoals == null ||
      !winnerTeamId
    ) {
      continue;
    }

    const loserTeamId = winnerTeamId === homeTeamId ? awayTeamId : homeTeamId;

    const homeStats = statsById.get(homeTeamId);
    const awayStats = statsById.get(awayTeamId);
    const winnerStats = statsById.get(winnerTeamId);
    const loserStats = statsById.get(loserTeamId);

    if (!homeStats || !awayStats || !winnerStats || !loserStats) continue;

    // Contar goles/partidos en todo el torneo
    homeStats.played += 1;
    awayStats.played += 1;

    homeStats.goalsFor += homeGoals;
    homeStats.goalsAgainst += awayGoals;
    homeStats.goalDiff = homeStats.goalsFor - homeStats.goalsAgainst;

    awayStats.goalsFor += awayGoals;
    awayStats.goalsAgainst += homeGoals;
    awayStats.goalDiff = awayStats.goalsFor - awayStats.goalsAgainst;

    winnerStats.won += 1;
    loserStats.lost += 1;

    const winnerReached = ROUND_WINNER_REACHES[match.round];
    winnerStats.stageReached = maxStage(winnerStats.stageReached, winnerReached);

    // 3er puesto: no lo tratamos como "eliminación por"
    if (match.round === "3er puesto") {
      winnerStats.stageReached = maxStage(winnerStats.stageReached, "thirdPlace");
      loserStats.stageReached = maxStage(loserStats.stageReached, "thirdPlace");
      continue;
    }

    const eliminatedIn = ROUND_LOSER_ELIMINATED_IN[match.round];

    // Loser eliminado por Winner
    loserStats.elimination = {
      eliminated: true,
      eliminatedIn,
      eliminatedBy: {
        teamId: winnerStats.team.id,
        tier: winnerStats.tier,
        goalDiff: Math.abs(homeGoals - awayGoals),
      },
    };

    loserStats.stageReached = maxStage(loserStats.stageReached, eliminatedIn);

    // Winner scalp
    winnerStats.scalps.push({
      teamId: loserStats.team.id,
      tier: loserStats.tier,
      stage: eliminatedIn,
    });
  }

  return Array.from(statsById.values());
}

/* =========================================================
   PUBLIC BUILDER
   ========================================================= */

export function buildTournamentStats(
  matchesByGroup: Record<string, GroupMatch[]>,
  knockoutState: KnockoutState,
  playoffSelection: PlayoffSelection
): TeamTournamentStats[] {
  const statsMap = new Map<string, TeamTournamentStats>();

  // Crear SIEMPRE stats de todos (aunque no haya partidos jugados)
  for (const group of GROUPS as Group[]) {
    for (const t of group.teams) {
      const real = resolveTeamBase(t, playoffSelection);
      ensureStatsEntry(statsMap, real, group.id);
    }
  }

  // Aplicar resultados de grupos (si existen)
  for (const group of GROUPS as Group[]) {
    const matches = matchesByGroup[group.id] ?? [];
    for (const m of matches) {
      applyGroupMatchToStats(statsMap, group, m, playoffSelection);
    }
  }

  // Standings para posición/fuerza (sirve incluso con pocos partidos)
  const standingsByGroup = buildStandingsByGroup(matchesByGroup, playoffSelection);
  applyGroupPositionAndStrength(statsMap, standingsByGroup, playoffSelection);

  // Aplicar eliminatorias
  return applyKnockoutResultsToStats(Array.from(statsMap.values()), knockoutState);
}
