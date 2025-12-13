// src/data/fifaThirdTable.ts

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

/*
  Group identifiers (A–L) used to reference the origin group
  of a third-placed team.
*/
export type ThirdGroupLetter =
  | "A"
  | "B"
  | "C"
  | "D"
  | "E"
  | "F"
  | "G"
  | "H"
  | "I"
  | "J"
  | "K"
  | "L";

/*
  Winner slot identifiers for group winners (1A–1L).
  These are used to map which group winner faces which third-placed team.
*/
export type WinnerSlotId =
  | "1A"
  | "1B"
  | "1C"
  | "1D"
  | "1E"
  | "1F"
  | "1G"
  | "1H"
  | "1I"
  | "1J"
  | "1K"
  | "1L";

/*
  One row of the official FIFA table for the "best third-placed teams" logic.

  Each row represents one of the 495 possible combinations defined by FIFA,
  depending on which 8 third-placed teams qualify from the 12 groups.
*/
export type FifaThirdOptionRow = {
  /* Option number (1..495), matching the official FIFA PDF table. */
  option: number;

  /*
    Letters of the 8 qualified third-placed teams,
    ordered by ranking priority.
    Example: ["A", "B", "C", "D", "E", "F", "G", "H"]
  */
  qualifiedGroups: ThirdGroupLetter[];

  /*
    Mapping of group winners (1A..1L) to the third-placed group they face.
    - A value of null means that winner does NOT face a third-placed team
      (they face a group runner-up instead).
  */
  vs: Partial<Record<WinnerSlotId, ThirdGroupLetter | null>>;
};

/* -------------------------------------------------------------------------- */
/* Data                                                                       */
/* -------------------------------------------------------------------------- */

