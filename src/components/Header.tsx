// src/components/Header.tsx
import { NavBar } from "./NavBar";

import { es } from "../i18n/es";
import { en } from "../i18n/en";
import type { Language } from "../i18n/team";

import "../styles/Header.css";

type HeaderProps = {
  language: Language;
  onToggleLanguage: () => void;
  onPredictFavorites: () => void;
  onPredictCrazy: () => void;
};

export function Header({
  language,
  onToggleLanguage,
  onPredictFavorites,
  onPredictCrazy,
}: HeaderProps) {
  /* Resolve header texts according to current language. */
  const t = language === "es" ? es : en;

  return (
    <header className="app-header" id="top">
      <div className="app-header__title-block">
        <h1 className="app-header__title">{t.header.title}</h1>
        <p className="app-header__subtitle">{t.header.subtitle}</p>
      </div>

      <NavBar
        language={language}
        onToggleLanguage={onToggleLanguage}
        onPredictFavorites={onPredictFavorites}
        onPredictCrazy={onPredictCrazy}
      />
    </header>
  );
}
