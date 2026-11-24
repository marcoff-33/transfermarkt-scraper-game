#!/usr/bin/env node
// Rebuilds public/players.json and public/seriea.json from current Transfermarkt squads.
//
//   npm run update-db                 # both files, current season
//   npm run update-db -- --season 2026 --only seriea --dry-run
//
// Each file has the shape { [role]: { t1: id[], t2: id[], t3: id[] } } used by the games.
// Tiers are by current market value (see TOP5_TIERS / SERIEA_TIERS). Must run from a normal machine/network:
// Transfermarkt blocks most cloud/datacenter IPs.

import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { JSDOM } from "jsdom";

// ---------------------------------------------------------------- config

const BASE = "https://www.transfermarkt.us";

// t1 = stars, t2 = solid starters, t3 = bargains (values in €).
// the min of t3 is a floor: it skips unknown youth/backup players with tiny values.
const tiers = (t1, t2, t3) => [
  { tier: "t1", min: t1 },
  { tier: "t2", min: t2 },
  { tier: "t3", min: t3 },
];

// goalkeepers are valued much lower than outfield players, so they get their own ranges.
// Serie A alone has few €50m+ players, so its file uses lower ranges.
const TOP5_TIERS = { default: tiers(50e6, 15e6, 2e6), GK: tiers(30e6, 8e6, 1e6) };
const SERIEA_TIERS = { default: tiers(30e6, 10e6, 1e6), GK: tiers(15e6, 5e6, 1e6) };

// if a tier is still empty after the position fallbacks, move this many of the
// closest-valued players over from the neighbouring tier
const BORROW_COUNT = 3;

// cap per role/tier so the json (bundled into the client) stays small.
// players are picked evenly across the tier's value range, so the spread is kept.
const MAX_PER_TIER = 40;

const DATABASES = {
  players: { file: "public/players.json", leagues: ["GB1", "ES1", "L1", "IT1", "FR1"], tiers: TOP5_TIERS },
  seriea: { file: "public/seriea.json", leagues: ["IT1"], tiers: SERIEA_TIERS },
};

// Transfermarkt position -> game roles. Roles in the same group share a pool,
// like the original hand-made files (LCB/RCB/MCB, LCM/RCM, CF/SS).
// wingers and wide midfielders share a pool: Transfermarkt lists very few pure "Left/Right Midfield" players.
const POSITION_ROLES = {
  Goalkeeper: ["GK"],
  "Right-Back": ["RB"],
  "Left-Back": ["LB"],
  "Centre-Back": ["LCB", "RCB", "MCB"],
  "Defensive Midfield": ["DMF"],
  "Central Midfield": ["LCM", "RCM"],
  "Attacking Midfield": ["AMF"],
  "Right Midfield": ["RMF", "RWF"],
  "Left Midfield": ["LMF", "LWF"],
  "Right Winger": ["RWF", "RMF"],
  "Left Winger": ["LWF", "LMF"],
  "Centre-Forward": ["CF", "SS"],
  "Second Striker": ["CF", "SS"],
};

// when a role/tier ends up empty (ex: few pure "Left Midfield" players worth €50m+),
// fill it from these related positions instead.
const FALLBACK_POSITIONS = {
  RMF: ["Right-Back", "Left Winger"],
  LMF: ["Left-Back", "Right Winger"],
  AMF: ["Central Midfield", "Second Striker"],
  DMF: ["Central Midfield"],
  RWF: ["Left Winger"],
  LWF: ["Right Winger"],
  RB: ["Left-Back", "Right Midfield"],
  LB: ["Right-Back", "Left Midfield"],
  LCM: ["Defensive Midfield", "Attacking Midfield"],
  RCM: ["Defensive Midfield", "Attacking Midfield"],
  CF: ["Left Winger", "Right Winger"],
  SS: ["Attacking Midfield"],
};

// same key order as the original files
const ROLES = ["GK", "RB", "RCB", "LCB", "LB", "DMF", "LCM", "RCM", "CF", "AMF", "LWF", "RWF", "MCB", "RMF", "LMF", "SS"];

