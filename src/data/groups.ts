// src/data/groups.ts
import type { Group } from "../types/worldcup";

/* -------------------------------------------------------------------------- */
/* Groups definition                                                          */
/* -------------------------------------------------------------------------- */

/*
  Definition of all World Cup groups.

  IMPORTANT:
  - `id` and `name` always use the team identifier (NOT translated text).
  - Human-readable names are resolved via i18n (i18n/team.ts).
  - Playoff teams are represented as placeholders and resolved later
    through the playoff selection logic.
*/

export const GROUPS: Group[] = [
  /* ------------------------------------------------------------------------ */
  /* Group A                                                                 */
  /* ------------------------------------------------------------------------ */
  {
    id: "A",
    teams: [
      { id: "MEX", name: "MEX", groupId: "A", flagCode: "MX" },
      { id: "RSA", name: "RSA", groupId: "A", flagCode: "ZA" },
      { id: "KOR", name: "KOR", groupId: "A", flagCode: "KR" },
      {
        id: "UEFA_D_WINNER",
        name: "UEFA_D_WINNER",
        groupId: "A",
        isPlayoff: true,
        playoffSlotId: "UEFA_D",
      },
    ],
  },

  /* ------------------------------------------------------------------------ */
  /* Group B                                                                 */
  /* ------------------------------------------------------------------------ */
  {
    id: "B",
    teams: [
      { id: "CAN", name: "CAN", groupId: "B", flagCode: "CA" },
      {
        id: "UEFA_A_WINNER",
        name: "UEFA_A_WINNER",
        groupId: "B",
        isPlayoff: true,
        playoffSlotId: "UEFA_A",
      },
      { id: "QAT", name: "QAT", groupId: "B", flagCode: "QA" },
      { id: "SUI", name: "SUI", groupId: "B", flagCode: "CH" },
    ],
  },

  /* ------------------------------------------------------------------------ */
  /* Group C                                                                 */
  /* ------------------------------------------------------------------------ */
  {
    id: "C",
    teams: [
      { id: "BRA", name: "BRA", groupId: "C", flagCode: "BR" },
      { id: "MAR", name: "MAR", groupId: "C", flagCode: "MA" },
      { id: "HAI", name: "HAI", groupId: "C", flagCode: "HT" },
      { id: "SCO", name: "SCO", groupId: "C", flagCode: "GB-SCT" },
    ],
  },

  /* ------------------------------------------------------------------------ */
  /* Group D                                                                 */
  /* ------------------------------------------------------------------------ */
  {
    id: "D",
    teams: [
      { id: "USA", name: "USA", groupId: "D", flagCode: "US" },
      { id: "PAR", name: "PAR", groupId: "D", flagCode: "PY" },
      { id: "AUS", name: "AUS", groupId: "D", flagCode: "AU" },
      {
        id: "UEFA_C_WINNER",
        name: "UEFA_C_WINNER",
        groupId: "D",
        isPlayoff: true,
        playoffSlotId: "UEFA_C",
      },
    ],
  },

  /* ------------------------------------------------------------------------ */
  /* Group E                                                                 */
  /* ------------------------------------------------------------------------ */
  {
    id: "E",
    teams: [
      { id: "GER", name: "GER", groupId: "E", flagCode: "DE" },
      { id: "CUW", name: "CUW", groupId: "E", flagCode: "CW" },
      { id: "CIV", name: "CIV", groupId: "E", flagCode: "CI" },
      { id: "ECU", name: "ECU", groupId: "E", flagCode: "EC" },
    ],
  },

  /* ------------------------------------------------------------------------ */
  /* Group F                                                                 */
  /* ------------------------------------------------------------------------ */
  {
    id: "F",
    teams: [
      { id: "NED", name: "NED", groupId: "F", flagCode: "NL" },
      { id: "JPN", name: "JPN", groupId: "F", flagCode: "JP" },
      {
        id: "UEFA_B_WINNER",
        name: "UEFA_B_WINNER",
        groupId: "F",
        isPlayoff: true,
        playoffSlotId: "UEFA_B",
      },
      { id: "TUN", name: "TUN", groupId: "F", flagCode: "TN" },
    ],
  },

  /* ------------------------------------------------------------------------ */
  /* Group G                                                                 */
  /* ------------------------------------------------------------------------ */
  {
    id: "G",
    teams: [
      { id: "BEL", name: "BEL", groupId: "G", flagCode: "BE" },
      { id: "EGY", name: "EGY", groupId: "G", flagCode: "EG" },
      { id: "IRN", name: "IRN", groupId: "G", flagCode: "IR" },
      { id: "NZL", name: "NZL", groupId: "G", flagCode: "NZ" },
    ],
  },

  /* ------------------------------------------------------------------------ */
  /* Group H                                                                 */
  /* ------------------------------------------------------------------------ */
  {
    id: "H",
    teams: [
      { id: "ESP", name: "ESP", groupId: "H", flagCode: "ES" },
      { id: "CPV", name: "CPV", groupId: "H", flagCode: "CV" },
      { id: "KSA", name: "KSA", groupId: "H", flagCode: "SA" },
      { id: "URU", name: "URU", groupId: "H", flagCode: "UY" },
    ],
  },

  /* ------------------------------------------------------------------------ */
  /* Group I                                                                 */
  /* ------------------------------------------------------------------------ */
  {
    id: "I",
    teams: [
      { id: "FRA", name: "FRA", groupId: "I", flagCode: "FR" },
      { id: "SEN", name: "SEN", groupId: "I", flagCode: "SN" },
      {
        id: "INTER_2_WINNER",
        name: "INTER_2_WINNER",
        groupId: "I",
        isPlayoff: true,
        playoffSlotId: "INTER_2",
      },
      { id: "NOR", name: "NOR", groupId: "I", flagCode: "NO" },
    ],
  },

  /* ------------------------------------------------------------------------ */
  /* Group J                                                                 */
  /* ------------------------------------------------------------------------ */
  {
    id: "J",
    teams: [
      { id: "ARG", name: "ARG", groupId: "J", flagCode: "AR" },
      { id: "DZA", name: "DZA", groupId: "J", flagCode: "DZ" },
      { id: "AUT", name: "AUT", groupId: "J", flagCode: "AT" },
      { id: "JOR", name: "JOR", groupId: "J", flagCode: "JO" },
    ],
  },

  /* ------------------------------------------------------------------------ */
  /* Group K                                                                 */
  /* ------------------------------------------------------------------------ */
  {
    id: "K",
    teams: [
      { id: "POR", name: "POR", groupId: "K", flagCode: "PT" },
      {
        id: "INTER_1_WINNER",
        name: "INTER_1_WINNER",
        groupId: "K",
        isPlayoff: true,
        playoffSlotId: "INTER_1",
      },
      { id: "UZB", name: "UZB", groupId: "K", flagCode: "UZ" },
      { id: "COL", name: "COL", groupId: "K", flagCode: "CO" },
    ],
  },

  /* ------------------------------------------------------------------------ */
  /* Group L                                                                 */
  /* ------------------------------------------------------------------------ */
  {
    id: "L",
    teams: [
      { id: "ENG", name: "ENG", groupId: "L", flagCode: "GB-ENG" },
      { id: "HRV", name: "HRV", groupId: "L", flagCode: "HR" },
      { id: "GHA", name: "GHA", groupId: "L", flagCode: "GH" },
      { id: "PAN", name: "PAN", groupId: "L", flagCode: "PA" },
    ],
  },
];
