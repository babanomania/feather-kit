// esbuild — one entry per component + the barrel, emitted as ESM and CJS,
// followed by a gzipped-size report. Run with `node build.js`.
import { build } from "esbuild";
import { readdirSync, readFileSync, rmSync } from "node:fs";
import { gzipSync } from "node:zlib";
import { join } from "node:path";

const SRC = "src";
const OUT = "dist";
const external = ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime"];

const entryPoints = readdirSync(SRC)
  .filter((f) => f.endsWith(".jsx") || f === "index.js")
  .map((f) => join(SRC, f));

const shared = {
  entryPoints,
  outdir: OUT,
  bundle: true,
  minify: true,
  external,
  jsx: "automatic",
  target: ["es2020"],
  logLevel: "warning",
};

rmSync(OUT, { recursive: true, force: true });

await build({ ...shared, format: "esm", outExtension: { ".js": ".esm.js" } });
await build({ ...shared, format: "cjs", outExtension: { ".js": ".js" } });

// ── size report ──
const files = readdirSync(OUT)
  .filter((f) => f.endsWith(".esm.js"))
  .sort();

const rows = files.map((f) => {
  const raw = readFileSync(join(OUT, f));
  const gz = gzipSync(raw, { level: 9 }).length;
  return { name: f.replace(".esm.js", ""), raw: raw.length, gz };
});

const pad = (s, n) => String(s).padEnd(n);
const padL = (s, n) => String(s).padStart(n);

console.log("\n  feather-kit — gzipped size per entry (ESM)\n");
console.log("  " + pad("component", 16) + padL("min", 9) + padL("gzip", 10));
console.log("  " + "─".repeat(35));
let totalGz = 0;
for (const r of rows) {
  totalGz += r.name === "index" ? 0 : r.gz;
  const gz = r.gz < 1024 ? `${r.gz} B` : `${(r.gz / 1024).toFixed(2)} KB`;
  console.log("  " + pad(r.name, 16) + padL(`${r.raw} B`, 9) + padL(gz, 10));
}
console.log("  " + "─".repeat(35));
console.log("  " + pad("Σ components", 16) + padL("", 9) + padL(`${(totalGz / 1024).toFixed(2)} KB`, 10));
console.log("\n  Note: each entry is React-external; gzip is the per-component cost.\n");
