// src/components/AwardsSummary.tsx
import Flag from "react-world-flags";

import { useGroups } from "../context/GroupsContext";
import { usePrediction } from "../context/PredictionContext";
import { useKnockout } from "../context/KnockoutContext";

import { buildTournamentStats, type TeamTournamentStats } from "../utils/tournamentStats";
import { pickTournamentAwards } from "../utils/awardsUtils";
import { computeStandings, type StandingRow } from "../utils/groupUtils";
import { resolvePlayoffTeam, type PlayoffSelection } from "../utils/resolvePlayoffTeams";

import { GROUPS } from "../data/groups";
import { PLAYOFF_SLOTS, type PlayoffSlotId } from "../data/playoffTeams";
import { KNOCKOUT_MATCHES } from "../data/knockoutMatches";

import type { Group, Team } from "../types/worldcup";
import type { KnockoutScore, TeamSource } from "../types/knockout";
import type { KnockoutState } from "../utils/autoPrediction";

import { es } from "../i18n/es";
import { en } from "../i18n/en";
import { teams, type Language } from "../i18n/team";

import fifaPlaceholder from "../assets/fifa-placeholder.jpg";

import "../styles/Groups.css";
import "../styles/AwardsSummary.css";

type AwardsSummaryProps = {
  language: Language;
};

type MatchesByGroup = Record<string, any>;

function getTexts(language: Language) {
  return language === "es" ? es : en;
}

function getGroupById(id: string): Group | undefined {
  return GROUPS.find((g) => g.id === id);
}

function resolveFlagCodeFromId(teamId?: string): string | undefined {
  if (!teamId) return undefined;

  for (const group of GROUPS) {
    const team = group.teams.find((x) => x.id === teamId);
    if (team?.flagCode) return String(team.flagCode);
  }

  for (const slot of PLAYOFF_SLOTS) {
    const candidate = slot.candidates.find((x) => x.id === teamId);
    if (candidate?.flagCode) return String(candidate.flagCode);
  }

  return undefined;
}

/* -------------------------------------------------------------------------- */
/* Playoff placeholders (user-visible labels)                                 */
/* -------------------------------------------------------------------------- */

function getPlayoffPlaceholderLabel(id: string, language: Language) {
  const mapEs: Record<PlayoffSlotId, string> = {
    INTER_1: "Repechaje Intercontinental 1",
    INTER_2: "Repechaje Intercontinental 2",
    UEFA_A: "Repechaje UEFA A",
    UEFA_B: "Repechaje UEFA B",
    UEFA_C: "Repechaje UEFA C",
    UEFA_D: "Repechaje UEFA D",
  };

  const mapEn: Record<PlayoffSlotId, string> = {
    INTER_1: "Intercontinental Playoff 1",
    INTER_2: "Intercontinental Playoff 2",
    UEFA_A: "UEFA Playoff A",
    UEFA_B: "UEFA Playoff B",
    UEFA_C: "UEFA Playoff C",
    UEFA_D: "UEFA Playoff D",
  };

  const key = id as PlayoffSlotId;
  const dict = language === "es" ? mapEs : mapEn;

  return dict[key] ?? id;
}

function getTeamDisplayName(teamId: string | undefined, fallback: string, language: Language) {
  if (!teamId) return fallback;

  const isPlayoffPlaceholder = teamId.startsWith("INTER_") || teamId.startsWith("UEFA_");
  if (isPlayoffPlaceholder) return getPlayoffPlaceholderLabel(teamId, language);

  return teams[language]?.[teamId] ?? fallback;
}

/* -------------------------------------------------------------------------- */
/* Rendering helpers (flag + name)                                            */
/* -------------------------------------------------------------------------- */

function renderTeamFlag(
  teamStat: TeamTournamentStats | null,
  hasAnyResult: boolean,
  playoffSelection: PlayoffSelection
) {
  if (!hasAnyResult || !teamStat?.team) {
    return <img src={fifaPlaceholder} alt="FIFA" />;
  }

  /* Playoff resolution must go through the single helper used across the app. */
  const resolvedTeam = resolvePlayoffTeam(teamStat.team, playoffSelection);

  const name = resolvedTeam.name ?? "Team";
  const directCode = resolvedTeam.flagCode;

  if (directCode) return <Flag code={String(directCode)} alt={name} />;

  /* Fallback for teams that do not carry flagCode directly. */
  const resolved = resolveFlagCodeFromId(resolvedTeam.id);
  if (resolved) return <Flag code={String(resolved)} alt={name} />;

  return <img src={fifaPlaceholder} alt={name} />;
}