const HEADERS = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
  Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
  "Accept-Language": "en-US,en;q=0.9",
};

const REQUEST_DELAY_MS = 1500; // be polite, Transfermarkt rate-limits hard

// ---------------------------------------------------------------- scraping

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function getDocument(url, attempt = 1) {
  await sleep(REQUEST_DELAY_MS);
  const res = await fetch(url, { headers: HEADERS });
  if (!res.ok) {
    if (attempt < 4 && (res.status === 429 || res.status >= 500)) {
      await sleep(5000 * attempt);
      return getDocument(url, attempt + 1);
    }
    throw new Error(`${res.status} ${res.statusText} for ${url}`);
  }
  return new JSDOM(await res.text()).window.document;
}

export function parseValue(text) {
  const match = (text || "").replace(/\s+/g, " ").match(/[€$£]\s?(\d+(?:[.,]\d+)?)\s?(bn|m|k)\b/i);
  if (!match) return 0;
  const multipliers = { k: 1e3, m: 1e6, bn: 1e9 };
  return Math.round(parseFloat(match[1].replace(",", ".")) * multipliers[match[2].toLowerCase()]);
}

export function parseClubIds(document) {
  const ids = new Set();
  for (const a of document.querySelectorAll('table.items td.hauptlink a[href*="/verein/"]')) {
    const id = a.getAttribute("href").match(/\/verein\/(\d+)/)?.[1];
    if (id) ids.add(id);
  }
  return [...ids];
}

export function parseSquad(document) {
  const players = [];
  for (const row of document.querySelectorAll("table.items > tbody > tr")) {
    const link = row.querySelector('td.hauptlink a[href*="/profil/spieler/"]');
    const id = link?.getAttribute("href").match(/\/spieler\/(\d+)/)?.[1];
    if (!id) continue;
    const position = row.querySelector("td.posrela table.inline-table tr:last-child td")?.textContent.trim() || "";
    // market value is the last cell of the row
    const cells = row.querySelectorAll(":scope > td");
    const value = parseValue(cells[cells.length - 1]?.textContent);
    players.push({ id: Number(id), name: link.textContent.trim(), position, value });
  }
  return players;
}

async function scrapeLeague(league, season) {
  const leagueDoc = await getDocument(`${BASE}/-/startseite/wettbewerb/${league}/plus/?saison_id=${season}`);
  const clubIds = parseClubIds(leagueDoc);
  if (clubIds.length === 0) throw new Error(`No clubs found for ${league} (blocked, or page layout changed)`);

  const players = [];
  for (const [i, clubId] of clubIds.entries()) {
    const squadDoc = await getDocument(`${BASE}/-/kader/verein/${clubId}/saison_id/${season}/plus/1`);
    const squad = parseSquad(squadDoc);
    console.log(`  ${league} club ${i + 1}/${clubIds.length} (${clubId}): ${squad.length} players`);
    players.push(...squad);
  }
  return players;
}

// ---------------------------------------------------------------- building

function tierOf(value, tiers) {
  return tiers.find((t) => value >= t.min)?.tier ?? null;
}

// pick `max` players evenly spread across the value range
function spread(players, max) {
  const sorted = [...players].sort((a, b) => b.value - a.value);
  if (sorted.length <= max) return sorted;
  return Array.from({ length: max }, (_, i) => sorted[Math.round((i * (sorted.length - 1)) / (max - 1))]);
}

