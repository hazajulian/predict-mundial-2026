// src/context/KnockoutContext.tsx
import { createContext, useContext, useState, type ReactNode } from "react";

import { KNOCKOUT_MATCHES } from "../data/knockoutMatches";

import { useGroups } from "./GroupsContext";
import { usePrediction } from "./PredictionContext";

import {
  autoPredictKnockoutState,
  type KnockoutMatchResult,
  type KnockoutState,
  type PredictionMode,
} from "../utils/autoPrediction";

import { EMPTY_SCORE, type KnockoutScore, type KnockoutScoreKey } from "../types/knockout";

type KnockoutContextValue = {
  knockoutState: KnockoutState;

  resetKnockout: () => void;
  autoPredictKnockout: (mode: PredictionMode) => void;

  /* Global KO score source of truth (consumed by KO UI and AwardsSummary in real time). */
  koScores: Record<number, KnockoutScore>;
  updateKoScore: (matchId: number, field: KnockoutScoreKey, value: string) => void;
  resetKoScores: () => void;

  /* Immutable update API for future features / simulation tooling. */
  updateKnockoutMatch: (matchId: number, patch: Partial<Omit<KnockoutMatchResult, "matchId">>) => void;
};

const KnockoutContext = createContext<KnockoutContextValue | undefined>(undefined);

const LS_KO_SCORES_KEY = "wm26_knockoutScores";

/* -------------------------------------------------------------------------- */
/* Factory helpers                                                            */
/* -------------------------------------------------------------------------- */

function createEmptyKnockoutState(): KnockoutState {
  const state: KnockoutState = {};

  for (const match of KNOCKOUT_MATCHES) {
    state[match.id] = {
      matchId: match.id,
      homeTeamId: null,
      awayTeamId: null,
      homeGoals: null,
      awayGoals: null,
      winnerTeamId: null,
    };
  }

  return state;
}

function createEmptyScores(): Record<number, KnockoutScore> {
  const next: Record<number, KnockoutScore> = {};

  for (const match of KNOCKOUT_MATCHES) {
    next[match.id] = { ...EMPTY_SCORE };
  }

  return next;
}

function loadScoresFromLS(): Record<number, KnockoutScore> {
  if (typeof window === "undefined") return createEmptyScores();

  try {
    const raw = window.localStorage.getItem(LS_KO_SCORES_KEY);
    if (!raw) return createEmptyScores();

    const parsed = JSON.parse(raw) as Record<string, Partial<KnockoutScore>>;
    const next = createEmptyScores();

    for (const [id, partial] of Object.entries(parsed)) {
      next[Number(id)] = { ...EMPTY_SCORE, ...partial };
    }

    return next;
  } catch {
    return createEmptyScores();
  }
}

/* -------------------------------------------------------------------------- */
/* Provider                                                                   */
/* -------------------------------------------------------------------------- */

export function KnockoutProvider({ children }: { children: ReactNode }) {
  /*
    knockoutState:
    - Used mainly by the auto-prediction engine (utils/autoPrediction).
    - It stores resolved teams and winners in a normalized format.
  */
  const [knockoutState, setKnockoutState] = useState<KnockoutState>(() => createEmptyKnockoutState());

  /*
    koScores:
    - UI source of truth for KO inputs (90', ET and penalties).
    - Shared globally so other components (e.g. AwardsSummary) can react live.
  */
  const [koScores, setKoScores] = useState<Record<number, KnockoutScore>>(() => loadScoresFromLS());

  const { matchesByGroup } = useGroups();
  const { playoffSelection } = usePrediction();

  function resetKnockout() {
    setKnockoutState(createEmptyKnockoutState());
  }

  function resetKoScores() {
    setKoScores(createEmptyScores());

    if (typeof window === "undefined") return;
    window.localStorage.removeItem(LS_KO_SCORES_KEY);
  }

  function autoPredictKnockout(mode: PredictionMode) {
    /*
      Auto simulation:
      - fills knockoutState (engine data)
      - hydrates koScores (UI data) to keep visual and logical consistency
    */
    const predicted = autoPredictKnockoutState(mode, matchesByGroup, playoffSelection);
    setKnockoutState(predicted);

    const nextScores = createEmptyScores();

    for (const st of Object.values(predicted)) {
      if (st.homeGoals == null || st.awayGoals == null) continue;

      nextScores[st.matchId] = {
        ...EMPTY_SCORE,
        home90: st.homeGoals,
        away90: st.awayGoals,
        homeET: null,
        awayET: null,
        homePens: null,
        awayPens: null,
      };
    }

    setKoScores(nextScores);
  }

  function updateKoScore(matchId: number, field: KnockoutScoreKey, value: string) {
    /*
      Normalize input:
      - empty string => null
      - otherwise => integer >= 0
    */
    const parsed = value === "" ? null : Math.max(0, Number.parseInt(value, 10) || 0);

    setKoScores((prev) => ({
      ...prev,
      [matchId]: { ...(prev[matchId] ?? EMPTY_SCORE), [field]: parsed },
    }));
  }

  function updateKnockoutMatch(matchId: number, patch: Partial<Omit<KnockoutMatchResult, "matchId">>) {
    setKnockoutState((prev) => {
      const current = prev[matchId];
      if (!current) return prev;

      return {
        ...prev,
        [matchId]: {
          ...current,
          ...patch,
          matchId,
        },
      };
    });
  }

  return (
    <KnockoutContext.Provider
      value={{
        knockoutState,
        resetKnockout,
        autoPredictKnockout,
        koScores,
        updateKoScore,
        resetKoScores,
        updateKnockoutMatch,
      }}
    >
      {children}
    </KnockoutContext.Provider>
  );
}

/* -------------------------------------------------------------------------- */
/* Hook                                                                       */
/* -------------------------------------------------------------------------- */

export function useKnockout() {
  const ctx = useContext(KnockoutContext);
  if (!ctx) throw new Error("useKnockout must be used within KnockoutProvider");
  return ctx;
}
