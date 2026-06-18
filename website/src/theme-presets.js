// The 12 ready-made themes (shared by the customizer and the templates page)
// plus the colour helpers used to derive --fk-accent-soft and --fk-on-accent.

export const THEMES = [
  { name: "Feather",  accent: "#109488", accentDeep: "#0C746B", ink: "#1A1917", inkSoft: "#57544E", muted: "#8C8980", bg: "#FBFAF7", bgSubtle: "#F2F0EA", border: "#D8D3C8", danger: "#C5365E", radius: 8,  softAlpha: 0.12 },
  { name: "Slate",    accent: "#2563EB", accentDeep: "#1D4ED8", ink: "#0F172A", inkSoft: "#475569", muted: "#94A3B8", bg: "#FFFFFF", bgSubtle: "#F1F5F9", border: "#E2E8F0", danger: "#E11D48", radius: 4,  softAlpha: 0.12 },
  { name: "Indigo",   accent: "#4F46E5", accentDeep: "#4338CA", ink: "#1E1B4B", inkSoft: "#4B4763", muted: "#9490AC", bg: "#FFFFFF", bgSubtle: "#F5F3FF", border: "#E5E1F6", danger: "#E11D48", radius: 10, softAlpha: 0.12 },
  { name: "Violet",   accent: "#7C3AED", accentDeep: "#6D28D9", ink: "#2A1857", inkSoft: "#574B70", muted: "#9B90B2", bg: "#FFFFFF", bgSubtle: "#F7F3FE", border: "#EBE3F9", danger: "#E11D48", radius: 16, softAlpha: 0.12 },
  { name: "Rose",     accent: "#E11D48", accentDeep: "#BE123C", ink: "#1F1416", inkSoft: "#5C474C", muted: "#9B8488", bg: "#FFFBFB", bgSubtle: "#FFF1F2", border: "#F5DCE0", danger: "#B42318", radius: 12, softAlpha: 0.10 },
  { name: "Honey",    accent: "#D97706", accentDeep: "#B45309", ink: "#1C1917", inkSoft: "#57534E", muted: "#A8A29E", bg: "#FFFDF7", bgSubtle: "#FBF4E6", border: "#ECE2CE", danger: "#DC2626", radius: 10, softAlpha: 0.12 },
  { name: "Emerald",  accent: "#059669", accentDeep: "#047857", ink: "#14201B", inkSoft: "#4B5A52", muted: "#93A39B", bg: "#FFFFFF", bgSubtle: "#F0F7F3", border: "#DCEAE2", danger: "#E11D48", radius: 6,  softAlpha: 0.12 },
  { name: "Graphite", accent: "#18181B", accentDeep: "#000000", ink: "#18181B", inkSoft: "#52525B", muted: "#A1A1AA", bg: "#FFFFFF", bgSubtle: "#F4F4F5", border: "#E4E4E7", danger: "#DC2626", radius: 2,  softAlpha: 0.08 },
  { name: "Midnight", accent: "#38BDF8", accentDeep: "#0EA5E9", ink: "#E2E8F0", inkSoft: "#94A3B8", muted: "#64748B", bg: "#131C31", bgSubtle: "#0B1120", border: "#29354F", danger: "#FB7185", radius: 10, softAlpha: 0.16 },
  { name: "Mocha",    accent: "#F59E0B", accentDeep: "#D97706", ink: "#F4ECE0", inkSoft: "#C4B5A2", muted: "#8C8072", bg: "#292420", bgSubtle: "#1B1714", border: "#3B342C", danger: "#F87171", radius: 18, softAlpha: 0.16 },
  { name: "Forest",   accent: "#34D399", accentDeep: "#10B981", ink: "#E6F2EC", inkSoft: "#A7C4B5", muted: "#6E8F7E", bg: "#12241B", bgSubtle: "#0B1711", border: "#21392C", danger: "#FB7185", radius: 7,  softAlpha: 0.15 },
  { name: "Nord",     accent: "#88C0D0", accentDeep: "#5E81AC", ink: "#ECEFF4", inkSoft: "#C2CAD8", muted: "#7E8AA0", bg: "#3B4252", bgSubtle: "#2E3440", border: "#4A5266", danger: "#BF616A", radius: 3,  softAlpha: 0.16 },
];

export const COLOR_KEYS = ["accent", "accentDeep", "ink", "inkSoft", "muted", "bg", "bgSubtle", "border", "danger"];

export const VAR_OF = {
  accent: "--fk-accent", accentDeep: "--fk-accent-deep", ink: "--fk-ink", inkSoft: "--fk-ink-soft",
  muted: "--fk-muted", bg: "--fk-bg", bgSubtle: "--fk-bg-subtle", border: "--fk-border", danger: "--fk-danger",
};

export function parseHex(h) {
  h = String(h).replace("#", "");
  if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
  const n = parseInt(h, 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}
export function toHex({ r, g, b }) {
  const p = (n) => ("0" + Math.max(0, Math.min(255, Math.round(n))).toString(16)).slice(-2);
  return ("#" + p(r) + p(g) + p(b)).toUpperCase();
}
export function rgba(hex, a) {
  const c = parseHex(hex);
  return `rgba(${c.r}, ${c.g}, ${c.b}, ${a})`;
}
export function darken(hex, t) {
  const c = parseHex(hex);
  return toHex({ r: c.r * (1 - t), g: c.g * (1 - t), b: c.b * (1 - t) });
}
function lum(hex) {
  const c = parseHex(hex);
  const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
  return 0.2126 * f(c.r) + 0.7152 * f(c.g) + 0.0722 * f(c.b);
}
export function onAccent(hex) {
  return lum(hex) > 0.55 ? "#15161A" : "#FFFFFF";
}
export function isHex(v) {
  return /^#?[0-9a-fA-F]{6}$/.test(v);
}
export function norm(v) {
  return ("#" + v.replace("#", "")).toUpperCase();
}
export function hslToHex(h, s, l) {
  s /= 100; l /= 100;
  const k = (n) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return toHex({ r: f(0) * 255, g: f(8) * 255, b: f(4) * 255 });
}

// Build the inline-style object of --fk-* properties for a theme/state shape.
export function themeVars(t) {
  return {
    "--fk-accent": t.accent,
    "--fk-accent-deep": t.accentDeep,
    "--fk-accent-soft": rgba(t.accent, t.softAlpha),
    "--fk-ink": t.ink,
    "--fk-ink-soft": t.inkSoft,
    "--fk-muted": t.muted,
    "--fk-bg": t.bg,
    "--fk-bg-subtle": t.bgSubtle,
    "--fk-border": t.border,
    "--fk-radius": t.radius + "px",
    "--fk-danger": t.danger,
    "--fk-on-accent": onAccent(t.accent),
  };
}

export function genCSS(t) {
  const rows = [
    ["--fk-accent", t.accent],
    ["--fk-accent-deep", t.accentDeep],
    ["--fk-accent-soft", rgba(t.accent, t.softAlpha)],
    ["--fk-ink", t.ink],
    ["--fk-ink-soft", t.inkSoft],
    ["--fk-muted", t.muted],
    ["--fk-bg", t.bg],
    ["--fk-bg-subtle", t.bgSubtle],
    ["--fk-border", t.border],
    ["--fk-radius", t.radius + "px"],
    ["--fk-danger", t.danger],
  ];
  const body = rows.map(([k, v]) => "  " + (k + ":").padEnd(18) + v + ";").join("\n");
  return ":root {\n" + body + "\n}\n";
}
