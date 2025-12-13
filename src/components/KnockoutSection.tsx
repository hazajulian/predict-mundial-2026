// src/components/KnockoutSection.tsx
import { useEffect, useMemo, useState } from "react";
import Flag from "react-world-flags";

import { GROUPS } from "../data/groups";
import { KNOCKOUT_MATCHES } from "../data/knockoutMatches";
import { FIFA_THIRD_TABLE, type ThirdGroupLetter, type WinnerSlotId } from "../data/fifaThirdTable";

import { useGroups } from "../context/GroupsContext";
import { useKnockout } from "../context/KnockoutContext";
import { usePrediction } from "../context/PredictionContext";

import { computeStandings, type StandingRow } from "../utils/groupUtils";
import { getRank } from "../utils/autoPrediction";
import { resolvePlayoffTeam, type PlayoffSelection } from "../utils/resolvePlayoffTeams";

import type {
  EMPTY_SCORE,
  KnockoutMatch,
  KnockoutScore,
  KnockoutScoreKey,
  ResolvedSlot,
  RoundName,
  TeamSource,
  WinnerDecision,
  WinnerSide,
} from "../types/knockout";
import { EMPTY_SCORE as EMPTY_SCORE_VALUE } from "../types/knockout";

import { KnockoutMatchCard } from "./KnockoutMatchCard";

import { es } from "../i18n/es";
import { en } from "../i18n/en";
import { getTeamName, type Language } from "../i18n/team";

import fifaPlaceholder from "../assets/fifa-placeholder.jpg";
import trophyImg from "../assets/trophy2.png";

import "../styles/Knockout.css";

type KnockoutSectionProps = {
  language: Language;
};

type ThirdInfo = {
  groupId: string;
  standing: StandingRow;
};

type ThirdAssignmentMap = Partial<Record<WinnerSlotId, ThirdInfo>>;

type VmMatch = {
  match: KnockoutMatch;
  home: ResolvedSlot;
  away: ResolvedSlot;
  score: KnockoutScore;
  winnerSide: WinnerSide;
  winnerDecision: WinnerDecision;
  disabled: boolean;
};

type Side = "left" | "right" | "center";

type ByRoundSide = {
  [R in RoundName]: {
    left: VmMatch[];
    right: VmMatch[];
    center: VmMatch[];
  };
};

const ROUNDS_ORDER: RoundName[] = ["16vos", "8vos", "4tos", "Semis", "Final", "3er puesto"];

const LS_GROUPS_KEY = "wm26_groups";
const LS_PLAYOFF_KEY = "wm26_playoffSelection";
const LS_KO_SCORES_KEY = "wm26_knockoutScores";

const KO_COLUMNS: Array<{
  key: string;
  type: "round";
  round: RoundName;
  side: Side;
}> = [
  { key: "16L", type: "round", round: "16vos", side: "left" },
  { key: "8L", type: "round", round: "8vos", side: "left" },
  { key: "4L", type: "round", round: "4tos", side: "left" },
  { key: "SL", type: "round", round: "Semis", side: "left" },
  { key: "CENTER", type: "round", round: "Final", side: "center" },
  { key: "SR", type: "round", round: "Semis", side: "right" },
  { key: "4R", type: "round", round: "4tos", side: "right" },
  { key: "8R", type: "round", round: "8vos", side: "right" },
  { key: "16R", type: "round", round: "16vos", side: "right" },
];

/* -------------------------------------------------------------------------- */
/* UI helpers                                                                 */
/* -------------------------------------------------------------------------- */

function PodiumFlag({ slot, language }: { slot: ResolvedSlot | null; language: Language }) {
  if (slot?.flagCode) {
    return <Flag code={String(slot.flagCode)} className="ko-podium-flag" />;
  }

  return (
    <img
      src={fifaPlaceholder}
      alt={language === "es" ? "Bandera por definir" : "Flag TBD"}
      className="ko-podium-flag"
    />
  );
}

