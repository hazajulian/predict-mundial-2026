# Predict Mundial 2026

Simulador interactivo del Mundial 2026 (formato FIFA de 48 selecciones) desarrollado con React y TypeScript.

La aplicación permite simular el torneo completo: fase de grupos, clasificación de mejores terceros, integración de playoffs/repechajes y eliminación directa hasta la final, respetando las reglas oficiales del formato FIFA 2026.

------------------------------------------------------------

## Descripción

Predict Mundial 2026 es una aplicación web orientada a la simulación completa del Mundial de Fútbol 2026.  
El proyecto prioriza una lógica de torneo consistente, tipado estricto y una estructura de código clara, con foco en la experiencia del usuario y en la fidelidad al reglamento oficial.

El usuario puede:
- cargar o simular resultados
- observar tablas de posiciones en tiempo real
- avanzar rondas eliminatorias
- obtener un resumen final del torneo

------------------------------------------------------------

## Funcionalidades

### Fase de grupos
- 12 grupos (A–L)
- actualización automática de posiciones
- cálculo de puntos, diferencia de gol y criterios de desempate

### Mejores terceros
- selección automática de los mejores terceros según rendimiento
- asignación a llaves válidas según combinaciones permitidas

### Playoffs / Repechajes
- definición de selecciones provenientes de playoffs
- integración dinámica al cuadro principal

### Eliminación directa
- llaves completas desde 32avos hasta la final
- avance automático de rondas
- resolución de ganadores

### Predicciones automáticas
- modo favoritos (basado en ranking/heurísticas)
- modo aleatorio (sorpresas)

### Internacionalización
- soporte para español e inglés
- arquitectura i18n desacoplada de la UI

### UI / UX
- diseño responsive (desktop y mobile)
- uso de banderas y tarjetas visuales
- estilos personalizados sin frameworks externos

------------------------------------------------------------

## Tecnologías

- React
- TypeScript
- Vite
- CSS (estilos propios)
- Context API
- Git y GitHub

------------------------------------------------------------

## Roadmap del proyecto

src/
  components/        Componentes de interfaz de usuario
  context/           Estado global de la aplicación
  data/              Datos estáticos del torneo
  i18n/              Archivos de idioma (ES / EN)
  styles/            Estilos globales y por componente
  types/             Tipos TypeScript del dominio
  utils/             Lógica del torneo y helpers
  App.tsx            Componente principal

------------------------------------------------------------

## Requisitos

- Node.js (versión LTS recomendada)
- npm

------------------------------------------------------------