# 🛸 Omnitrix Startup Eval Board

A **Ben 10-themed** Startup Idea Evaluation Board — score, rank, compare & SWOT-analyze your startup ideas.

## 🚀 Run Locally

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev
```
Open http://localhost:5173

---

## 📦 Deploy to GitHub Pages

### Step 1 — Update `package.json`
Replace `<YOUR_GITHUB_USERNAME>` with your actual GitHub username:
```json
"homepage": "https://<YOUR_GITHUB_USERNAME>.github.io/startup-eval-board",
```

### Step 2 — Update `vite.config.js`
The `base` is already set to `/startup-eval-board/`. If your repo name is different, change it:
```js
base: '/your-repo-name/',
```

### Step 3 — Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<YOUR_USERNAME>/startup-eval-board.git
git push -u origin main
```

### Step 4 — Deploy
```bash
npm run deploy
```
This runs `npm run build` then pushes `dist/` to the `gh-pages` branch.

### Step 5 — Enable GitHub Pages
- Go to your repo on GitHub
- Settings → Pages
- Source: **Deploy from a branch**
- Branch: **gh-pages** / root
- Save → wait ~2 min → visit your URL 🎉

---

## 🧬 Features
- 📊 **Dashboard** — Analytics overview, bar/radar charts, category scores
- 💡 **Ideas** — Add/edit/delete startup ideas with SWOT per card
- 🏆 **Rankings** — Visual leaderboard with score distribution
- ⚖️ **Compare** — Side-by-side radar + table comparison (up to 4)
- ⚙️ **Criteria** — Define/weight evaluation criteria

## 🛠 Tech Stack
- Vite + React 18
- Recharts (charts)
- Lucide React (icons)
- Pure CSS (Ben 10 Omnitrix theme)