function ConfirmModal({
  open,
  title,
  text,
  cancelText,
  confirmText,
  onCancel,
  onConfirm,
}: {
  open: boolean;
  title: string;
  text: string;
  cancelText: string;
  confirmText: string;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  if (!open) return null;

  return (
    <div className="ko-modal-overlay">
      <div className="ko-modal">
        <h3 className="ko-modal-title">{title}</h3>
        <p className="ko-modal-text">{text}</p>

        <div className="ko-modal-buttons">
          <button type="button" className="ko-modal-btn ko-modal-btn--cancel" onClick={onCancel}>
            {cancelText}
          </button>

          <button type="button" className="ko-modal-btn ko-modal-btn--confirm" onClick={onConfirm}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

function isPlayoffSlotId(id: string) {
  return id.startsWith("INTER_") || id.startsWith("UEFA_");
}

function getPlayoffSlotLabel(id: string, language: Language) {
  const esMap: Record<string, string> = {
    INTER_1: "Repechaje Intercontinental 1",
    INTER_2: "Repechaje Intercontinental 2",
    UEFA_A: "Repechaje UEFA A",
    UEFA_B: "Repechaje UEFA B",
    UEFA_C: "Repechaje UEFA C",
    UEFA_D: "Repechaje UEFA D",
  };

  const enMap: Record<string, string> = {
    INTER_1: "Intercontinental Playoff 1",
    INTER_2: "Intercontinental Playoff 2",
    UEFA_A: "UEFA Playoff A",
    UEFA_B: "UEFA Playoff B",
    UEFA_C: "UEFA Playoff C",
    UEFA_D: "UEFA Playoff D",
  };

  return (language === "es" ? esMap : enMap)[id] ?? id;
}

/* -------------------------------------------------------------------------- */
/* Component                                                                  */
/* -------------------------------------------------------------------------- */

export function KnockoutSection({ language }: KnockoutSectionProps) {
  const t = language === "es" ? es : en;

  const { matchesByGroup } = useGroups();
  const { playoffSelection } = usePrediction();
  const { knockoutState, resetKnockout, koScores, updateKoScore, resetKoScores } = useKnockout();

  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [confirmResetAll, setConfirmResetAll] = useState(false);

  useEffect(() => {
    /*
      Sync: when the derived knockout state changes, refresh the KO input scores.
      We only hydrate the "90 minutes" fields to keep the UI consistent.
    */
    const values = Object.values(knockoutState);
    if (!values.length) return;

    const hasAnyGoals = values.some((st) => st.homeGoals != null || st.awayGoals != null);
    if (!hasAnyGoals) return;

    for (const match of KNOCKOUT_MATCHES) {
      updateKoScore(match.id, "home90", "");
      updateKoScore(match.id, "away90", "");
      updateKoScore(match.id, "homeET", "");
      updateKoScore(match.id, "awayET", "");
      updateKoScore(match.id, "homePens", "");
      updateKoScore(match.id, "awayPens", "");
    }

    for (const st of values) {
      if (st.homeGoals == null || st.awayGoals == null) continue;
      updateKoScore(st.matchId, "home90", String(st.homeGoals));
      updateKoScore(st.matchId, "away90", String(st.awayGoals));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [knockoutState]);

  /* ---------------------------------------------------------------------- */
  /* Name resolution (UI) + playoff resolution (shared helper)              */
  /* ---------------------------------------------------------------------- */

  function getDisplayNameById(teamId: string, fallback: string) {
    if (isPlayoffSlotId(teamId)) return getPlayoffSlotLabel(teamId, language);
    return getTeamName(language, teamId, fallback);
  }

  function resolveTeamForStandings(team: import("../types/worldcup").Team) {
    const resolved = resolvePlayoffTeam(team, playoffSelection as unknown as PlayoffSelection);

    return {
      ...resolved,
      name: getDisplayNameById(resolved.id, team.name ?? resolved.id),
    };
  }

  function safeGetRank(teamId: string) {
    if (isPlayoffSlotId(teamId)) return 9999;
    return getRank(teamId);
  }

  function getGroupById(id: string) {
    return GROUPS.find((g) => g.id === id);
  }

  function getTeamByRank(groupId: string, rank: number): ResolvedSlot | null {
    const group = getGroupById(groupId);
    if (!group) return null;

    const matches = matchesByGroup[group.id] ?? [];
    const hasAnyResult = matches.some((m: any) => m.homeGoals != null || m.awayGoals != null);
    if (!hasAnyResult) return null;

    const standings = computeStandings(group, matches, resolveTeamForStandings);
    const row = standings[rank - 1];
    if (!row) return null;

    const name = getDisplayNameById(row.team.id, row.team.name ?? row.team.id);

    return {
      name,
      flagCode: row.team.flagCode,
      isPlaceholder: false,
    };
  }

  /* ---------------------------------------------------------------------- */
  /* Best third-placed teams (FIFA mapping)                                  */
  /* ---------------------------------------------------------------------- */

  function buildThirdContext(): { bestThirds: ThirdInfo[]; thirdAssignment: ThirdAssignmentMap } {
    const list: ThirdInfo[] = [];

    for (const group of GROUPS) {
      const matches = matchesByGroup[group.id] ?? [];
      const hasAnyResult = matches.some((m: any) => m.homeGoals != null || m.awayGoals != null);
      if (!hasAnyResult) continue;

      const standings = computeStandings(group, matches, resolveTeamForStandings);
      const third = standings[2];
      if (!third) continue;

      list.push({ groupId: group.id, standing: third });
    }

    list.sort((a, b) => {
      const sa = a.standing;
      const sb = b.standing;

      if (sb.points !== sa.points) return sb.points - sa.points;
      if (sb.gd !== sa.gd) return sb.gd - sa.gd;
      if (sb.gf !== sa.gf) return sb.gf - sa.gf;

      return safeGetRank(sa.team.id) - safeGetRank(sb.team.id);
    });

    const qualified = list.slice(0, 8);
    if (qualified.length < 8) return { bestThirds: list, thirdAssignment: {} };

    const qualifiedLetters = qualified.map((t) => t.groupId as ThirdGroupLetter).sort();

    const row = FIFA_THIRD_TABLE.find((r) => {
      if (r.qualifiedGroups.length !== qualifiedLetters.length) return false;
      return r.qualifiedGroups.every((g, idx) => g === qualifiedLetters[idx]);
    });

    if (!row) return { bestThirds: list, thirdAssignment: {} };

    const assignment: ThirdAssignmentMap = {};
    for (const [winnerId, groupLetter] of Object.entries(row.vs)) {
      const info = list.find((t) => t.groupId === groupLetter);
      if (!info) continue;
      assignment[winnerId as WinnerSlotId] = info;
    }

    return { bestThirds: list, thirdAssignment: assignment };
  }

  function getWinnerSlotIdForThird(match: KnockoutMatch, side: "home" | "away"): WinnerSlotId | null {
    const source = side === "home" ? match.home : match.away;
    if (source.kind !== "group") return null;

    const label = source.label.trim();
    if (!label.startsWith("3")) return null;

    const other = side === "home" ? match.away : match.home;
    if (other.kind !== "group") return null;

    const otherLabel = other.label.trim();
    const m = /^1([A-L])$/.exec(otherLabel);
    if (!m) return null;

    return `1${m[1]}` as WinnerSlotId;
  }

  function resolveGroupSlot(
    label: string,
    usedThirdGroups: Set<string>,
    bestThirds: ThirdInfo[],
    thirdAssignment: ThirdAssignmentMap,
    fifaWinnerSlotId: WinnerSlotId | null
  ): ResolvedSlot {
    const trimmed = label.trim();

    if (trimmed.startsWith("3") && trimmed.includes("/")) {
      const groupsAllowed = trimmed
        .slice(1)
        .split("/")
        .map((g) => g.trim());

      const assigned = fifaWinnerSlotId ? thirdAssignment[fifaWinnerSlotId] : null;

      if (
        assigned &&
        groupsAllowed.includes(assigned.groupId) &&
        !usedThirdGroups.has(assigned.groupId)
      ) {
        usedThirdGroups.add(assigned.groupId);
        const id = assigned.standing.team.id;

        return {
          name: getDisplayNameById(id, assigned.standing.team.name ?? id),
          flagCode: assigned.standing.team.flagCode,
          isPlaceholder: false,
        };
      }

      const candidate = bestThirds.find(
        (t) => groupsAllowed.includes(t.groupId) && !usedThirdGroups.has(t.groupId)
      );

      if (!candidate) {
        return { name: trimmed, flagCode: undefined, isPlaceholder: true };
      }

      usedThirdGroups.add(candidate.groupId);
      const id = candidate.standing.team.id;

      return {
        name: getDisplayNameById(id, candidate.standing.team.name ?? id),
        flagCode: candidate.standing.team.flagCode,
        isPlaceholder: false,
      };
    }

    const m = /^([123])([A-L])$/.exec(trimmed);
    if (!m) return { name: trimmed, flagCode: undefined, isPlaceholder: true };

    const rank = Number(m[1]);
    const groupId = m[2];

    return (
      getTeamByRank(groupId, rank) ?? {
        name: trimmed,
        flagCode: undefined,
        isPlaceholder: true,
      }
    );
  }

  /* ---------------------------------------------------------------------- */
  /* Winner decision (90 / ET / PEN)                                         */
  /* ---------------------------------------------------------------------- */

  function getWinnerInfo(score: KnockoutScore): { side: WinnerSide; decision: WinnerDecision } {
    const { home90, away90, homeET, awayET, homePens, awayPens } = score;

    if (home90 == null || away90 == null) return { side: null, decision: null };

    if (home90 > away90) return { side: "home", decision: "90" };
    if (away90 > home90) return { side: "away", decision: "90" };

    if (homeET == null || awayET == null) return { side: "draw", decision: null };

    const totalHome = home90 + homeET;
    const totalAway = away90 + awayET;

    if (totalHome > totalAway) return { side: "home", decision: "ET" };
    if (totalAway > totalHome) return { side: "away", decision: "ET" };

    if (homePens == null || awayPens == null) return { side: "draw", decision: null };

    if (homePens > awayPens) return { side: "home", decision: "PEN" };
    if (awayPens > homePens) return { side: "away", decision: "PEN" };

    return { side: "draw", decision: null };
  }

  /* ---------------------------------------------------------------------- */
  /* Save / reset                                                            */
  /* ---------------------------------------------------------------------- */

  function handleScoreChange(matchId: number, field: KnockoutScoreKey, value: string) {
    updateKoScore(matchId, field, value);
  }

  function handleSaveTournament() {
    if (typeof window === "undefined") return;

    try {
      window.localStorage.setItem(LS_GROUPS_KEY, JSON.stringify(matchesByGroup));
      window.localStorage.setItem(LS_PLAYOFF_KEY, JSON.stringify(playoffSelection));
      window.localStorage.setItem(LS_KO_SCORES_KEY, JSON.stringify(koScores));
    } catch {
      /* Ignore storage errors (private mode, quota, etc.). */
    }

    setSaveMessage(language === "es" ? "¡Mundial guardado!" : "World Cup saved!");
    window.setTimeout(() => setSaveMessage(null), 2000);
  }

  function handleResetKnockoutOnly() {
    resetKoScores();
    resetKnockout();
  }

  function handleResetAllTournament() {
    if (typeof window === "undefined") return;

    window.localStorage.removeItem(LS_GROUPS_KEY);
    window.localStorage.removeItem(LS_PLAYOFF_KEY);
    window.localStorage.removeItem(LS_KO_SCORES_KEY);
    window.location.reload();
  }

  /* ---------------------------------------------------------------------- */
  /* Tree build                                                              */
  /* ---------------------------------------------------------------------- */

  const { bestThirds, thirdAssignment } = useMemo(
    () => buildThirdContext(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [matchesByGroup, playoffSelection, language]
  );

  const usedThirdGroups = new Set<string>();
  const winnerMap: Record<number, ResolvedSlot | null> = {};
  const loserMap: Record<number, ResolvedSlot | null> = {};

  const matchesByRoundSide: ByRoundSide = {
    "16vos": { left: [], right: [], center: [] },
    "8vos": { left: [], right: [], center: [] },
    "4tos": { left: [], right: [], center: [] },
    Semis: { left: [], right: [], center: [] },
    Final: { left: [], right: [], center: [] },
    "3er puesto": { left: [], right: [], center: [] },
  };

  function resolveTeamSource(
    source: TeamSource,
    currentMatch: KnockoutMatch,
    side: "home" | "away"
  ): ResolvedSlot {
    if (source.kind === "group") {
      const fifaWinnerSlotId = getWinnerSlotIdForThird(currentMatch, side);
      return resolveGroupSlot(source.label, usedThirdGroups, bestThirds, thirdAssignment, fifaWinnerSlotId);
    }

    const ref = source.from === "winner" ? winnerMap[source.matchId] : loserMap[source.matchId];

    if (!ref) {
      const prefix =
        source.from === "winner"
          ? language === "es"
            ? "Ganador"
            : "Winner"
          : language === "es"
          ? "Perdedor"
          : "Loser";

      return { name: `${prefix} G${source.matchId}`, flagCode: undefined, isPlaceholder: true };
    }

    return ref;
  }

  function getMatchSide(matchId: number): Side {
    if (matchId >= 1 && matchId <= 8) return "left";
    if (matchId >= 9 && matchId <= 16) return "right";
    if (matchId >= 17 && matchId <= 20) return "left";
    if (matchId >= 21 && matchId <= 24) return "right";
    if (matchId === 25 || matchId === 26) return "left";
    if (matchId === 27 || matchId === 28) return "right";
    if (matchId === 29) return "left";
    if (matchId === 30) return "right";
    return "center";
  }

  for (const match of KNOCKOUT_MATCHES) {
    const score = koScores[match.id] ?? EMPTY_SCORE_VALUE;

    const home = resolveTeamSource(match.home, match, "home");
    const away = resolveTeamSource(match.away, match, "away");

    const { side, decision } = getWinnerInfo(score);
    const disabled = home.isPlaceholder || away.isPlaceholder;

    let winnerSlot: ResolvedSlot | null = null;
    let loserSlot: ResolvedSlot | null = null;

    if (side === "home") {
      winnerSlot = home;
      loserSlot = away;
    } else if (side === "away") {
      winnerSlot = away;
      loserSlot = home;
    }

    winnerMap[match.id] = winnerSlot;
    loserMap[match.id] = loserSlot;

    const vm: VmMatch = {
      match,
      home,
      away,
      score,
      winnerSide: side,
      winnerDecision: decision,
      disabled,
    };

    const sideKey: Side =
      match.round === "Final" || match.round === "3er puesto" ? "center" : getMatchSide(match.id);

    matchesByRoundSide[match.round][sideKey].push(vm);
  }

  const getSortKey = (vm: VmMatch): number => {
    const sources = [vm.match.home, vm.match.away];
    let minSourceId: number | null = null;

    for (const src of sources) {
      if (src.kind === "advance") {
        if (minSourceId == null || src.matchId < minSourceId) minSourceId = src.matchId;
      }
    }

    return minSourceId ?? vm.match.id;
  };

  for (const round of ROUNDS_ORDER) {
    const sideBuckets = matchesByRoundSide[round];
    (["left", "right", "center"] as const).forEach((s) => {
      sideBuckets[s].sort((a, b) => getSortKey(a) - getSortKey(b));
    });
  }

  /* ---------------------------------------------------------------------- */
  /* Podium                                                                  */
  /* ---------------------------------------------------------------------- */

  let champion: ResolvedSlot | null = null;
  let runnerUp: ResolvedSlot | null = null;
  let thirdPlace: ResolvedSlot | null = null;

  const finalList = matchesByRoundSide["Final"].center;
  if (finalList.length) {
    const vm = finalList[0];
    const { side } = getWinnerInfo(vm.score);

    if (side === "home") {
      champion = vm.home;
      runnerUp = vm.away;
    } else if (side === "away") {
      champion = vm.away;
      runnerUp = vm.home;
    }
  }

  const thirdList = matchesByRoundSide["3er puesto"].center;
  if (thirdList.length) {
    const vm = thirdList[0];
    const { side } = getWinnerInfo(vm.score);

    if (side === "home") thirdPlace = vm.home;
    else if (side === "away") thirdPlace = vm.away;
  }

  const mobileFinalAndThird: VmMatch[] = [...finalList, ...thirdList];

  function renderPhaseBlock(title: string, list: VmMatch[], withTrophy = false) {
    if (!list.length) return null;

    return (
      <section className={`ko-phase ${withTrophy ? "ko-phase--with-trophy" : ""}`}>
        <h3 className="ko-phase__title">{title}</h3>

        <div className="ko-phase__content">
          {withTrophy && (
            <div className="ko-phase__trophy">
              <img src={trophyImg} alt="Copa del Mundo" className="ko-trophy" />
            </div>
          )}

          <div className="ko-phase__grid">
            {list.map((vm) => (
              <KnockoutMatchCard
                key={vm.match.id}
                matchId={vm.match.id}
                round={vm.match.round}
                home={vm.home}
                away={vm.away}
                score={vm.score}
                disabled={vm.disabled}
                onScoreChange={(field, value) => handleScoreChange(vm.match.id, field, value)}
                winnerSide={vm.winnerSide}
                winnerDecision={vm.winnerDecision}
                language={language}
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  const koRounds = t.knockout.rounds;

  return (
    <section id="knockout" className="knockout-section">
      <div className="ko-header">
        <h2 className="ko-header__title">{t.knockout.title}</h2>

        <div className="ko-header__actions">
          <button type="button" onClick={handleSaveTournament} className="ko-button ko-button--save">
            {t.knockout.save}
          </button>

          <button
            type="button"
            onClick={handleResetKnockoutOnly}
            className="ko-button ko-button--reset-ko"
          >
            {t.knockout.resetStage}
          </button>

          <button
            type="button"
            onClick={() => setConfirmResetAll(true)}
            className="ko-button ko-button--reset-all"
          >
            {t.knockout.resetAll}
          </button>
        </div>
      </div>

      {saveMessage && <div className="ko-toast">{saveMessage}</div>}

      <div className="ko-grid-desktop">
        {KO_COLUMNS.map((col) => {
          if (col.key === "CENTER") {
            if (!finalList.length && !thirdList.length) return null;

            return (
              <div key={col.key} className="ko-round-column ko-round-column--center">
                <div className="ko-trophy-wrapper ko-trophy-wrapper--desktop">
                  <img src={trophyImg} alt="Copa del Mundo" className="ko-trophy" />
                </div>

                {finalList.map((vm) => (
                  <KnockoutMatchCard
                    key={vm.match.id}
                    matchId={vm.match.id}
                    round={vm.match.round}
                    home={vm.home}
                    away={vm.away}
                    score={vm.score}
                    disabled={vm.disabled}
                    onScoreChange={(field, value) => handleScoreChange(vm.match.id, field, value)}
                    winnerSide={vm.winnerSide}
                    winnerDecision={vm.winnerDecision}
                    language={language}
                  />
                ))}

                {thirdList.map((vm) => (
                  <KnockoutMatchCard
                    key={vm.match.id}
                    matchId={vm.match.id}
                    round={vm.match.round}
                    home={vm.home}
                    away={vm.away}
                    score={vm.score}
                    disabled={vm.disabled}
                    onScoreChange={(field, value) => handleScoreChange(vm.match.id, field, value)}
                    winnerSide={vm.winnerSide}
                    winnerDecision={vm.winnerDecision}
                    language={language}
                  />
                ))}
              </div>
            );
          }

          const list = matchesByRoundSide[col.round][col.side];
          if (!list.length) return null;

          return (
            <div
              key={col.key}
              className="ko-round-column"
              data-round={col.round}
              data-side={col.side}
            >
              {list.map((vm) => (
                <KnockoutMatchCard
                  key={vm.match.id}
                  matchId={vm.match.id}
                  round={vm.match.round}
                  home={vm.home}
                  away={vm.away}
                  score={vm.score}
                  disabled={vm.disabled}
                  onScoreChange={(field, value) => handleScoreChange(vm.match.id, field, value)}
                  winnerSide={vm.winnerSide}
                  winnerDecision={vm.winnerDecision}
                  language={language}
                />
              ))}
            </div>
          );
        })}
      </div>

      <div className="ko-grid-mobile">
        {renderPhaseBlock(
          `${koRounds.r32} - ${language === "es" ? "Lado izquierdo" : "Left side"}`,
          matchesByRoundSide["16vos"].left
        )}
        {renderPhaseBlock(
          `${koRounds.r16} - ${language === "es" ? "Lado izquierdo" : "Left side"}`,
          matchesByRoundSide["8vos"].left
        )}
        {renderPhaseBlock(
          `${koRounds.quarters} - ${language === "es" ? "Lado izquierdo" : "Left side"}`,
          matchesByRoundSide["4tos"].left
        )}
        {renderPhaseBlock(
          `${koRounds.semis} - ${language === "es" ? "Lado izquierdo" : "Left side"}`,
          matchesByRoundSide["Semis"].left
        )}

        {renderPhaseBlock(language === "es" ? "Final y 3er puesto" : "Final & 3rd place", mobileFinalAndThird, true)}

        {renderPhaseBlock(
          `${koRounds.semis} - ${language === "es" ? "Lado derecho" : "Right side"}`,
          matchesByRoundSide["Semis"].right
        )}
        {renderPhaseBlock(
          `${koRounds.quarters} - ${language === "es" ? "Lado derecho" : "Right side"}`,
          matchesByRoundSide["4tos"].right
        )}
        {renderPhaseBlock(
          `${koRounds.r16} - ${language === "es" ? "Lado derecho" : "Right side"}`,
          matchesByRoundSide["8vos"].right
        )}
        {renderPhaseBlock(
          `${koRounds.r32} - ${language === "es" ? "Lado derecho" : "Right side"}`,
          matchesByRoundSide["16vos"].right
        )}
      </div>

      <div className="ko-podium">
        <h3 className="ko-podium__title">{t.podium.title}</h3>

        <ul className="ko-podium__list">
          <li className="ko-podium__item">
            <PodiumFlag slot={champion} language={language} />
            <strong>{t.podium.champion}:</strong>{" "}
            {champion ? champion.name : language === "es" ? "Por definir" : "TBD"}
          </li>

          <li className="ko-podium__item">
            <PodiumFlag slot={runnerUp} language={language} />
            <strong>{t.podium.runnerUp}:</strong>{" "}
            {runnerUp ? runnerUp.name : language === "es" ? "Por definir" : "TBD"}
          </li>

          <li className="ko-podium__item">
            <PodiumFlag slot={thirdPlace} language={language} />
            <strong>{t.podium.thirdPlace}:</strong>{" "}
            {thirdPlace ? thirdPlace.name : language === "es" ? "Por definir" : "TBD"}
          </li>
        </ul>
      </div>

      <ConfirmModal
        open={confirmResetAll}
        title={t.simulation.resetWorld}
        text={t.simulation.resetConfirm}
        cancelText={t.simulation.cancel}
        confirmText={t.simulation.confirm}
        onCancel={() => setConfirmResetAll(false)}
        onConfirm={() => {
          setConfirmResetAll(false);
          handleResetAllTournament();
        }}
      />
    </section>
  );
}
