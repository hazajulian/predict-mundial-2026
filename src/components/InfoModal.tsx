// src/components/InfoModal.tsx
import { es } from "../i18n/es";
import { en } from "../i18n/en";
import type { Language } from "../i18n/team";

import "../styles/InfoModal.css";

type InfoModalProps = {
  language: Language;
  onClose: () => void;
};

export function InfoModal({ language, onClose }: InfoModalProps) {
  /* Resolve modal texts according to current language. */
  const t = language === "es" ? es : en;

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={t.infoModal.title}
      onClick={onClose}
    >
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="modal-card__close"
          onClick={onClose}
          aria-label="Cerrar"
        >
          ✕
        </button>

        <h2 className="modal-card__title">{t.infoModal.title}</h2>

        <div className="modal-card__content">
          <h3>{t.infoModal.introTitle}</h3>
          <p>{t.infoModal.introText1}</p>
          <p>{t.infoModal.introText2}</p>

          <h3>{t.infoModal.reliabilityTitle}</h3>
          <p>{t.infoModal.reliabilityText1}</p>
          <p>{t.infoModal.reliabilityText2}</p>

          <h3>{t.infoModal.howItWorksTitle}</h3>
          <ul>
            {t.infoModal.howItWorksItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <h3>{t.infoModal.modesTitle}</h3>
          <ul>
            {t.infoModal.modesItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <h3>{t.infoModal.ideaTitle}</h3>
          <p>{t.infoModal.ideaText1}</p>
          <p>{t.infoModal.ideaText2}</p>
        </div>
      </div>
    </div>
  );
}
