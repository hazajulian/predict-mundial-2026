// src/types/worldcup.ts

import type { PlayoffSlotId } from "../data/playoffTeams";

/* -------------------------------------------------------------------------- */
/* Group IDs                                                                  */
/* -------------------------------------------------------------------------- */
/**
 * Identificadores válidos de los 12 grupos del Mundial.
 * Se usan como referencia tipada en toda la app.
 */
export type GroupId =
  | "A" | "B" | "C" | "D"
  | "E" | "F" | "G" | "H"
  | "I" | "J" | "K" | "L";

/* -------------------------------------------------------------------------- */
/* Team                                                                       */
/* -------------------------------------------------------------------------- */
/**
 * Representa una selección participante del torneo.
 *
 * IMPORTANTE:
 * - `id` es el identificador interno (no traducido).
 * - `name` es el nombre visible (resuelto vía i18n o UI).
 * - Los campos de repechaje solo existen cuando aplica.
 */
export type Team = {
  id: string;                 // ID único interno
  name: string;               // Nombre a mostrar
  groupId: GroupId;           // Grupo al que pertenece
  flagCode?: string;          // Código ISO para bandera
  isPlayoff?: boolean;        // Indica si proviene de repechaje
  playoffSlotId?: PlayoffSlotId; // Slot de repechaje asociado
};

/* -------------------------------------------------------------------------- */
/* Group                                                                      */
/* -------------------------------------------------------------------------- */
/**
 * Estructura de un grupo del Mundial.
 */
export type Group = {
  id: GroupId;
  teams: Team[];
};

/* -------------------------------------------------------------------------- */
/* Group match                                                                */
/* -------------------------------------------------------------------------- */
/**
 * Partido correspondiente a la fase de grupos.
 *
 * Los goles pueden ser null cuando el partido aún no fue jugado
 * o cuando el usuario todavía no cargó el resultado.
 */
export type GroupMatch = {
  id: string;                 // ID único del partido
  groupId: GroupId;           // Grupo al que pertenece
  homeTeamId: string;         // ID del equipo local
  awayTeamId: string;         // ID del equipo visitante
  homeGoals: number | null;   // Goles del local
  awayGoals: number | null;   // Goles del visitante
};
