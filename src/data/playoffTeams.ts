// src/data/playoffTeams.ts

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

/*
  Candidate team that can qualify via a playoff slot.
  - `id` must match the keys used in i18n/team.ts
  - `flagCode` is the ISO country/region code used by react-world-flags
*/
export type PlayoffCandidate = {
  id: string;
  flagCode: string;
};

export type PlayoffSlotId = "INTER_1" | "INTER_2" | "UEFA_A" | "UEFA_B" | "UEFA_C" | "UEFA_D";

/*
  A playoff slot containing all candidate teams.
  UI labels are resolved in components via i18n (no user-facing strings here).
*/
export type PlayoffSlot = {
  id: PlayoffSlotId;
  candidates: PlayoffCandidate[];
};

/* -------------------------------------------------------------------------- */
/* Data                                                                       */
/* -------------------------------------------------------------------------- */

/*
  All playoff slots for World Cup 2026.

  IMPORTANT:
  - Do not store translated names here.
  - Team display names are resolved via i18n using the `id`.
*/
export const PLAYOFF_SLOTS: PlayoffSlot[] = [
  {
    id: "INTER_1",
    candidates: [
      { id: "COD", flagCode: "CD" },
      { id: "JAM", flagCode: "JM" },
      { id: "NCL", flagCode: "NC" },
    ],
  },
  {
    id: "INTER_2",
    candidates: [
      { id: "IRQ", flagCode: "IQ" },
      { id: "BOL", flagCode: "BO" },
      { id: "SUR", flagCode: "SR" },
    ],
  },
  {
    id: "UEFA_A",
    candidates: [
      { id: "ITA", flagCode: "IT" },
      { id: "NIR", flagCode: "GB-NIR" },
      { id: "WAL", flagCode: "GB-WLS" },
      { id: "BIH", flagCode: "BA" },
    ],
  },
  {
    id: "UEFA_B",
    candidates: [
      { id: "UKR", flagCode: "UA" },
      { id: "SWE", flagCode: "SE" },
      { id: "POL", flagCode: "PL" },
      { id: "ALB", flagCode: "AL" },
    ],
  },
  {
    id: "UEFA_C",
    candidates: [
      { id: "TUR", flagCode: "TR" },
      { id: "ROU", flagCode: "RO" },
      { id: "SVK", flagCode: "SK" },
      { id: "XKX", flagCode: "XK" },
    ],
  },
  {
    id: "UEFA_D",
    candidates: [
      { id: "CZE", flagCode: "CZ" },
      { id: "IRL", flagCode: "IE" },
      { id: "DEN", flagCode: "DK" },
      { id: "MKD", flagCode: "MK" },
    ],
  },
];
