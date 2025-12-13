// src/data/teamTiers.ts
// (también puede llamarse teamLevels.ts, este nombre es más semántico)

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

/**
 * Tier de fortaleza de una selección.
 *
 * S = Potencias absolutas (obligadas a llegar lejos)
 * A = Selecciones grandes
 * B = Selecciones fuertes
 * C = Selecciones medias / bajas
 * D = Selecciones débiles
 */
export type TeamTier = "S" | "A" | "B" | "C" | "D";

/* -------------------------------------------------------------------------- */
/* Data                                                                       */
/* -------------------------------------------------------------------------- */

/**
 * Mapa de fuerza por selección.
 *
 * IMPORTANTE:
 * - Las claves son IDs internos (coinciden con team.ts / i18n).
 * - No hay strings visibles para el usuario.
 * - Este mapa se usa SOLO para lógica (simulación, desempates, sesgos).
 */
export const TEAM_TIERS: Record<string, TeamTier> = {
  // =====================
  // TIER S – POTENCIAS
  // =====================
  ESP: "S",
  ARG: "S",
  FRA: "S",
  ENG: "S",
  BRA: "S",
  GER: "S",
  ITA: "S",
  URU: "S",

  // =====================
  // TIER A – GRANDES
  // =====================
  NED: "A",
  POR: "A",
  BEL: "A",
  HRV: "A",
  MAR: "A",

  // =====================
  // TIER B – FUERTES
  // =====================
  COL: "B",
  ECU: "B",
  JPN: "B",
  NOR: "B",
  DEN: "B",
  PAR: "B",
  MEX: "B",
  USA: "B",
  SEN: "B",
  SUI: "B",
  TUR: "B",
  CIV: "B",
  AUT: "B",
  POL: "B",

  // =====================
  // TIER C – MEDIAS / BAJAS
  // =====================
  GHA: "C",
  KOR: "C",
  SCO: "C",
  SWE: "C",
  DZA: "C",
  KSA: "C",
  CAN: "C",
  RSA: "C",
  COD: "C",
  IRN: "C",
  EGY: "C",
  BOL: "C",
  WAL: "C",
  CZE: "C",
  SVK: "C",
  IRL: "C",
  CPV: "C",
  ROU: "C",
  BIH: "C",

  // =====================
  // TIER D – DÉBILES
  // =====================
  CUW: "D",
  JOR: "D",
  UZB: "D",
  PAN: "D",
  TUN: "D",
  NZL: "D",
  AUS: "D",
  XKX: "D",
  ALB: "D",
  UKR: "D",
  MKD: "D",
  HAI: "D",
  NIR: "D",
  SUR: "D",
  IRQ: "D",
  JAM: "D",
  NCL: "D",

  // =====================
  // PLACEHOLDERS (repechajes)
  // =====================
  UEFA_A_WINNER: "B",
  UEFA_B_WINNER: "B",
  UEFA_C_WINNER: "B",
  UEFA_D_WINNER: "B",
  INTER_1_WINNER: "C",
  INTER_2_WINNER: "C",
};

/* -------------------------------------------------------------------------- */
/* Helpers                                                                    */
/* -------------------------------------------------------------------------- */

/**
 * Devuelve el tier de una selección.
 * Fallback seguro a "C" para evitar errores si falta algún ID.
 */
export function getTeamTier(teamId: string): TeamTier {
  return TEAM_TIERS[teamId] ?? "C";
}
