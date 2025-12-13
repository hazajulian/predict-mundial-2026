// src/components/GroupCard.tsx
import { useEffect, useMemo, useState } from "react";
import Flag from "react-world-flags";

import type { Group, GroupMatch, Team } from "../types/worldcup";
import { computeStandings, type StandingRow } from "../utils/groupUtils";
import { resolvePlayoffTeam, type PlayoffSelection } from "../utils/resolvePlayoffTeams";

import { useGroups } from "../context/GroupsContext";
import { usePrediction } from "../context/PredictionContext";

import { es } from "../i18n/es";
import { en } from "../i18n/en";
import { getTeamName, type Language } from "../i18n/team";

import fifaPlaceholder from "../assets/fifa-placeholder.jpg";

type GroupCardProps = {
  group: Group;
  showAllMatches?: boolean;
  language: Language;
};

function isPlayoffSlotId(id: string) {
  return id.startsWith("INTER_") || id.startsWith("UEFA_");
}

function getPlayoffSlotLabel(id: string, language: Language) {
  const normalizedId = id.endsWith("_WINNER") ? id.replace("_WINNER", "") : id;

  const esMap: Record<string, string> = {
    INTER_1: "INTER 1",
    INTER_2: "INTER 2",
    UEFA_A: "UEFA A",
    UEFA_B: "UEFA B",
    UEFA_C: "UEFA C",
    UEFA_D: "UEFA D",
  };

  const enMap: Record<string, string> = {
    INTER_1: "INTER 1",
    INTER_2: "INTER 2",
    UEFA_A: "UEFA A",
    UEFA_B: "UEFA B",
    UEFA_C: "UEFA C",
    UEFA_D: "UEFA D",
  };

  return (language === "es" ? esMap : enMap)[normalizedId] ?? id;
}

export function GroupCard({ group, showAllMatches, language }: GroupCardProps) {
  const t = language === "es" ? es : en;

  const { playoffSelection } = usePrediction();
  const { matchesByGroup, updateMatchScore, resetGroup } = useGroups();

  const matches: GroupMatch[] = matchesByGroup[group.id] ?? [];
  const [showMatches, setShowMatches] = useState(false);

  useEffect(() => {
    if (showAllMatches === true) setShowMatches(true);
    if (showAllMatches === false) setShowMatches(false);
  }, [showAllMatches]);

  function getDisplayName(teamId: string, fallback: string) {
    if (isPlayoffSlotId(teamId)) return getPlayoffSlotLabel(teamId, language);
    return getTeamName(language, teamId, fallback);
  }

  function resolveTeam(team: Team): Team {
    /* Keep playoff resolution consistent across the app using the shared helper. */
    const resolved = resolvePlayoffTeam(team, playoffSelection as unknown as PlayoffSelection);

    /* This component is allowed to set the "name" field for UI rendering only. */
    return {
      ...resolved,
      name: getDisplayName(resolved.id, team.name ?? resolved.id),
    };
  }

  const standings: StandingRow[] = useMemo(() => {
    return computeStandings(group, matches, resolveTeam);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [group, matches, playoffSelection, language]);

  function handleScoreChange(
    matchId: string,
    field: "homeGoals" | "awayGoals",
    value: string
  ) {
    const parsed = value === "" ? null : Math.max(0, Number.parseInt(value, 10) || 0);
    updateMatchScore(group.id, matchId, field, parsed);
  }

  function getDisplayTeam(id: string): Team {
    const base = group.teams.find((t) => t.id === id);

    if (base) return resolveTeam(base);

    return {
      id,
      name: getDisplayName(id, id),
      groupId: group.id,
    } as Team;
  }

  return (
    <div className="group-card">
      <div className="group-card__inner">
        <div className="group-card__header-row">
          <h3 className="group-card__title">
            {t.groups.group} {group.id}
          </h3>

          <button
            type="button"
            className="group-card__matches-toggle"
            onClick={() => setShowMatches((prev) => !prev)}
          >
            {showMatches ? t.groups.hideMatches : t.groups.viewMatches}
          </button>
        </div>

        <div className="group-card__content">
          <table className="group-card__table">
            <thead>
              <tr>
                <th className="group-card__table-header group-card__table-header--team">
                  {t.groups.team}
                </th>
                <th className="group-card__table-header">{t.groups.played}</th>
                <th className="group-card__table-header">{t.groups.points}</th>
                <th className="group-card__table-header">{t.groups.goalsFor}</th>
                <th className="group-card__table-header">{t.groups.goalsAgainst}</th>
                <th className="group-card__table-header">{t.groups.goalDiff}</th>
              </tr>
            </thead>

            <tbody>
              {standings.map((row) => {
                const teamName = row.team.name ?? row.team.id;
                const isLongName = teamName.length > 16;

                const slotId = row.team.playoffSlotId;
                const isPlayoffPlaceholder = Boolean(slotId) && !playoffSelection[slotId!];

                return (
                  <tr key={row.team.id} className="group-card__standing-row">
                    <td className="group-card__team-cell">
                      <div className="group-card__team-info">
                        {isPlayoffPlaceholder ? (
                          <img src={fifaPlaceholder} alt="placeholder" className="group-card__flag" />
                        ) : row.team.flagCode ? (
                          <Flag code={String(row.team.flagCode)} className="group-card__flag" />
                        ) : (
                          <img src={fifaPlaceholder} alt="placeholder" className="group-card__flag" />
                        )}

                        <span
                          className={
                            "group-card__team-name" +
                            (isLongName ? " group-card__team-name--long" : "")
                          }
                        >
                          {teamName}
                        </span>
                      </div>
                    </td>

                    <td className="group-card__number-cell">{row.played}</td>
                    <td className="group-card__number-cell">{row.points}</td>
                    <td className="group-card__number-cell">{row.gf}</td>
                    <td className="group-card__number-cell">{row.ga}</td>
                    <td className="group-card__number-cell">{row.gd}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {showMatches && (
            <div className="group-card__matches">
              <h4 className="group-card__matches-title">{t.groups.matchesTitle}</h4>

              <ul className="group-card__matches-list">
                {matches.map((match) => {
                  const home = getDisplayTeam(match.homeTeamId);
                  const away = getDisplayTeam(match.awayTeamId);

                  return (
                    <li key={match.id} className="group-card__match-row">
                      <span className="group-card__team-label group-card__team-label--home">
                        {home.name}
                      </span>

                      <input
                        type="number"
                        min={0}
                        className="group-card__score-input"
                        value={match.homeGoals ?? ""}
                        onChange={(e) => handleScoreChange(match.id, "homeGoals", e.target.value)}
                      />

                      <span className="group-card__score-separator">-</span>

                      <input
                        type="number"
                        min={0}
                        className="group-card__score-input"
                        value={match.awayGoals ?? ""}
                        onChange={(e) => handleScoreChange(match.id, "awayGoals", e.target.value)}
                      />

                      <span className="group-card__team-label group-card__team-label--away">
                        {away.name}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>

        <button type="button" className="group-card__reset-button" onClick={() => resetGroup(group.id)}>
          {t.groups.resetGroup}
        </button>
      </div>
    </div>
  );
}
