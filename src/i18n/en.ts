// src/i18n/en.ts

/* -------------------------------------------------------------------------- */
/* English translations                                                       */
/* -------------------------------------------------------------------------- */
/**
 * IMPORTANT:
 * - This file contains ONLY user-facing strings.
 * - No logic, no IDs, no dynamic values.
 * - All keys must remain stable to avoid breaking components.
 * - The structure mirrors `es.ts` exactly.
 */

export const en = {
  /* ------------------------------------------------------------------------ */
  /* Header                                                                   */
  /* ------------------------------------------------------------------------ */
  header: {
    title: "WORLD CUP 2026",
    subtitle:
      "Interactive simulator to build your own World Cup: group stage, playoffs and knockout rounds.",
  },

  /* ------------------------------------------------------------------------ */
  /* Navigation                                                               */
  /* ------------------------------------------------------------------------ */
  nav: {
    groups: "Group stage",
    knockout: "Knockout",
    summary: "Summary",
    favorites: "FIFA favorites",
    crazy: "Crazy simulation",
    info: "Information",
  },

  /* ------------------------------------------------------------------------ */
  /* Play-Off                                                                 */
  /* ------------------------------------------------------------------------ */
  playOff: {
    title: "Play-Off",
    description:
      "Choose which teams win each playoff. This is optional: if you leave “Not selected”, a generic name will be shown in the groups (Intercontinental 1, UEFA Path A, etc.).",
    placeholder: "Not selected (use placeholder)",
  },

  /* ------------------------------------------------------------------------ */
  /* Group Stage                                                              */
  /* ------------------------------------------------------------------------ */
  groups: {
    title: "Group Stage",
    resetAll: "Reset all groups",
    viewAllMatches: "View all matches",

    group: "Group",
    team: "Team",
    played: "P",
    points: "Pts",
    goalsFor: "GF",
    goalsAgainst: "GA",
    goalDiff: "GD",

    viewMatches: "View matches",
    hideMatches: "Hide matches",
    matchesTitle: "Matches",
    resetGroup: "Reset this group",
  },

  /* ------------------------------------------------------------------------ */
  /* Knockout Stage                                                           */
  /* ------------------------------------------------------------------------ */
  knockout: {
    title: "Knockout stage",

    save: "Save World Cup",
    resetStage: "Reset knockout stage",
    resetAll: "Reset entire World Cup",

    rounds: {
      r32: "Round of 32",
      r16: "Round of 16",
      quarters: "Quarter-finals",
      semis: "Semi-finals",
      final: "Final",
      thirdPlace: "Third place",
    },

    match: {
      extraTime: "Extra time (goals)",
      penalties: "Penalties",
      winner90: "Winner in 90'",
      winnerET: "Winner in ET",
      winnerP: "Winner on penalties",
    },
  },

  /* ------------------------------------------------------------------------ */
  /* Podium                                                                   */
  /* ------------------------------------------------------------------------ */
  podium: {
    title: "Podium",
    champion: "Champion",
    runnerUp: "Runner-up",
    thirdPlace: "Third place",
  },

  /* ------------------------------------------------------------------------ */
  /* Highlights / Summary                                                     */
  /* ------------------------------------------------------------------------ */
  highlights: {
    title: "Key facts",
    surprise: "Surprise team",
    disappointment: "Disappointment team",
    worst: "Worst team",
    topScorer: "Top scoring team",
  },

  /* ------------------------------------------------------------------------ */
  /* Simulation                                                               */
  /* ------------------------------------------------------------------------ */
  simulation: {
    favorites: "FIFA favorites",
    crazy: "Crazy simulation",

    resetWorld: "Reset World Cup",
    resetConfirm: "Are you sure you want to reset ALL predictions?",
    cancel: "Cancel",
    confirm: "Reset",
  },

  /* ------------------------------------------------------------------------ */
  /* Information modal                                                        */
  /* ------------------------------------------------------------------------ */
  infoModal: {
    title: "Project information",

    introTitle: "What is this page about?",
    introText1:
      "This page is an interactive simulator that allows you to build your own tournament from start to finish. The idea is to take the real structure of a modern World Cup and give you the freedom to decide what happens at each stage.",
    introText2:
      "You can choose results manually, let the system simulate matches, or combine both. Each decision changes the tournament’s progression, allowing you to explore different possible scenarios.",

    reliabilityTitle: "How reliable is the system?",
    reliabilityText1:
      "One of the most complex aspects of the current format is the qualification of the best third-placed teams. Depending on which teams advance from that position, there are 495 possible combinations.",
    reliabilityText2:
      "The system is prepared to handle all of those cases. It automatically analyzes group results, sorts standings and generates the correct knockout matchups, avoiding errors and always maintaining tournament consistency.",

    howItWorksTitle: "How does the simulator work?",
    howItWorksItems: [
      "Group stage: points, standings and qualifications are calculated automatically.",
      "Playoffs: you can choose which teams advance or leave generic placeholders.",
      "Knockout stage: the bracket is built according to the official format until the final.",
    ],

    modesTitle: "Simulation modes",
    modesItems: [
      "Favorites: prioritizes historically stronger teams.",
      "Random simulation: generates unpredictable results and unexpected matchups.",
    ],

    ideaTitle: "A bit more about the idea",
    ideaText1:
      "This page is not intended to predict real results, but to offer a space to experiment, try combinations and better understand how this type of tournament works.",
    ideaText2:
      "All the complex logic happens behind the scenes, so you can simply focus on enjoying the tournament setup and seeing how the story changes with each simulation.",
  },
};
