# 🗂️ BUILDING STATUS — MasterDriver (stan na 2026-07-20)

## 🔧 CO ZOSTAŁO ZROBIONE — ODWZOROWANIE MASZYNERII MasterADR → MasterDriver

MasterDriver to **siostra MasterADR**: ten sam silnik, ten sam kod, inne opakowanie.
MasterADR jest jednoproduktowym trenerem ADR; MasterDriver jest **multi-modułowym**
trenerem kierowcy zawodowego (8 modułów). Ta sesja domknęła MasterDriver **do poziomu
MasterADR** — czyli przeniosła CAŁĄ maszynerię sklepową, z decyzjami dopasowanymi do
tego, że modułów jest osiem, a nie jeden.

### Odwzorowane 1:1 z MasterADR (z uzasadnieniem różnic)

| Mechanizm MasterADR | Stan w MasterDriver | Zasadność różnicy |
|---|---|---|
| Projekt Vite + React + Capacitor + PWA | ✅ przeniesiony | Bez tego nie ma deployu ani Play Store |
| Licencja + paywall (Lemon Squeezy, offline unlock) | ✅ klucz `MASTERDRIVER-TEST-2026` | Własna tożsamość klucza/klucza magazynu (`masterdriver.license.v1`) |
| Darmowy hak (w MasterADR: bloki ADR 1–2 gratis) | ✅ **per moduł**: ADR bloki 1–2 + cały moduł `eco-driving` gratis, reszta PRO | MasterDriver ma 8 modułów, nie jeden — hak musi pokazać mechanikę na pełnym module, bez oddania całej wartości |
| Symulacja egzaminu (30/60/próg 2/3) | ✅ **per moduł**: ADR = egzamin państwowy 30/60/⅔; pozostałe = „Test wiedzy" skalowany (5–20 pytań, próg 70%) | Nie istnieje państwowy „egzamin Eco-driving 30 pytań" — udawanie go byłoby fałszywym framingiem. Test wiedzy uczciwie sprawdza moduł |
| Streak z zamrożeniem + cel dzienny + XP (`daily-habit.js`) | ✅ przeniesiony 1:1 | Bez zmian — mechanika nawyku jest modułowo-neutralna |
| Ekran startowy | ✅ **lista modułów** (`__ADR_ONLY__ = false`) | MasterADR startuje w samym ADR; MasterDriver na multi-module home |
| Ikona/manifest/appId | ✅ `pl.masterdriver.app`, ikona „M" w rombie ADR | Osobny produkt = osobna tożsamość w sklepie |

### Bramka freemium — jak działa w praktyce
- **ADR**: bloki 1–2 gratis (jak w MasterADR), egzamin ADR i bloki 3–5 za PRO.
- **eco-driving**: cały moduł + Test wiedzy gratis (witryna mechaniki Leitnera).
- **tachograf / czas-pracy / mocowanie / pierwsza-pomoc / zaladunek**: PRO
  (klik w kafel bez licencji → paywall).
- Kafle modułów mają badge `🔒 PRO` / `GRATIS` i mini-przycisk `📝 Egzamin` (ADR) / `📝 Test`.

### Weryfikacja (real Chromium, Playwright)
- **Mount**: 0 błędów, renderuje pełny multi-module home (8 modułów, Powtórka dnia, postęp).
- **Paywall**: klik modułu PRO (Tachograf) → paywall; wpisanie `MASTERDRIVER-TEST-2026`
  + Aktywuj → powrót do apki odblokowany.
- **Egzamin/Test**: Eco (GRATIS) → Test wiedzy startuje (timer + pytania), bez paywalla.
- **Build**: `npm run build` ✓ (23 moduły, 370 kB JS / 107 kB gzip, PWA + sw.js).
- **Logika gejtowania i egzaminu**: 10/10 asercji jednostkowych PASS.

---

## ⚠ CO ZOSTAJE (świadomie odłożone, tak jak w MasterADR)

1. **Treść 6 paczek DRAFT** — tachograf/czas-pracy/eco/mocowanie/pierwsza-pomoc/zaladunek
   mają po 4–6 faktów; ADR ma 218. To osobna praca „w głąb" (patrz `docs/CONTENT_ANALYSIS.md`,
   cel 20–40 faktów/moduł). Maszyneria jest gotowa — dosypanie faktów to tylko edycja `PACKS`.
2. **Podpis DGSA / recenzja medyczna** — `verifiedBy: null` na treści. Bramka
   DRAFT→PUBLISHED z `content.ts` / `ADR_Training_Distribution.md` niezmieniona.
3. **Realny link Lemon Squeezy + klucz testowy** — `BUY_URL` i `MASTERDRIVER-TEST-2026`
   do podmiany/usunięcia przed publikacją (oznaczone komentarzem `⚠️ USUŃ PRZED PUBLIKACJĄ`).
4. **Scalenie silnika** (`app.jsx` importuje `core-learning/`) — jak w MasterADR krok 4,
   odłożone by nie ruszać działającego deployu jedną wielką zmianą.

---

## 📦 REGUŁA DOSTARCZANIA (jak w MasterADR)
Po każdej zmianie: **kompletny projekt (zip)** + **klikalny prototyp (HTML)**.
Ten pakiet: `MasterDriver-complete/` (projekt) + `MasterDriver-prototyp-v2.html` (prototyp).
Jedno źródło prawdy — bez forka „tylko treść / tylko struktura".
