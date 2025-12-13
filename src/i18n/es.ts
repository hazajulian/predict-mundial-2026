// src/i18n/es.ts

/* -------------------------------------------------------------------------- */
/* Traducciones en Español                                                     */
/* -------------------------------------------------------------------------- */
/**
 * IMPORTANTE:
 * - Este archivo contiene SOLO textos visibles para el usuario.
 * - No debe haber lógica ni IDs dinámicos.
 * - La estructura debe ser idéntica a `en.ts`.
 * - Las claves NO deben modificarse para no romper componentes.
 */

export const es = {
  /* ------------------------------------------------------------------------ */
  /* Header                                                                   */
  /* ------------------------------------------------------------------------ */
  header: {
    title: "MUNDIAL 2026",
    subtitle:
      "Simulador interactivo para armar tu propio Mundial: fase de grupos, repechaje y eliminación directa.",
  },

  /* ------------------------------------------------------------------------ */
  /* Navegación                                                               */
  /* ------------------------------------------------------------------------ */
  nav: {
    groups: "Fase de grupos",
    knockout: "Eliminatorias",
    summary: "Resumen",
    favorites: "Favoritos FIFA",
    crazy: "Simulación loca",
    info: "Información",
  },

  /* ------------------------------------------------------------------------ */
  /* Play-Off                                                                 */
  /* ------------------------------------------------------------------------ */
  playOff: {
    title: "Play-Off",
    description:
      "Elegí qué selecciones ganan cada repechaje. Es opcional: si dejás “Sin elegir”, en los grupos se mostrará el nombre genérico (Intercontinental 1, UEFA Path A, etc.).",
    placeholder: "Sin elegir (usar placeholder)",
  },

  /* ------------------------------------------------------------------------ */
  /* Fase de grupos                                                           */
  /* ------------------------------------------------------------------------ */
  groups: {
    title: "Fase de Grupos",
    resetAll: "Resetear todos los grupos",
    viewAllMatches: "Ver todos los partidos",

    group: "Grupo",
    team: "Equipo",
    played: "PJ",
    points: "Pts",
    goalsFor: "GF",
    goalsAgainst: "GC",
    goalDiff: "DG",

    viewMatches: "Ver partidos",
    hideMatches: "Ocultar partidos",
    matchesTitle: "Partidos",
    resetGroup: "Resetear este grupo",
  },

  /* ------------------------------------------------------------------------ */
  /* Eliminatorias                                                            */
  /* ------------------------------------------------------------------------ */
  knockout: {
    title: "Eliminatorias",

    save: "Guardar Mundial",
    resetStage: "Reiniciar eliminatorias",
    resetAll: "Reiniciar Mundial completo",

    rounds: {
      r32: "16vos",
      r16: "8vos",
      quarters: "4tos",
      semis: "Semis",
      final: "Final",
      thirdPlace: "3er puesto",
    },

    match: {
      extraTime: "Alargue (goles)",
      penalties: "Penales",
      winner90: "Ganador en 90'",
      winnerET: "Ganador en ET",
      winnerP: "Ganador en P",
    },
  },

  /* ------------------------------------------------------------------------ */
  /* Podio                                                                    */
  /* ------------------------------------------------------------------------ */
  podium: {
    title: "Podio",
    champion: "Campeón",
    runnerUp: "Subcampeón",
    thirdPlace: "Tercer puesto",
  },

  /* ------------------------------------------------------------------------ */
  /* Resumen / Datos relevantes                                               */
  /* ------------------------------------------------------------------------ */
  highlights: {
    title: "Datos relevantes",
    surprise: "Selección revelación",
    disappointment: "Selección decepción",
    worst: "Peor selección",
    topScorer: "Selección más goleadora",
  },

  /* ------------------------------------------------------------------------ */
  /* Simulación                                                               */
  /* ------------------------------------------------------------------------ */
  simulation: {
    favorites: "Favoritos FIFA",
    crazy: "Simulación loca",

    resetWorld: "Reiniciar Mundial",
    resetConfirm: "¿Seguro que querés reiniciar TODAS las predicciones?",
    cancel: "Cancelar",
    confirm: "Reiniciar",
  },

  /* ------------------------------------------------------------------------ */
  /* Modal de información                                                     */
  /* ------------------------------------------------------------------------ */
  infoModal: {
    title: "Información del proyecto",

    introTitle: "¿De qué se trata esta página?",
    introText1:
      "Esta página es un simulador interactivo que te permite armar tu propio torneo de principio a fin. La idea es tomar la estructura real de una Copa del Mundo moderna y darte la libertad de decidir qué pasa en cada etapa.",
    introText2:
      "Podés elegir resultados manualmente, dejar que el sistema simule los partidos o combinar ambas cosas. Cada decisión modifica el desarrollo del torneo, permitiendo explorar distintos escenarios posibles.",

    reliabilityTitle: "¿Qué tan confiable es el sistema?",
    reliabilityText1:
      "Uno de los puntos más complejos del formato actual es la clasificación de los mejores terceros. Dependiendo de qué selecciones avancen desde esa posición, existen 495 combinaciones posibles.",
    reliabilityText2:
      "El sistema está preparado para contemplar todos esos casos. Analiza automáticamente los resultados de cada grupo, ordena posiciones y genera los cruces correctos en la fase eliminatoria, evitando errores y manteniendo siempre la coherencia del torneo.",

    howItWorksTitle: "¿Cómo funciona el simulador?",
    howItWorksItems: [
      "Fase de grupos: se calculan puntos, posiciones y clasificaciones de forma automática.",
      "Repechaje: podés elegir qué selecciones ganan o dejar placeholders genéricos.",
      "Eliminación directa: el cuadro se arma según el formato oficial hasta llegar a la final.",
    ],

    modesTitle: "Modos de simulación",
    modesItems: [
      "Favoritos: prioriza selecciones históricamente más fuertes.",
      "Simulación aleatoria: genera resultados impredecibles y cruces inesperados.",
    ],

    ideaTitle: "Un poco más sobre la idea",
    ideaText1:
      "Esta página no busca predecir resultados reales, sino ofrecer un espacio para experimentar, probar combinaciones y entender mejor cómo funciona un torneo de este tipo.",
    ideaText2:
      "Toda la lógica compleja sucede por detrás, para que vos solo tengas que concentrarte en disfrutar el armado del torneo y ver cómo cambia la historia en cada simulación.",
  },
};
