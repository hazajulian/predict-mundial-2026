// src/components/Footer.tsx
import { FaGithub } from "react-icons/fa";

import { es } from "../i18n/es";
import { en } from "../i18n/en";
import type { Language } from "../i18n/team";

import "../styles/Footer.css";

type FooterProps = {
  language: Language;
};

export function Footer({ language }: FooterProps) {
  /* Resolve static texts according to current language. */
  const t = language === "es" ? es : en;

  return (
    <footer className="app-footer">
      <div className="app-footer__inner">
        <p className="app-footer__text">
          © {new Date().getFullYear()} {t.header.title} —{" "}
          <a
            href="https://github.com/tu-usuario"
            target="_blank"
            rel="noopener noreferrer"
            className="app-footer__link"
          >
            <FaGithub size={18} />
            <span className="app-footer__link-text">GitHub</span>
          </a>
        </p>
      </div>
    </footer>
  );
}
