// src/utils/groupUtils.ts
import type { Group, GroupMatch, Team } from "../types/worldcup";

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

export type StandingRow = {
  team: Team;
  played: number;
  points: number;
  gf: number;
  ga: number;
  gd: number;
};

/* -------------------------------------------------------------------------- */
/* Helpers                                                                    */
/* -------------------------------------------------------------------------- */

function createEmptyRow(team: Team): StandingRow {
  return {
    team,
    played: 0,
    points: 0,
    gf: 0,
    ga: 0,
    gd: 0,
  };
}

function isPlayed(match: GroupMatch): boolean {
  return match.homeGoals != null && match.awayGoals != null;
}

/* -------------------------------------------------------------------------- */
/* Public API                                                                 */
/* -------------------------------------------------------------------------- */

// Genera los 6 partidos de un grupo de 4 equipos
export function generateInitialMatches(group: Group): GroupMatch[] {
  const teamIds = group.teams.map((t) => t.id);

  // (0-1) (2-3) (0-2) (1-3) (0-3) (1-2)
  const pairs: Array<[number, number]> = [
    [0, 1],
    [2, 3],
    [0, 2],
    [1, 3],
    [0, 3],
    [1, 2],
  ];

  return pairs.map(([i, j], index) => ({
    id: `${group.id}-${index + 1}`,
    groupId: group.id,
    homeTeamId: teamIds[i],
    awayTeamId: teamIds[j],
    homeGoals: null,
    awayGoals: null,
  }));
}

// Calcula la tabla de posiciones de un grupo usando:
// - los partidos jugados
// - una función resolveTeam (para aplicar repechajes y placeholders)
export function computeStandings(
  group: Group,
  matches: GroupMatch[],
  resolveTeam: (team: Team) => Team
): StandingRow[] {
  const rows = new Map<string, StandingRow>();

  // 1) Inicializar todas las filas en 0 (ya resueltas por resolveTeam)
  for (const team of group.teams) {
    const realTeam = resolveTeam(team);
    rows.set(realTeam.id, createEmptyRow(realTeam));
  }

  // 2) Procesar partidos jugados
  for (const match of matches) {
    if (!isPlayed(match)) continue;

    const rawHome = group.teams.find((t) => t.id === match.homeTeamId);
    const rawAway = group.teams.find((t) => t.id === match.awayTeamId);
    if (!rawHome || !rawAway) continue;

    const homeTeam = resolveTeam(rawHome);
    const awayTeam = resolveTeam(rawAway);

    const homeRow = rows.get(homeTeam.id);
    const awayRow = rows.get(awayTeam.id);
    if (!homeRow || !awayRow) continue;

    const hg = match.homeGoals as number;
    const ag = match.awayGoals as number;

    homeRow.played += 1;
    awayRow.played += 1;

    homeRow.gf += hg;
    homeRow.ga += ag;
    homeRow.gd = homeRow.gf - homeRow.ga;

    awayRow.gf += ag;
    awayRow.ga += hg;
    awayRow.gd = awayRow.gf - awayRow.ga;

    if (hg > ag) homeRow.points += 3;
    else if (hg < ag) awayRow.points += 3;
    else {
      homeRow.points += 1;
      awayRow.points += 1;
    }
  }

  const values = Array.from(rows.values());
  const allUnplayed = values.every((r) => r.played === 0);

  // 3) Si no se jugó ningún partido, respetamos orden original del grupo
  if (allUnplayed) {
    const ordered: StandingRow[] = [];
    for (const team of group.teams) {
      const realTeam = resolveTeam(team);
      const row = rows.get(realTeam.id);
      if (row) ordered.push(row);
    }
    return ordered;
  }

  // 4) Si hay partidos, ordenamos por rendimiento deportivo
  return values.sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    if (b.gd !== a.gd) return b.gd - a.gd;
    if (b.gf !== a.gf) return b.gf - a.gf;
    return a.team.name.localeCompare(b.team.name);
  });
}
