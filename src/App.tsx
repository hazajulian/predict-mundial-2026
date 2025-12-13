// src/App.tsx
import { useEffect, useState } from "react";

import { PlayoffSelector } from "./components/PlayoffSelector";
import { GroupsSection } from "./components/GroupsSection";
import { KnockoutSection } from "./components/KnockoutSection";
import { AwardsSummary } from "./components/AwardsSummary";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";

import { useGroups } from "./context/GroupsContext";
import { useKnockout } from "./context/KnockoutContext";
import { usePrediction } from "./context/PredictionContext";

import type { PredictionMode } from "./utils/autoPrediction";
import type { Language } from "./i18n/team";

const LS_LANGUAGE_KEY = "wm26_language";

export function App() {
  /* =========================================================
     Idioma con persistencia en LocalStorage
     ========================================================= */

  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window === "undefined") return "es";
    const stored = window.localStorage.getItem(LS_LANGUAGE_KEY);
    return stored === "en" || stored === "es" ? stored : "es";
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(LS_LANGUAGE_KEY, language);
  }, [language]);

  /* =========================================================
     Contextos
     ========================================================= */

  const { matchesByGroup, resetAllGroups, autoPredictGroups } = useGroups();
  const { resetKnockout, autoPredictKnockout } = useKnockout();
  const { applyPlayoffSimulation } = usePrediction();

  /* =========================================================
     Control de simulación (evita KO con datos stale)
     ========================================================= */

  const [pendingKnockoutMode, setPendingKnockoutMode] =
    useState<PredictionMode | null>(null);

  function runPrediction(mode: PredictionMode) {
    // Simulación de repechajes según modo
    if (mode === "favorites" || mode === "crazy") {
      applyPlayoffSimulation(mode);
    }

    // Reset completo previo a la simulación
    resetKnockout();
    resetAllGroups();

    // Simulación automática de fase de grupos
    autoPredictGroups(mode);

    // El KO se ejecuta cuando los grupos ya fueron actualizados
    setPendingKnockoutMode(mode);
  }

  /* =========================================================
     Disparar KO cuando los grupos estén listos
     ========================================================= */

  useEffect(() => {
    if (!pendingKnockoutMode) return;

    autoPredictKnockout(pendingKnockoutMode);
    setPendingKnockoutMode(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchesByGroup, pendingKnockoutMode]);

  /* =========================================================
     UI helpers
     ========================================================= */

  function toggleLanguage() {
    setLanguage((prev) => (prev === "es" ? "en" : "es"));
  }

  /* =========================================================
     Render
     ========================================================= */

  return (
    <div className="app">
      <Header
        language={language}
        onToggleLanguage={toggleLanguage}
        onPredictFavorites={() => runPrediction("favorites")}
        onPredictCrazy={() => runPrediction("crazy")}
      />

      <main className="app-main">
        <section id="playoff" className="app-section">
          <PlayoffSelector language={language} />
        </section>

        <section id="groups" className="app-section">
          <GroupsSection language={language} />
        </section>

        <section id="knockout" className="app-section">
          <KnockoutSection language={language} />
        </section>

        <section id="summary" className="app-section">
          <AwardsSummary language={language} />
        </section>

        <Footer language={language} />
      </main>
    </div>
  );
}