/*
  Complete FIFA table defining all valid third-place matchups.

  IMPORTANT:
  - The real file contains ~495 entries copied from the official FIFA document.
  - The rows below are only illustrative examples of the expected structure.
*/
export const FIFA_THIRD_TABLE: FifaThirdOptionRow[] = [
  {
    option: 1,
    qualifiedGroups: ["E","F","G","H","I","J","K","L"],
    vs: { "1A":"E","1B":"J","1D":"I","1E":"F","1G":"H","1I":"G","1K":"L","1L":"K" }
  },
  {
    option: 2,
    qualifiedGroups: ["D","F","G","H","I","J","K","L"],
    vs: { "1A":"H","1B":"G","1D":"I","1E":"D","1G":"J","1I":"F","1K":"L","1L":"K" }
  },
  {
    option: 3,
    qualifiedGroups: ["D","E","G","H","I","J","K","L"],
    vs: { "1A":"E","1B":"J","1D":"I","1E":"D","1G":"H","1I":"G","1K":"L","1L":"K" }
  },
  {
    option: 4,
    qualifiedGroups: ["D","E","F","H","I","J","K","L"],
    vs: { "1A":"E","1B":"J","1D":"I","1E":"D","1G":"H","1I":"F","1K":"L","1L":"K" }
  },
  {
    option: 5,
    qualifiedGroups: ["D","E","F","G","I","J","K","L"],
    vs: { "1A":"E","1B":"G","1D":"I","1E":"D","1G":"J","1I":"F","1K":"L","1L":"K" }
  },
  {
    option: 6,
    qualifiedGroups: ["D","E","F","G","H","J","K","L"],
    vs: { "1A":"E","1B":"G","1D":"J","1E":"D","1G":"H","1I":"F","1K":"L","1L":"K" }
  },
  {
    option: 7,
    qualifiedGroups: ["D","E","F","G","H","I","K","L"],
    vs: { "1A":"E","1B":"G","1D":"I","1E":"D","1G":"H","1I":"F","1K":"L","1L":"K" }
  },
  {
    option: 8,
    qualifiedGroups: ["D","E","F","G","H","I","J","L"],
    vs: { "1A":"E","1B":"G","1D":"J","1E":"D","1G":"H","1I":"F","1K":"L","1L":"I" }
  },
  {
    option: 9,
    qualifiedGroups: ["D","E","F","G","H","I","J","K"],
    vs: { "1A":"E","1B":"G","1D":"J","1E":"D","1G":"H","1I":"F","1K":"I","1L":"K" }
  },
  {
    option: 10,
    qualifiedGroups: ["C","F","G","H","I","J","K","L"],
    vs: { "1A":"H","1B":"G","1D":"I","1E":"C","1G":"J","1I":"F","1K":"L","1L":"K" }
  },
  {
    option: 11,
    qualifiedGroups: ["C","E","G","H","I","J","K","L"],
    vs: { "1A":"E","1B":"J","1D":"I","1E":"C","1G":"H","1I":"G","1K":"L","1L":"K" }
  },
  {
    option: 12,
    qualifiedGroups: ["C","E","F","H","I","J","K","L"],
    vs: { "1A":"E","1B":"J","1D":"I","1E":"C","1G":"H","1I":"F","1K":"L","1L":"K" }
  },
  {
    option: 13,
    qualifiedGroups: ["C","E","F","G","I","J","K","L"],
    vs: { "1A":"E","1B":"G","1D":"I","1E":"C","1G":"J","1I":"F","1K":"L","1L":"K" }
  },
  {
    option: 14,
    qualifiedGroups: ["C","E","F","G","H","J","K","L"],
    vs: { "1A":"E","1B":"G","1D":"J","1E":"C","1G":"H","1I":"F","1K":"L","1L":"K" }
  },
  {
    option: 15,
    qualifiedGroups: ["C","E","F","G","H","I","K","L"],
    vs: { "1A":"E","1B":"G","1D":"I","1E":"C","1G":"H","1I":"F","1K":"L","1L":"K" }
  },
  {
    option: 16,
    qualifiedGroups: ["C","E","F","G","H","I","J","L"],
    vs: { "1A":"E","1B":"G","1D":"J","1E":"C","1G":"H","1I":"F","1K":"L","1L":"I" }
  }, 
  {
    option: 17,
    qualifiedGroups: ["C","E","F","G","H","I","J","K"],
    vs: { "1A":"E","1B":"G","1D":"J","1E":"C","1G":"H","1I":"F","1K":"I","1L":"K" }
  },
  {
    option: 18,
    qualifiedGroups: ["C","D","G","H","I","J","K","L"],
    vs: { "1A":"H","1B":"G","1D":"I","1E":"C","1G":"J","1I":"D","1K":"L","1L":"K" }
  },
  {
    option: 19,
    qualifiedGroups: ["C","D","F","H","I","J","K","L"],
    vs: { "1A":"C","1B":"J","1D":"I","1E":"D","1G":"H","1I":"F","1K":"L","1L":"K" }
  },
  {
    option: 20,
    qualifiedGroups: ["C","D","F","G","I","J","K","L"],
    vs: { "1A":"C","1B":"G","1D":"I","1E":"D","1G":"J","1I":"F","1K":"L","1L":"K" }
  },
  {
    option: 21,
    qualifiedGroups: ["C","D","F","G","H","J","K","L"],
    vs: { "1A":"C","1B":"G","1D":"J","1E":"D","1G":"H","1I":"F","1K":"L","1L":"K" }
  },
  {
    option: 22,
    qualifiedGroups: ["C","D","F","G","H","I","K","L"],
    vs: { "1A":"C","1B":"G","1D":"I","1E":"D","1G":"H","1I":"F","1K":"L","1L":"K" }
  },
  {
    option: 23,
    qualifiedGroups: ["C","D","F","G","H","I","J","L"],
    vs: { "1A":"C","1B":"G","1D":"J","1E":"D","1G":"H","1I":"F","1K":"L","1L":"I" }
  },
  {
    option: 24,
    qualifiedGroups: ["C","D","F","G","H","I","J","K"],
    vs: { "1A":"C","1B":"G","1D":"J","1E":"D","1G":"H","1I":"F","1K":"I","1L":"K" }
  },
  {
    option: 25,
    qualifiedGroups: ["C","D","E","H","I","J","K","L"],
    vs: { "1A":"E","1B":"J","1D":"I","1E":"C","1G":"H","1I":"D","1K":"L","1L":"K" }
  },
  {
    option: 26,
    qualifiedGroups: ["C","D","E","G","I","J","K","L"],
    vs: { "1A":"E","1B":"G","1D":"I","1E":"C","1G":"J","1I":"D","1K":"L","1L":"K" }
  },
  {
    option: 27,
    qualifiedGroups: ["C","D","E","G","H","J","K","L"],
    vs: { "1A":"E","1B":"G","1D":"J","1E":"C","1G":"H","1I":"D","1K":"L","1L":"K" }
  },
  {
    option: 28,
    qualifiedGroups: ["C","D","E","G","H","I","K","L"],
    vs: { "1A":"E","1B":"G","1D":"I","1E":"C","1G":"H","1I":"D","1K":"L","1L":"K" }
  },
  {
    option: 29,
    qualifiedGroups: ["C","D","E","G","H","I","J","L"],
    vs: { "1A":"E","1B":"G","1D":"J","1E":"C","1G":"H","1I":"D","1K":"L","1L":"I" }
  },
  {
    option: 30,
    qualifiedGroups: ["C","D","E","G","H","I","J","K"],
    vs: { "1A":"E","1B":"G","1D":"J","1E":"C","1G":"H","1I":"D","1K":"I","1L":"K" }
  },
  {
    option: 31,
    qualifiedGroups: ["C","D","E","F","I","J","K","L"],
    vs: { "1A": "C", "1B": "J", "1D": "E", "1E": "D", "1G": "I", "1I": "F", "1K": "L", "1L": "K" }
  },
  {
    option: 32,
    qualifiedGroups: ["C","D","E","F","H","J","K","L"],
    vs: { "1A": "C", "1B": "J", "1D": "E", "1E": "D", "1G": "H", "1I": "F", "1K": "L", "1L": "K" }
  },
  {
    option: 33,
    qualifiedGroups: ["C","D","E","F","H","I","K","L"],
    vs: { "1A": "C", "1B": "E", "1D": "I", "1E": "D", "1G": "H", "1I": "F", "1K": "L", "1L": "K" }
  },
  {
    option: 34,
    qualifiedGroups: ["C","D","E","F","H","I","J","L"],
    vs: { "1A": "C", "1B": "J", "1D": "E", "1E": "D", "1G": "H", "1I": "F", "1K": "L", "1L": "I" }
  },
  {
    option: 35,
    qualifiedGroups: ["C","D","E","F","H","I","J","K"],
    vs: { "1A": "C", "1B": "J", "1D": "E", "1E": "D", "1G": "H", "1I": "F", "1K": "I", "1L": "K" }
  },
  {
    option: 36,
    qualifiedGroups: ["C","D","E","F","G","J","K","L"],
    vs: { "1A": "C", "1B": "G", "1D": "E", "1E": "D", "1G": "J", "1I": "F", "1K": "L", "1L": "K" }
  },
  {
    option: 37,
    qualifiedGroups: ["C","D","E","F","G","I","K","L"],
    vs: { "1A": "C", "1B": "G", "1D": "E", "1E": "D", "1G": "I", "1I": "F", "1K": "L", "1L": "K" }
  },
  {
    option: 38,
    qualifiedGroups: ["C","D","E","F","G","I","J","L"],
    vs: { "1A": "C", "1B": "G", "1D": "E", "1E": "D", "1G": "J", "1I": "F", "1K": "L", "1L": "I" }
  },
  {
    option: 39,
    qualifiedGroups: ["C","D","E","F","G","I","J","K"],
    vs: { "1A": "C", "1B": "G", "1D": "E", "1E": "D", "1G": "J", "1I": "F", "1K": "I", "1L": "K" }
  },
  {
    option: 40,
    qualifiedGroups: ["C","D","E","F","G","H","K","L"],
    vs: { "1A": "C", "1B": "G", "1D": "E", "1E": "D", "1G": "H", "1I": "F", "1K": "L", "1L": "K" }
  },
  {
    option: 41,
    qualifiedGroups: ["C","D","E","F","G","H","J","L"],
    vs: { "1A": "C", "1B": "G", "1D": "J", "1E": "D", "1G": "H", "1I": "F", "1K": "L", "1L": "E" }
  },
  {
    option: 42,
    qualifiedGroups: ["C","D","E","F","G","H","J","K"],
    vs: { "1A": "C", "1B": "G", "1D": "J", "1E": "D", "1G": "H", "1I": "F", "1K": "E", "1L": "K" }
  },
  {
    option: 43,
    qualifiedGroups: ["C","D","E","F","G","H","I","L"],
    vs: { "1A": "C", "1B": "G", "1D": "E", "1E": "D", "1G": "H", "1I": "F", "1K": "L", "1L": "I" }
  },
  {
    option: 44,
    qualifiedGroups: ["C","D","E","F","G","H","I","K"],
    vs: { "1A": "C", "1B": "G", "1D": "E", "1E": "D", "1G": "H", "1I": "F", "1K": "I", "1L": "K" }
  },
  {
    option: 45,
    qualifiedGroups: ["C","D","E","F","G","H","I","J"],
    vs: { "1A": "C", "1B": "G", "1D": "J", "1E": "D", "1G": "H", "1I": "F", "1K": "E", "1L": "I" }
  },
  {
    option: 46,
    qualifiedGroups: ["B","F","G","H","I","J","K","L"],
    vs: { "1A": "H", "1B": "J", "1D": "B", "1E": "F", "1G": "I", "1I": "G", "1K": "L", "1L": "K" }
  },
  {
    option: 47,
    qualifiedGroups: ["B","E","G","H","I","J","K","L"],
    vs: { "1A": "E", "1B": "J", "1D": "I", "1E": "B", "1G": "H", "1I": "G", "1K": "L", "1L": "K" }
  },
  {
    option: 48,
    qualifiedGroups: ["B","E","F","H","I","J","K","L"],
    vs: { "1A": "E", "1B": "J", "1D": "B", "1E": "F", "1G": "I", "1I": "H", "1K": "L", "1L": "K" }
  },
  {
    option: 49,
    qualifiedGroups: ["B","E","F","G","I","J","K","L"],
    vs: { "1A": "E", "1B": "J", "1D": "B", "1E": "F", "1G": "I", "1I": "G", "1K": "L", "1L": "K" }
  },
  {
    option: 50,
    qualifiedGroups: ["B","E","F","G","H","J","K","L"],
    vs: { "1A": "E", "1B": "J", "1D": "B", "1E": "F", "1G": "H", "1I": "G", "1K": "L", "1L": "K" }
  },
  {
    option: 51,
    qualifiedGroups: ["B","E","F","G","H","I","K","L"],
    vs: { "1A": "E", "1B": "G", "1D": "B", "1E": "F", "1G": "I", "1I": "H", "1K": "L", "1L": "K" }
  },
  {
    option: 52,
    qualifiedGroups: ["B","E","F","G","H","I","J","L"],
    vs: { "1A": "E", "1B": "J", "1D": "B", "1E": "F", "1G": "H", "1I": "G", "1K": "L", "1L": "I" }
  },
  {
    option: 53,
    qualifiedGroups: ["B","E","F","G","H","I","J","K"],
    vs: { "1A": "E", "1B": "J", "1D": "B", "1E": "F", "1G": "H", "1I": "G", "1K": "I", "1L": "K" }
  },
  {
    option: 54,
    qualifiedGroups: ["B","D","G","H","I","J","K","L"],
    vs: { "1A": "H", "1B": "J", "1D": "B", "1E": "D", "1G": "I", "1I": "G", "1K": "L", "1L": "K" }
  },
  {
    option: 55,
    qualifiedGroups: ["B","D","F","H","I","J","K","L"],
    vs: { "1A": "H", "1B": "J", "1D": "B", "1E": "D", "1G": "I", "1I": "F", "1K": "L", "1L": "K" }
  },
  {
    option: 56,
    qualifiedGroups: ["B","D","F","G","I","J","K","L"],
    vs: { "1A": "I", "1B": "G", "1D": "B", "1E": "D", "1G": "J", "1I": "F", "1K": "L", "1L": "K" }
  },
  {
    option: 57,
    qualifiedGroups: ["B","D","F","G","H","J","K","L"],
    vs: { "1A": "H", "1B": "G", "1D": "B", "1E": "D", "1G": "J", "1I": "F", "1K": "L", "1L": "K" }
  },
  {
    option: 58,
    qualifiedGroups: ["B","D","F","G","H","I","K","L"],
    vs: { "1A": "H", "1B": "G", "1D": "B", "1E": "D", "1G": "I", "1I": "F", "1K": "L", "1L": "K" }
  },
  {
    option: 59,
    qualifiedGroups: ["B","D","F","G","H","I","J","L"],
    vs: { "1A": "H", "1B": "G", "1D": "B", "1E": "D", "1G": "J", "1I": "F", "1K": "L", "1L": "I" }
  },
  {
    option: 60,
    qualifiedGroups: ["B","D","F","G","H","I","J","K"],
    vs: { "1A": "H", "1B": "G", "1D": "B", "1E": "D", "1G": "J", "1I": "F", "1K": "I", "1L": "K" }
  },
  {
    option: 61,
    qualifiedGroups: ["B","D","E","H","I","J","K","L"],
    vs: { "1A": "E", "1B": "J", "1D": "B", "1E": "D", "1G": "I", "1I": "H", "1K": "L", "1L": "K" }
  },
  {
    option: 62,
    qualifiedGroups: ["B","D","E","G","I","J","K","L"],
    vs: { "1A": "E", "1B": "J", "1D": "B", "1E": "D", "1G": "I", "1I": "G", "1K": "L", "1L": "K" }
  },
  {
    option: 63,
    qualifiedGroups: ["B","D","E","G","H","J","K","L"],
    vs: { "1A": "E", "1B": "J", "1D": "B", "1E": "D", "1G": "H", "1I": "G", "1K": "L", "1L": "K" }
  },
  {
    option: 64,
    qualifiedGroups: ["B","D","E","G","H","I","K","L"],
    vs: { "1A": "E", "1B": "G", "1D": "B", "1E": "D", "1G": "I", "1I": "H", "1K": "L", "1L": "K" }
  },
  {
    option: 65,
    qualifiedGroups: ["B","D","E","G","H","I","J","L"],
    vs: { "1A": "E", "1B": "J", "1D": "B", "1E": "D", "1G": "H", "1I": "G", "1K": "L", "1L": "I" }
  },
  {
    option: 66,
    qualifiedGroups: ["B","D","E","G","H","I","J","K"],
    vs: { "1A": "E", "1B": "J", "1D": "B", "1E": "D", "1G": "H", "1I": "G", "1K": "I", "1L": "K" }
  },
  {
    option: 67,
    qualifiedGroups: ["B","D","E","F","I","J","K","L"],
    vs: { "1A": "E", "1B": "J", "1D": "B", "1E": "D", "1G": "I", "1I": "F", "1K": "L", "1L": "K" }
  },
  {
    option: 68,
    qualifiedGroups: ["B","D","E","F","H","J","K","L"],
    vs: { "1A": "E", "1B": "J", "1D": "B", "1E": "D", "1G": "H", "1I": "F", "1K": "L", "1L": "K" }
  },
  {
    option: 69,
    qualifiedGroups: ["B","D","E","F","H","I","K","L"],
    vs: { "1A": "E", "1B": "I", "1D": "B", "1E": "D", "1G": "H", "1I": "F", "1K": "L", "1L": "K" }
  },
  {
    option: 70,
    qualifiedGroups: ["B","D","E","F","H","I","J","L"],
    vs: { "1A": "E", "1B": "J", "1D": "B", "1E": "D", "1G": "H", "1I": "F", "1K": "L", "1L": "I" }
  },
  {
    option: 71,
    qualifiedGroups: ["B","D","E","F","H","I","J","K"],
    vs: { "1A": "E", "1B": "J", "1D": "B", "1E": "D", "1G": "H", "1I": "F", "1K": "I", "1L": "K" }
  },
  {
    option: 72,
    qualifiedGroups: ["B","D","E","F","G","J","K","L"],
    vs: { "1A": "E", "1B": "G", "1D": "B", "1E": "D", "1G": "J", "1I": "F", "1K": "L", "1L": "K" }
  },
  {
    option: 73,
    qualifiedGroups: ["B","D","E","F","G","I","K","L"],
    vs: { "1A": "E", "1B": "G", "1D": "B", "1E": "D", "1G": "I", "1I": "F", "1K": "L", "1L": "K" }
  },
  {
    option: 74,
    qualifiedGroups: ["B","D","E","F","G","I","J","L"],
    vs: { "1A": "E", "1B": "G", "1D": "B", "1E": "D", "1G": "J", "1I": "F", "1K": "L", "1L": "I" }
  },
  {
    option: 75,
    qualifiedGroups: ["B","D","E","F","G","I","J","K"],
    vs: { "1A": "E", "1B": "G", "1D": "B", "1E": "D", "1G": "J", "1I": "F", "1K": "I", "1L": "K" }
  },
  {
    option: 76,
    qualifiedGroups: ["B","D","E","F","G","H","K","L"],
    vs: { "1A": "E", "1B": "G", "1D": "B", "1E": "D", "1G": "H", "1I": "F", "1K": "L", "1L": "K" }
  },
  {
    option: 77,
    qualifiedGroups: ["B","D","E","F","G","H","J","L"],
    vs: { "1A": "H", "1B": "G", "1D": "B", "1E": "D", "1G": "J", "1I": "F", "1K": "L", "1L": "E" }
  },
  {
    option: 78,
    qualifiedGroups: ["B","D","E","F","G","H","J","K"],
    vs: { "1A": "H", "1B": "G", "1D": "B", "1E": "D", "1G": "J", "1I": "F", "1K": "E", "1L": "K" }
  },
  {
    option: 79,
    qualifiedGroups: ["B","D","E","F","G","H","I","L"],
    vs: { "1A": "E", "1B": "G", "1D": "B", "1E": "D", "1G": "H", "1I": "F", "1K": "L", "1L": "I" }
  },
  {
    option: 80,
    qualifiedGroups: ["B","D","E","F","G","H","I","K"],
    vs: { "1A": "E", "1B": "G", "1D": "B", "1E": "D", "1G": "H", "1I": "F", "1K": "I", "1L": "K" }
  },
  {
    option: 81,
    qualifiedGroups: ["B","D","E","F","G","H","I","J"],
    vs: { "1A": "H", "1B": "G", "1D": "B", "1E": "D", "1G": "J", "1I": "F", "1K": "E", "1L": "I" }
  },
  {
    option: 82,
    qualifiedGroups: ["B","C","G","H","I","J","K","L"],
    vs: { "1A": "H", "1B": "J", "1D": "B", "1E": "C", "1G": "I", "1I": "G", "1K": "L", "1L": "K" }
  },
  {
    option: 83,
    qualifiedGroups: ["B","C","F","H","I","J","K","L"],
    vs: { "1A": "H", "1B": "J", "1D": "B", "1E": "C", "1G": "I", "1I": "F", "1K": "L", "1L": "K" }
  },
  {
    option: 84,
    qualifiedGroups: ["B","C","F","G","I","J","K","L"],
    vs: { "1A": "I", "1B": "G", "1D": "B", "1E": "C", "1G": "J", "1I": "F", "1K": "L", "1L": "K" }
  },
  {
    option: 85,
    qualifiedGroups: ["B","C","F","G","H","J","K","L"],
    vs: { "1A": "H", "1B": "G", "1D": "B", "1E": "C", "1G": "J", "1I": "F", "1K": "L", "1L": "K" }
  },
  {
    option: 86,
    qualifiedGroups: ["B","C","F","G","H","I","K","L"],
    vs: { "1A": "H", "1B": "G", "1D": "B", "1E": "C", "1G": "I", "1I": "F", "1K": "L", "1L": "K" }
  },
  {
    option: 87,
    qualifiedGroups: ["B","C","F","G","H","I","J","L"],
    vs: { "1A": "H", "1B": "G", "1D": "B", "1E": "C", "1G": "J", "1I": "F", "1K": "L", "1L": "I" }
  },
  {
    option: 88,
    qualifiedGroups: ["B","C","F","G","H","I","J","K"],
    vs: { "1A": "H", "1B": "G", "1D": "B", "1E": "C", "1G": "J", "1I": "F", "1K": "I", "1L": "K" }
  },
  {
    option: 89,
    qualifiedGroups: ["B","C","E","H","I","J","K","L"],
    vs: { "1A": "E", "1B": "J", "1D": "B", "1E": "C", "1G": "I", "1I": "H", "1K": "L", "1L": "K" }
  },
  {
    option: 90,
    qualifiedGroups: ["B","C","E","G","I","J","K","L"],
    vs: { "1A": "E", "1B": "J", "1D": "B", "1E": "C", "1G": "I", "1I": "G", "1K": "L", "1L": "K" }
  },
  {
    option: 91,
    qualifiedGroups: ["B","C","E","G","H","J","K","L"],
    vs: { "1A": "E", "1B": "J", "1D": "B", "1E": "C", "1G": "H", "1I": "G", "1K": "L", "1L": "K" }
  },
  {
    option: 92,
    qualifiedGroups: ["B","C","E","G","H","I","K","L"],
    vs: { "1A": "E", "1B": "G", "1D": "B", "1E": "C", "1G": "I", "1I": "H", "1K": "L", "1L": "K" }
  },
  {
    option: 93,
    qualifiedGroups: ["B","C","E","G","H","I","J","L"],
    vs: { "1A": "E", "1B": "J", "1D": "B", "1E": "C", "1G": "H", "1I": "G", "1K": "L", "1L": "I" }
  },
  {
    option: 94,
    qualifiedGroups: ["B","C","E","G","H","I","J","K"],
    vs: { "1A": "E", "1B": "J", "1D": "B", "1E": "C", "1G": "H", "1I": "G", "1K": "I", "1L": "K" }
  },
  {
    option: 95,
    qualifiedGroups: ["B","C","E","F","I","J","K","L"],
    vs: { "1A": "E", "1B": "J", "1D": "B", "1E": "C", "1G": "I", "1I": "F", "1K": "L", "1L": "K" }
  },
  {
    option: 96,
    qualifiedGroups: ["B","C","E","F","H","J","K","L"],
    vs: { "1A": "E", "1B": "J", "1D": "B", "1E": "C", "1G": "H", "1I": "F", "1K": "L", "1L": "K" }
  },
  {
    option: 97,
    qualifiedGroups: ["B","C","E","F","H","I","K","L"],
    vs: { "1A": "E", "1B": "I", "1D": "B", "1E": "C", "1G": "H", "1I": "F", "1K": "L", "1L": "K" }
  },
  {
    option: 98,
    qualifiedGroups: ["B","C","E","F","H","I","J","L"],
    vs: { "1A": "E", "1B": "J", "1D": "B", "1E": "C", "1G": "H", "1I": "F", "1K": "L", "1L": "I" }
  },
  {
    option: 99,
    qualifiedGroups: ["B","C","E","F","H","I","J","K"],
    vs: { "1A": "E", "1B": "J", "1D": "B", "1E": "C", "1G": "H", "1I": "F", "1K": "I", "1L": "K" }
  },
  {
    option: 100,
    qualifiedGroups: ["B","C","E","F","G","J","K","L"],
    vs: { "1A": "E", "1B": "G", "1D": "B", "1E": "C", "1G": "J", "1I": "F", "1K": "L", "1L": "K" }
  },
  {
    option: 101,
    qualifiedGroups: ["B","C","E","F","G","I","K","L"],
    vs: { "1A": "E", "1B": "G", "1D": "B", "1E": "C", "1G": "I", "1I": "F", "1K": "L", "1L": "K" }
  },
  {
    option: 102,
    qualifiedGroups: ["B","C","E","F","G","I","J","L"],
    vs: { "1A": "E", "1B": "G", "1D": "B", "1E": "C", "1G": "J", "1I": "F", "1K": "L", "1L": "I" }
  },
  {
    option: 103,
    qualifiedGroups: ["B","C","E","F","G","I","J","K"],
    vs: { "1A": "E", "1B": "G", "1D": "B", "1E": "C", "1G": "J", "1I": "F", "1K": "I", "1L": "K" }
  },
  {
    option: 104,
    qualifiedGroups: ["B","C","E","F","G","H","K","L"],
    vs: { "1A": "E", "1B": "G", "1D": "B", "1E": "C", "1G": "H", "1I": "F", "1K": "L", "1L": "K" }
  },
  {
    option: 105,
    qualifiedGroups: ["B","C","E","F","G","H","J","L"],
    vs: { "1A": "H", "1B": "G", "1D": "B", "1E": "C", "1G": "J", "1I": "F", "1K": "L", "1L": "E" }
  },
  {
    option: 106,
    qualifiedGroups: ["B","C","E","F","G","H","J","K"],
    vs: { "1A": "H", "1B": "G", "1D": "B", "1E": "C", "1G": "J", "1I": "F", "1K": "E", "1L": "K" }
  },
  {
    option: 107,
    qualifiedGroups: ["B","C","E","F","G","H","I","L"],
    vs: { "1A": "E", "1B": "G", "1D": "B", "1E": "C", "1G": "H", "1I": "F", "1K": "L", "1L": "I" }
  },
  {
    option: 108,
    qualifiedGroups: ["B","C","E","F","G","H","I","K"],
    vs: { "1A": "E", "1B": "G", "1D": "B", "1E": "C", "1G": "H", "1I": "F", "1K": "I", "1L": "K" }
  },
  {
    option: 109,
    qualifiedGroups: ["B","C","E","F","G","H","I","J"],
    vs: { "1A": "H", "1B": "G", "1D": "B", "1E": "C", "1G": "J", "1I": "F", "1K": "E", "1L": "I" }
  },
  {
    option: 110,
    qualifiedGroups: ["B","C","D","F","G","I","J","K"],
    vs: { "1A": "H", "1B": "J", "1D": "B", "1E": "C", "1G": "I", "1I": "D", "1K": "L", "1L": "K" }
  },
  {
    option: 111,
    qualifiedGroups: ["B","C","D","F","G","I","J","K"],
    vs: { "1A": "I", "1B": "G", "1D": "B", "1E": "C", "1G": "J", "1I": "D", "1K": "L", "1L": "K" }
  },
  {
    option: 112,
    qualifiedGroups: ["B","C","D","F","G","H","J","K"],
    vs: { "1A": "H", "1B": "G", "1D": "B", "1E": "C", "1G": "J", "1I": "D", "1K": "L", "1L": "K" }
  },
  {
    option: 113,
    qualifiedGroups: ["B","C","D","F","G","H","I","K"],
    vs: { "1A": "H", "1B": "G", "1D": "B", "1E": "C", "1G": "I", "1I": "D", "1K": "L", "1L": "K" }
  },
  {
    option: 114,
    qualifiedGroups: ["B","C","D","F","G","H","I","J"],
    vs: { "1A": "H", "1B": "G", "1D": "B", "1E": "C", "1G": "J", "1I": "D", "1K": "L", "1L": "I" }
  },
  {
    option: 115,
    qualifiedGroups: ["B","C","D","F","G","H","I","J"],
    vs: { "1A": "H", "1B": "G", "1D": "B", "1E": "C", "1G": "J", "1I": "D", "1K": "I", "1L": "K" }
  },
  {
    option: 116,
    qualifiedGroups: ["B","C","D","F","G","I","J","K"],
    vs: { "1A": "C", "1B": "J", "1D": "B", "1E": "D", "1G": "I", "1I": "F", "1K": "L", "1L": "K" }
  },
  {
    option: 117,
    qualifiedGroups: ["B","C","D","F","G","H","J","K"],
    vs: { "1A": "C", "1B": "J", "1D": "B", "1E": "D", "1G": "H", "1I": "F", "1K": "L", "1L": "K" }
  },
  {
    option: 118,
    qualifiedGroups: ["B","C","D","F","G","H","I","K"],
    vs: { "1A": "C", "1B": "I", "1D": "B", "1E": "D", "1G": "H", "1I": "F", "1K": "L", "1L": "K" }
  },
  {
    option: 119,
    qualifiedGroups: ["B","C","D","F","G","H","I","J"],
    vs: { "1A": "C", "1B": "J", "1D": "B", "1E": "D", "1G": "H", "1I": "F", "1K": "L", "1L": "I" }
  },
  {
    option: 120,
    qualifiedGroups: ["B","C","D","F","G","H","I","J"],
    vs: { "1A": "C", "1B": "J", "1D": "B", "1E": "D", "1G": "H", "1I": "F", "1K": "I", "1L": "K" }
  },
  {
    option: 121,
    qualifiedGroups: ["B","C","D","F","G","I","J","K"],
    vs: { "1A": "C", "1B": "G", "1D": "B", "1E": "D", "1G": "J", "1I": "F", "1K": "L", "1L": "K" }
  },
  {
    option: 122,
    qualifiedGroups: ["B","C","D","F","G","I","J","K"],
    vs: { "1A": "C", "1B": "G", "1D": "B", "1E": "D", "1G": "I", "1I": "F", "1K": "L", "1L": "K" }
  },
  {
    option: 123,
    qualifiedGroups: ["B","C","D","F","G","I","J","L"],
    vs: { "1A": "C", "1B": "G", "1D": "B", "1E": "D", "1G": "J", "1I": "F", "1K": "L", "1L": "I" }
  },
  {
    option: 124,
    qualifiedGroups: ["B","C","D","F","G","I","J","K"],
    vs: { "1A": "C", "1B": "G", "1D": "B", "1E": "D", "1G": "J", "1I": "F", "1K": "I", "1L": "K" }
  },
  {
    option: 125,
    qualifiedGroups: ["B","C","D","F","G","H","K","L"],
    vs: { "1A": "C", "1B": "G", "1D": "B", "1E": "D", "1G": "H", "1I": "F", "1K": "L", "1L": "K" }
  },
  {
    option: 126,
    qualifiedGroups: ["B","C","D","F","G","H","J","L"],
    vs: { "1A": "C", "1B": "G", "1D": "B", "1E": "D", "1G": "H", "1I": "F", "1K": "L", "1L": "J" }
  },
  {
    option: 127,
    qualifiedGroups: ["B","C","D","F","G","H","J","K"],
    vs: { "1A": "H", "1B": "G", "1D": "B", "1E": "C", "1G": "J", "1I": "F", "1K": "D", "1L": "K" }
  },
  {
    option: 128,
    qualifiedGroups: ["B","C","D","F","G","H","I","L"],
    vs: { "1A": "C", "1B": "G", "1D": "B", "1E": "D", "1G": "H", "1I": "F", "1K": "L", "1L": "I" }
  },
  {
    option: 129,
    qualifiedGroups: ["B","C","D","F","G","H","I","K"],
    vs: { "1A": "C", "1B": "G", "1D": "B", "1E": "D", "1G": "H", "1I": "F", "1K": "I", "1L": "K" }
  },
  {
    option: 130,
    qualifiedGroups: ["B","C","D","F","G","H","I","J"],
    vs: { "1A": "H", "1B": "G", "1D": "B", "1E": "C", "1G": "J", "1I": "F", "1K": "D", "1L": "I" }
  },
  {
    option: 131,
    qualifiedGroups: ["B","C","D","E","I","J","K","L"],
    vs: { "1A": "E", "1B": "J", "1D": "B", "1E": "C", "1G": "I", "1I": "D", "1K": "L", "1L": "K" }
  },
  {
    option: 132,
    qualifiedGroups: ["B","C","D","E","H","J","K","L"],
    vs: { "1A": "E", "1B": "J", "1D": "B", "1E": "C", "1G": "H", "1I": "D", "1K": "L", "1L": "K" }
  },
  {
    option: 133,
    qualifiedGroups: ["B","C","D","E","H","I","K","L"],
    vs: { "1A": "E", "1B": "I", "1D": "B", "1E": "C", "1G": "H", "1I": "D", "1K": "L", "1L": "K" }
  },
  {
    option: 134,
    qualifiedGroups: ["B","C","D","E","H","I","J","L"],
    vs: { "1A": "E", "1B": "J", "1D": "B", "1E": "C", "1G": "H", "1I": "D", "1K": "L", "1L": "I" }
  },
  {
    option: 135,
    qualifiedGroups: ["B","C","D","E","H","I","J","K"],
    vs: { "1A": "E", "1B": "J", "1D": "B", "1E": "C", "1G": "H", "1I": "D", "1K": "I", "1L": "K" }
  },
  {
    option: 136,
    qualifiedGroups: ["B","C","D","E","G","J","K","L"],
    vs: { "1A": "E", "1B": "G", "1D": "B", "1E": "C", "1G": "J", "1I": "D", "1K": "L", "1L": "K" }
  },
  {
    option: 137,
    qualifiedGroups: ["B","C","D","E","G","I","K","L"],
    vs: { "1A": "E", "1B": "G", "1D": "B", "1E": "C", "1G": "I", "1I": "D", "1K": "L", "1L": "K" }
  },
  {
    option: 138,
    qualifiedGroups: ["B","C","D","E","G","I","J","L"],
    vs: { "1A": "E", "1B": "G", "1D": "B", "1E": "C", "1G": "J", "1I": "D", "1K": "L", "1L": "I" }
  },
  {
    option: 139,
    qualifiedGroups: ["B","C","D","E","G","I","J","K"],
    vs: { "1A": "E", "1B": "G", "1D": "B", "1E": "C", "1G": "J", "1I": "D", "1K": "I", "1L": "K" }
  },
  {
    option: 140,
    qualifiedGroups: ["B","C","D","E","G","H","K","L"],
    vs: { "1A": "E", "1B": "G", "1D": "B", "1E": "C", "1G": "H", "1I": "D", "1K": "L", "1L": "K" }
  },
  {
    option: 141,
    qualifiedGroups: ["B","C","D","E","G","H","J","L"],
    vs: { "1A": "H", "1B": "G", "1D": "B", "1E": "C", "1G": "J", "1I": "D", "1K": "L", "1L": "E" }
  },
  {
    option: 142,
    qualifiedGroups: ["B","C","D","E","G","H","J","K"],
    vs: { "1A": "H", "1B": "G", "1D": "B", "1E": "C", "1G": "J", "1I": "D", "1K": "E", "1L": "K" }
  },
  {
    option: 143,
    qualifiedGroups: ["B","C","D","E","G","H","I","L"],
    vs: { "1A": "E", "1B": "G", "1D": "B", "1E": "C", "1G": "H", "1I": "D", "1K": "L", "1L": "I" }
  },
  {
    option: 144,
    qualifiedGroups: ["B","C","D","E","G","H","I","K"],
    vs: { "1A": "E", "1B": "G", "1D": "B", "1E": "C", "1G": "H", "1I": "D", "1K": "I", "1L": "K" }
  },
  {
    option: 145,
    qualifiedGroups: ["B","C","D","E","G","H","I","J"],
    vs: { "1A": "H", "1B": "G", "1D": "B", "1E": "C", "1G": "J", "1I": "D", "1K": "E", "1L": "I" }
  },
  {
    option: 146,
    qualifiedGroups: ["B","C","D","E","F","G","J","K"],
    vs: { "1A": "C", "1B": "J", "1D": "B", "1E": "D", "1G": "E", "1I": "F", "1K": "L", "1L": "K" }
  },
  {
    option: 147,
    qualifiedGroups: ["B","C","D","E","F","G","I","K"],
    vs: { "1A": "C", "1B": "E", "1D": "B", "1E": "D", "1G": "I", "1I": "F", "1K": "L", "1L": "K" }
  },
  {
    option: 148,
    qualifiedGroups: ["B","C","D","E","F","G","I","J","L"],
    vs: { "1A": "C", "1B": "J", "1D": "B", "1E": "D", "1G": "E", "1I": "F", "1K": "L", "1L": "I" }
  },
  {
    option: 149,
    qualifiedGroups: ["B","C","D","E","F","G","I","J","K"],
    vs: { "1A": "C", "1B": "J", "1D": "B", "1E": "D", "1G": "E", "1I": "F", "1K": "I", "1L": "K" }
  },
  {
    option: 150,
    qualifiedGroups: ["B","C","D","E","F","G","H","K","L"],
    vs: { "1A": "C", "1B": "E", "1D": "B", "1E": "D", "1G": "H", "1I": "F", "1K": "L", "1L": "K" }
  },
  {
    option: 151,
    qualifiedGroups: ["B","C","D","E","F","H","J","L"],
    vs: { "1A": "C", "1B": "J", "1D": "B", "1E": "D", "1G": "H", "1I": "F", "1K": "L", "1L": "E" }
  },
  {
    option: 152,
    qualifiedGroups: ["B","C","D","E","F","H","J","K"],
    vs: { "1A": "C", "1B": "J", "1D": "B", "1E": "D", "1G": "H", "1I": "F", "1K": "E", "1L": "K" }
  },
  {
    option: 153,
    qualifiedGroups: ["B","C","D","E","F","H","I","L"],
    vs: { "1A": "C", "1B": "E", "1D": "B", "1E": "D", "1G": "H", "1I": "F", "1K": "L", "1L": "I" }
  },
  {
    option: 154,
    qualifiedGroups: ["B","C","D","E","F","H","I","K"],
    vs: { "1A": "C", "1B": "E", "1D": "B", "1E": "D", "1G": "H", "1I": "F", "1K": "I", "1L": "K" }
  },
  {
    option: 155,
    qualifiedGroups: ["B","C","D","E","F","H","I","J"],
    vs: { "1A": "C", "1B": "J", "1D": "B", "1E": "D", "1G": "H", "1I": "F", "1K": "E", "1L": "I" }
  },
  {
    option: 156,
    qualifiedGroups: ["B","C","D","E","F","G","K","L"],
    vs: { "1A": "C", "1B": "G", "1D": "B", "1E": "D", "1G": "E", "1I": "F", "1K": "L", "1L": "K" }
  },
  {
    option: 157,
    qualifiedGroups: ["B","C","D","E","F","G","J","L"],
    vs: { "1A": "C", "1B": "G", "1D": "B", "1E": "D", "1G": "J", "1I": "F", "1K": "L", "1L": "E" }
  },
  {
    option: 158,
    qualifiedGroups: ["B","C","D","E","F","G","J","K"],
    vs: { "1A": "C", "1B": "G", "1D": "B", "1E": "D", "1G": "J", "1I": "F", "1K": "E", "1L": "K" }
  },
  {
    option: 159,
    qualifiedGroups: ["B","C","D","E","F","G","I","L"],
    vs: { "1A": "C", "1B": "G", "1D": "B", "1E": "D", "1G": "E", "1I": "F", "1K": "L", "1L": "I" }
  },
  {
    option: 160,
    qualifiedGroups: ["B","C","D","E","F","G","I","K"],
    vs: { "1A": "C", "1B": "G", "1D": "B", "1E": "D", "1G": "E", "1I": "F", "1K": "I", "1L": "K" }
  },
  {
    option: 161,
    qualifiedGroups: ["B","C","D","E","F","G","I","J"],
    vs: { "1A": "C", "1B": "G", "1D": "B", "1E": "D", "1G": "J", "1I": "F", "1K": "E", "1L": "I" }
  },
  {
    option: 162,
    qualifiedGroups: ["B","C","D","E","F","G","H","L"],
    vs: { "1A": "C", "1B": "G", "1D": "B", "1E": "D", "1G": "H", "1I": "F", "1K": "L", "1L": "E" }
  },
  {
    option: 163,
    qualifiedGroups: ["B","C","D","E","F","G","H","K"],
    vs: { "1A": "C", "1B": "G", "1D": "B", "1E": "D", "1G": "H", "1I": "F", "1K": "E", "1L": "K" }
  },
  {
    option: 164,
    qualifiedGroups: ["B","C","D","E","F","G","H","J"],
    vs: { "1A": "H", "1B": "G", "1D": "B", "1E": "C", "1G": "J", "1I": "F", "1K": "D", "1L": "E" }
  },
  {
    option: 165,
    qualifiedGroups: ["B","C","D","E","F","G","H","I"],
    vs: { "1A": "C", "1B": "G", "1D": "B", "1E": "D", "1G": "H", "1I": "F", "1K": "E", "1L": "I" }
  },
  {
    option: 166,
    qualifiedGroups: ["A","F","G","H","I","J","K","L"],
    vs: { "1A": "H", "1B": "J", "1D": "I", "1E": "F", "1G": "A", "1I": "G", "1K": "L", "1L": "K" }
  },
  {
    option: 167,
    qualifiedGroups: ["A","E","G","H","I","J","K","L"],
    vs: { "1A": "E", "1B": "J", "1D": "I", "1E": "A", "1G": "H", "1I": "G", "1K": "L", "1L": "K" }
  },
  {
    option: 168,
    qualifiedGroups: ["A","E","F","H","I","J","K","L"],
    vs: { "1A": "E", "1B": "J", "1D": "I", "1E": "F", "1G": "A", "1I": "H", "1K": "L", "1L": "K" }
  },
  {
    option: 169,
    qualifiedGroups: ["A","E","F","G","I","J","K","L"],
    vs: { "1A": "E", "1B": "J", "1D": "I", "1E": "F", "1G": "A", "1I": "G", "1K": "L", "1L": "K" }
  },
  {
    option: 170,
    qualifiedGroups: ["A","E","F","G","H","J","K","L"],
    vs: { "1A": "E", "1B": "G", "1D": "J", "1E": "F", "1G": "A", "1I": "H", "1K": "L", "1L": "K" }
  },
  {
    option: 171,
    qualifiedGroups: ["A","E","F","G","H","I","K","L"],
    vs: { "1A": "E", "1B": "G", "1D": "I", "1E": "F", "1G": "A", "1I": "H", "1K": "L", "1L": "K" }
  },
  {
    option: 172,
    qualifiedGroups: ["A","E","F","G","H","I","J","L"],
    vs: { "1A": "E", "1B": "G", "1D": "J", "1E": "F", "1G": "A", "1I": "H", "1K": "L", "1L": "I" }
  },
  {
    option: 173,
    qualifiedGroups: ["A","E","F","G","H","I","J","K"],
    vs: { "1A": "E", "1B": "G", "1D": "J", "1E": "F", "1G": "A", "1I": "H", "1K": "I", "1L": "K" }
  },
  {
    option: 174,
    qualifiedGroups: ["A","D","G","H","I","J","K","L"],
    vs: { "1A": "H", "1B": "J", "1D": "I", "1E": "D", "1G": "A", "1I": "G", "1K": "L", "1L": "K" }
  },
  {
    option: 175,
    qualifiedGroups: ["A","D","F","H","I","J","K","L"],
    vs: { "1A": "H", "1B": "J", "1D": "I", "1E": "D", "1G": "A", "1I": "F", "1K": "L", "1L": "K" }
  },
  {
    option: 176,
    qualifiedGroups: ["A","D","F","G","I","J","K","L"],
    vs: { "1A": "I", "1B": "G", "1D": "J", "1E": "D", "1G": "A", "1I": "F", "1K": "L", "1L": "K" }
  },
  {
    option: 177,
    qualifiedGroups: ["A","D","F","G","H","J","K","L"],
    vs: { "1A": "H", "1B": "G", "1D": "J", "1E": "D", "1G": "A", "1I": "F", "1K": "L", "1L": "K" }
  },
  {
    option: 178,
    qualifiedGroups: ["A","D","F","G","H","I","K","L"],
    vs: { "1A": "H", "1B": "G", "1D": "I", "1E": "D", "1G": "A", "1I": "F", "1K": "L", "1L": "K" }
  },
  {
    option: 179,
    qualifiedGroups: ["A","D","F","G","H","I","J","L"],
    vs: { "1A": "H", "1B": "G", "1D": "J", "1E": "D", "1G": "A", "1I": "F", "1K": "L", "1L": "I" }
  },
  {
    option: 180,
    qualifiedGroups: ["A","D","F","G","H","I","J","K"],
    vs: { "1A": "H", "1B": "G", "1D": "J", "1E": "D", "1G": "A", "1I": "F", "1K": "I", "1L": "K" }
  },
  {
    option: 181,
    qualifiedGroups: ["A","D","E","H","I","J","K","L"],
    vs: { "1A": "E", "1B": "J", "1D": "I", "1E": "D", "1G": "A", "1I": "H", "1K": "L", "1L": "K" }
  },
  {
    option: 182,
    qualifiedGroups: ["A","D","E","G","I","J","K","L"],
    vs: { "1A": "E", "1B": "J", "1D": "I", "1E": "D", "1G": "A", "1I": "G", "1K": "L", "1L": "K" }
  },
  {
    option: 183,
    qualifiedGroups: ["A","D","E","G","H","J","K","L"],
    vs: { "1A": "E", "1B": "G", "1D": "J", "1E": "D", "1G": "A", "1I": "H", "1K": "L", "1L": "K" }
  },
  {
    option: 184,
    qualifiedGroups: ["A","D","E","G","H","I","K","L"],
    vs: { "1A": "E", "1B": "G", "1D": "I", "1E": "D", "1G": "A", "1I": "H", "1K": "L", "1L": "K" }
  },
  {
    option: 185,
    qualifiedGroups: ["A","D","E","G","H","I","J","L"],
    vs: { "1A": "E", "1B": "G", "1D": "J", "1E": "D", "1G": "A", "1I": "H", "1K": "L", "1L": "I" }
  },
  {
    option: 186,
    qualifiedGroups: ["A","D","E","G","H","I","J","K"],
    vs: { "1A": "E", "1B": "G", "1D": "J", "1E": "D", "1G": "A", "1I": "H", "1K": "I", "1L": "K" }
  },
  {
    option: 187,
    qualifiedGroups: ["A","D","E","F","I","J","K","L"],
    vs: { "1A": "E", "1B": "J", "1D": "I", "1E": "D", "1G": "A", "1I": "F", "1K": "L", "1L": "K" }
  },
  {
    option: 188,
    qualifiedGroups: ["A","D","E","F","H","J","K","L"],
    vs: { "1A": "H", "1B": "J", "1D": "E", "1E": "D", "1G": "A", "1I": "F", "1K": "L", "1L": "K" }
  },
  {
    option: 189,
    qualifiedGroups: ["A","D","E","F","H","I","K","L"],
    vs: { "1A": "H", "1B": "E", "1D": "I", "1E": "D", "1G": "A", "1I": "F", "1K": "L", "1L": "K" }
  },
  {
    option: 190,
    qualifiedGroups: ["A","D","E","F","H","I","J","L"],
    vs: { "1A": "H", "1B": "J", "1D": "E", "1E": "D", "1G": "A", "1I": "F", "1K": "L", "1L": "I" }
  },
  {
    option: 191,
    qualifiedGroups: ["A","D","E","F","H","I","J","K"],
    vs: { "1A": "H", "1B": "J", "1D": "E", "1E": "D", "1G": "A", "1I": "F", "1K": "I", "1L": "K" }
  },
  {
    option: 192,
    qualifiedGroups: ["A","D","E","F","G","J","K","L"],
    vs: { "1A": "E", "1B": "G", "1D": "J", "1E": "D", "1G": "A", "1I": "F", "1K": "L", "1L": "K" }
  },
  {
    option: 193,
    qualifiedGroups: ["A","D","E","F","G","I","K","L"],
    vs: { "1A": "E", "1B": "G", "1D": "I", "1E": "D", "1G": "A", "1I": "F", "1K": "L", "1L": "K" }
  },
  {
    option: 194,
    qualifiedGroups: ["A","D","E","F","G","I","J","L"],
    vs: { "1A": "E", "1B": "G", "1D": "J", "1E": "D", "1G": "A", "1I": "F", "1K": "L", "1L": "I" }
  },
  {
    option: 195,
    qualifiedGroups: ["A","D","E","F","G","I","J","K"],
    vs: { "1A": "E", "1B": "G", "1D": "J", "1E": "D", "1G": "A", "1I": "F", "1K": "I", "1L": "K" }
  },
  {
    option: 196,
    qualifiedGroups: ["A","D","E","F","G","H","K","L"],
    vs: { "1A": "H", "1B": "G", "1D": "E", "1E": "D", "1G": "A", "1I": "F", "1K": "L", "1L": "K" }
  },
  {
    option: 197,
    qualifiedGroups: ["A","D","E","F","G","H","J","L"],
    vs: { "1A": "H", "1B": "G", "1D": "J", "1E": "D", "1G": "A", "1I": "F", "1K": "L", "1L": "E" }
  },
  {
    option: 198,
    qualifiedGroups: ["A","D","E","F","G","H","J","K"],
    vs: { "1A": "H", "1B": "G", "1D": "J", "1E": "D", "1G": "A", "1I": "F", "1K": "E", "1L": "K" }
  },
  {
    option: 199,
    qualifiedGroups: ["A","D","E","F","G","H","I","L"],
    vs: { "1A": "H", "1B": "G", "1D": "E", "1E": "D", "1G": "A", "1I": "F", "1K": "L", "1L": "I" }
  },
  {
    option: 200,
    qualifiedGroups: ["A","D","E","F","G","H","I","K"],
    vs: { "1A": "H", "1B": "G", "1D": "E", "1E": "D", "1G": "A", "1I": "F", "1K": "I", "1L": "K" }
  },
  {
    option: 201,
    qualifiedGroups: ["A","D","E","F","G","H","I","J"],
    vs: { "1A":"H", "1B":"G", "1D":"J", "1E":"D", "1G":"A", "1I":"F", "1K":"E", "1L":"I" }
  },
  {
    option: 202,
    qualifiedGroups: ["A","C","G","H","I","J","K","L"],
    vs: { "1A":"H", "1B":"J", "1D":"I", "1E":"C", "1G":"A", "1I":"G", "1K":"L", "1L":"K" }
  },
  {
    option: 203,
    qualifiedGroups: ["A","C","F","H","I","J","K","L"],
    vs: { "1A":"H", "1B":"J", "1D":"I", "1E":"C", "1G":"A", "1I":"F", "1K":"L", "1L":"K" }
  },
  {
    option: 204,
    qualifiedGroups: ["A","C","F","G","I","J","K","L"],
    vs: { "1A":"I", "1B":"G", "1D":"J", "1E":"C", "1G":"A", "1I":"F", "1K":"L", "1L":"K" }
  },
  {
    option: 205,
    qualifiedGroups: ["A","C","F","G","H","J","K","L"],
    vs: { "1A":"H", "1B":"G", "1D":"J", "1E":"C", "1G":"A", "1I":"F", "1K":"L", "1L":"K" }
  },
  {
    option: 206,
    qualifiedGroups: ["A","C","F","G","H","I","K","L"],
    vs: { "1A":"H", "1B":"G", "1D":"I", "1E":"C", "1G":"A", "1I":"F", "1K":"L", "1L":"K" }
  },
  {
    option: 207,
    qualifiedGroups: ["A","C","F","G","H","I","J","L"],
    vs: { "1A":"H", "1B":"G", "1D":"J", "1E":"C", "1G":"A", "1I":"F", "1K":"L", "1L":"I" }
  },
  {
    option: 208,
    qualifiedGroups: ["A","C","F","G","H","I","J","K"],
    vs: { "1A":"H", "1B":"G", "1D":"J", "1E":"C", "1G":"A", "1I":"F", "1K":"I", "1L":"K" }
  },
  {
    option: 209,
    qualifiedGroups: ["A","C","E","H","I","J","K","L"],
    vs: { "1A":"E", "1B":"J", "1D":"I", "1E":"C", "1G":"A", "1I":"H", "1K":"L", "1L":"K" }
  },
  {
    option: 210,
    qualifiedGroups: ["A","C","E","G","I","J","K","L"],
    vs: { "1A":"E", "1B":"J", "1D":"I", "1E":"C", "1G":"A", "1I":"G", "1K":"L", "1L":"K" }
  },
  {
    option: 211,
    qualifiedGroups: ["A","C","E","G","H","J","K","L"],
    vs: { "1A":"E", "1B":"G", "1D":"J", "1E":"C", "1G":"A", "1I":"H", "1K":"L", "1L":"K" }
  },
  {
    option: 212,
    qualifiedGroups: ["A","C","E","G","H","I","K","L"],
    vs: { "1A":"E", "1B":"G", "1D":"I", "1E":"C", "1G":"A", "1I":"H", "1K":"L", "1L":"K" }
  },
  {
    option: 213,
    qualifiedGroups: ["A","C","E","G","H","I","J","L"],
    vs: { "1A":"E", "1B":"G", "1D":"J", "1E":"C", "1G":"A", "1I":"H", "1K":"L", "1L":"I" }
  },
  {
    option: 214,
    qualifiedGroups: ["A","C","E","G","H","I","J","K"],
    vs: { "1A":"E", "1B":"G", "1D":"J", "1E":"C", "1G":"A", "1I":"H", "1K":"I", "1L":"K" }
  },
  {
    option: 215,
    qualifiedGroups: ["A","C","E","F","I","J","K","L"],
    vs: { "1A":"E", "1B":"J", "1D":"I", "1E":"C", "1G":"A", "1I":"F", "1K":"L", "1L":"K" }
  },
  {
    option: 216,
    qualifiedGroups: ["A","C","E","F","H","J","K","L"],
    vs: { "1A":"H", "1B":"J", "1D":"E", "1E":"C", "1G":"A", "1I":"F", "1K":"L", "1L":"K" }
  },
  {
    option: 217,
    qualifiedGroups: ["A","C","E","F","H","I","K","L"],
    vs: { "1A":"H", "1B":"E", "1D":"I", "1E":"C", "1G":"A", "1I":"F", "1K":"L", "1L":"K" }
  },
  {
    option: 218,
    qualifiedGroups: ["A","C","E","F","H","I","J","L"],
    vs: { "1A":"H", "1B":"J", "1D":"E", "1E":"C", "1G":"A", "1I":"F", "1K":"L", "1L":"I" }
  },
  {
    option: 219,
    qualifiedGroups: ["A","C","E","F","H","I","J","K"],
    vs: { "1A":"H", "1B":"J", "1D":"E", "1E":"C", "1G":"A", "1I":"F", "1K":"I", "1L":"K" }
  },
  {
    option: 220,
    qualifiedGroups: ["A","C","E","F","G","J","K","L"],
    vs: { "1A":"E", "1B":"G", "1D":"J", "1E":"C", "1G":"A", "1I":"F", "1K":"L", "1L":"K" }
  },
  {
    option: 221,
    qualifiedGroups: ["A","C","E","F","G","I","K","L"],
    vs: { "1A":"E", "1B":"G", "1D":"I", "1E":"C", "1G":"A", "1I":"F", "1K":"L", "1L":"K" }
  },
  {
    option: 222,
    qualifiedGroups: ["A","C","E","F","G","I","J","L"],
    vs: { "1A":"E", "1B":"G", "1D":"J", "1E":"C", "1G":"A", "1I":"F", "1K":"L", "1L":"I" }
  },
  {
    option: 223,
    qualifiedGroups: ["A","C","E","F","G","I","J","K"],
    vs: { "1A":"E", "1B":"G", "1D":"J", "1E":"C", "1G":"A", "1I":"F", "1K":"I", "1L":"K" }
  },
  {
    option: 224,
    qualifiedGroups: ["A","C","E","F","G","H","K","L"],
    vs: { "1A":"H", "1B":"G", "1D":"E", "1E":"C", "1G":"A", "1I":"F", "1K":"L", "1L":"K" }
  },
  {
    option: 225,
    qualifiedGroups: ["A","C","E","F","G","H","J","L"],
    vs: { "1A":"H", "1B":"G", "1D":"J", "1E":"C", "1G":"A", "1I":"F", "1K":"L", "1L":"E" }
  },
  {
    option: 226,
    qualifiedGroups: ["A","C","E","F","G","H","J","K"],
    vs: { "1A":"H", "1B":"G", "1D":"J", "1E":"C", "1G":"A", "1I":"F", "1K":"E", "1L":"K" }
  },
  {
    option: 227,
    qualifiedGroups: ["A","C","E","F","G","H","I","L"],
    vs: { "1A":"H", "1B":"G", "1D":"E", "1E":"C", "1G":"A", "1I":"F", "1K":"L", "1L":"I" }
  },
  {
    option: 228,
    qualifiedGroups: ["A","C","E","F","G","H","I","K"],
    vs: { "1A":"H", "1B":"G", "1D":"E", "1E":"C", "1G":"A", "1I":"F", "1K":"I", "1L":"K" }
  },
  {
    option: 229,
    qualifiedGroups: ["A","C","E","F","G","H","I","J"],
    vs: { "1A":"H", "1B":"G", "1D":"J", "1E":"C", "1G":"A", "1I":"F", "1K":"E", "1L":"I" }
  },
  {
    option: 230,
    qualifiedGroups: ["A","C","D","H","I","J","K","L"],
    vs: { "1A":"H", "1B":"J", "1D":"I", "1E":"C", "1G":"A", "1I":"D", "1K":"L", "1L":"K" }
  },
  {
    option: 231,
    qualifiedGroups: ["A","C","D","G","I","J","K","L"],
    vs: { "1A":"I", "1B":"G", "1D":"J", "1E":"C", "1G":"A", "1I":"D", "1K":"L", "1L":"K" }
  },
  {
    option: 232,
    qualifiedGroups: ["A","C","D","G","H","J","K","L"],
    vs: { "1A":"H", "1B":"G", "1D":"J", "1E":"C", "1G":"A", "1I":"D", "1K":"L", "1L":"K" }
  },
  {
    option: 233,
    qualifiedGroups: ["A","C","D","G","H","I","K","L"],
    vs: { "1A":"H", "1B":"G", "1D":"I", "1E":"C", "1G":"A", "1I":"D", "1K":"L", "1L":"K" }
  },
  {
    option: 234,
    qualifiedGroups: ["A","C","D","G","H","I","J","L"],
    vs: { "1A":"H", "1B":"G", "1D":"J", "1E":"C", "1G":"A", "1I":"D", "1K":"L", "1L":"I" }
  },
  {
    option: 235,
    qualifiedGroups: ["A","C","D","G","H","I","J","K"],
    vs: { "1A":"H", "1B":"G", "1D":"J", "1E":"C", "1G":"A", "1I":"D", "1K":"I", "1L":"K" }
  },
  {
    option: 236,
    qualifiedGroups: ["A","C","D","F","I","J","K","L"],
    vs: { "1A":"C", "1B":"J", "1D":"I", "1E":"D", "1G":"A", "1I":"F", "1K":"L", "1L":"K" }
  },
  {
    option: 237,
    qualifiedGroups: ["A","C","D","F","H","J","K","L"],
    vs: { "1A":"H", "1B":"J", "1D":"F", "1E":"C", "1G":"A", "1I":"D", "1K":"L", "1L":"K" }
  },
  {
    option: 238,
    qualifiedGroups: ["A","C","D","F","H","I","K","L"],
    vs: { "1A":"H", "1B":"F", "1D":"I", "1E":"C", "1G":"A", "1I":"D", "1K":"L", "1L":"K" }
  },
  {
    option: 239,
    qualifiedGroups: ["A","C","D","F","H","I","J","L"],
    vs: { "1A":"H", "1B":"J", "1D":"F", "1E":"C", "1G":"A", "1I":"D", "1K":"L", "1L":"I" }
  },
  {
    option: 240,
    qualifiedGroups: ["A","C","D","F","H","I","J","K"],
    vs: { "1A":"H", "1B":"J", "1D":"F", "1E":"C", "1G":"A", "1I":"D", "1K":"I", "1L":"K" }
  },
  {
    option: 241,
    qualifiedGroups: ["A","C","D","F","G","J","K","L"],
    vs: { "1A":"C", "1B":"G", "1D":"J", "1E":"D", "1G":"A", "1I":"F", "1K":"L", "1L":"K" }
  },
  {
    option: 242,
    qualifiedGroups: ["A","C","D","F","G","I","K","L"],
    vs: { "1A":"C", "1B":"G", "1D":"I", "1E":"D", "1G":"A", "1I":"F", "1K":"L", "1L":"K" }
  },
  {
    option: 243,
    qualifiedGroups: ["A","C","D","F","G","I","J","L"],
    vs: { "1A":"C", "1B":"G", "1D":"J", "1E":"D", "1G":"A", "1I":"F", "1K":"L", "1L":"I" }
  },
  {
    option: 244,
    qualifiedGroups: ["A","C","D","F","G","I","J","K"],
    vs: { "1A":"C", "1B":"G", "1D":"J", "1E":"D", "1G":"A", "1I":"F", "1K":"I", "1L":"K" }
  },
  {
    option: 245,
    qualifiedGroups: ["A","C","D","F","G","H","K","L"],
    vs: { "1A":"H", "1B":"G", "1D":"F", "1E":"C", "1G":"A", "1I":"D", "1K":"L", "1L":"K" }
  },
  {
    option: 246,
    qualifiedGroups: ["A","C","D","F","G","H","J","L"],
    vs: { "1A":"C", "1B":"G", "1D":"J", "1E":"D", "1G":"A", "1I":"F", "1K":"L", "1L":"H" }
  },
  {
    option: 247,
    qualifiedGroups: ["A","C","D","F","G","H","J","K"],
    vs: { "1A":"H", "1B":"G", "1D":"J", "1E":"C", "1G":"A", "1I":"F", "1K":"D", "1L":"K" }
  },
  {
    option: 248,
    qualifiedGroups: ["A","C","D","F","G","H","I","L"],
    vs: { "1A":"H", "1B":"G", "1D":"F", "1E":"C", "1G":"A", "1I":"D", "1K":"L", "1L":"I" }
  },
  {
    option: 249,
    qualifiedGroups: ["A","C","D","F","G","H","I","K"],
    vs: { "1A":"H", "1B":"G", "1D":"F", "1E":"C", "1G":"A", "1I":"D", "1K":"I", "1L":"K" }
  },
  {
    option: 250,
    qualifiedGroups: ["A","C","D","F","G","H","I","J"],
    vs: { "1A":"H", "1B":"G", "1D":"J", "1E":"C", "1G":"A", "1I":"F", "1K":"D", "1L":"I" }
  },
  {
    option: 251,
    qualifiedGroups: ["A","C","D","E","I","J","K","L"],
    vs: { "1A":"E", "1B":"J", "1D":"I", "1E":"C", "1G":"A", "1I":"D", "1K":"L", "1L":"K" }
  },
  {
    option: 252,
    qualifiedGroups: ["A","C","D","E","H","J","K","L"],
    vs: { "1A":"H", "1B":"J", "1D":"E", "1E":"C", "1G":"A", "1I":"D", "1K":"L", "1L":"K" }
  },
  {
    option: 253,
    qualifiedGroups: ["A","C","D","E","H","I","K","L"],
    vs: { "1A":"H", "1B":"E", "1D":"I", "1E":"C", "1G":"A", "1I":"D", "1K":"L", "1L":"K" }
  },
  {
    option: 254,
    qualifiedGroups: ["A","C","D","E","H","I","J","L"],
    vs: { "1A":"H", "1B":"J", "1D":"E", "1E":"C", "1G":"A", "1I":"D", "1K":"L", "1L":"I" }
  },
  {
    option: 255,
    qualifiedGroups: ["A","C","D","E","H","I","J","K"],
    vs: { "1A":"H", "1B":"J", "1D":"E", "1E":"C", "1G":"A", "1I":"D", "1K":"I", "1L":"K" }
  },
  {
    option: 256,
    qualifiedGroups: ["A","C","D","E","G","J","K","L"],
    vs: { "1A":"E", "1B":"G", "1D":"J", "1E":"C", "1G":"A", "1I":"D", "1K":"L", "1L":"K" }
  },
  {
    option: 257,
    qualifiedGroups: ["A","C","D","E","G","I","K","L"],
    vs: { "1A":"E", "1B":"G", "1D":"I", "1E":"C", "1G":"A", "1I":"D", "1K":"L", "1L":"K" }
  },
  {
    option: 258,
    qualifiedGroups: ["A","C","D","E","G","I","J","L"],
    vs: { "1A":"E", "1B":"G", "1D":"J", "1E":"C", "1G":"A", "1I":"D", "1K":"L", "1L":"I" }
  },
  {
    option: 259,
    qualifiedGroups: ["A","C","D","E","G","I","J","K"],
    vs: { "1A":"E", "1B":"G", "1D":"J", "1E":"C", "1G":"A", "1I":"D", "1K":"I", "1L":"K" }
  },
  {
    option: 260,
    qualifiedGroups: ["A","C","D","E","F","G","H","L"],
    vs: { "1A":"H", "1B":"G", "1D":"E", "1E":"C", "1G":"A", "1I":"D", "1K":"L", "1L":"K" }
  },
  {
    option: 261,
    qualifiedGroups: ["A","C","D","E","F","G","H","J"],
    vs: { "1A":"H", "1B":"G", "1D":"J", "1E":"C", "1G":"A", "1I":"D", "1K":"L", "1L":"E" }
  },
  {
    option: 262,
    qualifiedGroups: ["A","C","D","E","F","G","H","J","K"],
    vs: { "1A":"H", "1B":"G", "1D":"J", "1E":"C", "1G":"A", "1I":"D", "1K":"E", "1L":"K" }
  },
  {
    option: 263,
    qualifiedGroups: ["A","C","D","E","F","G","H","I","L"],
    vs: { "1A":"H", "1B":"G", "1D":"E", "1E":"C", "1G":"A", "1I":"D", "1K":"L", "1L":"I" }
  },
  {
    option: 264,
    qualifiedGroups: ["A","C","D","E","F","G","H","I","K"],
    vs: { "1A":"H", "1B":"G", "1D":"E", "1E":"C", "1G":"A", "1I":"D", "1K":"I", "1L":"K" }
  },
  {
    option: 265,
    qualifiedGroups: ["A","C","D","E","F","G","H","I","J"],
    vs: { "1A":"H", "1B":"G", "1D":"J", "1E":"C", "1G":"A", "1I":"D", "1K":"E", "1L":"I" }
  },
  {
    option: 266,
    qualifiedGroups: ["A","C","D","E","F","J","K","L"],
    vs: { "1A":"C", "1B":"J", "1D":"E", "1E":"D", "1G":"A", "1I":"F", "1K":"L", "1L":"K" }
  },
  {
    option: 267,
    qualifiedGroups: ["A","C","D","E","F","I","K","L"],
    vs: { "1A":"C", "1B":"E", "1D":"I", "1E":"D", "1G":"A", "1I":"F", "1K":"L", "1L":"K" }
  },
  {
    option: 268,
    qualifiedGroups: ["A","C","D","E","F","I","J","L"],
    vs: { "1A":"C", "1B":"J", "1D":"E", "1E":"D", "1G":"A", "1I":"F", "1K":"L", "1L":"I" }
  },
  {
    option: 269,
    qualifiedGroups: ["A","C","D","E","F","I","J","K"],
    vs: { "1A":"C", "1B":"J", "1D":"E", "1E":"D", "1G":"A", "1I":"F", "1K":"I", "1L":"K" }
  },
  {
    option: 270,
    qualifiedGroups: ["A","C","D","E","F","H","K","L"],
    vs: { "1A":"H", "1B":"E", "1D":"F", "1E":"C", "1G":"A", "1I":"D", "1K":"L", "1L":"K" }
  },
  {
    option: 271,
    qualifiedGroups: ["A","C","D","E","F","H","J","L"],
    vs: { "1A":"H", "1B":"J", "1D":"F", "1E":"C", "1G":"A", "1I":"D", "1K":"L", "1L":"E" }
  },
  {
    option: 272,
    qualifiedGroups: ["A","C","D","E","F","H","J","K"],
    vs: { "1A":"H", "1B":"J", "1D":"E", "1E":"C", "1G":"A", "1I":"F", "1K":"D", "1L":"K" }
  },
  {
    option: 273,
    qualifiedGroups: ["A","C","D","E","F","H","I","L"],
    vs: { "1A":"H", "1B":"E", "1D":"F", "1E":"C", "1G":"A", "1I":"D", "1K":"L", "1L":"I" }
  },
  {
    option: 274,
    qualifiedGroups: ["A","C","D","E","F","H","I","K"],
    vs: { "1A":"H", "1B":"E", "1D":"F", "1E":"C", "1G":"A", "1I":"D", "1K":"I", "1L":"K" }
  },
  {
    option: 275,
    qualifiedGroups: ["A","C","D","E","F","H","I","J"],
    vs: { "1A":"H", "1B":"J", "1D":"E", "1E":"C", "1G":"A", "1I":"F", "1K":"D", "1L":"I" }
  },
  {
    option: 276,
    qualifiedGroups: ["A","C","D","E","F","G","K","L"],
    vs: { "1A":"C", "1B":"G", "1D":"E", "1E":"D", "1G":"A", "1I":"F", "1K":"L", "1L":"K" }
  },
  {
    option: 277,
    qualifiedGroups: ["A","C","D","E","F","G","J","L"],
    vs: { "1A":"C", "1B":"G", "1D":"J", "1E":"D", "1G":"A", "1I":"F", "1K":"L", "1L":"E" }
  },
  {
    option: 278,
    qualifiedGroups: ["A","C","D","E","F","G","J","K"],
    vs: { "1A":"C", "1B":"G", "1D":"J", "1E":"D", "1G":"A", "1I":"F", "1K":"E", "1L":"K" }
  },
  {
    option: 279,
    qualifiedGroups: ["A","C","D","E","F","G","I","L"],
    vs: { "1A":"C", "1B":"G", "1D":"E", "1E":"D", "1G":"A", "1I":"F", "1K":"L", "1L":"I" }
  },
  {
    option: 280,
    qualifiedGroups: ["A","C","D","E","F","G","I","K"],
    vs: { "1A":"C", "1B":"G", "1D":"E", "1E":"D", "1G":"A", "1I":"F", "1K":"I", "1L":"K" }
  },
  {
    option: 281,
    qualifiedGroups: ["A","C","D","E","F","G","I","J"],
    vs: { "1A":"C", "1B":"G", "1D":"J", "1E":"D", "1G":"A", "1I":"F", "1K":"E", "1L":"I" }
  },
  {
    option: 282,
    qualifiedGroups: ["A","C","D","E","F","G","H","L"],
    vs: { "1A":"H", "1B":"G", "1D":"F", "1E":"C", "1G":"A", "1I":"D", "1K":"L", "1L":"E" }
  },
  {
    option: 283,
    qualifiedGroups: ["A","C","D","E","F","G","H","K"],
    vs: { "1A":"H", "1B":"G", "1D":"E", "1E":"C", "1G":"A", "1I":"F", "1K":"D", "1L":"K" }
  },
  {
    option: 284,
    qualifiedGroups: ["A","C","D","E","F","G","H","J"],
    vs: { "1A":"H", "1B":"G", "1D":"J", "1E":"C", "1G":"A", "1I":"F", "1K":"D", "1L":"E" }
  },
  {
    option: 285,
    qualifiedGroups: ["A","C","D","E","F","G","H","I"],
    vs: { "1A":"H", "1B":"G", "1D":"E", "1E":"C", "1G":"A", "1I":"F", "1K":"D", "1L":"I" }
  },
  {
    option: 286,
    qualifiedGroups: ["A","B","F","G","H","I","J","K","L"],
    vs: { "1A":"H", "1B":"J", "1D":"B", "1E":"A", "1G":"I", "1I":"G", "1K":"L", "1L":"K" }
  },
  {
    option: 287,
    qualifiedGroups: ["A","B","F","H","I","J","K","L"],
    vs: { "1A":"H", "1B":"J", "1D":"B", "1E":"A", "1G":"I", "1I":"F", "1K":"L", "1L":"K" }
  },
  {
    option: 288,
    qualifiedGroups: ["A","B","F","G","I","J","K","L"],
    vs: { "1A":"I", "1B":"J", "1D":"B", "1E":"F", "1G":"A", "1I":"G", "1K":"L", "1L":"K" }
  },
  {
    option: 289,
    qualifiedGroups: ["A","B","F","G","H","J","K","L"],
    vs: { "1A":"H", "1B":"J", "1D":"B", "1E":"F", "1G":"A", "1I":"G", "1K":"L", "1L":"K" }
  },
  {
    option: 290,
    qualifiedGroups: ["A","B","F","G","H","I","K","L"],
    vs: { "1A":"H", "1B":"G", "1D":"B", "1E":"A", "1G":"I", "1I":"F", "1K":"L", "1L":"K" }
  },
  {
    option: 291,
    qualifiedGroups: ["A","B","F","G","H","I","J","L"],
    vs: { "1A":"H", "1B":"J", "1D":"B", "1E":"F", "1G":"A", "1I":"G", "1K":"L", "1L":"I" }
  },
  {
    option: 292,
    qualifiedGroups: ["A","B","F","G","H","I","J","K"],
    vs: { "1A":"H", "1B":"J", "1D":"B", "1E":"F", "1G":"A", "1I":"G", "1K":"I", "1L":"K" }
  },
  {
    option: 293,
    qualifiedGroups: ["A","B","E","H","I","J","K","L"],
    vs: { "1A":"E", "1B":"J", "1D":"B", "1E":"A", "1G":"I", "1I":"H", "1K":"L", "1L":"K" }
  },
  {
    option: 294,
    qualifiedGroups: ["A","B","E","G","I","J","K","L"],
    vs: { "1A":"E", "1B":"J", "1D":"B", "1E":"A", "1G":"I", "1I":"G", "1K":"L", "1L":"K" }
  },
  {
    option: 295,
    qualifiedGroups: ["A","B","E","G","H","J","K","L"],
    vs: { "1A":"E", "1B":"J", "1D":"B", "1E":"A", "1G":"H", "1I":"G", "1K":"L", "1L":"K" }
  },
  {
    option: 296,
    qualifiedGroups: ["A","B","E","F","G","H","I","K","L"],
    vs: { "1A":"E", "1B":"G", "1D":"B", "1E":"A", "1G":"I", "1I":"H", "1K":"L", "1L":"K" }
  },
  {
    option: 297,
    qualifiedGroups: ["A","B","E","G","H","J","K","L"],
    vs: { "1A":"E", "1B":"J", "1D":"B", "1E":"A", "1G":"H", "1I":"G", "1K":"L", "1L":"I" }
  },
  {
    option: 298,
    qualifiedGroups: ["A","B","E","G","H","I","J","K"],
    vs: { "1A":"E", "1B":"J", "1D":"B", "1E":"A", "1G":"H", "1I":"G", "1K":"I", "1L":"K" }
  },
  {
    option: 299,
    qualifiedGroups: ["A","B","E","F","I","J","K","L"],
    vs: { "1A":"E", "1B":"J", "1D":"B", "1E":"A", "1G":"I", "1I":"F", "1K":"L", "1L":"K" }
  },
  {
    option: 300,
    qualifiedGroups: ["A","B","E","F","H","J","K","L"],
    vs: { "1A":"E", "1B":"J", "1D":"B", "1E":"F", "1G":"A", "1I":"H", "1K":"L", "1L":"K" }
  },
  {
    option: 301,
    qualifiedGroups: ["A", "B", "E", "F", "H", "I", "K", "L"],
    vs: { "1A":"E", "1B":"I", "1D":"B", "1E":"F", "1G":"A", "1I":"H", "1K":"L", "1L":"K" }
  },
  {
    option: 302,
    qualifiedGroups: ["A", "B", "E", "F", "H", "I", "J", "L"],
    vs: { "1A":"E", "1B":"J", "1D":"B", "1E":"F", "1G":"A", "1I":"H", "1K":"L", "1L":"I" }
  },
  {
    option: 303,
    qualifiedGroups: ["A", "B", "E", "F", "H", "I", "J", "K"],
    vs: { "1A":"E", "1B":"J", "1D":"B", "1E":"F", "1G":"A", "1I":"H", "1K":"I", "1L":"K" }
  },
  {
    option: 304,
    qualifiedGroups: ["A", "B", "E", "F", "G", "J", "K", "L"],
    vs: { "1A":"E", "1B":"J", "1D":"B", "1E":"F", "1G":"A", "1I":"G", "1K":"L", "1L":"K" }
  },
  {
    option: 305,
    qualifiedGroups: ["A", "B", "E", "F", "G", "I", "K", "L"],
    vs: { "1A":"E", "1B":"G", "1D":"B", "1E":"A", "1G":"I", "1I":"F", "1K":"L", "1L":"K" }
  },
  {
    option: 306,
    qualifiedGroups: ["A", "B", "E", "F", "G", "I", "J", "L"],
    vs: { "1A":"E", "1B":"J", "1D":"B", "1E":"F", "1G":"A", "1I":"G", "1K":"L", "1L":"I" }
  },
  {
    option: 307,
    qualifiedGroups: ["A", "B", "E", "F", "G", "I", "J", "K"],
    vs: { "1A":"E", "1B":"J", "1D":"B", "1E":"F", "1G":"A", "1I":"G", "1K":"I", "1L":"K" }
  },
  {
    option: 308,
    qualifiedGroups: ["A", "B", "E", "F", "G", "H", "K", "L"],
    vs: { "1A":"E", "1B":"G", "1D":"B", "1E":"F", "1G":"A", "1I":"H", "1K":"L", "1L":"K" }
  },
  {
    option: 309,
    qualifiedGroups: ["A", "B", "E", "F", "G", "H", "J", "L"],
    vs: { "1A":"H", "1B":"J", "1D":"B", "1E":"F", "1G":"A", "1I":"G", "1K":"L", "1L":"E" }
  },
  {
    option: 310,
    qualifiedGroups: ["A", "B", "E", "F", "G", "H", "J", "K"],
    vs: { "1A":"H", "1B":"J", "1D":"B", "1E":"F", "1G":"A", "1I":"G", "1K":"E", "1L":"K" }
  },
  {
    option: 311,
    qualifiedGroups: ["A", "B", "E", "F", "G", "H", "I", "L"],
    vs: { "1A":"E", "1B":"G", "1D":"B", "1E":"F", "1G":"A", "1I":"H", "1K":"L", "1L":"I" }
  },
  {
    option: 312,
    qualifiedGroups: ["A", "B", "E", "F", "G", "H", "I", "K"],
    vs: { "1A":"E", "1B":"G", "1D":"B", "1E":"F", "1G":"A", "1I":"H", "1K":"I", "1L":"K" }
  },
  {
    option: 313,
    qualifiedGroups: ["A", "B", "E", "F", "G", "H", "I", "J"],
    vs: { "1A":"H", "1B":"J", "1D":"B", "1E":"F", "1G":"A", "1I":"G", "1K":"E", "1L":"I" }
  },
  {
    option: 314,
    qualifiedGroups: ["A", "B", "D", "E", "H", "I", "J", "L"],
    vs: { "1A":"I", "1B":"J", "1D":"B", "1E":"D", "1G":"A", "1I":"H", "1K":"L", "1L":"K" }
  },
  {
    option: 315,
    qualifiedGroups: ["A", "B", "D", "E", "G", "I", "J", "L"],
    vs: { "1A":"I", "1B":"J", "1D":"B", "1E":"D", "1G":"A", "1I":"G", "1K":"L", "1L":"K" }
  },
  {
    option: 316,
    qualifiedGroups: ["A", "B", "D", "G", "H", "J", "L"],
    vs: { "1A":"H", "1B":"J", "1D":"B", "1E":"D", "1G":"A", "1I":"G", "1K":"L", "1L":"K" }
  },
  {
    option: 317,
    qualifiedGroups: ["A", "B", "D", "G", "H", "I", "L"],
    vs: { "1A":"I", "1B":"G", "1D":"B", "1E":"D", "1G":"A", "1I":"H", "1K":"L", "1L":"K" }
  },
  {
    option: 318,
    qualifiedGroups: ["A", "B", "D", "G", "H", "I", "J", "L"],
    vs: { "1A":"H", "1B":"J", "1D":"B", "1E":"D", "1G":"A", "1I":"G", "1K":"L", "1L":"I" }
  },
  {
    option: 319,
    qualifiedGroups: ["A", "B", "D", "G", "H", "I", "J", "K"],
    vs: { "1A":"H", "1B":"J", "1D":"B", "1E":"D", "1G":"A", "1I":"G", "1K":"I", "1L":"K" }
  },
  {
    option: 320,
    qualifiedGroups: ["A", "B", "D", "F", "I", "J", "L"],
    vs: { "1A":"I", "1B":"J", "1D":"B", "1E":"D", "1G":"A", "1I":"F", "1K":"L", "1L":"K" }
  },
  {
    option: 321,
    qualifiedGroups: ["A", "B", "D", "F", "H", "J", "L"],
    vs: { "1A":"H", "1B":"J", "1D":"B", "1E":"D", "1G":"A", "1I":"F", "1K":"L", "1L":"K" }
  },
  {
    option: 322,
    qualifiedGroups: ["A", "B", "D", "F", "H", "I", "L"],
    vs: { "1A":"H", "1B":"I", "1D":"B", "1E":"D", "1G":"A", "1I":"F", "1K":"L", "1L":"K" }
  },
  {
    option: 323,
    qualifiedGroups: ["A", "B", "D", "F", "H", "I", "J", "L"],
    vs: { "1A":"H", "1B":"J", "1D":"B", "1E":"D", "1G":"A", "1I":"F", "1K":"L", "1L":"I" }
  },
  {
    option: 324,
    qualifiedGroups: ["A", "B", "D", "F", "H", "I", "J", "K"],
    vs: { "1A":"H", "1B":"J", "1D":"B", "1E":"D", "1G":"A", "1I":"F", "1K":"I", "1L":"K" }
  },
  {
    option: 325,
    qualifiedGroups: ["A", "B", "D", "F", "G", "J", "K", "L"],
    vs: { "1A":"F", "1B":"J", "1D":"B", "1E":"D", "1G":"A", "1I":"G", "1K":"L", "1L":"K" }
  },
  {
    option: 326,
    qualifiedGroups: ["A", "B", "D", "F", "G", "I", "K", "L"],
    vs: { "1A":"I", "1B":"G", "1D":"B", "1E":"D", "1G":"A", "1I":"F", "1K":"L", "1L":"K" }
  },
  {
    option: 327,
    qualifiedGroups: ["A", "B", "D", "F", "G", "J", "L"],
    vs: { "1A":"F", "1B":"J", "1D":"B", "1E":"D", "1G":"A", "1I":"G", "1K":"L", "1L":"I" }
  },
  {
    option: 328,
    qualifiedGroups: ["A", "B", "D", "F", "G", "I", "J", "K"],
    vs: { "1A":"F", "1B":"J", "1D":"B", "1E":"D", "1G":"A", "1I":"G", "1K":"I", "1L":"K" }
  },
  {
    option: 329,
    qualifiedGroups: ["A", "B", "D", "F", "G", "H", "K", "L"],
    vs: { "1A":"H", "1B":"G", "1D":"B", "1E":"D", "1G":"A", "1I":"F", "1K":"L", "1L":"K" }
  },
  {
    option: 330,
    qualifiedGroups: ["A", "B", "D", "F", "G", "H", "J", "L"],
    vs: { "1A":"H", "1B":"G", "1D":"B", "1E":"D", "1G":"A", "1I":"F", "1K":"L", "1L":"J" }
  },
  {
    option: 331,
    qualifiedGroups: ["A", "B", "D", "F", "G", "H", "J", "K"],
    vs: { "1A":"H", "1B":"G", "1D":"B", "1E":"D", "1G":"A", "1I":"F", "1K":"J", "1L":"K" }
  },
  {
    option: 332,
    qualifiedGroups: ["A", "B", "D", "F", "G", "H", "I", "L"],
    vs: { "1A":"H", "1B":"G", "1D":"B", "1E":"D", "1G":"A", "1I":"F", "1K":"L", "1L":"I" }
  },
  {
    option: 333,
    qualifiedGroups: ["A", "B", "D", "F", "G", "H", "I", "K"],
    vs: { "1A":"H", "1B":"G", "1D":"B", "1E":"D", "1G":"A", "1I":"F", "1K":"I", "1L":"K" }
  },
  {
    option: 334,
    qualifiedGroups: ["A", "B", "D", "F", "G", "H", "I", "J"],
    vs: { "1A":"H", "1B":"G", "1D":"B", "1E":"D", "1G":"A", "1I":"F", "1K":"I", "1L":"J" }
  },
  {
    option: 335,
    qualifiedGroups: ["A", "B", "C", "D", "E", "I", "J", "L"],
    vs: { "1A":"E", "1B":"J", "1D":"B", "1E":"A", "1G":"I", "1I":"D", "1K":"L", "1L":"K" }
  },
  {
    option: 336,
    qualifiedGroups: ["A", "B", "D", "E", "H", "J", "L"],
    vs: { "1A":"E", "1B":"J", "1D":"B", "1E":"D", "1G":"A", "1I":"H", "1K":"L", "1L":"K" }
  },
  {
    option: 337,
    qualifiedGroups: ["A", "B", "D", "E", "H", "I", "L"],
    vs: { "1A":"E", "1B":"I", "1D":"B", "1E":"D", "1G":"A", "1I":"H", "1K":"L", "1L":"K" }
  },
  {
    option: 338,
    qualifiedGroups: ["A", "B", "D", "E", "H", "I", "J", "L"],
    vs: { "1A":"E", "1B":"J", "1D":"B", "1E":"D", "1G":"A", "1I":"H", "1K":"L", "1L":"I" }
  },
  {
    option: 339,
    qualifiedGroups: ["A", "B", "D", "E", "H", "I", "J", "K"],
    vs: { "1A":"E", "1B":"J", "1D":"B", "1E":"D", "1G":"A", "1I":"H", "1K":"I", "1L":"K" }
  },
  {
    option: 340,
    qualifiedGroups: ["A", "B", "D", "E", "G", "J", "K", "L"],
    vs: { "1A":"E", "1B":"J", "1D":"B", "1E":"D", "1G":"A", "1I":"G", "1K":"L", "1L":"K" }
  },
  {
    option: 341,
    qualifiedGroups: ["A", "B", "D", "E", "G", "I", "K", "L"],
    vs: { "1A":"E", "1B":"G", "1D":"B", "1E":"A", "1G":"I", "1I":"D", "1K":"L", "1L":"K" }
  },
  {
    option: 342,
    qualifiedGroups: ["A", "B", "D", "E", "G", "J", "L"],
    vs: { "1A":"E", "1B":"J", "1D":"B", "1E":"D", "1G":"A", "1I":"G", "1K":"L", "1L":"I" }
  },
  {
    option: 343,
    qualifiedGroups: ["A", "B", "D", "E", "G", "I", "J", "K"],
    vs: { "1A":"E", "1B":"J", "1D":"B", "1E":"D", "1G":"A", "1I":"G", "1K":"I", "1L":"K" }
  },
  {
    option: 344,
    qualifiedGroups: ["A", "B", "D", "E", "F", "G", "H", "L"],
    vs: { "1A":"E", "1B":"G", "1D":"B", "1E":"D", "1G":"A", "1I":"H", "1K":"L", "1L":"K" }
  },
  {
    option: 345,
    qualifiedGroups: ["A", "B", "D", "F", "G", "H", "J", "L"],
    vs: { "1A":"H", "1B":"J", "1D":"B", "1E":"D", "1G":"A", "1I":"G", "1K":"L", "1L":"E" }
  },
  {
    option: 346,
    qualifiedGroups: ["A", "B", "D", "E", "F", "G", "H", "J", "K"],
    vs: { "1A":"H", "1B":"J", "1D":"B", "1E":"D", "1G":"A", "1I":"G", "1K":"E", "1L":"K" }
  },
  {
    option: 347,
    qualifiedGroups: ["A", "B", "D", "E", "F", "G", "H", "I", "L"],
    vs: { "1A":"E", "1B":"G", "1D":"B", "1E":"D", "1G":"A", "1I":"H", "1K":"L", "1L":"I" }
  },
  {
    option: 348,
    qualifiedGroups: ["A", "B", "D", "E", "F", "G", "H", "I", "K"],
    vs: { "1A":"E", "1B":"G", "1D":"B", "1E":"D", "1G":"A", "1I":"H", "1K":"I", "1L":"K" }
  },
  {
    option: 349,
    qualifiedGroups: ["A", "B", "D", "F", "G", "H", "I", "J"],
    vs: { "1A":"H", "1B":"J", "1D":"B", "1E":"D", "1G":"A", "1I":"G", "1K":"E", "1L":"I" }
  },
  {
    option: 350,
    qualifiedGroups: ["A", "B", "D", "E", "F", "J", "K", "L"],
    vs: { "1A":"E", "1B":"J", "1D":"B", "1E":"D", "1G":"A", "1I":"F", "1K":"L", "1L":"K" }
  },
  {
    option: 351,
    qualifiedGroups: ["A", "B", "D", "E", "F", "I", "K", "L"],
    vs: { "1A":"E", "1B":"I", "1D":"B", "1E":"D", "1G":"A", "1I":"F", "1K":"L", "1L":"K" }
  },
  {
    option: 352,
    qualifiedGroups: ["A", "B", "D", "E", "F", "I", "J", "L"],
    vs: { "1A":"E", "1B":"J", "1D":"B", "1E":"D", "1G":"A", "1I":"F", "1K":"L", "1L":"I" }
  },
  {
    option: 353,
    qualifiedGroups: ["A", "B", "D", "E", "F", "I", "J", "K"],
    vs: { "1A":"E", "1B":"J", "1D":"B", "1E":"D", "1G":"A", "1I":"F", "1K":"I", "1L":"K" }
  },
  {
    option: 354,
    qualifiedGroups: ["A", "B", "D", "E", "F", "H", "K", "L"],
    vs: { "1A":"H", "1B":"E", "1D":"B", "1E":"D", "1G":"A", "1I":"F", "1K":"L", "1L":"K" }
  },
  {
    option: 355,
    qualifiedGroups: ["A", "B", "D", "E", "F", "H", "J", "L"],
    vs: { "1A":"H", "1B":"J", "1D":"B", "1E":"D", "1G":"A", "1I":"F", "1K":"L", "1L":"E" }
  },
  {
    option: 356,
    qualifiedGroups: ["A", "B", "D", "E", "F", "H", "J", "K"],
    vs: { "1A":"H", "1B":"J", "1D":"B", "1E":"D", "1G":"A", "1I":"F", "1K":"E", "1L":"K" }
  },
  {
    option: 357,
    qualifiedGroups: ["A", "B", "D", "E", "F", "H", "I", "L"],
    vs: { "1A":"H", "1B":"E", "1D":"B", "1E":"D", "1G":"A", "1I":"F", "1K":"L", "1L":"I" }
  },
  {
    option: 358,
    qualifiedGroups: ["A", "B", "D", "E", "F", "H", "I", "K"],
    vs: { "1A":"H", "1B":"E", "1D":"B", "1E":"D", "1G":"A", "1I":"F", "1K":"I", "1L":"K" }
  },
  {
    option: 359,
    qualifiedGroups: ["A", "B", "D", "E", "F", "H", "I", "J"],
    vs: { "1A":"H", "1B":"J", "1D":"B", "1E":"D", "1G":"A", "1I":"F", "1K":"E", "1L":"I" }
  },
  {
    option: 360,
    qualifiedGroups: ["A", "B", "D", "E", "F", "G", "K", "L"],
    vs: { "1A":"E", "1B":"G", "1D":"B", "1E":"D", "1G":"A", "1I":"F", "1K":"L", "1L":"K" }
  },
  {
    option: 361,
    qualifiedGroups: ["A", "B", "D", "E", "F", "G", "J", "L"],
    vs: { "1A":"E", "1B":"G", "1D":"B", "1E":"D", "1G":"A", "1I":"F", "1K":"L", "1L":"J" }
  },
  {
    option: 362,
    qualifiedGroups: ["A", "B", "D", "E", "F", "G", "J", "K"],
    vs: { "1A":"E", "1B":"G", "1D":"B", "1E":"D", "1G":"A", "1I":"F", "1K":"J", "1L":"K" }
  },
  {
    option: 363,
    qualifiedGroups: ["A", "B", "D", "E", "F", "G", "I", "L"],
    vs: { "1A":"E", "1B":"G", "1D":"B", "1E":"D", "1G":"A", "1I":"F", "1K":"L", "1L":"I" }
  },
  {
    option: 364,
    qualifiedGroups: ["A", "B", "D", "E", "F", "G", "I", "K"],
    vs: { "1A":"E", "1B":"G", "1D":"B", "1E":"D", "1G":"A", "1I":"F", "1K":"I", "1L":"K" }
  },
  {
    option: 365,
    qualifiedGroups: ["A", "B", "D", "E", "F", "G", "I", "J"],
    vs: { "1A":"E", "1B":"G", "1D":"B", "1E":"D", "1G":"A", "1I":"F", "1K":"I", "1L":"J" }
  },
  {
    option: 366,
    qualifiedGroups: ["A", "B", "D", "F", "G", "H", "J", "L"],
    vs: { "1A":"H", "1B":"G", "1D":"B", "1E":"D", "1G":"A", "1I":"F", "1K":"L", "1L":"E" }
  },
  {
    option: 367,
    qualifiedGroups: ["A", "B", "D", "F", "G", "H", "J", "K"],
    vs: { "1A":"H", "1B":"G", "1D":"B", "1E":"D", "1G":"A", "1I":"F", "1K":"E", "1L":"K" }
  },
  {
    option: 368,
    qualifiedGroups: ["A", "B", "D", "F", "G", "H", "J"],
    vs: { "1A":"H", "1B":"G", "1D":"B", "1E":"D", "1G":"A", "1I":"F", "1K":"E", "1L":"J" }
  },
  {
    option: 369,
    qualifiedGroups: ["A", "B", "D", "F", "G", "H", "I"],
    vs: { "1A":"H", "1B":"G", "1D":"B", "1E":"D", "1G":"A", "1I":"F", "1K":"E", "1L":"I" }
  },
  {
    option: 370,
    qualifiedGroups: ["A", "B", "C", "H", "I", "J", "K", "L"],
    vs: { "1A":"I", "1B":"J", "1D":"B", "1E":"C", "1G":"A", "1I":"H", "1K":"L", "1L":"K" }
  },
  {
    option: 371,
    qualifiedGroups: ["A", "B", "C", "G", "I", "J", "K", "L"],
    vs: { "1A":"I", "1B":"J", "1D":"B", "1E":"C", "1G":"A", "1I":"G", "1K":"L", "1L":"K" }
  },
  {
    option: 372,
    qualifiedGroups: ["A", "B", "C", "G", "H", "J", "K", "L"],
    vs: { "1A":"H", "1B":"J", "1D":"B", "1E":"C", "1G":"A", "1I":"G", "1K":"L", "1L":"K" }
  },
  {
    option: 373,
    qualifiedGroups: ["A", "B", "C", "G", "H", "I", "K", "L"],
    vs: { "1A":"I", "1B":"G", "1D":"B", "1E":"C", "1G":"A", "1I":"H", "1K":"L", "1L":"K" }
  },
  {
    option: 374,
    qualifiedGroups: ["A", "B", "C", "G", "H", "I", "J", "L"],
    vs: { "1A":"H", "1B":"J", "1D":"B", "1E":"C", "1G":"A", "1I":"G", "1K":"L", "1L":"I" }
  },
  {
    option: 375,
    qualifiedGroups: ["A", "B", "C", "G", "H", "I", "J", "K"],
    vs: { "1A":"H", "1B":"J", "1D":"B", "1E":"C", "1G":"A", "1I":"G", "1K":"I", "1L":"K" }
  },
  {
    option: 376,
    qualifiedGroups: ["A", "B", "C", "F", "I", "J", "K", "L"],
    vs: { "1A":"I", "1B":"J", "1D":"B", "1E":"C", "1G":"A", "1I":"F", "1K":"L", "1L":"K" }
  },
  {
    option: 377,
    qualifiedGroups: ["A", "B", "C", "F", "H", "J", "K", "L"],
    vs: { "1A":"H", "1B":"J", "1D":"B", "1E":"C", "1G":"A", "1I":"F", "1K":"L", "1L":"K" }
  },
  {
    option: 378,
    qualifiedGroups: ["A", "B", "C", "F", "H", "I", "K", "L"],
    vs: { "1A":"H", "1B":"I", "1D":"B", "1E":"C", "1G":"A", "1I":"F", "1K":"L", "1L":"K" }
  },
  {
    option: 379,
    qualifiedGroups: ["A", "B", "C", "F", "H", "I", "J", "L"],
    vs: { "1A":"H", "1B":"J", "1D":"B", "1E":"C", "1G":"A", "1I":"F", "1K":"L", "1L":"I" }
  },
  {
    option: 380,
    qualifiedGroups: ["A", "B", "C", "F", "H", "I", "J", "K"],
    vs: { "1A":"H", "1B":"J", "1D":"B", "1E":"C", "1G":"A", "1I":"F", "1K":"I", "1L":"K" }
  },
  {
    option: 381,
    qualifiedGroups: ["A", "B", "C", "F", "G", "J", "K", "L"],
    vs: { "1A":"C", "1B":"J", "1D":"B", "1E":"F", "1G":"A", "1I":"G", "1K":"L", "1L":"K" }
  },
  {
    option: 382,
    qualifiedGroups: ["A", "B", "C", "F", "G", "I", "K", "L"],
    vs: { "1A":"I", "1B":"G", "1D":"B", "1E":"C", "1G":"A", "1I":"F", "1K":"L", "1L":"K" }
  },
  {
    option: 383,
    qualifiedGroups: ["A", "B", "C", "F", "G", "J", "L"],
    vs: { "1A":"C", "1B":"J", "1D":"B", "1E":"F", "1G":"A", "1I":"G", "1K":"L", "1L":"I" }
  },
  {
    option: 384,
    qualifiedGroups: ["A", "B", "C", "F", "G", "I", "J", "K"],
    vs: { "1A":"C", "1B":"J", "1D":"B", "1E":"F", "1G":"A", "1I":"G", "1K":"I", "1L":"K" }
  },
  {
    option: 385,
    qualifiedGroups: ["A", "B", "C", "F", "G", "H", "K", "L"],
    vs: { "1A":"H", "1B":"G", "1D":"B", "1E":"C", "1G":"A", "1I":"F", "1K":"L", "1L":"K" }
  },
  {
    option: 386,
    qualifiedGroups: ["A", "B", "C", "F", "G", "H", "J", "L"],
    vs: { "1A":"H", "1B":"G", "1D":"B", "1E":"C", "1G":"A", "1I":"F", "1K":"L", "1L":"J" }
  },
  {
    option: 387,
    qualifiedGroups: ["A", "B", "C", "F", "G", "H", "J", "K"],
    vs: { "1A":"H", "1B":"G", "1D":"B", "1E":"C", "1G":"A", "1I":"F", "1K":"J", "1L":"K" }
  },
  {
    option: 388,
    qualifiedGroups: ["A", "B", "C", "F", "G", "H", "I", "L"],
    vs: { "1A":"H", "1B":"G", "1D":"B", "1E":"C", "1G":"A", "1I":"F", "1K":"L", "1L":"I" }
  },
  {
    option: 389,
    qualifiedGroups: ["A", "B", "C", "F", "G", "H", "I", "K"],
    vs: { "1A":"H", "1B":"G", "1D":"B", "1E":"C", "1G":"A", "1I":"F", "1K":"I", "1L":"K" }
  },
  {
    option: 390,
    qualifiedGroups: ["A", "B", "C", "F", "G", "H", "I", "J"],
    vs: { "1A":"H", "1B":"G", "1D":"B", "1E":"C", "1G":"A", "1I":"F", "1K":"I", "1L":"J" }
  },
  {
    option: 391,
    qualifiedGroups: ["A", "B", "C", "E", "I", "J", "K", "L"],
    vs: { "1A":"E", "1B":"J", "1D":"B", "1E":"A", "1G":"I", "1I":"C", "1K":"L", "1L":"K" }
  },
  {
    option: 392,
    qualifiedGroups: ["A", "B", "C", "E", "H", "J", "K", "L"],
    vs: { "1A":"E", "1B":"J", "1D":"B", "1E":"C", "1G":"A", "1I":"H", "1K":"L", "1L":"K" }
  },
  {
    option: 393,
    qualifiedGroups: ["A", "B", "C", "E", "H", "I", "K", "L"],
    vs: { "1A":"E", "1B":"I", "1D":"B", "1E":"C", "1G":"A", "1I":"H", "1K":"L", "1L":"K" }
  },
  {
    option: 394,
    qualifiedGroups: ["A", "B", "C", "E", "H", "I", "J", "L"],
    vs: { "1A":"E", "1B":"J", "1D":"B", "1E":"C", "1G":"A", "1I":"H", "1K":"L", "1L":"I" }
  },
  {
    option: 395,
    qualifiedGroups: ["A", "B", "C", "E", "H", "I", "J", "K"],
    vs: { "1A":"E", "1B":"J", "1D":"B", "1E":"C", "1G":"A", "1I":"H", "1K":"I", "1L":"K" }
  },
  {
    option: 396,
    qualifiedGroups: ["A", "B", "C", "E", "G", "J", "K", "L"],
    vs: { "1A":"E", "1B":"J", "1D":"B", "1E":"C", "1G":"A", "1I":"G", "1K":"L", "1L":"K" }
  },
  {
    option: 397,
    qualifiedGroups: ["A", "B", "C", "E", "G", "I", "K", "L"],
    vs: { "1A":"E", "1B":"G", "1D":"B", "1E":"A", "1G":"I", "1I":"C", "1K":"L", "1L":"K" }
  },
  {
    option: 398,
    qualifiedGroups: ["A", "B", "C", "E", "G", "I", "J", "L"],
    vs: { "1A":"E", "1B":"J", "1D":"B", "1E":"C", "1G":"A", "1I":"G", "1K":"L", "1L":"I" }
  },
  {
    option: 399,
    qualifiedGroups: ["A", "B", "C", "E", "G", "I", "J", "K"],
    vs: { "1A":"E", "1B":"J", "1D":"B", "1E":"C", "1G":"A", "1I":"G", "1K":"I", "1L":"K" }
  },
  {
    option: 400,
    qualifiedGroups: ["A", "B", "C", "E", "G", "H", "K", "L"],
    vs: { "1A":"E", "1B":"G", "1D":"B", "1E":"C", "1G":"A", "1I":"H", "1K":"L", "1L":"K" }
  },
  {
    option: 401,
    qualifiedGroups: ["A","B","C","E","G","H","J","L"],
    vs: { "1A":"H","1B":"J","1D":"B","1E":"C","1G":"A","1I":"G","1K":"L","1L":"E" }
  },
  {
    option: 402,
    qualifiedGroups: ["A","B","C","E","G","H","J","K"],
    vs: { "1A":"H","1B":"J","1D":"B","1E":"C","1G":"A","1I":"G","1K":"E","1L":"K" }
  },
  {
    option: 403,
    qualifiedGroups: ["A","B","C","E","G","H","I","L"],
    vs: { "1A":"E","1B":"G","1D":"B","1E":"C","1G":"A","1I":"H","1K":"L","1L":"I" }
  },
  {
    option: 404,
    qualifiedGroups: ["A","B","C","E","G","H","I","K"],
    vs: { "1A":"E","1B":"G","1D":"B","1E":"C","1G":"A","1I":"H","1K":"I","1L":"K" }
  },
  {
    option: 405,
    qualifiedGroups: ["A","B","C","E","G","H","I","J"],
    vs: { "1A":"H","1B":"J","1D":"B","1E":"C","1G":"A","1I":"G","1K":"E","1L":"I" }
  },
  {
    option: 406,
    qualifiedGroups: ["A","B","C","E","F","I","J","L"],
    vs: { "1A":"E","1B":"J","1D":"B","1E":"C","1G":"A","1I":"F","1K":"L","1L":"K" }
  },
  {
    option: 407,
    qualifiedGroups: ["A","B","C","E","F","I","L"],
    vs: { "1A":"E","1B":"I","1D":"B","1E":"C","1G":"A","1I":"F","1K":"L","1L":"K" }
  },
  {
    option: 408,
    qualifiedGroups: ["A","B","C","E","F","I","J","L"],
    vs: { "1A":"E","1B":"J","1D":"B","1E":"C","1G":"A","1I":"F","1K":"L","1L":"I" }
  },
  {
    option: 409,
    qualifiedGroups: ["A","B","C","E","F","I","J","K"],
    vs: { "1A":"E","1B":"J","1D":"B","1E":"C","1G":"A","1I":"F","1K":"I","1L":"K" }
  },
  {
    option: 410,
    qualifiedGroups: ["A","B","C","E","F","H","L"],
    vs: { "1A":"H","1B":"E","1D":"B","1E":"C","1G":"A","1I":"F","1K":"L","1L":"K" }
  },
  {
    option: 411,
    qualifiedGroups: ["A","B","C","E","F","H","J","L"],
    vs: { "1A":"H","1B":"J","1D":"B","1E":"C","1G":"A","1I":"F","1K":"L","1L":"E" }
  },
  {
    option: 412,
    qualifiedGroups: ["A","B","C","E","F","H","J","K"],
    vs: { "1A":"H","1B":"J","1D":"B","1E":"C","1G":"A","1I":"F","1K":"E","1L":"K" }
  },
  {
    option: 413,
    qualifiedGroups: ["A","B","C","E","F","H","I","L"],
    vs: { "1A":"H","1B":"E","1D":"B","1E":"C","1G":"A","1I":"F","1K":"L","1L":"I" }
  },
  {
    option: 414,
    qualifiedGroups: ["A","B","C","E","F","H","I","K"],
    vs: { "1A":"H","1B":"E","1D":"B","1E":"C","1G":"A","1I":"F","1K":"I","1L":"K" }
  },
  {
    option: 415,
    qualifiedGroups: ["A","B","C","E","F","H","I","J"],
    vs: { "1A":"H","1B":"J","1D":"B","1E":"C","1G":"A","1I":"F","1K":"E","1L":"I" }
  },
  {
    option: 416,
    qualifiedGroups: ["A","B","C","E","F","G","L"],
    vs: { "1A":"E","1B":"G","1D":"B","1E":"C","1G":"A","1I":"F","1K":"L","1L":"K" }
  },
  {
    option: 417,
    qualifiedGroups: ["A","B","C","E","F","G","J","L"],
    vs: { "1A":"E","1B":"G","1D":"B","1E":"C","1G":"A","1I":"F","1K":"L","1L":"J" }
  },
  {
    option: 418,
    qualifiedGroups: ["A","B","C","E","F","G","J","K"],
    vs: { "1A":"E","1B":"G","1D":"B","1E":"C","1G":"A","1I":"F","1K":"J","1L":"K" }
  },
  {
    option: 419,
    qualifiedGroups: ["A","B","C","E","F","G","I","L"],
    vs: { "1A":"E","1B":"G","1D":"B","1E":"C","1G":"A","1I":"F","1K":"L","1L":"I" }
  },
  {
    option: 420,
    qualifiedGroups: ["A","B","C","E","F","G","I","K"],
    vs: { "1A":"E","1B":"G","1D":"B","1E":"C","1G":"A","1I":"F","1K":"I","1L":"K" }
  },
  {
    option: 421,
    qualifiedGroups: ["A","B","C","E","F","G","I","J"],
    vs: { "1A":"E","1B":"G","1D":"B","1E":"C","1G":"A","1I":"F","1K":"I","1L":"J" }
  },
  {
    option: 422,
    qualifiedGroups: ["A","B","C","E","F","G","H","L"],
    vs: { "1A":"H","1B":"G","1D":"B","1E":"C","1G":"A","1I":"F","1K":"L","1L":"E" }
  },
  {
    option: 423,
    qualifiedGroups: ["A","B","C","E","F","G","H","K"],
    vs: { "1A":"H","1B":"G","1D":"B","1E":"C","1G":"A","1I":"F","1K":"E","1L":"K" }
  },
  {
    option: 424,
    qualifiedGroups: ["A","B","C","E","F","G","H","J"],
    vs: { "1A":"H","1B":"G","1D":"B","1E":"C","1G":"A","1I":"F","1K":"E","1L":"J" }
  },
  {
    option: 425,
    qualifiedGroups: ["A","B","C","E","F","G","H","I"],
    vs: { "1A":"H","1B":"G","1D":"B","1E":"C","1G":"A","1I":"F","1K":"E","1L":"I" }
  },
  {
    option: 426,
    qualifiedGroups: ["A","B","C","D","I","J","K","L"],
    vs: { "1A":"I","1B":"J","1D":"B","1E":"C","1G":"A","1I":"D","1K":"L","1L":"K" }
  },
  {
    option: 427,
    qualifiedGroups: ["A","B","C","D","H","J","K","L"],
    vs: { "1A":"H","1B":"J","1D":"B","1E":"C","1G":"A","1I":"D","1K":"L","1L":"K" }
  },
  {
    option: 428,
    qualifiedGroups: ["A","B","C","D","H","I","K","L"],
    vs: { "1A":"H","1B":"I","1D":"B","1E":"C","1G":"A","1I":"D","1K":"L","1L":"K" }
  },
  {
    option: 429,
    qualifiedGroups: ["A","B","C","D","H","J","K","L"],
    vs: { "1A":"H","1B":"J","1D":"B","1E":"C","1G":"A","1I":"D","1K":"L","1L":"I" }
  },
  {
    option: 430,
    qualifiedGroups: ["A","B","C","D","H","I","J","K"],
    vs: { "1A":"H","1B":"J","1D":"B","1E":"C","1G":"A","1I":"D","1K":"I","1L":"K" }
  },
  {
    option: 431,
    qualifiedGroups: ["A","B","C","D","G","J","K","L"],
    vs: { "1A":"C","1B":"J","1D":"B","1E":"D","1G":"A","1I":"G","1K":"L","1L":"K" }
  },
  {
    option: 432,
    qualifiedGroups: ["A","B","C","D","G","I","K","L"],
    vs: { "1A":"I","1B":"G","1D":"B","1E":"C","1G":"A","1I":"D","1K":"L","1L":"K" }
  },
  {
    option: 433,
    qualifiedGroups: ["A","B","C","D","G","J","L"],
    vs: { "1A":"C","1B":"J","1D":"B","1E":"D","1G":"A","1I":"G","1K":"L","1L":"I" }
  },
  {
    option: 434,
    qualifiedGroups: ["A","B","C","D","G","I","J","K"],
    vs: { "1A":"C","1B":"J","1D":"B","1E":"D","1G":"A","1I":"G","1K":"I","1L":"K" }
  },
  {
    option: 435,
    qualifiedGroups: ["A","B","C","D","G","H","K","L"],
    vs: { "1A":"H","1B":"G","1D":"B","1E":"C","1G":"A","1I":"D","1K":"L","1L":"K" }
  },
  {
    option: 436,
    qualifiedGroups: ["A","B","C","D","G","H","J","L"],
    vs: { "1A":"H","1B":"G","1D":"B","1E":"C","1G":"A","1I":"D","1K":"L","1L":"J" }
  },
  {
    option: 437,
    qualifiedGroups: ["A","B","C","D","G","H","J","K"],
    vs: { "1A":"H","1B":"G","1D":"B","1E":"C","1G":"A","1I":"D","1K":"J","1L":"K" }
  },
  {
    option: 438,
    qualifiedGroups: ["A","B","C","D","G","H","I","L"],
    vs: { "1A":"H","1B":"G","1D":"B","1E":"C","1G":"A","1I":"D","1K":"L","1L":"I" }
  },
  {
    option: 439,
    qualifiedGroups: ["A","B","C","D","G","H","I","K"],
    vs: { "1A":"H","1B":"G","1D":"B","1E":"C","1G":"A","1I":"D","1K":"I","1L":"K" }
  },
  {
    option: 440,
    qualifiedGroups: ["A","B","C","D","G","H","I","J"],
    vs: { "1A":"H","1B":"G","1D":"B","1E":"C","1G":"A","1I":"D","1K":"I","1L":"J" }
  },
  {
    option: 441,
    qualifiedGroups: ["A","B","C","D","F","J","K","L"],
    vs: { "1A":"C","1B":"J","1D":"B","1E":"D","1G":"A","1I":"F","1K":"L","1L":"K" }
  },
  {
    option: 442,
    qualifiedGroups: ["A","B","C","D","F","I","K","L"],
    vs: { "1A":"C","1B":"I","1D":"B","1E":"D","1G":"A","1I":"F","1K":"L","1L":"K" }
  },
  {
    option: 443,
    qualifiedGroups: ["A","B","C","D","F","J","L"],
    vs: { "1A":"C","1B":"J","1D":"B","1E":"D","1G":"A","1I":"F","1K":"L","1L":"I" }
  },
  {
    option: 444,
    qualifiedGroups: ["A","B","C","D","F","I","J","K"],
    vs: { "1A":"C","1B":"J","1D":"B","1E":"D","1G":"A","1I":"F","1K":"I","1L":"K" }
  },
  {
    option: 445,
    qualifiedGroups: ["A","B","C","D","F","H","L"],
    vs: { "1A":"H","1B":"F","1D":"B","1E":"C","1G":"A","1I":"D","1K":"L","1L":"K" }
  },
  {
    option: 446,
    qualifiedGroups: ["A","B","C","D","F","H","J","L"],
    vs: { "1A":"C","1B":"J","1D":"B","1E":"D","1G":"A","1I":"F","1K":"L","1L":"H" }
  },
  {
    option: 447,
    qualifiedGroups: ["A","B","C","D","F","H","J","K"],
    vs: { "1A":"H","1B":"J","1D":"B","1E":"C","1G":"A","1I":"F","1K":"D","1L":"K" }
  },
  {
    option: 448,
    qualifiedGroups: ["A","B","C","D","F","H","I","L"],
    vs: { "1A":"H","1B":"F","1D":"B","1E":"C","1G":"A","1I":"D","1K":"L","1L":"I" }
  },
  {
    option: 449,
    qualifiedGroups: ["A","B","C","D","F","H","I","K"],
    vs: { "1A":"H","1B":"F","1D":"B","1E":"C","1G":"A","1I":"D","1K":"I","1L":"K" }
  },
  {
    option: 450,
    qualifiedGroups: ["A","B","C","D","F","H","J","I"],
    vs: { "1A":"H","1B":"J","1D":"B","1E":"C","1G":"A","1I":"F","1K":"D","1L":"I" }
  },
  {
    option: 451,
    qualifiedGroups: ["A","B","C","D","F","G","K","L"],
    vs: { "1A":"C","1B":"G","1D":"B","1E":"D","1G":"A","1I":"F","1K":"L","1L":"K" }
  },
  {
    option: 452,
    qualifiedGroups: ["A","B","C","D","F","G","J","L"],
    vs: { "1A":"C","1B":"G","1D":"B","1E":"D","1G":"A","1I":"F","1K":"L","1L":"J" }
  },
  {
    option: 453,
    qualifiedGroups: ["A","B","C","D","F","G","J","K"],
    vs: { "1A":"C","1B":"G","1D":"B","1E":"D","1G":"A","1I":"F","1K":"J","1L":"K" }
  },
  {
    option: 454,
    qualifiedGroups: ["A","B","C","D","F","G","I","L"],
    vs: { "1A":"C","1B":"G","1D":"B","1E":"D","1G":"A","1I":"F","1K":"L","1L":"I" }
  },
  {
    option: 455,
    qualifiedGroups: ["A","B","C","D","F","G","I","K"],
    vs: { "1A":"C","1B":"G","1D":"B","1E":"D","1G":"A","1I":"F","1K":"I","1L":"K" }
  },
  {
    option: 456,
    qualifiedGroups: ["A","B","C","D","F","G","I","J"],
    vs: { "1A":"C","1B":"G","1D":"B","1E":"D","1G":"A","1I":"F","1K":"I","1L":"J" }
  },
  {
    option: 457,
    qualifiedGroups: ["A","B","C","D","F","G","H","L"],
    vs: { "1A":"C","1B":"G","1D":"B","1E":"D","1G":"A","1I":"F","1K":"L","1L":"H" }
  },
  {
    option: 458,
    qualifiedGroups: ["A","B","C","D","F","G","H","K"],
    vs: { "1A":"H","1B":"G","1D":"B","1E":"C","1G":"A","1I":"F","1K":"D","1L":"K" }
  },
  {
    option: 459,
    qualifiedGroups: ["A","B","C","D","F","G","H","J"],
    vs: { "1A":"H","1B":"G","1D":"B","1E":"C","1G":"A","1I":"F","1K":"D","1L":"J" }
  },
  {
    option: 460,
    qualifiedGroups: ["A","B","C","D","F","G","H","I"],
    vs: { "1A":"H","1B":"G","1D":"B","1E":"C","1G":"A","1I":"F","1K":"D","1L":"I" }
  },
  {
    option: 461,
    qualifiedGroups: ["A","B","C","D","E","J","K","L"],
    vs: { "1A":"E","1B":"J","1D":"B","1E":"C","1G":"A","1I":"D","1K":"L","1L":"K" }
  },
  {
    option: 462,
    qualifiedGroups: ["A","B","C","D","E","I","K","L"],
    vs: { "1A":"E","1B":"I","1D":"B","1E":"C","1G":"A","1I":"D","1K":"L","1L":"K" }
  },
  {
    option: 463,
    qualifiedGroups: ["A","B","C","D","E","J","L"],
    vs: { "1A":"E","1B":"J","1D":"B","1E":"C","1G":"A","1I":"D","1K":"L","1L":"I" }
  },
  {
    option: 464,
    qualifiedGroups: ["A","B","C","D","E","I","J","K"],
    vs: { "1A":"E","1B":"J","1D":"B","1E":"C","1G":"A","1I":"D","1K":"I","1L":"K" }
  },
  {
    option: 465,
    qualifiedGroups: ["A","B","C","D","E","H","L"],
    vs: { "1A":"H","1B":"E","1D":"B","1E":"C","1G":"A","1I":"D","1K":"L","1L":"K" }
  },
  {
    option: 466,
    qualifiedGroups: ["A","B","C","D","E","H","J","L"],
    vs: { "1A":"H","1B":"J","1D":"B","1E":"C","1G":"A","1I":"D","1K":"L","1L":"E" }
  },
  {
    option: 467,
    qualifiedGroups: ["A","B","C","D","E","H","J","K"],
    vs: { "1A":"H","1B":"J","1D":"B","1E":"C","1G":"A","1I":"D","1K":"E","1L":"K" }
  },
  {
    option: 468,
    qualifiedGroups: ["A","B","C","D","E","H","I","L"],
    vs: { "1A":"H","1B":"E","1D":"B","1E":"C","1G":"A","1I":"D","1K":"L","1L":"I" }
  },
  {
    option: 469,
    qualifiedGroups: ["A","B","C","D","E","H","I","K"],
    vs: { "1A":"H","1B":"E","1D":"B","1E":"C","1G":"A","1I":"D","1K":"I","1L":"K" }
  },
  {
    option: 470,
    qualifiedGroups: ["A","B","C","D","E","H","I","J"],
    vs: { "1A":"H","1B":"J","1D":"B","1E":"C","1G":"A","1I":"D","1K":"E","1L":"I" }
  },
  {
    option: 471,
    qualifiedGroups: ["A","B","C","D","E","G","L"],
    vs: { "1A":"E","1B":"G","1D":"B","1E":"C","1G":"A","1I":"D","1K":"L","1L":"K" }
  },
  {
    option: 472,
    qualifiedGroups: ["A","B","C","D","E","G","J","L"],
    vs: { "1A":"E","1B":"G","1D":"B","1E":"C","1G":"A","1I":"D","1K":"L","1L":"J" }
  },
  {
    option: 473,
    qualifiedGroups: ["A","B","C","D","E","G","J","K"],
    vs: { "1A":"E","1B":"G","1D":"B","1E":"C","1G":"A","1I":"D","1K":"J","1L":"K" }
  },
  {
    option: 474,
    qualifiedGroups: ["A","B","C","D","E","G","I","L"],
    vs: { "1A":"E","1B":"G","1D":"B","1E":"C","1G":"A","1I":"D","1K":"L","1L":"I" }
  },
  {
    option: 475,
    qualifiedGroups: ["A","B","C","D","E","G","I","K"],
    vs: { "1A":"E","1B":"G","1D":"B","1E":"C","1G":"A","1I":"D","1K":"I","1L":"K" }
  },
  {
    option: 476,
    qualifiedGroups: ["A","B","C","D","E","G","I","J"],
    vs: { "1A":"E","1B":"G","1D":"B","1E":"C","1G":"A","1I":"D","1K":"I","1L":"J" }
  },
  {
    option: 477,
    qualifiedGroups: ["A","B","C","D","E","G","H","L"],
    vs: { "1A":"H","1B":"G","1D":"B","1E":"C","1G":"A","1I":"D","1K":"L","1L":"E" }
  },
  {
    option: 478,
    qualifiedGroups: ["A","B","C","D","E","G","H","K"],
    vs: { "1A":"H","1B":"G","1D":"B","1E":"C","1G":"A","1I":"D","1K":"E","1L":"K" }
  },
  {
    option: 479,
    qualifiedGroups: ["A","B","C","D","E","G","H","J"],
    vs: { "1A":"H","1B":"G","1D":"B","1E":"C","1G":"A","1I":"D","1K":"E","1L":"J" }
  },
  {
    option: 480,
    qualifiedGroups: ["A","B","C","D","E","G","H","I"],
    vs: { "1A":"H","1B":"G","1D":"B","1E":"C","1G":"A","1I":"D","1K":"E","1L":"I" }
  },
  {
    option: 481,
    qualifiedGroups: ["A","B","C","D","E","F","K","L"],
    vs: { "1A":"C","1B":"E","1D":"B","1E":"D","1G":"A","1I":"F","1K":"L","1L":"K" }
  },
  {
    option: 482,
    qualifiedGroups: ["A","B","C","D","E","F","J","L"],
    vs: { "1A":"C","1B":"J","1D":"B","1E":"D","1G":"A","1I":"F","1K":"L","1L":"E" }
  },
  {
    option: 483,
    qualifiedGroups: ["A","B","C","D","E","F","J","K"],
    vs: { "1A":"C","1B":"J","1D":"B","1E":"D","1G":"A","1I":"F","1K":"E","1L":"K" }
  },
  {
    option: 484,
    qualifiedGroups: ["A","B","C","D","E","F","I","L"],
    vs: { "1A":"C","1B":"E","1D":"B","1E":"D","1G":"A","1I":"F","1K":"L","1L":"I" }
  },
  {
    option: 485,
    qualifiedGroups: ["A","B","C","D","E","F","I","K"],
    vs: { "1A":"C","1B":"E","1D":"B","1E":"D","1G":"A","1I":"F","1K":"I","1L":"K" }
  },
  {
    option: 486,
    qualifiedGroups: ["A","B","C","D","E","F","H","J","L"],
    vs: { "1A":"C","1B":"J","1D":"B","1E":"D","1G":"A","1I":"F","1K":"E","1L":"I" }
  },
  {
    option: 487,
    qualifiedGroups: ["A","B","C","D","E","F","H","L"],
    vs: { "1A":"H","1B":"F","1D":"B","1E":"C","1G":"A","1I":"D","1K":"L","1L":"E" }
  },
  {
    option: 488,
    qualifiedGroups: ["A","B","C","D","E","F","H","J","K"],
    vs: { "1A":"H","1B":"E","1D":"B","1E":"C","1G":"A","1I":"F","1K":"D","1L":"K" }
  },
  {
    option: 489,
    qualifiedGroups: ["A","B","C","D","E","F","H","J"],
    vs: { "1A":"H","1B":"J","1D":"B","1E":"C","1G":"A","1I":"F","1K":"D","1L":"E" }
  },
  {
    option: 490,
    qualifiedGroups: ["A","B","C","D","E","F","H","I"],
    vs: { "1A":"H","1B":"E","1D":"B","1E":"C","1G":"A","1I":"F","1K":"D","1L":"I" }
  },
  {
    option: 491,
    qualifiedGroups: ["A","B","C","D","F","G","L"],
    vs: { "1A":"C","1B":"G","1D":"B","1E":"D","1G":"A","1I":"F","1K":"L","1L":"E" }
  },
  {
    option: 492,
    qualifiedGroups: ["A","B","C","D","F","G","E","K"],
    vs: { "1A":"C","1B":"G","1D":"B","1E":"D","1G":"A","1I":"F","1K":"E","1L":"K" }
  },
  {
    option: 493,
    qualifiedGroups: ["A","B","C","D","F","G","E","J"],
    vs: { "1A":"C","1B":"G","1D":"B","1E":"D","1G":"A","1I":"F","1K":"E","1L":"J" }
  },
  {
    option: 494,
    qualifiedGroups: ["A","B","C","D","F","G","E","I"],
    vs: { "1A":"C","1B":"G","1D":"B","1E":"D","1G":"A","1I":"F","1K":"E","1L":"I" }
  },
  {
    option: 495,
    qualifiedGroups: ["A","B","C","D","E","F","G","H"],
    vs: { "1A":"H","1B":"G","1D":"B","1E":"C","1G":"A","1I":"F","1K":"D","1L":"E" }
  },
];

