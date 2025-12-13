// src/utils/autoPrediction.ts

import { GROUPS } from "../data/groups";
import { KNOCKOUT_MATCHES } from "../data/knockoutMatches";
import { PLAYOFF_SLOTS } from "../data/playoffTeams";

import type { PlayoffSlotId } from "../data/playoffTeams";
import type { KnockoutMatch } from "../types/knockout";
import type { Group, GroupMatch } from "../types/worldcup";

import { computeStandings, type StandingRow } from "./groupUtils";

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

export type PredictionMode = "basic" | "favorites" | "crazy";

type GroupId = string;
export type GroupMatchesState = Record<GroupId, GroupMatch[]>;

export type PlayoffSelection = Record<PlayoffSlotId, string | null>;

export type KnockoutMatchResult = {
  matchId: number;
  homeTeamId: string | null;
  awayTeamId: string | null;
  homeGoals: number | null;
  awayGoals: number | null;
  winnerTeamId: string | null;
};

export type KnockoutState = Record<number, KnockoutMatchResult>;

type MatchOutcome = "home" | "away" | "draw";

/* -------------------------------------------------------------------------- */
/* Constants                                                                  */
/* -------------------------------------------------------------------------- */

/**
 * Mapea placeholders (que viven en groups.ts) hacia el slot real de repechaje.
 * Sirve para transformar "UEFA_A_WINNER" -> "UEFA_A" y así resolver el ganador.
 */
const PLACEHOLDER_TO_SLOT: Record<string, PlayoffSlotId> = {
  UEFA_A_WINNER: "UEFA_A",
  UEFA_B_WINNER: "UEFA_B",
  UEFA_C_WINNER: "UEFA_C",
  UEFA_D_WINNER: "UEFA_D",
  INTER_1_WINNER: "INTER_1",
  INTER_2_WINNER: "INTER_2",
};

/**
 * Ranking “interno” usado para la simulación.
 * Cuanto más bajo el número, más fuerte se considera el equipo.
 */
const TEAM_RANK: Record<string, number> = {
  ESP: 1,
  ARG: 2,
  BRA: 3,
  FRA: 4,
  ITA: 5,
  ENG: 6,
  GER: 7,
  POR: 8,
  NED: 9,
  HRV: 10,
  URU: 11,
  BEL: 12,
  MAR: 13,
  NOR: 14,
  COL: 15,
  JPN: 16,
  USA: 17,
  ECU: 18,
  PAR: 19,
  DEN: 20,
  SUI: 21,
  TUR: 22,
  SEN: 23,
  KOR: 23,
  MEX: 25,
  CIV: 26,
  SRB: 27,
  POL: 28,
  CHI: 29,
  UKR: 29,
  PER: 30,
  AUT: 31,
  NGA: 32,
  AUS: 34,
  RSA: 36,
  CAN: 35,
  QAT: 37,
  NZL: 38,
  PAN: 36,
  GHA: 32,

  // Playoffs (candidatos)
  NIR: 36,
  WAL: 28,
  BIH: 29,
  SWE: 27,
  ALB: 34,
  ROU: 30,
  SVK: 31,
  XKX: 37,
  CZE: 26,
  IRL: 31,
  MKD: 36,
  COD: 33,
  JAM: 32,
  NCL: 38,
  IRQ: 33,
  BOL: 33,
  SUR: 34,

  // Placeholders (si todavía no se eligió ganador)
  UEFA_A_WINNER: 30,
  UEFA_B_WINNER: 30,
  UEFA_C_WINNER: 30,
  UEFA_D_WINNER: 30,
  INTER_1_WINNER: 30,
  INTER_2_WINNER: 30,
};

/**
 * Estado “vacío” de selección de repechajes.
 * null significa “no elegido” (placeholder visible).
 */
const EMPTY_PLAYOFF_SELECTION: PlayoffSelection = {
  INTER_1: null,
  INTER_2: null,
  UEFA_A: null,
  UEFA_B: null,
  UEFA_C: null,
  UEFA_D: null,
};

/* -------------------------------------------------------------------------- */
/* Helpers                                                                    */
/* -------------------------------------------------------------------------- */

/**
 * Normaliza la selección de repechajes:
 * - Si no viene nada, genera un objeto con todas las keys.
 * - Si viene algo, clona (evita mutaciones).
 */
