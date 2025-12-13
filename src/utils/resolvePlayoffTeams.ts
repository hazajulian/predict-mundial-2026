// src/utils/resolvePlayoffTeam.ts

import { PLAYOFF_SLOTS, type PlayoffCandidate } from "../data/playoffTeams";
import type { Team } from "../types/worldcup";

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

/**
 * Selección de ganadores de repechaje.
 * - key: PlayoffSlotId
 * - value: teamId ganador o null si no se eligió
 */
export type PlayoffSelection = Record<string, string | null | undefined>;

/* -------------------------------------------------------------------------- */
/* Public API                                                                 */
/* -------------------------------------------------------------------------- */

/**
 * Resuelve un equipo que proviene de repechaje.
 *
 * Comportamiento:
 * - Si el equipo NO es de repechaje → se devuelve tal cual.
 * - Si es de repechaje y NO hay ganador elegido →
 *   se mantiene el placeholder (id original) y sin bandera.
 * - Si hay ganador elegido →
 *   se reemplaza el id y la bandera por los del ganador.
 *
 * IMPORTANTE:
 * - El nombre visible NO se resuelve acá.
 * - La traducción se hace posteriormente vía i18n (team.ts).
 */
export function resolvePlayoffTeam(
  team: Team,
  playoffSelection: PlayoffSelection
): Team {
  // 1) El equipo no proviene de repechaje → no se modifica
  if (!team.playoffSlotId) return team;

  // 2) ID seleccionado para ese slot (o null si no hay elección)
  const selectedId = playoffSelection[team.playoffSlotId] ?? null;

  // 3) Slot de repechaje correspondiente
  const slot = PLAYOFF_SLOTS.find(
    (s) => s.id === team.playoffSlotId
  );

  // 4) Candidato ganador dentro del slot
  const winner: PlayoffCandidate | undefined =
    slot?.candidates.find((c) => c.id === selectedId);

  // 5) Sin ganador elegido → mantener placeholder
  if (!winner) {
    return {
      ...team,
      flagCode: undefined,
    };
  }

  // 6) Ganador elegido → reemplazar id y bandera
  return {
    ...team,
    id: winner.id,
    flagCode: winner.flagCode,
  };
}
