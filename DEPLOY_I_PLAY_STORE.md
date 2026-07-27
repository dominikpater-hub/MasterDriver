# 🚀 MasterDriver — od zera do apki u użytkownika

Trzy drogi udostępnienia, od najszybszej do „w sklepie". Wszystkie działają na tym samym
projekcie w tym pakiecie. Wybierz jedną i idź po kolei.

---

## DROGA 1 — PROTOTYP (0 minut, 0 zł) — pokaż komuś TERAZ

Masz plik **`MasterDriver-prototyp-v2.html`** obok tego projektu. To cała apka w jednym
pliku (React wbudowany, działa offline).

- **Na telefonie:** wyślij sobie plik (mail / dysk), otwórz w przeglądarce.
- **„Zainstaluj" jako apkę:** w Chrome menu ⋮ → „Dodaj do ekranu głównego".

To najszybszy sposób, żeby obcy kierowca kliknął apkę. Idealne do pierwszych testów
i do pokazania na grupach kierowców, zanim wejdziesz do sklepu.

---

## DROGA 2 — WEB / PWA na VERCEL (~15 min, darmowy tier) — realny link w sieci

To odpowiednik `masteradr.vercel.app` dla MasterDriver — publiczny adres, do którego
wchodzi każdy z linku, instalowalny jako PWA.

### 2.1 Zbuduj lokalnie (sprawdzenie)
```
npm install
npm run build      # tworzy dist/
npm run preview    # podgląd builda na http://localhost:4173
```

### 2.2 Wypchnij na Vercel
Najprościej przez CLI:
```
npm i -g vercel
vercel            # pierwsze uruchomienie: zaloguj się, potwierdź projekt
vercel --prod     # publikacja produkcyjna → dostajesz URL https://<nazwa>.vercel.app
```
Ustawienia, o które zapyta Vercel (jeśli nie wykryje sam):
- **Framework preset:** Vite
- **Build command:** `npm run build`
- **Output directory:** `dist`

Alternatywnie przez panel: [vercel.com/new](https://vercel.com/new) → zaimportuj repo
(GitHub) → te same ustawienia → Deploy.

### 2.3 Gotowe
Dostajesz `https://<nazwa>.vercel.app`. PWA (service worker) już jest w buildzie —
apka działa offline po pierwszym otwarciu (bramka Offline-First z Kanonu Guardian).

> Domenę własną (np. `masterdriver.pl`) podpinasz później w panelu Vercel → Domains.

---

## DROGA 3 — ANDROID / GOOGLE PLAY (AAB) — apka w sklepie

MasterDriver ma już `capacitor.config.json` (`appId: pl.masterdriver.app`). Kroki poniżej
zamieniają web-build w natywny plik `.aab` do Play Console.

### 3.1 Narzędzia (raz) — patrz też docs/INSTRUKCJA.md
- **Node.js 22 LTS**, **Android Studio** (instaluje JDK i SDK sam),
- zmienna `ANDROID_HOME` ustawiona (Windows: `...\AppData\Local\Android\Sdk`).

### 3.2 Zbuduj projekt Android
```
npm install
npm run build                 # dist/ (apka web)
npx cap add android           # TYLKO ZA PIERWSZYM RAZEM → tworzy android/
npx cap sync                  # wrzuca build do projektu Android (po każdym build)
npx cap open android          # otwiera Android Studio
```
W Android Studio poczekaj na „Gradle sync", podłącz telefon (debugowanie USB) lub emulator,
kliknij ▶ Run — apka wgra się i uruchomi.

### 3.3 Podpisany plik do sklepu (AAB)
1. Android Studio: **Build → Generate Signed Bundle / APK → Android App Bundle**.
2. Utwórz **keystore** — ⚠ **ZAPISZ plik i hasło**. Bez niego nigdy nie zaktualizujesz apki.
3. Wariant **release** → powstaje `.aab`.

### 3.4 Google Play Console
- **Konto:** [play.google.com/console](https://play.google.com/console) — jednorazowa opłata
  **25 USD** (stan 2026). Typ **Personal** albo **Organization** (firma → wymaga numeru D-U-N-S).
- ⚠ **WAŻNE (2026):** konta **Personal** założone po 13.11.2023 muszą przejść **testy zamknięte
  z min. 12 testerami przez ~14 dni**, zanim apkę można wydać publicznie. Zaplanuj to — to
  realnie 2–3 tygodnie do publicznego wydania. Konto **Organization** tego nie wymaga.
- Wgraj `.aab`, wypełnij: ikona, screeny, opis, kategoria (Edukacja),
  **sekcja „Data safety"** (zapis lokalny, brak wysyłki danych — apka jest local-first),
  **Polityka prywatności (URL)** — wymagana, bo apka zapisuje postęp lokalnie.

### 3.5 Wersjonowanie aktualizacji
Każda nowa wersja = wyższy `versionCode` w `android/app/build.gradle`, ponowny podpis TYM
SAMYM keystore, nowy `.aab`.

---

## ⚠ CHECKLISTA „ZANIM REALNI KLIENCI ZAPŁACĄ" (bramki spoza kodu)

Maszyneria płatności jest w kodzie, ale przed pierwszą złotówką z prawdziwym klientem:

1. **Usuń klucz testowy** `MASTERDRIVER-TEST-2026` z `src/app.jsx`
   (oznaczony komentarzem `⚠️ KLUCZ TESTOWY — USUŃ PRZED PUBLIKACJĄ`).
2. **Podmień `BUY_URL`** na realny link produktu w Lemon Squeezy (albo Gumroad).
   Skonfiguruj License API w panelu — apka używa publicznego endpointu aktywacji.
3. **Podpis treści (DGSA / medyczny)** — ustaw `verifiedBy` na faktach; dopóki `null`,
   treść formalnie „nie istnieje" (bramka DRAFT→PUBLISHED, patrz docs/ADR_Training_Distribution.md).
4. **Regulamin + polityka prywatności (RODO)** — wymagane prawnie; regulamin musi zawierać
   rozgraniczenie „dodatek do nauki ≠ kurs akredytowany / nie wydaje uprawnień".
5. **Forma prawna do przyjmowania pieniędzy** — np. działalność nierejestrowana do progu;
   ⚠ sprawdź u księgowego (progi i warunki się zmieniają — to nie porada podatkowa).

Punkty 1–2 to kod (minuty). Punkty 3–5 to bramki spoza kodu — blokują pierwszą złotówkę
tak samo twardo. Zignorowanie = nie „szybciej", tylko „nielegalnie".

---

## 🧭 REKOMENDOWANA KOLEJNOŚĆ
**Droga 1 (pokaż dziś) → Droga 2 (link Vercel + darmowy hak na grupach kierowców) →
Droga 3 (Play Store, gdy masz sygnał, że ludzie klikają i wracają).**
Web/PWA nie ma bramki 12 testerów ani opłaty — jest najszybszą drogą do pierwszego
realnego użytkownika. Play Store to krok, gdy chcesz dystrybucję sklepową.
