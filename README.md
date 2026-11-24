# Football Team Builder

Build a team on a budget from players scraped off Transfermarkt. Next.js, deployed on Vercel.

## Setup

```bash
git clone https://github.com/marcoff-33/transfermarkt-scraper-game.git
cd transfermarkt-scraper-game
npm install
npm run dev
```

Pushing needs auth: run `gh auth login` once ([GitHub CLI](https://cli.github.com)), or clone over SSH.

## Player DB

`public/players.json` (top 5 leagues) and `public/seriea.json` (Serie A) map each role to three value tiers:

| tier | top 5       | top 5 GK   | Serie A     | Serie A GK |
| ---- | ----------- | ---------- | ----------- | ---------- |
| t1   | €50m+       | €30m+      | €30m+       | €15m+      |
| t2   | €15m – €50m | €8m – €30m | €10m – €30m | €5m – €15m |
| t3   | €2m – €15m  | €1m – €8m  | €1m – €10m  | €1m – €5m  |

Rebuild both from current squads (run locally, Transfermarkt blocks cloud IPs):

```bash
npm run update-db -- --dry-run   # print counts only
npm run update-db                # write the files
```

Options: `--only players|seriea`, `--season 2026`. Ranges, leagues and position mapping are at the top of `scripts/update-player-db.mjs`.
