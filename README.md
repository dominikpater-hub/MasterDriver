# MasterDriver — kompletny projekt (apka + rdzeń + dokumentacja)

Grywalizowany **trener kierowcy zawodowego**. Multi-modułowy (ADR, tachograf, czas pracy,
eco-driving, mocowanie, pierwsza pomoc, załadunek). Local-first, offline, silnik powtórek
Leitnera. Siostra MasterADR — **ten sam silnik**, inne opakowanie (jeden produkt = wiele modułów).

## 📁 CO GDZIE LEŻY

- **README.md** — ten plik (mapa całości)
- **BUILDING_STATUS.md** — stan budowy, co odwzorowano z MasterADR, co zostaje ⭐ CZYTAJ NAJPIERW
- **DEPLOY_I_PLAY_STORE.md** — od zera do apki u użytkownika: web (Vercel) + Android (AAB/Play Store)
- **APKA** (Vite+React+Capacitor) w korzeniu — index.html, package.json, vite.config.js,
  capacitor.config.json, public/ (ikony „M" w rombie, manifest), src/:
    - `app.jsx` — główny komponent + 8 modułów treści + silnik Leitnera + maszyneria sklepowa
      (licencja, paywall, egzamin/test per moduł, gejtowanie free/PRO)
    - `daily-habit.js` — streak z zamrożeniem + cel dzienny + XP
    - `main.jsx`, `styles.css`
- **core-learning/** — RDZEŃ SILNIKA (TypeScript, osobno, testy vitest):
    - src/leitner.ts, lesson.ts, session.ts, gamification.ts, index.ts, *.test.ts
- **docs/** — analizy rynku/prawne, architektura treści, roadmapa AI (4 fazy),
  ścieżka do pierwszej złotówki, INSTRUKCJA budowy APK.

## 🧩 CO DZIAŁA (zweryfikowane w realnym Chromium)

- **Multi-module home** — 8 modułów, „Powtórka dnia" ze wszystkich naraz, ekran postępu.
- **Silnik Leitnera** — 5 pudełek, interwały 10 min / 1 / 3 / 7 / 16 dni, awans/zrzut, `lapses`.
- **5 formatów pytań** rosnących z pudełkiem: mcq → match → fill → order → scenario.
- **Maszyneria sklepowa (odwzorowana z MasterADR):**
    - **Darmowy hak**: ADR bloki 1–2 + cały moduł `eco-driving` gratis; reszta PRO.
    - **Paywall + licencja** (Lemon Squeezy, offline unlock). Klucz testowy `MASTERDRIVER-TEST-2026`.
    - **Egzamin/Test per moduł**: ADR = egzamin państwowy (30 pytań / 60 min / próg 2/3);
      pozostałe = „Test wiedzy" skalowany (5–20 pytań / próg 70%).
- **Nawyk**: streak z zamrożeniem, cel dzienny, XP z bonusem.

## 🔨 JAK ZBUDOWAĆ

Apka (w korzeniu):
```
npm install
npm run build      # dist/ = apka web (PWA)
npm run dev        # podgląd na żywo (http://localhost:5173)
```
Android: `npx cap add android` → `npx cap sync` → `npx cap open android`
(pełna ścieżka: **DEPLOY_I_PLAY_STORE.md** oraz docs/INSTRUKCJA.md)

Rdzeń (testy):
```
cd core-learning && npm install && npm test
```

## ⚠ CO ZOSTAJE PRZED PUBLIKACJĄ

1. **Treść 6 paczek DRAFT** (4–6 faktów) → docelowo 20–40/moduł. Maszyneria gotowa;
   dosypanie faktów to sama edycja `PACKS` w `src/app.jsx`.
2. **Podpis DGSA / recenzja medyczna** — `verifiedBy: null`. Bez tego treść „nie istnieje"
   (bramka DRAFT→PUBLISHED).
3. **Realny link Lemon Squeezy** (`BUY_URL`) + **usunięcie klucza testowego**
   `MASTERDRIVER-TEST-2026` (oznaczony w kodzie `⚠️ USUŃ PRZED PUBLIKACJĄ`).

## 📦 REGUŁA DOSTARCZANIA
Po każdej zmianie: **kompletny projekt (zip)** + **klikalny prototyp (HTML)**.
Jedno źródło prawdy — bez forka „tylko treść / tylko struktura".

## ⚖️ Zastrzeżenie
Pomoc do nauki i przygotowania do egzaminów. **Nie jest kursem akredytowanym**, nie wydaje
zaświadczeń ani uprawnień. Paczki poza ADR mają status `DRAFT` — przed publikacją wymagają
weryfikacji (DGSA / ratownik / prawnik).
