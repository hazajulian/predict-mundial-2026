// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import "./index.css";

// Context providers
import { PredictionProvider } from "./context/PredictionContext";
import { GroupsProvider } from "./context/GroupsContext";
import { KnockoutProvider } from "./context/KnockoutContext";

/* =========================================================
   Root render
   ========================================================= */

ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
).render(
  <React.StrictMode>
    <PredictionProvider>
      <GroupsProvider>
        <KnockoutProvider>
          <App />
        </KnockoutProvider>
      </GroupsProvider>
    </PredictionProvider>
  </React.StrictMode>
);
