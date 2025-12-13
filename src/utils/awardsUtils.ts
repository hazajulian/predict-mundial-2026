// src/utils/awardsUtils.ts

import type { TeamTier } from "../data/teamLevels";
import { getRank } from "./autoPrediction";
import type { Stage, TeamTournamentStats } from "./tournamentStats";

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

export type TournamentAwards = {
  revelation: TeamTournamentStats | null;
  disappointment: TeamTournamentStats | null;
  worst: TeamTournamentStats | null;
  topScoring: TeamTournamentStats | null;
};

/* -------------------------------------------------------------------------- */
/* Generic helpers                                                            */
/* -------------------------------------------------------------------------- */

function hasPlayedSomething(t: TeamTournamentStats): boolean {
  return t.played > 0;
}

function stableCodeCompare(aId: string, bId: string): number {
  return aId.localeCompare(bId);
}

function stageValue(stage: Stage): number {
  switch (stage) {
    case "groups":
      return 0;
    case "roundOf32":
      return 1; // eliminado en 16vos
    case "roundOf16":
      return 2; // eliminado en 8vos
    case "quarters":
      return 3; // eliminado en 4tos
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

function tierStrength(t: TeamTier): number {
  // más alto = más fuerte
  switch (t) {
    case "S":
      return 5;
    case "A":
      return 4;
    case "B":
      return 3;
    case "C":
      return 2;
    default:
      return 1; // D
  }
}

function isBigTeamTier(t: TeamTier): boolean {
  return t === "S" || t === "A";
}

function isBCD(t: TeamTier): boolean {
  return t === "B" || t === "C" || t === "D";
}

function groupPerformanceCompareWorstFirst(
  a: TeamTournamentStats,
  b: TeamTournamentStats
): number {
  // peor rendimiento primero:
  // menos puntos, peor GD, menos GF
  if (a.points !== b.points) return a.points - b.points;
  if (a.goalDiff !== b.goalDiff) return a.goalDiff - b.goalDiff;
  if (a.goalsFor !== b.goalsFor) return a.goalsFor - b.goalsFor;
  return stableCodeCompare(a.team.id, b.team.id);
}

function groupPerformanceCompareBestFirst(
  a: TeamTournamentStats,
  b: TeamTournamentStats
): number {
  // mejor rendimiento primero:
  // más puntos, mejor GD, más GF
  if (b.points !== a.points) return b.points - a.points;
  if (b.goalDiff !== a.goalDiff) return b.goalDiff - a.goalDiff;
  if (b.goalsFor !== a.goalsFor) return b.goalsFor - a.goalsFor;
  return stableCodeCompare(a.team.id, b.team.id);
}

/* -------------------------------------------------------------------------- */
/* Revelation                                                                 */
/* B/C/D que llega más lejos                                                  */
/* Tie-break:                                                                 */
/* 1) ranking más chico                                                       */
/* 2) "giant kills"                                                           */
/* 3) performance grupos                                                      */
/* 4) code ASC                                                                */
/* -------------------------------------------------------------------------- */

function countGiantKills(t: TeamTournamentStats): number {
  // “Grandes derribados” = rivales de tier superior eliminados en KO
  const myStrength = tierStrength(t.tier);

  let kills = 0;
  for (const s of t.scalps) {
    if (tierStrength(s.tier) > myStrength) kills++;
  }
  return kills;
}

function pickRevelation(stats: TeamTournamentStats[]): TeamTournamentStats | null {
  const candidates = stats.filter((t) => isBCD(t.tier));
  if (!candidates.length) return null;

  // 1) elegir los que llegaron más lejos
  let bestStage = -1;
  for (const t of candidates) {
    const v = stageValue(t.stageReached);
    if (v > bestStage) bestStage = v;
  }

  const top = candidates.filter((t) => stageValue(t.stageReached) === bestStage);
  if (top.length === 1) return top[0];

  // 2) desempate
  return (
    top
      .slice()
      .sort((a, b) => {
        // (1) ranking más chico
        const ra = getRank(a.team.id);
        const rb = getRank(b.team.id);
        if (ra !== rb) return ra - rb;

        // (2) giant kills
        const ka = countGiantKills(a);
        const kb = countGiantKills(b);
        if (kb !== ka) return kb - ka;

        // (3) rendimiento grupos
        const gp = groupPerformanceCompareBestFirst(a, b);
        if (gp !== 0) return gp;

        // (4) estable
        return stableCodeCompare(a.team.id, b.team.id);
      })[0]
  );
}

/* -------------------------------------------------------------------------- */
/* Disappointment                                                             */
/* S/A por rondas, sin puntajes                                               */
/* Order: groups -> roundOf32 -> roundOf16 -> quarters                         */
/* Excepción: si no hay, buscar en semis/final/thirdPlace                       */
/* Caída válida:                                                               */
/* - vs B/C/D: siempre                                                         */
/* - vs S/A: solo goleada                                                      */
/* Tie-break (misma ronda):                                                    */
/* 1) rival peor (D peor que C peor que B)                                      */
/* 2) goleada (diff mayor peor)                                                */
/* 3) performance grupos (peor primero)                                        */
/* 4) code ASC                                                                 */
/* -------------------------------------------------------------------------- */

const GOLEADA_DIFF = 3;

type ElimStageKey =
  | "groups"
  | "roundOf32"
  | "roundOf16"
  | "quarters"
  | "semis"
  | "final"
  | "thirdPlace";

function isValidDisappointmentByContext(t: TeamTournamentStats): boolean {
  if (!isBigTeamTier(t.tier)) return false;

  // si cayó en grupos, cuenta (decepción máxima)
  if (t.stageReached === "groups") return true;

  const elim = t.elimination;
  if (!elim?.eliminated || !elim.eliminatedBy || !elim.eliminatedIn) return false;

  const rivalTier = elim.eliminatedBy.tier;
  const diff = elim.eliminatedBy.goalDiff;

  // S/A vs B/C/D: siempre cuenta
  if (isBCD(rivalTier)) return true;

  // S/A vs S/A: solo si goleada
  if (isBigTeamTier(rivalTier)) return diff >= GOLEADA_DIFF;

  return false;
}

function rivalTierBadness(rivalTier: TeamTier): number {
  // más bajo = más “vergonzoso”
  // D (0) peor, luego C (1), B (2), A (3), S (4)
  switch (rivalTier) {
    case "D":
      return 0;
    case "C":
      return 1;
    case "B":
      return 2;
    case "A":
      return 3;
    default:
      return 4; // S
  }
}

function compareDisappointmentSameStage(
  a: TeamTournamentStats,
  b: TeamTournamentStats
): number {
  const ea = a.elimination;
  const eb = b.elimination;

  const ra = ea?.eliminatedBy?.tier ?? "S";
  const rb = eb?.eliminatedBy?.tier ?? "S";

  // (1) peor rival primero
  const ba = rivalTierBadness(ra);
  const bb = rivalTierBadness(rb);
  if (ba !== bb) return ba - bb;

  // (2) goleada: más diff peor
  const da = ea?.eliminatedBy?.goalDiff ?? 0;
  const db = eb?.eliminatedBy?.goalDiff ?? 0;
  if (db !== da) return db - da;

  // (3) performance grupos (peor primero)
  const gp = groupPerformanceCompareWorstFirst(a, b);
  if (gp !== 0) return gp;

  // (4) estable
  return stableCodeCompare(a.team.id, b.team.id);
}

function pickDisappointment(stats: TeamTournamentStats[]): TeamTournamentStats | null {
  const bigs = stats.filter((t) => isBigTeamTier(t.tier));
  if (!bigs.length) return null;

  const byStageReached = (stage: ElimStageKey) => {
    // groups: stageReached === "groups"
    if (stage === "groups") return bigs.filter((t) => t.stageReached === "groups");
    // KO: elimination.eliminatedIn
    return bigs.filter((t) => t.elimination?.eliminatedIn === stage);
  };

  // 1) grupos
  {
    const groupFails = byStageReached("groups");

    if (groupFails.length === 1) return groupFails[0];

    if (groupFails.length > 1) {
      return groupFails
        .slice()
        .sort((a, b) => {
          // 1) grupo más fácil (menos strength) = peor
          if (a.groupStrength !== b.groupStrength) return a.groupStrength - b.groupStrength;

          // 2) peor performance
          const gp = groupPerformanceCompareWorstFirst(a, b);
          if (gp !== 0) return gp;

          // 3) estable
          return stableCodeCompare(a.team.id, b.team.id);
        })[0];
    }
  }

  // 2) KO (prioridad)
  const KO_ORDER: ElimStageKey[] = ["roundOf32", "roundOf16", "quarters"];

  for (const stage of KO_ORDER) {
    const eliminatedHere = byStageReached(stage);
    const valid = eliminatedHere.filter(isValidDisappointmentByContext);

    if (!valid.length) continue;
    if (valid.length === 1) return valid[0];

    return valid.slice().sort(compareDisappointmentSameStage)[0];
  }

  // 3) último recurso
  const LAST_RESORT: ElimStageKey[] = ["semis", "final", "thirdPlace"];

  const lastResortCandidates: TeamTournamentStats[] = [];
  for (const stage of LAST_RESORT) {
    lastResortCandidates.push(...byStageReached(stage));
  }

  const lastValid = lastResortCandidates.filter(isValidDisappointmentByContext);
  if (!lastValid.length) return null;
  if (lastValid.length === 1) return lastValid[0];

  return lastValid.slice().sort(compareDisappointmentSameStage)[0];
}

/* -------------------------------------------------------------------------- */
/* Worst team                                                                 */
/* -------------------------------------------------------------------------- */

function scoreWorst(t: TeamTournamentStats): number {
  if (!hasPlayedSomething(t)) return Infinity;

  let score = 0;
  score += t.points * 3;
  score += t.goalDiff * 2;
  score -= t.goalsAgainst;

  return score;
}

function pickWorst(stats: TeamTournamentStats[]): TeamTournamentStats | null {
  const candidates = stats.filter(hasPlayedSomething);
  if (!candidates.length) return null;

  return candidates
    .slice()
    .sort((a, b) => {
      const sa = scoreWorst(a);
      const sb = scoreWorst(b);
      if (sa !== sb) return sa - sb;
      return stableCodeCompare(a.team.id, b.team.id);
    })[0];
}

/* -------------------------------------------------------------------------- */
/* Top scoring team                                                           */
/* -------------------------------------------------------------------------- */

function pickTopScoring(stats: TeamTournamentStats[]): TeamTournamentStats | null {
  const candidates = stats.filter(hasPlayedSomething);
  if (!candidates.length) return null;

  return candidates
    .slice()
    .sort((a, b) => {
      if (b.goalsFor !== a.goalsFor) return b.goalsFor - a.goalsFor;
      if (b.goalDiff !== a.goalDiff) return b.goalDiff - a.goalDiff;
      if (a.goalsAgainst !== b.goalsAgainst) return a.goalsAgainst - b.goalsAgainst;
      return stableCodeCompare(a.team.id, b.team.id);
    })[0];
}

/* -------------------------------------------------------------------------- */
/* Public API                                                                 */
/* -------------------------------------------------------------------------- */

export function pickTournamentAwards(stats: TeamTournamentStats[]): TournamentAwards {
  if (!stats.length) {
    return { revelation: null, disappointment: null, worst: null, topScoring: null };
  }

  return {
    revelation: pickRevelation(stats),
    disappointment: pickDisappointment(stats),
    worst: pickWorst(stats),
    topScoring: pickTopScoring(stats),
  };
}