function renderTeamName(
  teamStat: TeamTournamentStats | null,
  hasAnyResult: boolean,
  language: Language,
  playoffSelection: PlayoffSelection,
  fallbackEs = "Por definir",
  fallbackEn = "TBD"
) {
  const fallback = language === "es" ? fallbackEs : fallbackEn;

  if (!hasAnyResult || !teamStat?.team) return fallback;

  /* Playoff resolution must go through the single helper used across the app. */
  const resolvedTeam = resolvePlayoffTeam(teamStat.team, playoffSelection);

  /* Visible name always comes from i18n/team or a human label for placeholders. */
  return getTeamDisplayName(resolvedTeam.id, resolvedTeam.name ?? fallback, language);
}

/* -------------------------------------------------------------------------- */
/* Tournament reconstruction (derive knockout state from scores)              */
/* -------------------------------------------------------------------------- */

function getTeamIdByRank(
  groupId: string,
  rank: number,
  matchesByGroup: MatchesByGroup,
  resolveTeamBase: (t: Team) => Team
): string | null {
  const group = getGroupById(groupId);
  if (!group) return null;

  const matches = matchesByGroup[group.id] ?? [];
  const hasAny = matches.some((m: any) => m.homeGoals != null || m.awayGoals != null);
  if (!hasAny) return null;

  const standings: StandingRow[] = computeStandings(group, matches, resolveTeamBase);
  const row = standings[rank - 1];

  return row?.team?.id ?? null;
}

function getWinnerSideFromScore(score: KnockoutScore): "home" | "away" | null {
  const { home90, away90, homeET, awayET, homePens, awayPens } = score;

  if (home90 == null || away90 == null) return null;

  if (home90 > away90) return "home";
  if (away90 > home90) return "away";

  if (homeET == null || awayET == null) return null;

  const totalHome = home90 + homeET;
  const totalAway = away90 + awayET;

  if (totalHome > totalAway) return "home";
  if (totalAway > totalHome) return "away";

  if (homePens == null || awayPens == null) return null;

  if (homePens > awayPens) return "home";
  if (awayPens > homePens) return "away";

  return null;
}

function resolveSourceTeamId(
  source: TeamSource,
  matchesByGroup: MatchesByGroup,
  resolveTeamBase: (t: Team) => Team,
  winnerMap: Record<number, string | null>,
  loserMap: Record<number, string | null>
): string | null {
  if (source.kind !== "group") {
    return source.from === "winner"
      ? winnerMap[source.matchId] ?? null
      : loserMap[source.matchId] ?? null;
  }

  const label = source.label.trim();

  const direct = /^([123])([A-L])$/.exec(label);
  if (direct) {
    const rank = Number(direct[1]);
    const groupId = direct[2];
    return getTeamIdByRank(groupId, rank, matchesByGroup, resolveTeamBase);
  }

  const isThirdFromList = label.startsWith("3") && label.includes("/");
  if (isThirdFromList) {
    const allowed = label
      .slice(1)
      .split("/")
      .map((x) => x.trim());

    for (const g of allowed) {
      const id = getTeamIdByRank(g, 3, matchesByGroup, resolveTeamBase);
      if (id) return id;
    }

    return null;
  }

  return null;
}

