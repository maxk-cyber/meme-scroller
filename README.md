# Meme Scroller

A polished React/Vite meme gallery built around the existing meme assets in this repository.

Live site: <https://maxk-cyber.github.io/meme-scroller/>

## Highlights

- ReactBits-inspired animated UI primitives: aurora background, spotlight cards, and click sparks.
- Iterator-powered meme browsing with next, previous, shuffle, jump, and wraparound behavior.
- Skill v1 feature engine that turns meme metadata and favorites into live missions, levels, combos, and stats.
- Keyboard shortcuts: `ArrowRight`, `ArrowLeft`, and `F` for fast browsing/favoriting.
- Focusable controls, responsive layout, and reduced-motion support.

## Scripts

```bash
npm install
npm run dev
npm test
npm run build
```

## GitHub Pages

The site is configured for GitHub Pages at `/meme-scroller/`. The Pages workflow runs tests, builds the Vite app, and deploys `dist` after changes land on `main`.

In repository settings, set **Settings > Pages > Build and deployment > Source** to **GitHub Actions**. If it is left on **Deploy from a branch**, Pages will serve the source `index.html` from `main` instead of the built Vite app.
