// src/i18n/team.ts

/* -------------------------------------------------------------------------- */
/* Team names (i18n)                                                          */
/* -------------------------------------------------------------------------- */
/**
 * IMPORTANT:
 * - This file maps internal team IDs to user-facing names in each language.
 * - Keys MUST match the IDs used across `data/` and tournament logic.
 * - No UI labels for playoff slots should be hard-coded in helpers/components
 *   if you can resolve them here (except special cases you already handled).
 */

export type Language = "es" | "en";

export type TeamNameDict = Record<string, { es: string; en: string }>;

/* -------------------------------------------------------------------------- */
/* Source of truth                                                            */
/* -------------------------------------------------------------------------- */

export const TEAM_NAMES: TeamNameDict = {
  /* ------------------------------------------------------------------------ */
  /* GROUPS (48 teams + playoff placeholders)                                 */
  /* ------------------------------------------------------------------------ */

  // Group A
  MEX: { es: "México", en: "Mexico" },
  RSA: { es: "Sudáfrica", en: "South Africa" },
  KOR: { es: "Corea del Sur", en: "South Korea" },
  UEFA_D_WINNER: { es: "UEFA D", en: "UEFA D" },

  // Group B
  CAN: { es: "Canadá", en: "Canada" },
  UEFA_A_WINNER: { es: "UEFA A", en: "UEFA A" },
  QAT: { es: "Qatar", en: "Qatar" },
  SUI: { es: "Suiza", en: "Switzerland" },

  // Group C
  BRA: { es: "Brasil", en: "Brazil" },
  MAR: { es: "Marruecos", en: "Morocco" },
  HAI: { es: "Haití", en: "Haiti" },
  SCO: { es: "Escocia", en: "Scotland" },

  // Group D
  USA: { es: "Estados Unidos", en: "United States" },
  PAR: { es: "Paraguay", en: "Paraguay" },
  AUS: { es: "Australia", en: "Australia" },
  UEFA_C_WINNER: { es: "UEFA C", en: "UEFA C" },

  // Group E
  GER: { es: "Alemania", en: "Germany" },
  CUW: { es: "Curazao", en: "Curaçao" },
  CIV: { es: "Costa de Marfil", en: "Ivory Coast" },
  ECU: { es: "Ecuador", en: "Ecuador" },

  // Group F
  NED: { es: "Países Bajos", en: "Netherlands" },
  JPN: { es: "Japón", en: "Japan" },
  UEFA_B_WINNER: { es: "UEFA B", en: "UEFA B" },
  TUN: { es: "Túnez", en: "Tunisia" },

  // Group G
  BEL: { es: "Bélgica", en: "Belgium" },
  EGY: { es: "Egipto", en: "Egypt" },
  IRN: { es: "Irán", en: "Iran" },
  NZL: { es: "Nueva Zelanda", en: "New Zealand" },

  // Group H
  ESP: { es: "España", en: "Spain" },
  CPV: { es: "Cabo Verde", en: "Cape Verde" },
  KSA: { es: "Arabia Saudita", en: "Saudi Arabia" },
  URU: { es: "Uruguay", en: "Uruguay" },

  // Group I
  FRA: { es: "Francia", en: "France" },
  SEN: { es: "Senegal", en: "Senegal" },
  INTER_2_WINNER: { es: "INTER 2", en: "INTER 2" },
  NOR: { es: "Noruega", en: "Norway" },

  // Group J
  ARG: { es: "Argentina", en: "Argentina" },
  DZA: { es: "Argelia", en: "Algeria" },
  AUT: { es: "Austria", en: "Austria" },
  JOR: { es: "Jordania", en: "Jordan" },

  // Group K
  POR: { es: "Portugal", en: "Portugal" },
  INTER_1_WINNER: { es: "INTER 1", en: "INTER 1" },
  UZB: { es: "Uzbekistán", en: "Uzbekistan" },
  COL: { es: "Colombia", en: "Colombia" },

  // Group L
  ENG: { es: "Inglaterra", en: "England" },
  HRV: { es: "Croacia", en: "Croatia" },
  GHA: { es: "Ghana", en: "Ghana" },
  PAN: { es: "Panamá", en: "Panama" },

  /* ------------------------------------------------------------------------ */
  /* PLAYOFF CANDIDATES                                                        */
  /* ------------------------------------------------------------------------ */

  // Intercontinental 1
  COD: { es: "RD Congo", en: "DR Congo" },
  JAM: { es: "Jamaica", en: "Jamaica" },
  NCL: { es: "Nueva Caledonia", en: "New Caledonia" },

  // Intercontinental 2
  IRQ: { es: "Irak", en: "Iraq" },
  BOL: { es: "Bolivia", en: "Bolivia" },
  SUR: { es: "Surinam", en: "Suriname" },

  // UEFA Path A
  ITA: { es: "Italia", en: "Italy" },
  NIR: { es: "Irlanda del Norte", en: "Northern Ireland" },
  WAL: { es: "Gales", en: "Wales" },
  BIH: { es: "Bosnia y Herzegovina", en: "Bosnia and Herzegovina" },

  // UEFA Path B
  UKR: { es: "Ucrania", en: "Ukraine" },
  SWE: { es: "Suecia", en: "Sweden" },
  POL: { es: "Polonia", en: "Poland" },
  ALB: { es: "Albania", en: "Albania" },

  // UEFA Path C
  TUR: { es: "Turquía", en: "Turkey" },
  ROU: { es: "Rumania", en: "Romania" },
  SVK: { es: "Eslovaquia", en: "Slovakia" },
  XKX: { es: "Kosovo", en: "Kosovo" },

  // UEFA Path D
  CZE: { es: "República Checa", en: "Czech Republic" },
  IRL: { es: "Irlanda", en: "Ireland" },
  DEN: { es: "Dinamarca", en: "Denmark" },
  MKD: { es: "Macedonia del Norte", en: "North Macedonia" },

  /* ------------------------------------------------------------------------ */
  /* Slot IDs / placeholders (optional; used if they appear in UI)             */
  /* ------------------------------------------------------------------------ */
  INTER_1: { es: "INTER 1", en: "INTER 1" },
  INTER_2: { es: "INTER 2", en: "INTER 2" },
  UEFA_A: { es: "UEFA A", en: "UEFA A" },
  UEFA_B: { es: "UEFA B", en: "UEFA B" },
  UEFA_C: { es: "UEFA C", en: "UEFA C" },
  UEFA_D: { es: "UEFA D", en: "UEFA D" },
};

/* -------------------------------------------------------------------------- */
/* Derived dictionaries (compat layer)                                        */
/* -------------------------------------------------------------------------- */
/**
 * Compatibility export:
 * some components import `{ teams }` to access `teams[language][teamId]`.
 */
export const teams: Record<Language, Record<string, string>> = {
  es: Object.fromEntries(Object.entries(TEAM_NAMES).map(([id, v]) => [id, v.es])),
  en: Object.fromEntries(Object.entries(TEAM_NAMES).map(([id, v]) => [id, v.en])),
};

/* -------------------------------------------------------------------------- */
/* Helpers                                                                    */
/* -------------------------------------------------------------------------- */

/**
 * Resolves a translated team name by ID.
 * Returns `fallback` if the ID is unknown.
 */
export function getTeamName(language: Language, teamId: string, fallback: string): string {
  return TEAM_NAMES[teamId]?.[language] ?? fallback;
}
