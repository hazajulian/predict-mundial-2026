// src/data/knockoutMatches.ts
import type { KnockoutMatch } from "../types/knockout";

/* -------------------------------------------------------------------------- */
/* Knockout bracket definition                                                */
/* -------------------------------------------------------------------------- */

/*
  Full knockout bracket definition.

  Structure:
  - Round of 32 (ids 1–16) aligned with the official FIFA 2026 match schedule.
  - Round of 16 (ids 17–24)
  - Quarterfinals (ids 25–28)
  - Semifinals (ids 29–30)
  - Final (id 31)
  - Third-place match (id 32)

  FIFA match reference (73–102):
  73: 2A vs 2B
  74: 1E vs 3A/B/C/D/F
  75: 1F vs 2C
  76: 1C vs 2F
  77: 1I vs 3C/D/F/G/H
  78: 2E vs 2I
  79: 1A vs 3C/E/F/H/I
  80: 1L vs 3E/H/I/J/K
  81: 1D vs 3B/E/F/I/J
  82: 1G vs 3A/E/H/I/J
  83: 2K vs 2L
  84: 1H vs 2J
  85: 1B vs 3E/F/G/I/J
  86: 1J vs 2H
  87: 1K vs 3D/E/I/J/L
  88: 2D vs 2G

  Bracket layout notes:
  - The Round of 32 ordering is arranged to match the FIFA/Clarín visual bracket.
  - Later rounds reference winners/losers via `kind: "advance"`.
*/

