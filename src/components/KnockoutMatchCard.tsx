// src/components/KnockoutMatchCard.tsx
import { useEffect, useState } from "react";
import Flag from "react-world-flags";

import type {
  KnockoutScore,
  KnockoutScoreKey,
  ResolvedSlot,
  RoundName,
  WinnerDecision,
  WinnerSide,
} from "../types/knockout";

import { es } from "../i18n/es";
import { en } from "../i18n/en";
import type { Language } from "../i18n/team";

import fifaPlaceholder from "../assets/fifa-placeholder.jpg";

type KnockoutMatchCardProps = {
  matchId: number; /* Kept for parent compatibility. */
  round: RoundName;
  home: ResolvedSlot;
  away: ResolvedSlot;
  score: KnockoutScore;
  disabled: boolean;
  onScoreChange: (field: KnockoutScoreKey, value: string) => void;
  winnerSide: WinnerSide;
  winnerDecision: WinnerDecision;
  language: Language;
};

function getRoundLabel(round: RoundName, t: any) {
  switch (round) {
    case "16vos":
      return t.knockout.rounds.r32;
    case "8vos":
      return t.knockout.rounds.r16;
    case "4tos":
      return t.knockout.rounds.quarters;
    case "Semis":
      return t.knockout.rounds.semis;
    case "Final":
      return t.knockout.rounds.final;
    case "3er puesto":
      return t.knockout.rounds.thirdPlace;
    default:
      return String(round);
  }
}

type TeamRowProps = {
  slot: ResolvedSlot;
  isWinner: boolean;
  disabled: boolean;
  goals90: number | null;
  onChange90: (value: string) => void;
  language: Language;
};

function TeamRow({ slot, isWinner, disabled, goals90, onChange90, language }: TeamRowProps) {
  const nameClass = `ko-team-name ${isWinner ? "ko-team-name--winner" : ""}`;
  const scoreBoxClass = `ko-score-box ${isWinner ? "ko-score-box--winner" : ""}`;

  return (
    <div className={`ko-team-row ${isWinner ? "ko-team-row--winner" : ""}`}>
      <TeamFlag slot={slot} language={language} />
      <span className={nameClass}>{slot.name}</span>

      <div className={scoreBoxClass}>
        <input
          type="number"
          min={0}
          disabled={disabled}
          value={goals90 ?? ""}
          onChange={(e) => onChange90(e.target.value)}
          className="ko-score-input"
        />
      </div>
    </div>
  );
}

function TeamFlag({ slot, language }: { slot: ResolvedSlot; language: Language }) {
  if (slot.flagCode) {
    return <Flag code={String(slot.flagCode)} className="ko-flag" />;
  }

  const alt = language === "es" ? "Por definir" : "TBD";
  return <img src={fifaPlaceholder} alt={alt} className="ko-flag" />;
}

function renderResultText(opts: {
  matchText: {
    winner90: string;
    winnerET: string;
    winnerP: string;
  };
  winnerSide: WinnerSide;
  winnerDecision: WinnerDecision;
  homeName: string;
  awayName: string;
  isTie90: boolean;
}) {
  const { matchText, winnerSide, winnerDecision, homeName, awayName, isTie90 } = opts;

  if (!winnerSide && !isTie90) return null;
  if (winnerSide === "draw" && winnerDecision == null) return null;

  const winnerName =
    winnerSide === "home" ? homeName : winnerSide === "away" ? awayName : "";

  if (!winnerName || !winnerDecision) return null;

  if (winnerDecision === "90") {
    return (
      <>
        {matchText.winner90}: <strong>{winnerName}</strong>
      </>
    );
  }

  if (winnerDecision === "ET") {
    return (
      <>
        {matchText.winnerET}: <strong>{winnerName}</strong>
      </>
    );
  }

  if (winnerDecision === "PEN") {
    return (
      <>
        {matchText.winnerP}: <strong>{winnerName}</strong>
      </>
    );
  }

  return null;
}

