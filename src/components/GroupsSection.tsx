// src/components/GroupsSection.tsx
import { useState } from "react";

import { GROUPS } from "../data/groups";
import { GroupCard } from "./GroupCard";

import { useGroups } from "../context/GroupsContext";
import { useKnockout } from "../context/KnockoutContext";

import { es } from "../i18n/es";
import { en } from "../i18n/en";
import type { Language } from "../i18n/team";

type MatchesMode = "none" | "all";

type GroupsSectionProps = {
  language: Language;
};

export function GroupsSection({ language }: GroupsSectionProps) {
  const t = language === "es" ? es : en;

  const { resetAllGroups } = useGroups();
  const { resetKnockout, resetKoScores } = useKnockout();

  const [matchesMode, setMatchesMode] = useState<MatchesMode>("none");

  function handleResetAll() {
    /* Reset all group data and also clear KO state to keep the tournament consistent. */
    resetAllGroups();
    resetKnockout();
    resetKoScores();
  }

  function handleToggleAllMatches() {
    setMatchesMode((prev) => (prev === "all" ? "none" : "all"));
  }

  const showAllMatches = matchesMode === "all";
  const toggleLabel = showAllMatches ? t.groups.hideMatches : t.groups.viewAllMatches;

  return (
    <section id="groups" className="groups-section">
      <h2 className="groups-section__title">{t.groups.title}</h2>

      <div className="groups-section__toolbar">
        <button type="button" onClick={handleResetAll} className="groups-button groups-button--red">
          {t.groups.resetAll}
        </button>

        <button
          type="button"
          onClick={handleToggleAllMatches}
          className="groups-button groups-button--green"
        >
          {toggleLabel}
        </button>
      </div>

      <div className="groups-grid">
        {GROUPS.map((group) => (
          <GroupCard key={group.id} group={group} showAllMatches={showAllMatches} language={language} />
        ))}
      </div>
    </section>
  );
}
