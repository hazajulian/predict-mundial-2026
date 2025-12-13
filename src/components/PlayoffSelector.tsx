// src/components/PlayoffSelector.tsx
import Flag from "react-world-flags";

import { PLAYOFF_SLOTS, type PlayoffSlotId } from "../data/playoffTeams";
import { usePrediction } from "../context/PredictionContext";

import { es } from "../i18n/es";
import { en } from "../i18n/en";
import { getTeamName, type Language } from "../i18n/team";

import "../styles/PlayoffSelector.css";

type PlayoffSelectorProps = {
  language: Language;
};

function getPlayoffSlotLabel(slotId: PlayoffSlotId, language: Language) {
  const esMap: Record<PlayoffSlotId, string> = {
    INTER_1: "Repechaje Intercontinental 1",
    INTER_2: "Repechaje Intercontinental 2",
    UEFA_A: "Repechaje UEFA A",
    UEFA_B: "Repechaje UEFA B",
    UEFA_C: "Repechaje UEFA C",
    UEFA_D: "Repechaje UEFA D",
  };

  const enMap: Record<PlayoffSlotId, string> = {
    INTER_1: "Intercontinental Playoff 1",
    INTER_2: "Intercontinental Playoff 2",
    UEFA_A: "UEFA Playoff A",
    UEFA_B: "UEFA Playoff B",
    UEFA_C: "UEFA Playoff C",
    UEFA_D: "UEFA Playoff D",
  };

  return (language === "es" ? esMap : enMap)[slotId];
}

export function PlayoffSelector({ language }: PlayoffSelectorProps) {
  const t = language === "es" ? es : en;

  const { playoffSelection, setPlayoffWinner } = usePrediction();

  function handleSelect(slotId: PlayoffSlotId, teamId: string | null) {
    setPlayoffWinner(slotId, teamId);
  }

  return (
    <section id="playoff" className="playoff-section">
      <h2 className="playoff-section__title">{t.playOff.title}</h2>

      <p className="playoff-section__description">{t.playOff.description}</p>

      <div className="playoff-grid">
        {PLAYOFF_SLOTS.map((slot) => {
          const selectedTeamId = playoffSelection[slot.id] ?? null;

          return (
            <div key={slot.id} className="playoff-block">
              <h3 className="playoff-block__title">{getPlayoffSlotLabel(slot.id, language)}</h3>

              <div className="playoff-options">
                <label className="playoff-option playoff-option--none">
                  <input
                    type="radio"
                    name={slot.id}
                    value=""
                    checked={selectedTeamId === null}
                    onChange={() => handleSelect(slot.id, null)}
                    className="playoff-option__radio"
                  />
                  <span className="playoff-option__label">{t.playOff.placeholder}</span>
                </label>

                {slot.candidates.map((team) => (
                  <label key={team.id} className="playoff-option">
                    <input
                      type="radio"
                      name={slot.id}
                      value={team.id}
                      checked={selectedTeamId === team.id}
                      onChange={() => handleSelect(slot.id, team.id)}
                      className="playoff-option__radio"
                    />

                    <Flag code={String(team.flagCode)} className="playoff-option__flag" />

                    <span className="playoff-option__label">
                      {getTeamName(language, team.id, team.id)}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
