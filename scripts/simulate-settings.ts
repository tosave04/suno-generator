/**
 * Simulation de 100 compositions aléatoires avec calcul des réglages Suno.
 *
 * Usage : npx tsx scripts/simulate-settings.ts
 */

import { generateRandomComposition } from "../lib/utils/random-composition";
import { calculateSunoSettings } from "../lib/services/settings-calculator";

const N = 100;

interface Run {
  genres: string[];
  mood: string | null;
  style: string;
  weirdness: number;
  styleInfluence: number;
}

const runs: Run[] = [];

for (let i = 0; i < N; i++) {
  const comp = generateRandomComposition();
  const settings = calculateSunoSettings(
    comp.genres,
    comp.mood ?? undefined,
    comp.style,
  );
  runs.push({
    genres: comp.genres,
    mood: comp.mood,
    style: comp.style,
    weirdness: settings.weirdness,
    styleInfluence: settings.styleInfluence,
  });
}

// --- Stats helpers ---
function avg(values: number[]): number {
  return values.reduce((a, b) => a + b, 0) / values.length;
}
function median(values: number[]): number {
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}
function stdDev(values: number[]): number {
  const m = avg(values);
  return Math.sqrt(values.reduce((s, v) => s + (v - m) ** 2, 0) / values.length);
}

const weirdnessValues = runs.map((r) => r.weirdness);
const styleValues = runs.map((r) => r.styleInfluence);

// --- Labels ---
function weirdnessLabel(v: number): string {
  if (v <= 25) return "Safe zone";
  if (v <= 50) return "Expected";
  if (v <= 75) return "Experimental";
  return "Chaos mode";
}
function styleLabel(v: number): string {
  if (v <= 33) return "Loose";
  if (v <= 66) return "Moderate";
  return "Strong";
}

// --- Distribution ---
function distribution(values: number[], labelFn: (v: number) => string): Record<string, number> {
  const dist: Record<string, number> = {};
  for (const v of values) {
    const label = labelFn(v);
    dist[label] = (dist[label] ?? 0) + 1;
  }
  return dist;
}

// --- Affichage ---
console.log("═".repeat(60));
console.log(`  🎲 Simulation de ${N} compositions aléatoires`);
console.log("═".repeat(60));

console.log("\n📊 WEIRDNESS");
console.log("─".repeat(40));
console.log(`  Min     : ${Math.min(...weirdnessValues)}`);
console.log(`  Max     : ${Math.max(...weirdnessValues)}`);
console.log(`  Moyenne : ${avg(weirdnessValues).toFixed(1)}`);
console.log(`  Médiane : ${median(weirdnessValues)}`);
console.log(`  Écart-type : ${stdDev(weirdnessValues).toFixed(1)}`);

const wDist = distribution(weirdnessValues, weirdnessLabel);
console.log("\n  Distribution :");
for (const [label, count] of Object.entries(wDist).sort((a, b) => b[1] - a[1])) {
  const bar = "█".repeat(Math.round(count / 2));
  console.log(`    ${label.padEnd(14)} ${String(count).padStart(3)} (${((count / N) * 100).toFixed(0)}%) ${bar}`);
}

console.log("\n📊 STYLE INFLUENCE");
console.log("─".repeat(40));
console.log(`  Min     : ${Math.min(...styleValues)}`);
console.log(`  Max     : ${Math.max(...styleValues)}`);
console.log(`  Moyenne : ${avg(styleValues).toFixed(1)}`);
console.log(`  Médiane : ${median(styleValues)}`);
console.log(`  Écart-type : ${stdDev(styleValues).toFixed(1)}`);

const sDist = distribution(styleValues, styleLabel);
console.log("\n  Distribution :");
for (const [label, count] of Object.entries(sDist).sort((a, b) => b[1] - a[1])) {
  const bar = "█".repeat(Math.round(count / 2));
  console.log(`    ${label.padEnd(14)} ${String(count).padStart(3)} (${((count / N) * 100).toFixed(0)}%) ${bar}`);
}

// --- Top combos ---
console.log("\n🔥 Exemples extrêmes");
console.log("─".repeat(40));
const maxWeird = runs.reduce((a, b) => (a.weirdness > b.weirdness ? a : b));
const minWeird = runs.reduce((a, b) => (a.weirdness < b.weirdness ? a : b));
const maxStyle = runs.reduce((a, b) => (a.styleInfluence > b.styleInfluence ? a : b));
const minStyle = runs.reduce((a, b) => (a.styleInfluence < b.styleInfluence ? a : b));

function fmtRun(r: Run): string {
  return `${r.genres.join("+")} | mood:${r.mood ?? "—"} | style:${r.style}`;
}

console.log(`  Weirdness MAX  : ${maxWeird.weirdness} → ${fmtRun(maxWeird)}`);
console.log(`  Weirdness MIN  : ${minWeird.weirdness} → ${fmtRun(minWeird)}`);
console.log(`  StyleInfl MAX  : ${maxStyle.styleInfluence} → ${fmtRun(maxStyle)}`);
console.log(`  StyleInfl MIN  : ${minStyle.styleInfluence} → ${fmtRun(minStyle)}`);

console.log("\n" + "═".repeat(60));
