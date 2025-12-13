// src/components/NavBar.tsx
import { useState } from "react";

import { InfoModal } from "./InfoModal";

import { es } from "../i18n/es";
import { en } from "../i18n/en";
import type { Language } from "../i18n/team";

type NavBarProps = {
  language: Language;
  onToggleLanguage: () => void;
  onPredictFavorites: () => void;
  onPredictCrazy: () => void;
};

export function NavBar({
  language,
  onToggleLanguage,
  onPredictFavorites,
  onPredictCrazy,
}: NavBarProps) {
  const t = language === "es" ? es : en;

  const [showInfo, setShowInfo] = useState(false);

  function handleScrollTo(id: string) {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <>
      <nav className="app-nav">
        <button
          type="button"
          onClick={() => handleScrollTo("groups")}
          className="app-nav__button"
        >
          {t.nav.groups}
        </button>

        <button
          type="button"
          onClick={() => handleScrollTo("knockout")}
          className="app-nav__button"
        >
          {t.nav.knockout}
        </button>

        <button
          type="button"
          onClick={() => handleScrollTo("summary")}
          className="app-nav__button"
        >
          {t.nav.summary}
        </button>

        <button
          type="button"
          onClick={onPredictFavorites}
          className="app-nav__button app-nav__button--predict"
        >
          {t.nav.favorites}
        </button>

        <button
          type="button"
          onClick={onPredictCrazy}
          className="app-nav__button app-nav__button--predict"
        >
          {t.nav.crazy}
        </button>

        <button
          type="button"
          onClick={() => setShowInfo(true)}
          className="app-nav__button app-nav__button--info"
        >
          {t.nav.info}
        </button>

        <button
          type="button"
          onClick={onToggleLanguage}
          className="app-nav__button app-nav__button--lang"
          aria-label="Cambiar idioma"
        >
          {language === "es" ? "ES" : "EN"}
        </button>
      </nav>

      {showInfo && <InfoModal language={language} onClose={() => setShowInfo(false)} />}
    </>
  );
}