export function buildDb(allPlayers, tierConfig = TOP5_TIERS) {
  // dedupe (a player can show up twice after a mid-season transfer)
  const players = [...new Map(allPlayers.map((p) => [p.id, p])).values()];
  const byPosition = (positions) => players.filter((p) => positions.includes(p.position));
  const db = {};
  const warnings = [];

  for (const role of ROLES) {
    const tiers = tierConfig[role] || tierConfig.default;
    const primary = Object.keys(POSITION_ROLES).filter((pos) => POSITION_ROLES[pos].includes(role));
    const pools = {};

    for (const { tier } of tiers) {
      pools[tier] = byPosition(primary).filter((p) => tierOf(p.value, tiers) === tier);
      if (pools[tier].length === 0) {
        pools[tier] = byPosition(FALLBACK_POSITIONS[role] || []).filter((p) => tierOf(p.value, tiers) === tier);
        if (pools[tier].length) warnings.push(`${role}/${tier}: no exact matches, used ${pools[tier].length} from related positions`);
      }
    }

    // still empty: move the closest-valued players over from the neighbouring tier
    const order = tiers.map((t) => t.tier);
    for (const [i, tier] of order.entries()) {
      if (pools[tier].length) continue;
      const neighbours = [order[i + 1], order[i - 1]].filter(Boolean);
      const from = neighbours.find((n) => pools[n].length > 1);
      if (!from) throw new Error(`${role}/${tier} is empty and there are not enough ${role} players to fill it`);
      const sorted = [...pools[from]].sort((a, b) => b.value - a.value);
      // borrowing from a lower tier takes its most valuable players, from a higher tier its cheapest
      const count = Math.min(BORROW_COUNT, sorted.length - 1);
      const moved = order.indexOf(from) > i ? sorted.slice(0, count) : sorted.slice(-count);
      pools[tier] = moved;
      pools[from] = pools[from].filter((p) => !moved.includes(p));
      warnings.push(`${role}/${tier}: empty, moved ${moved.length} players over from ${from}`);
    }

    db[role] = {};
    for (const tier of order) db[role][tier] = spread(pools[tier], MAX_PER_TIER).map((p) => p.id);
  }
  return { db, warnings };
}

// same compact layout as the original files: one line per tier
function formatDb(db) {
  const roles = Object.entries(db).map(([role, tiers]) => {
    const t = Object.entries(tiers).map(([tier, ids]) => `    "${tier}": [${ids.join(", ")}]`);
    return `  "${role}": {\n${t.join(",\n")}\n  }`;
  });
  return `{\n${roles.join(",\n")}\n}\n`;
}

// ---------------------------------------------------------------- main

function parseArgs(argv) {
  const args = { dryRun: argv.includes("--dry-run") };
  const get = (flag) => {
    const i = argv.indexOf(flag);
    return i !== -1 ? argv[i + 1] : undefined;
  };
  const now = new Date();
  // Transfermarkt season ids are the starting year (2026 = 2026/27), new season from July
  args.season = Number(get("--season")) || (now.getMonth() >= 6 ? now.getFullYear() : now.getFullYear() - 1);
  args.only = get("--only");
  return args;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
  const targets = Object.entries(DATABASES).filter(([name]) => !args.only || name === args.only);
  if (targets.length === 0) throw new Error(`--only must be one of: ${Object.keys(DATABASES).join(", ")}`);

  console.log(`Season ${args.season}/${String(args.season + 1).slice(2)}`);
  const leagueCache = new Map();

  for (const [name, { file, leagues, tiers }] of targets) {
    console.log(`\n== ${name} (${leagues.join(", ")})`);
    const players = [];
    for (const league of leagues) {
      if (!leagueCache.has(league)) leagueCache.set(league, await scrapeLeague(league, args.season));
      players.push(...leagueCache.get(league));
    }

    const unknown = [...new Set(players.map((p) => p.position).filter((pos) => !(pos in POSITION_ROLES)))];
    if (unknown.length) console.warn(`  unmapped positions (ignored): ${unknown.join(", ")}`);

    const { db, warnings } = buildDb(players, tiers);
    warnings.forEach((w) => console.warn(`  ${w}`));
    for (const role of ROLES) console.log(`  ${role.padEnd(4)} t1:${db[role].t1.length} t2:${db[role].t2.length} t3:${db[role].t3.length}`);

    if (args.dryRun) {
      console.log(`  (dry run, ${file} not written)`);
    } else {
      await writeFile(path.join(root, file), formatDb(db));
      console.log(`  wrote ${file}`);
    }
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch((err) => {
    console.error(`\n${err.message}`);
    process.exit(1);
  });
}
