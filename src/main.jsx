// Punkt wejścia MasterDriver (Vite + React 18).
// Montuje AdrApp i rejestruje service workera (offline / PWA).
import React from "react";
import { createRoot } from "react-dom/client";
import MasterDriverApp from "./app.jsx";
import "./styles.css";

// Bezpiecznik: jeśli render runtime rzuci (np. uszkodzony zapis postępu),
// pokaż komunikat z opcją wyczyszczenia danych zamiast białego ekranu.
class ErrorBoundary extends React.Component {
  constructor(p) { super(p); this.state = { err: null }; }
  static getDerivedStateFromError(err) { return { err }; }
  render() {
    if (this.state.err) {
      return React.createElement("div", {
        style: { minHeight: "100dvh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 16, padding: 24, textAlign: "center", color: "#e8eaed", fontFamily: "system-ui, sans-serif" }
      },
        React.createElement("div", { style: { fontSize: 15, lineHeight: 1.5, maxWidth: 340 } }, "Coś poszło nie tak przy uruchamianiu. Najczęściej pomaga wyczyszczenie zapisanych danych postępu."),
        React.createElement("button", {
          onClick: () => { try { localStorage.clear(); } catch (e) {} location.reload(); },
          style: { padding: "12px 20px", borderRadius: 10, border: "none", background: "#c1121f", color: "#fff", fontSize: 15, fontWeight: 700, cursor: "pointer" }
        }, "Wyczyść dane i uruchom ponownie"));
    }
    return this.props.children;
  }
}

const boot = document.getElementById("boot");
try {
  const root = createRoot(document.getElementById("root"));
  root.render(React.createElement(ErrorBoundary, null, React.createElement(MasterDriverApp, null)));
  if (boot) boot.remove();
} catch (e) {
  if (boot) {
    boot.innerHTML =
      '<div class="msg" style="color:#D98880">Błąd uruchomienia:<br>' +
      ((e && e.message) || e) +
      "</div>";
  }
  throw e;
}

// Rejestracja service workera — offline-first (ADR-003 z Kanonu Guardian).
// Vite PWA plugin generuje sw.js na build; w dev pomijamy.
if ("serviceWorker" in navigator && import.meta.env.PROD) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").catch(() => {
      /* offline i tak działa z cache po pierwszym otwarciu */
    });
  });
}