export function KnockoutMatchCard({
  round,
  home,
  away,
  score,
  disabled,
  onScoreChange,
  winnerSide,
  winnerDecision,
  language,
}: KnockoutMatchCardProps) {
  const t = language === "es" ? es : en;

  const home90 = score.home90 ?? 0;
  const away90 = score.away90 ?? 0;
  const homeET = score.homeET ?? 0;
  const awayET = score.awayET ?? 0;

  const isTie90 = score.home90 != null && score.away90 != null && home90 === away90;

  const isTieAfterET =
    isTie90 &&
    score.homeET != null &&
    score.awayET != null &&
    home90 + homeET === away90 + awayET;

  const homeIsWinner = winnerSide === "home";
  const awayIsWinner = winnerSide === "away";

  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    /* Close extra-time UI when the match is disabled or no longer tied after 90'. */
    if (disabled || !isTie90) setIsExpanded(false);
  }, [disabled, isTie90]);

  const canToggleExtra = isTie90 && !disabled;
  const showExtraBlock = canToggleExtra && isExpanded;
  const showPens = isTieAfterET && !disabled && isExpanded;

  const matchText = t.knockout.match;

  const toggleAria =
    language === "es"
      ? "Mostrar/ocultar alargue y penales"
      : "Show/hide extra time and penalties";

  return (
    <div className="ko-card">
      <div className="ko-card-header">
        <div className="ko-round-label">{getRoundLabel(round, t)}</div>

        <button
          type="button"
          className={`ko-toggle ${canToggleExtra ? "ko-toggle--active" : "ko-toggle--disabled"}`}
          onClick={() => {
            if (!canToggleExtra) return;
            setIsExpanded((prev) => !prev);
          }}
          aria-label={toggleAria}
        >
          <span className="ko-toggle-icon">{showExtraBlock ? "⌃" : "⌄"}</span>
        </button>
      </div>

      <div className="ko-teams">
        <TeamRow
          slot={home}
          isWinner={homeIsWinner}
          disabled={disabled}
          goals90={score.home90}
          onChange90={(val) => onScoreChange("home90", val)}
          language={language}
        />
        <TeamRow
          slot={away}
          isWinner={awayIsWinner}
          disabled={disabled}
          goals90={score.away90}
          onChange90={(val) => onScoreChange("away90", val)}
          language={language}
        />
      </div>

      {showExtraBlock && (
        <div className="ko-extra-block">
          <div className="ko-extra-title">{matchText.extraTime}:</div>

          <div className="ko-extra-row">
            <span className="ko-extra-team">{home.name}</span>

            <input
              type="number"
              min={0}
              disabled={disabled}
              value={score.homeET ?? ""}
              onChange={(e) => onScoreChange("homeET", e.target.value)}
              className="ko-score-input"
            />

            <span>-</span>

            <input
              type="number"
              min={0}
              disabled={disabled}
              value={score.awayET ?? ""}
              onChange={(e) => onScoreChange("awayET", e.target.value)}
              className="ko-score-input"
            />

            <span className="ko-extra-team ko-extra-team--right">{away.name}</span>
          </div>

          {showPens && (
            <>
              <div className="ko-extra-title">{matchText.penalties}:</div>

              <div className="ko-extra-row">
                <span className="ko-extra-team">{home.name}</span>

                <input
                  type="number"
                  min={0}
                  disabled={disabled}
                  value={score.homePens ?? ""}
                  onChange={(e) => onScoreChange("homePens", e.target.value)}
                  className="ko-score-input"
                />

                <span>-</span>

                <input
                  type="number"
                  min={0}
                  disabled={disabled}
                  value={score.awayPens ?? ""}
                  onChange={(e) => onScoreChange("awayPens", e.target.value)}
                  className="ko-score-input"
                />

                <span className="ko-extra-team ko-extra-team--right">{away.name}</span>
              </div>
            </>
          )}
        </div>
      )}

      <div className="ko-result">
        {renderResultText({
          matchText,
          winnerSide,
          winnerDecision,
          homeName: home.name,
          awayName: away.name,
          isTie90,
        })}
      </div>
    </div>
  );
}
