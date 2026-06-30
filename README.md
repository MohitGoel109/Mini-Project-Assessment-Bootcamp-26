# 🛸 Omnitrix Startup Eval Board

A **Ben 10-themed** Startup Idea Evaluation Board — score, rank, compare, and SWOT-analyze your startup ideas. Switch between **8 alien-inspired themes**, each with its own **Ultimate form**, complete with an Omnitrix-style transformation animation and sound on every switch.

**🔗 Live Demo:** [https://mohitgoel109.github.io/Mini-Project-Assessment-Bootcamp-26/](https://mohitgoel109.github.io/Mini-Project-Assessment-Bootcamp-26/)

---

## ✨ Features

- 💡 **Ideas** — add, edit, delete startup ideas with category tags and descriptions
- ⚙️ **Criteria** — define custom evaluation criteria with adjustable weights (must total 100%)
- 📊 **Scoring** — per-criterion sliders (1–10) per idea, weighted into one overall score
- 🧬 **SWOT** — Strengths / Weaknesses / Opportunities / Threats panel per idea
- 🏆 **Rankings** — auto-sorted leaderboard with trophy/medal icons, bar + line charts
- ⚖️ **Compare** — side-by-side radar chart + score table for up to 4 ideas at once
- 📈 **Dashboard** — analytics overview: averages, category breakdown, top-3 radar
- 🎨 **8 Alien Themes, each with a Base + Ultimate form** — pick an alien from the picker, then evolve it
- 🔊 **Sound design** — Omnitrix-style UI click sounds, a TTS transformation shout, and looping background music
- 💾 **Persistent storage** — ideas and criteria are saved to your browser's local storage, so they survive a refresh or closed tab
- 📱 **App view** — responsive layout with a mobile bottom tab bar

---

## 🤖 Auto-suggested scores (with manual override)

New ideas no longer start at a flat, tied "5" for every criterion. Instead, as you type the **name**, **description**, and pick a **category**, a lightweight keyword engine (`src/data/autoScore.js`) scans the text and pre-fills each criterion slider with a suggested score (1–10).

- **How it works**: each criterion name is matched to a "dimension" (market, innovation, feasibility, revenue, competition, or a generic fallback) by looking for hint words in the criterion's own name (e.g. a criterion called "Market Fit" maps to the `market` dimension). The idea's combined text is then scanned for booster/dampener keywords for that dimension — words associated with AI, novelty, or disruption push **Innovation** up; words associated with saturation or dominant incumbents push **Competition** down.
- **Manual override**: drag any slider and it immediately switches from an `Auto` badge to a `Manual` badge — your manual value is never overwritten by future re-suggestions. A small reset icon next to a manually-set slider lets you snap it back to the auto-suggested value.
- **Re-suggest button**: in the Scores tab, click **Suggest Scores from Text** to re-run the engine on the current name/description — it only refreshes criteria still marked `Auto`, leaving your manual edits untouched.
- **Rankings warning**: the Rankings page still flags any idea where *every* criterion is sitting at the neutral default (5) — a rare, meaningful signal now that auto-suggestion handles most cases.

This works against **any** custom criteria you define in the Criteria tab, not just the 5 defaults — criteria that don't match a known dimension fall back to a generic score based on description length and overall keyword density.

---

## 🎨 Themes

Each alien has a **Base** form and an **Ultimate** form, 16 palettes total, every accent color spaced evenly around the color wheel so no two ever look alike.

| Alien | Inspired by |
|---|---|
| **Ben 10** *(default)* | Omnitrix |
| Four Arms | Tetramand strength |
| XLR8 | Kineceleran speed |
| Diamondhead | Petrosapien crystal |
| Heatblast | Pyronite fire |
| Wildmutt | Vulpimancer instinct |
| Way Big | To'kustar colossus |
| Ghostfreak | Ectonurite shadow |

**How to switch:**
1. Click the **alien name button** in the top-right of the header to open the picker, then pick an alien — this applies its Base form
2. Click the **Evolve** button next to it to flip the current alien to its **Ultimate** form (click again to revert)

Every switch plays a short transformation animation (spinning dial → flash → new theme reveal) along with UI sound effects.

---

## 🔊 Sound Design

All audio is generated in-browser via the Web Audio API and Web Speech API — no external audio files required for the core experience.

- **UI click sounds** — four distinct synthesized tones depending on the action: a mechanical "tick" for navigation, an ascending "confirm" beep for primary actions (Add/Save), a descending "delete" warning for destructive actions, and a quick "scan" blip for selections/filters. See `src/hooks/useClickSound.js`.
- **Transformation shout** — when you switch themes, the browser's built-in Text-to-Speech announces the alien's name, tuned for a punchier delivery (raised pitch, faster rate, layered echo, plus a synthesized sub-bass "boom"). See `src/hooks/useVoiceShout.js`.
- **Background music** — an optional looping music track, toggled via the speaker icon in the header. See `src/hooks/useBackgroundMusic.js` (expects a file at `public/audio/bgm.mp3`).

---

## 🛠 Tech Stack

- **Vite + React 18**
- **Recharts** — bar, line, radar charts (works out of the box, no extra setup)
- **Tremor** (`@tremor/react`) — optional alternate analytics dashboard (see below)
- **Tailwind CSS** — required by Tremor
- **lucide-react** — all icons are font/vector icons, not emoji
- **Web Audio API + Web Speech API** — all sound effects, no audio library dependency
- Pure CSS custom properties for theming (no CSS-in-JS)

---

## ▶️ Run Locally

```bash
npm install
npm run dev
```
Open the printed local URL (usually `http://localhost:5173`).

> **Background music:** place an MP3 at `public/audio/bgm.mp3` (create the `audio` folder under `public/` if it doesn't exist) to enable the music toggle button.

---

## 🧪 Using the Tremor dashboard (optional)

The default `Dashboard.jsx` uses **Recharts** and works immediately. A second dashboard, `src/components/DashboardTremor.jsx`, is included and built with **Tremor** components (`Card`, `BarChart`, `DonutChart`, `ProgressBar`, `Metric`).

Tremor + Tailwind are already declared in `package.json`, `tailwind.config.js`, and `postcss.config.js`, and the Tailwind directives are already in `src/index.css`. To actually use it:

1. Run `npm install` (pulls in `@tremor/react`, `tailwindcss`, `postcss`, `autoprefixer`)
2. Open `src/App.jsx`
3. Change:
   ```js
   import Dashboard from './components/Dashboard.jsx';
   ```
   to:
   ```js
   import Dashboard from './components/DashboardTremor.jsx';
   ```
4. `npm run dev` and reload

Both dashboards read from the same `useStore()` data, so nothing else needs to change.

---

## 📁 Where to change things

| What you want to change | File |
|---|---|
| Add/edit alien themes (Base + Ultimate palettes) | `src/data/themes.js` |
| Theme transformation animation | `src/index.css` (search `THEME TRANSFORMATION`) + `src/components/TransformOverlay.jsx` |
| Theme switching logic, Base/Ultimate state | `src/context/ThemeContext.jsx` |
| UI click sounds | `src/hooks/useClickSound.js` |
| Transformation voice shout | `src/hooks/useVoiceShout.js` |
| Background music | `src/hooks/useBackgroundMusic.js` (+ `public/audio/bgm.mp3`) |
| Auto-scoring keywords / dimensions | `src/data/autoScore.js` |
| Default sample ideas | `src/data/initial.js` → `SAMPLE_IDEAS` |
| Default criteria | `src/data/initial.js` → `DEFAULT_CRITERIA` |
| Idea/criteria state logic, ranking math, local storage persistence | `src/data/store.js` |
| Add-idea / edit-idea form, auto-suggest wiring | `src/components/IdeaModal.jsx` |
| Rankings page (icons, charts) | `src/components/RankingView.jsx` |
| Mobile bottom nav | `src/App.jsx` (`<nav className="bottom-nav">`) + `.bottom-nav` CSS in `index.css` |
| Recharts → Tremor dashboard swap | `src/App.jsx` import line (see above) |

### Tuning auto-suggested scores
Open `src/data/autoScore.js`:
- `DIMENSION_KEYWORDS` — add/remove booster (score ↑) and dampener (score ↓) words per dimension (`market`, `innovation`, `feasibility`, `revenue`, `competition`)
- `DIMENSION_NAME_HINTS` — controls which words in a **criterion's name** map it to a dimension (e.g. a criterion named "Innovation Factor" matches via `'innovat'`)
- `scoreGeneric()` — fallback scoring for custom criteria that don't match any dimension

### Disabling auto-suggest entirely
In `src/components/IdeaModal.jsx`, the `handleFieldChange` function is what triggers live re-suggestion while typing. Remove its `suggestScores(...)` block to fall back to flat default scores (the **Suggest Scores from Text** button can still be removed separately if you want pure manual entry).

---

## 🚀 Deploy to GitHub Pages

This project is already live at **[mohitgoel109.github.io/Mini-Project-Assessment-Bootcamp-26](https://mohitgoel109.github.io/Mini-Project-Assessment-Bootcamp-26/)**. To redeploy after making changes:

```bash
npm run deploy
```
This runs `npm run build` then publishes `dist/` to the `gh-pages` branch (via the `gh-pages` package, already in `devDependencies`). Changes typically go live within 1–2 minutes.

If setting this up fresh on a new repo:

1. Set `homepage` in `package.json` to `https://<YOUR_GITHUB_USERNAME>.github.io/<YOUR_REPO_NAME>`
2. Confirm `vite.config.js`'s `base` matches your repo name, e.g. `base: '/<YOUR_REPO_NAME>/'`
3. Push to GitHub, then run `npm run deploy`
4. In the repo: **Settings → Pages → Source: Deploy from a branch → Branch: gh-pages / root**

---

## 📱 App view / Mobile

Below 760px width the header nav collapses and a bottom tab bar (Dashboard / Ideas / Rankings / Compare / Criteria) appears, matching common mobile app patterns. Stat grids, comparison tables, and the SWOT grid also reflow to single/double columns automatically — no separate mobile build needed, it's all in the existing responsive CSS (`@media (max-width: 760px)` and `@media (max-width: 420px)` blocks in `src/index.css`).