export const KNOCKOUT_MATCHES: KnockoutMatch[] = [
  /* ------------------------------------------------------------------------ */
  /* Round of 32 (1–16)                                                       */
  /* ------------------------------------------------------------------------ */
  /* Left side (1–8) – Clarín visual order */

  /* 1) 1E vs 3A/B/C/D/F (FIFA Match 74) */
  {
    id: 1,
    round: "16vos",
    home: { kind: "group", label: "1E" },
    away: { kind: "group", label: "3A/B/C/D/F" },
  },

  /* 2) 1I vs 3C/D/F/G/H (FIFA Match 77) */
  {
    id: 2,
    round: "16vos",
    home: { kind: "group", label: "1I" },
    away: { kind: "group", label: "3C/D/F/G/H" },
  },

  /* 3) 2A vs 2B (FIFA Match 73) */
  {
    id: 3,
    round: "16vos",
    home: { kind: "group", label: "2A" },
    away: { kind: "group", label: "2B" },
  },

  /* 4) 1F vs 2C (FIFA Match 75) */
  {
    id: 4,
    round: "16vos",
    home: { kind: "group", label: "1F" },
    away: { kind: "group", label: "2C" },
  },

  /* 5) 2K vs 2L (FIFA Match 83) */
  {
    id: 5,
    round: "16vos",
    home: { kind: "group", label: "2K" },
    away: { kind: "group", label: "2L" },
  },

  /* 6) 1H vs 2J (FIFA Match 84) */
  {
    id: 6,
    round: "16vos",
    home: { kind: "group", label: "1H" },
    away: { kind: "group", label: "2J" },
  },

  /* 7) 1D vs 3B/E/F/I/J (FIFA Match 81) */
  {
    id: 7,
    round: "16vos",
    home: { kind: "group", label: "1D" },
    away: { kind: "group", label: "3B/E/F/I/J" },
  },

  /* 8) 1G vs 3A/E/H/I/J (FIFA Match 82) */
  {
    id: 8,
    round: "16vos",
    home: { kind: "group", label: "1G" },
    away: { kind: "group", label: "3A/E/H/I/J" },
  },

  /* Right side (9–16) – Clarín visual order */

  /* 9) 1C vs 2F (FIFA Match 76) */
  {
    id: 9,
    round: "16vos",
    home: { kind: "group", label: "1C" },
    away: { kind: "group", label: "2F" },
  },

  /* 10) 2E vs 2I (FIFA Match 78) */
  {
    id: 10,
    round: "16vos",
    home: { kind: "group", label: "2E" },
    away: { kind: "group", label: "2I" },
  },

  /* 11) 1A vs 3C/E/F/H/I (FIFA Match 79) */
  {
    id: 11,
    round: "16vos",
    home: { kind: "group", label: "1A" },
    away: { kind: "group", label: "3C/E/F/H/I" },
  },

  /* 12) 1L vs 3E/H/I/J/K (FIFA Match 80) */
  {
    id: 12,
    round: "16vos",
    home: { kind: "group", label: "1L" },
    away: { kind: "group", label: "3E/H/I/J/K" },
  },

  /* 13) 1J vs 2H (FIFA Match 86) */
  {
    id: 13,
    round: "16vos",
    home: { kind: "group", label: "1J" },
    away: { kind: "group", label: "2H" },
  },

  /* 14) 2D vs 2G (FIFA Match 88) */
  {
    id: 14,
    round: "16vos",
    home: { kind: "group", label: "2D" },
    away: { kind: "group", label: "2G" },
  },

  /* 15) 1B vs 3E/F/G/I/J (FIFA Match 85) */
  {
    id: 15,
    round: "16vos",
    home: { kind: "group", label: "1B" },
    away: { kind: "group", label: "3E/F/G/I/J" },
  },

  /* 16) 1K vs 3D/E/I/J/L (FIFA Match 87) */
  {
    id: 16,
    round: "16vos",
    home: { kind: "group", label: "1K" },
    away: { kind: "group", label: "3D/E/I/J/L" },
  },

  /* ------------------------------------------------------------------------ */
  /* Round of 16 (17–24) – FIFA 89–96                                         */
  /* ------------------------------------------------------------------------ */

  /* 17) FIFA 89: Winner 73 vs Winner 75 => internal matches 3 and 4 */
  {
    id: 17,
    round: "8vos",
    home: { kind: "advance", matchId: 3, from: "winner" },
    away: { kind: "advance", matchId: 4, from: "winner" },
  },

  /* 18) FIFA 90: Winner 74 vs Winner 77 => internal matches 1 and 2 */
  {
    id: 18,
    round: "8vos",
    home: { kind: "advance", matchId: 1, from: "winner" },
    away: { kind: "advance", matchId: 2, from: "winner" },
  },

  /* 19) FIFA 93: Winner 83 vs Winner 84 => internal matches 5 and 6 */
  {
    id: 19,
    round: "8vos",
    home: { kind: "advance", matchId: 5, from: "winner" },
    away: { kind: "advance", matchId: 6, from: "winner" },
  },

  /* 20) FIFA 94: Winner 81 vs Winner 82 => internal matches 7 and 8 */
  {
    id: 20,
    round: "8vos",
    home: { kind: "advance", matchId: 7, from: "winner" },
    away: { kind: "advance", matchId: 8, from: "winner" },
  },

  /* 21) FIFA 91: Winner 76 vs Winner 78 => internal matches 9 and 10 */
  {
    id: 21,
    round: "8vos",
    home: { kind: "advance", matchId: 9, from: "winner" },
    away: { kind: "advance", matchId: 10, from: "winner" },
  },

  /* 22) FIFA 92: Winner 79 vs Winner 80 => internal matches 11 and 12 */
  {
    id: 22,
    round: "8vos",
    home: { kind: "advance", matchId: 11, from: "winner" },
    away: { kind: "advance", matchId: 12, from: "winner" },
  },

  /* 23) FIFA 95: Winner 86 vs Winner 88 => internal matches 13 and 14 */
  {
    id: 23,
    round: "8vos",
    home: { kind: "advance", matchId: 13, from: "winner" },
    away: { kind: "advance", matchId: 14, from: "winner" },
  },

  /* 24) FIFA 96: Winner 85 vs Winner 87 => internal matches 15 and 16 */
  {
    id: 24,
    round: "8vos",
    home: { kind: "advance", matchId: 15, from: "winner" },
    away: { kind: "advance", matchId: 16, from: "winner" },
  },

  /* ------------------------------------------------------------------------ */
  /* Quarterfinals (25–28) – FIFA 97–100                                      */
  /* ------------------------------------------------------------------------ */

  /* 25) FIFA 97: Winner 89 vs Winner 90 => internal matches 17 and 18 */
  {
    id: 25,
    round: "4tos",
    home: { kind: "advance", matchId: 17, from: "winner" },
    away: { kind: "advance", matchId: 18, from: "winner" },
  },

  /* 26) FIFA 98: Winner 93 vs Winner 94 => internal matches 19 and 20 */
  {
    id: 26,
    round: "4tos",
    home: { kind: "advance", matchId: 19, from: "winner" },
    away: { kind: "advance", matchId: 20, from: "winner" },
  },

  /* 27) FIFA 99: Winner 91 vs Winner 92 => internal matches 21 and 22 */
  {
    id: 27,
    round: "4tos",
    home: { kind: "advance", matchId: 21, from: "winner" },
    away: { kind: "advance", matchId: 22, from: "winner" },
  },

  /* 28) FIFA 100: Winner 95 vs Winner 96 => internal matches 23 and 24 */
  {
    id: 28,
    round: "4tos",
    home: { kind: "advance", matchId: 23, from: "winner" },
    away: { kind: "advance", matchId: 24, from: "winner" },
  },

  /* ------------------------------------------------------------------------ */
  /* Semifinals (29–30) – FIFA 101–102                                        */
  /* ------------------------------------------------------------------------ */

  /* 29) FIFA 101: Winner 97 vs Winner 98 => internal matches 25 and 26 */
  {
    id: 29,
    round: "Semis",
    home: { kind: "advance", matchId: 25, from: "winner" },
    away: { kind: "advance", matchId: 26, from: "winner" },
  },

  /* 30) FIFA 102: Winner 99 vs Winner 100 => internal matches 27 and 28 */
  {
    id: 30,
    round: "Semis",
    home: { kind: "advance", matchId: 27, from: "winner" },
    away: { kind: "advance", matchId: 28, from: "winner" },
  },

  /* ------------------------------------------------------------------------ */
  /* Final (31) and third-place match (32)                                    */
  /* ------------------------------------------------------------------------ */

  {
    id: 31,
    round: "Final",
    home: { kind: "advance", matchId: 29, from: "winner" },
    away: { kind: "advance", matchId: 30, from: "winner" },
  },
  {
    id: 32,
    round: "3er puesto",
    home: { kind: "advance", matchId: 29, from: "loser" },
    away: { kind: "advance", matchId: 30, from: "loser" },
  },
];