function ensurePlayoffSelection(base?: PlayoffSelection): PlayoffSelection {
  return base ? { ...base } : { ...EMPTY_PLAYOFF_SELECTION };
}

/**
 * Devuelve el ID real del equipo cuando el teamId es un placeholder de repechaje
 * y el usuario ya eligió un ganador.
 */
function getEffectiveTeamId(teamId: string, playoffSelection?: PlayoffSelection): string {
  if (!playoffSelection) return teamId;

  const slotId = PLACEHOLDER_TO_SLOT[teamId];
  if (!slotId) return teamId;

  return playoffSelection[slotId] ?? teamId;
}

/**
 * Ranking seguro para simulación.
 * Si no existe, retorna un valor alto (equipo “débil” por defecto).
 */
export function getRank(teamId: string, playoffSelection?: PlayoffSelection): number {
  const effectiveId = getEffectiveTeamId(teamId, playoffSelection);
  return TEAM_RANK[effectiveId] ?? 40;
}

/* -------------------------------------------------------------------------- */
/* Playoffs                                                                   */
/* -------------------------------------------------------------------------- */

/**
 * Selección de repechajes estilo “favorites”:
 * completa los slots faltantes con picks fijos (y uno con azar controlado).
 */
export function buildFifaPlayoffSelection(base?: PlayoffSelection): PlayoffSelection {
  const next = ensurePlayoffSelection(base);

  if (!next.INTER_1) next.INTER_1 = "COD";
  if (!next.INTER_2) next.INTER_2 = "BOL";
  if (!next.UEFA_A) next.UEFA_A = "ITA";
  if (!next.UEFA_C) next.UEFA_C = "TUR";
  if (!next.UEFA_D) next.UEFA_D = "DEN";

  if (!next.UEFA_B) {
    next.UEFA_B = Math.random() < 0.8 ? "POL" : "SWE";
  }

  return next;
}

/**
 * Selección de repechajes estilo “crazy”:
 * completa slots faltantes eligiendo aleatoriamente entre candidatos.
 */
export function buildCrazyPlayoffSelection(base?: PlayoffSelection): PlayoffSelection {
  const next = ensurePlayoffSelection(base);

  const slotIds: PlayoffSlotId[] = ["INTER_1", "INTER_2", "UEFA_A", "UEFA_B", "UEFA_C", "UEFA_D"];

  for (const slotId of slotIds) {
    if (next[slotId]) continue;

    const slot = PLAYOFF_SLOTS.find((s) => s.id === slotId);
    if (!slot) continue;

    const idx = Math.floor(Math.random() * slot.candidates.length);
    next[slotId] = slot.candidates[idx].id;
  }

  return next;
}

/**
 * Builder unificado según modo.
 * - favorites/crazy: completa repechajes faltantes
 * - basic: deja lo que venga (o vacío)
 */
export function buildPlayoffSelectionForMode(
  mode: PredictionMode,
  base?: PlayoffSelection
): PlayoffSelection {
  if (mode === "favorites") return buildFifaPlayoffSelection(base);
  if (mode === "crazy") return buildCrazyPlayoffSelection(base);
  return ensurePlayoffSelection(base);
}

/* -------------------------------------------------------------------------- */
/* Match simulation (groups / KO)                                             */
/* -------------------------------------------------------------------------- */

/**
 * Decide el resultado del partido según el modo:
 * - crazy: probabilidades iguales
 * - favorites/basic: usa ranking y un poco de azar
 */
function decideOutcome(
  homeId: string,
  awayId: string,
  mode: PredictionMode,
  playoffSelection?: PlayoffSelection
): MatchOutcome {
  if (mode === "crazy") {
    const r = Math.random();
    return r < 1 / 3 ? "home" : r < 2 / 3 ? "away" : "draw";
  }

  const rankHome = getRank(homeId, playoffSelection);
  const rankAway = getRank(awayId, playoffSelection);

  const diff = Math.abs(rankHome - rankAway);
  const betterHome = rankHome < rankAway;

  if (diff >= 7) return betterHome ? "home" : "away";
  if (diff >= 4 && Math.random() > 0.1) return betterHome ? "home" : "away";

  return Math.random() < 0.25 ? "draw" : betterHome ? "home" : "away";
}

/**
 * Genera un score simple para un outcome:
 * - draw => 1-1
 * - winner => 1..3 goles y el perdedor menos
 */
