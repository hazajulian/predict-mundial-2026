// src/context/PredictionContext.tsx
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

import type { PlayoffSlotId } from "../data/playoffTeams";
import {
  buildPlayoffSelectionForMode,
  type PlayoffSelection,
  type PredictionMode,
} from "../utils/autoPrediction";

type SimulationMode = Exclude<PredictionMode, "basic">;

type PredictionContextValue = {
  playoffSelection: PlayoffSelection;
  setPlayoffWinner: (slotId: PlayoffSlotId, teamId: string | null) => void;
  applyPlayoffSimulation: (mode: SimulationMode) => void;
};

const PredictionContext = createContext<PredictionContextValue | undefined>(undefined);

const LS_PLAYOFF_KEY = "wm26_playoffSelection";

const INITIAL_PLAYOFF_SELECTION: PlayoffSelection = {
  INTER_1: null,
  INTER_2: null,
  UEFA_A: null,
  UEFA_B: null,
  UEFA_C: null,
  UEFA_D: null,
};

/* -------------------------------------------------------------------------- */
/* Local storage helpers                                                      */
/* -------------------------------------------------------------------------- */

function safeReadPlayoffFromLS(): PlayoffSelection {
  if (typeof window === "undefined") return INITIAL_PLAYOFF_SELECTION;

  try {
    const raw = window.localStorage.getItem(LS_PLAYOFF_KEY);
    if (!raw) return INITIAL_PLAYOFF_SELECTION;

    const parsed = JSON.parse(raw) as PlayoffSelection;

    /* Merge to ensure all keys exist even if storage is partial/old. */
    return { ...INITIAL_PLAYOFF_SELECTION, ...parsed };
  } catch {
    return INITIAL_PLAYOFF_SELECTION;
  }
}

function safeWritePlayoffToLS(state: PlayoffSelection) {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(LS_PLAYOFF_KEY, JSON.stringify(state));
  } catch {
    /* Ignore storage errors (private mode, quota, etc.). */
  }
}

/* -------------------------------------------------------------------------- */
/* Provider                                                                   */
/* -------------------------------------------------------------------------- */

export function PredictionProvider({ children }: { children: ReactNode }) {
  /*
    Stores the winner selection for each playoff slot.
    Hydrated from localStorage to keep the selection after reload.
  */
  const [playoffSelection, setPlayoffSelection] = useState<PlayoffSelection>(() =>
    safeReadPlayoffFromLS()
  );

  function setPlayoffWinner(slotId: PlayoffSlotId, teamId: string | null) {
    setPlayoffSelection((prev) => ({
      ...prev,
      [slotId]: teamId,
    }));
  }

  function applyPlayoffSimulation(mode: SimulationMode) {
    /* Generates a fresh playoff selection based on the selected simulation mode. */
    setPlayoffSelection(buildPlayoffSelectionForMode(mode));
  }

  return (
    <PredictionContext.Provider value={{ playoffSelection, setPlayoffWinner, applyPlayoffSimulation }}>
      {children}
    </PredictionContext.Provider>
  );
}

/* -------------------------------------------------------------------------- */
/* Hook                                                                       */
/* -------------------------------------------------------------------------- */

export function usePrediction() {
  const ctx = useContext(PredictionContext);
  if (!ctx) throw new Error("usePrediction must be used within PredictionProvider");
  return ctx;
}
