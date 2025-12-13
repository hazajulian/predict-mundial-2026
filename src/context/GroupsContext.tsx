// src/context/GroupsContext.tsx
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

import { GROUPS } from "../data/groups";

import { autoPredictGroupsState, type GroupMatchesState, type PredictionMode } from "../utils/autoPrediction";
import { generateInitialMatches } from "../utils/groupUtils";

import { usePrediction } from "./PredictionContext";

type GroupId = string;

type GroupsContextValue = {
  matchesByGroup: GroupMatchesState;
  updateMatchScore: (
    groupId: GroupId,
    matchId: string,
    field: "homeGoals" | "awayGoals",
    value: number | null
  ) => void;
  resetGroup: (groupId: GroupId) => void;
  resetAllGroups: () => void;
  autoPredictGroups: (mode: PredictionMode) => void;
};

const GroupsContext = createContext<GroupsContextValue | undefined>(undefined);

const LS_GROUPS_KEY = "wm26_groups";

/* -------------------------------------------------------------------------- */
/* Local storage helpers                                                      */
/* -------------------------------------------------------------------------- */

function createFreshMatches(): GroupMatchesState {
  const state: GroupMatchesState = {};

  for (const group of GROUPS) {
    state[group.id] = generateInitialMatches(group);
  }

  return state;
}

function safeReadGroupsFromLS(): GroupMatchesState | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(LS_GROUPS_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as GroupMatchesState;

    /* Minimal validation: ensure all group keys exist and contain arrays. */
    for (const group of GROUPS) {
      if (!Array.isArray(parsed[group.id])) return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

function safeWriteGroupsToLS(state: GroupMatchesState) {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(LS_GROUPS_KEY, JSON.stringify(state));
  } catch {
    /* Ignore storage errors (private mode, quota, etc.). */
  }
}

/* -------------------------------------------------------------------------- */
/* Provider                                                                   */
/* -------------------------------------------------------------------------- */

export function GroupsProvider({ children }: { children: ReactNode }) {
  /*
    Main state: all group matches results.
    Hydrates from localStorage if available; otherwise initializes a fresh state.
  */
  const [matchesByGroup, setMatchesByGroup] = useState<GroupMatchesState>(() => {
    const fromLS = safeReadGroupsFromLS();
    return fromLS ?? createFreshMatches();
  });

  /* Persist automatically to avoid inconsistencies on reload. */
  useEffect(() => {
    safeWriteGroupsToLS(matchesByGroup);
  }, [matchesByGroup]);

  /* Playoff winners affect auto-prediction outcomes. */
  const { playoffSelection } = usePrediction();

  function updateMatchScore(
    groupId: GroupId,
    matchId: string,
    field: "homeGoals" | "awayGoals",
    value: number | null
  ) {
    setMatchesByGroup((prev) => ({
      ...prev,
      [groupId]: prev[groupId].map((m) => (m.id === matchId ? { ...m, [field]: value } : m)),
    }));
  }

  function resetGroup(groupId: GroupId) {
    const group = GROUPS.find((g) => g.id === groupId);
    if (!group) return;

    setMatchesByGroup((prev) => ({
      ...prev,
      [groupId]: generateInitialMatches(group),
    }));
  }

  function resetAllGroups() {
    setMatchesByGroup(createFreshMatches());
  }

  function autoPredictGroups(mode: PredictionMode) {
    setMatchesByGroup((prev) => autoPredictGroupsState(mode, prev, playoffSelection));
  }

  return (
    <GroupsContext.Provider
      value={{
        matchesByGroup,
        updateMatchScore,
        resetGroup,
        resetAllGroups,
        autoPredictGroups,
      }}
    >
      {children}
    </GroupsContext.Provider>
  );
}

/* -------------------------------------------------------------------------- */
/* Hook                                                                       */
/* -------------------------------------------------------------------------- */

export function useGroups() {
  const ctx = useContext(GroupsContext);
  if (!ctx) throw new Error("useGroups must be used within a GroupsProvider");
  return ctx;
}
