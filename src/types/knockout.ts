// src/types/knockout.ts

/* -------------------------------------------------------------------------- */
/* Rounds                                                                     */
/* -------------------------------------------------------------------------- */
/**
 * Identificadores de las rondas del cuadro eliminatorio.
 * Se usan tanto para lógica como para renderizado.
 */
export type RoundName =
  | "16vos"
  | "8vos"
  | "4tos"
  | "Semis"
  | "Final"
  | "3er puesto";

/* -------------------------------------------------------------------------- */
/* Team source                                                                */
/* -------------------------------------------------------------------------- */
/**
 * Origen de un equipo en el cuadro eliminatorio.
 *
 * - "group": proviene de la fase de grupos (ej: "1A", "2B", "3A/B/C/D/F").
 * - "advance": proviene del resultado de otro partido (ganador o perdedor).
 */
export type TeamSource =
  | {
      kind: "group";
      label: string;
    }
  | {
      kind: "advance";
      from: "winner" | "loser";
      matchId: number;
    };

/* -------------------------------------------------------------------------- */
/* Knockout match                                                             */
/* -------------------------------------------------------------------------- */
/**
 * Definición estructural de un partido de eliminación directa.
 * No contiene resultados, solo referencias y metadata.
 */
export type KnockoutMatch = {
  id: number;
  round: RoundName;
  home: TeamSource;
  away: TeamSource;
};

/* -------------------------------------------------------------------------- */
/* Resolved slot                                                              */
/* -------------------------------------------------------------------------- */
/**
 * Representación final de un equipo ya resuelto para mostrar en el cuadro.
 *
 * - name: nombre visible (ya traducido o placeholder humano).
 * - flagCode: código ISO para la bandera (si existe).
 * - isPlaceholder: indica si el slot todavía no está definido.
 */
export type ResolvedSlot = {
  name: string;
  flagCode?: string;
  isPlaceholder: boolean;
};

/* -------------------------------------------------------------------------- */
/* Match score                                                                */
/* -------------------------------------------------------------------------- */
/**
 * Resultado completo de un partido eliminatorio.
 *
 * - 90': goles en tiempo reglamentario.
 * - ET: goles en tiempo extra.
 * - Pens: goles en penales.
 *
 * Todos los valores pueden ser null si aún no se jugaron.
 */
export type KnockoutScore = {
  home90: number | null;
  away90: number | null;
  homeET: number | null;
  awayET: number | null;
  homePens: number | null;
  awayPens: number | null;
};

/**
 * Claves válidas del score (útil para handlers genéricos).
 */
export type KnockoutScoreKey = keyof KnockoutScore;

/* -------------------------------------------------------------------------- */
/* Winner info                                                                */
/* -------------------------------------------------------------------------- */
/**
 * Lado ganador del partido.
 * - "draw" se usa cuando hay empate sin definición aún.
 */
export type WinnerSide = "home" | "away" | "draw" | null;

/**
 * Forma en la que se definió el ganador.
 * - 90  = tiempo reglamentario
 * - ET  = tiempo extra
 * - PEN = penales
 */
export type WinnerDecision = "90" | "ET" | "PEN" | null;

/* -------------------------------------------------------------------------- */
/* Constants                                                                  */
/* -------------------------------------------------------------------------- */
/**
 * Estado inicial estándar de un score de knockout.
 * Se reutiliza en context, utils y componentes.
 */
export const EMPTY_SCORE: KnockoutScore = {
  home90: null,
  away90: null,
  homeET: null,
  awayET: null,
  homePens: null,
  awayPens: null,
};