function deriveKnockoutStateFromKoScores(opts: {
  koScores: Record<number, KnockoutScore>;
  matchesByGroup: MatchesByGroup;
  playoffSelection: PlayoffSelection;
}): KnockoutState {
  const { koScores, matchesByGroup, playoffSelection } = opts;

  /* The only allowed resolver: keep playoff logic consistent across the app. */
  const resolveTeamBase = (team: Team) => resolvePlayoffTeam(team, playoffSelection);

  const state: KnockoutState = {};
  const winnerMap: Record<number, string | null> = {};
  const loserMap: Record<number, string | null> = {};

  for (const match of KNOCKOUT_MATCHES) {
    const score: KnockoutScore =
      koScores[match.id] ?? {
        home90: null,
        away90: null,
        homeET: null,
        awayET: null,
        homePens: null,
        awayPens: null,
      };

    const homeTeamId = resolveSourceTeamId(
      match.home,
      matchesByGroup,
      resolveTeamBase,
      winnerMap,
      loserMap
    );

    const awayTeamId = resolveSourceTeamId(
      match.away,
      matchesByGroup,
      resolveTeamBase,
      winnerMap,
      loserMap
    );

    const winnerSide = getWinnerSideFromScore(score);

    const homeGoals =
      score.home90 == null || score.away90 == null ? null : score.home90 + (score.homeET ?? 0);

    const awayGoals =
      score.home90 == null || score.away90 == null ? null : score.away90 + (score.awayET ?? 0);

    let winnerTeamId: string | null = null;
    let loserTeamId: string | null = null;

    if (winnerSide === "home") {
      winnerTeamId = homeTeamId;
      loserTeamId = awayTeamId;
    } else if (winnerSide === "away") {
      winnerTeamId = awayTeamId;
      loserTeamId = homeTeamId;
    }

    winnerMap[match.id] = winnerTeamId;
    loserMap[match.id] = loserTeamId;

    state[match.id] = {
      matchId: match.id,
      homeTeamId,
      awayTeamId,
      homeGoals,
      awayGoals,
      winnerTeamId,
    };
  }

  return state;
}

/* -------------------------------------------------------------------------- */
/* Component                                                                  */
/* -------------------------------------------------------------------------- */

export function AwardsSummary({ language }: AwardsSummaryProps) {
  const t = getTexts(language);

  const { matchesByGroup } = useGroups();
  const { playoffSelection } = usePrediction();
  const { koScores } = useKnockout();

  const hasAnyGroupResult = Object.values(matchesByGroup).some((matches: any) =>
    matches.some((m: any) => m.homeGoals != null || m.awayGoals != null)
  );

  const hasAnyKoResult = Object.values(koScores).some(
    (s) => s?.home90 != null || s?.away90 != null
  );

  const hasAnyResult = hasAnyGroupResult || hasAnyKoResult;

  const derivedKnockoutState = deriveKnockoutStateFromKoScores({
    koScores,
    matchesByGroup: matchesByGroup as any,
    playoffSelection: playoffSelection as unknown as PlayoffSelection,
  });

  const stats = buildTournamentStats(matchesByGroup, derivedKnockoutState, playoffSelection);
  const { revelation, disappointment, worst, topScoring } = pickTournamentAwards(stats);

  const selection = playoffSelection as unknown as PlayoffSelection;

  return (
    <section className="awards-section">
      <h3 className="awards-title">{t.highlights.title}</h3>

      <div className="awards-row">
        <div className="award-card">
          <div className="award-logo">{renderTeamFlag(revelation, hasAnyResult, selection)}</div>
          <h4 className="award-title">{t.highlights.surprise}</h4>
          <p className="award-team">
            {renderTeamName(revelation, hasAnyResult, language, selection)}
          </p>
        </div>

        <div className="award-card">
          <div className="award-logo">{renderTeamFlag(disappointment, hasAnyResult, selection)}</div>
          <h4 className="award-title">{t.highlights.disappointment}</h4>
          <p className="award-team">
            {renderTeamName(disappointment, hasAnyResult, language, selection)}
          </p>
        </div>

        <div className="award-card">
          <div className="award-logo">{renderTeamFlag(worst, hasAnyResult, selection)}</div>
          <h4 className="award-title">{t.highlights.worst}</h4>
          <p className="award-team">{renderTeamName(worst, hasAnyResult, language, selection)}</p>
        </div>

        <div className="award-card">
          <div className="award-logo">{renderTeamFlag(topScoring, hasAnyResult, selection)}</div>
          <h4 className="award-title">{t.highlights.topScorer}</h4>
          <p className="award-team">
            {renderTeamName(topScoring, hasAnyResult, language, selection)}
          </p>
        </div>
      </div>
    </section>
  );
}
