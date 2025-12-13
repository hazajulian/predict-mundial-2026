# Predict Mundial 2026

Interactive simulator of the 2026 World Cup (FIFA 48-team format) built with React and TypeScript.

The application allows full tournament simulation: group stage, best third-place qualification, playoff/repechage integration, and knockout rounds up to the final, following the official FIFA 2026 format rules.

------------------------------------------------------------

## Description

Predict Mundial 2026 is a web application focused on fully simulating the 2026 FIFA World Cup.  
The project prioritizes consistent tournament logic, strict typing, and a clear code structure, with strong emphasis on user experience and fidelity to the official regulations.

The user can:
- enter or simulate match results
- view live-updating standings
- advance through knockout rounds
- obtain a complete tournament summary

------------------------------------------------------------

## Features

### Group stage
- 12 groups (A–L)
- automatic standings updates
- points, goal difference, and tie-breaker calculations

### Best third-place teams
- automatic selection based on performance
- assignment to valid knockout paths according to allowed combinations

### Playoffs / Repechage
- definition of teams coming from playoffs
- dynamic integration into the main bracket

### Knockout stage
- full bracket from Round of 32 to the final
- automatic round progression
- winner resolution logic

### Automatic predictions
- favorites mode (ranking / heuristic based)
- random mode (upsets and surprises)

### Internationalization
- Spanish and English support
- i18n architecture decoupled from the UI

### UI / UX
- responsive design (desktop and mobile)
- flags and visual cards
- custom styles without external UI frameworks

------------------------------------------------------------

## Technologies

- React
- TypeScript
- Vite
- CSS (custom styles)
- Context API
- Git and GitHub

------------------------------------------------------------

## Project roadmap

src/
  components/        UI components
  context/           Global application state
  data/              Static tournament data
  i18n/              Language files (ES / EN)
  styles/            Global and component styles
  types/             Domain TypeScript types
  utils/             Tournament logic and helpers
  App.tsx            Main component
  
------------------------------------------------------------

## Requirements

- Node.js (LTS version recommended)
- npm

------------------------------------------------------------