function createScore(outcome: MatchOutcome): [number, number] {
  if (outcome === "draw") return [1, 1];

  const win = 1 + Math.floor(Math.random() * 3);
  const lose = Math.floor(Math.random() * win);

  return outcome === "home" ? [win, lose] : [lose, win];
}

/* -------------------------------------------------------------------------- */
/* Groups                                                                     */
/* -------------------------------------------------------------------------- */

/**
 * Genera predicciones para todos los partidos de grupos.
 * Respeta la selección de repechajes si el modo la completa automáticamente.
 */
export function autoPredictGroupsState(
  mode: PredictionMode,
  current: GroupMatchesState,
  playoffSelection?: PlayoffSelection
): GroupMatchesState {
  const effective =
    mode === "favorites" || mode === "crazy"
      ? buildPlayoffSelectionForMode(mode, playoffSelection)
      : playoffSelection;

  const next: GroupMatchesState = {};

  for (const group of GROUPS as Group[]) {
    next[group.id] = (current[group.id] ?? []).map((m) => {
      const outcome = decideOutcome(m.homeTeamId, m.awayTeamId, mode, effective);
      const [hg, ag] = createScore(outcome);

      return { ...m, homeGoals: hg, awayGoals: ag };
    });
  }

  return next;
}

/* -------------------------------------------------------------------------- */
/* Knockout                                                                   */
/* -------------------------------------------------------------------------- */

/**
 * Construye standings por grupo, reemplazando placeholders por el ganador del
 * repechaje cuando exista una selección confirmada.
 */
function buildStandingsByGroup(
  matchesByGroup: GroupMatchesState,
  playoffSelection?: PlayoffSelection
): Record<string, StandingRow[]> {
  const result: Record<string, StandingRow[]> = {};

  for (const group of GROUPS as Group[]) {
    const rows = computeStandings(group, matchesByGroup[group.id] ?? [], (team) => {
      const slotId = PLACEHOLDER_TO_SLOT[team.id];
      if (!slotId || !playoffSelection?.[slotId]) return team;

      const slot = PLAYOFF_SLOTS.find((s) => s.id === slotId);
      const candidate = slot?.candidates.find((c) => c.id === playoffSelection[slotId]);

      if (!candidate) return team;

      return {
        ...team,
        id: candidate.id,
        flagCode: candidate.flagCode,
      };
    });

    result[group.id] = rows;
  }

  return result;
}

/**
 * Simula el knockout completo:
 * - Resuelve slots desde standings (1A/2B/3X...) o winners previos
 * - Genera resultados y winnerTeamId
 *
 * Nota: aquí se evita el empate forzando outcome != draw.
 */
export function autoPredictKnockoutState(
  mode: PredictionMode,
  matchesByGroup: GroupMatchesState,
  playoffSelection?: PlayoffSelection
): KnockoutState {
  const effective =
    mode === "favorites" || mode === "crazy"
      ? buildPlayoffSelectionForMode(mode, playoffSelection)
      : playoffSelection;

  const standingsByGroup = buildStandingsByGroup(matchesByGroup, effective);

  const state: KnockoutState = {};
  const winners = new Map<number, string | null>();

  const resolveSlot = (slot: KnockoutMatch["home"]): string | null => {
    if (slot.kind === "group") {
      const label = slot.label;
      const pos = Number(label[0]);
      const gid = label[1];

      return standingsByGroup[gid]?.[pos - 1]?.team.id ?? null;
    }

    return winners.get(slot.matchId) ?? null;
  };

  for (const match of KNOCKOUT_MATCHES) {
    const homeId = resolveSlot(match.home);
    const awayId = resolveSlot(match.away);

    let hg: number | null = null;
    let ag: number | null = null;
    let winner: string | null = null;

    if (homeId && awayId) {
      let outcome: MatchOutcome;

      do {
        outcome = decideOutcome(homeId, awayId, mode, effective);
      } while (outcome === "draw");

      [hg, ag] = createScore(outcome);

      if (hg === ag) {
        outcome === "home" ? hg++ : ag++;
      }

      winner = outcome === "home" ? homeId : awayId;
    }

    state[match.id] = {
      matchId: match.id,
      homeTeamId: homeId,
      awayTeamId: awayId,
      homeGoals: hg,
      awayGoals: ag,
      winnerTeamId: winner,
    };

    winners.set(match.id, winner);
  }

  return state;
}
