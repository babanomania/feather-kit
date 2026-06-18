# CLAUDE.md

Project context for Claude Code. Read this before making changes.

## What this is

`feather-kit` — an ultra-lightweight React UI component library. Same philosophy as `feather-editor`: lean on browser primitives, keep dependencies at zero, measure bytes after every change. The defining constraint is **bundle size per component** — each has its own subpath export (`feather-kit/button`, `feather-kit/dialog`, etc.), independently tree-shaken and independently measured.

Several components need **zero JavaScript** — the browser already ships accessible, keyboard-ready implementations via `<details>`, radio inputs, the Popover API, and CSS.

This repo is an **npm-workspaces monorepo**:
- `packages/feather-kit/` — the published library (React components, `feather-kit.css`, `themes/`, `build.js`). **Published to npm as `feather-ui-kit`** — the bare `feather-kit` name was already taken by another author, so imports are `feather-ui-kit/button` etc. The repo, gh-pages path, directory and brand stay `feather-kit`.
- `website/` — a Vite + React marketing site that **consumes the library** (landing, theme customizer, templates gallery) and deploys to GitHub Pages.
- `reference/` — the original single-file HTML prototypes (`index.html`, `customizer.html`, `templates.html`), kept as design source. Not shipped, not built.

## Component list & primitives

| Component   | Built on                                | Target (gzip) |
|-------------|------------------------------------------|---------------|
| Typography  | CSS — heading / title / overline / lead / body / metric | ≈ 120 B |
| Button      | CSS                                      | ≈ 90 B        |
| Input       | CSS                                      | ≈ 80 B        |
| Select      | `<select>` + CSS chevron pseudo-element  | ≈ 190 B       |
| Checkbox    | CSS + SVG checkmark                      | ≈ 150 B       |
| Radio       | CSS + dot pseudo-element                 | ≈ 150 B       |
| Switch      | CSS, cubic-bezier slide                  | ≈ 160 B       |
| Slider      | `<input type=range>` + `accent-color`   | ≈ 120 B       |
| Badge       | CSS                                      | ≈ 70 B        |
| Avatar      | CSS gradient circle + stacked group      | ≈ 90 B        |
| Progress    | CSS fill bar                             | ≈ 60 B        |
| Card        | CSS (head / body / foot)                 | ≈ 70 B        |
| Table       | CSS hover rows + uppercase headers       | ≈ 110 B       |
| Tabs        | radio inputs + CSS `:checked ~` sibling | ≈ 220 B **zero JS** |
| Accordion   | `<details>` / `<summary>`               | ≈ 140 B **zero JS** |
| Tooltip     | CSS `::after` + `attr(data-tip)`        | **zero JS**   |
| Menu        | Popover API (`popover` attr)             | **zero JS**   |
| Dialog      | `<dialog>` + `showModal()`              | ≈ 300 B       |
| Toast       | timer + portal                           | ≈ 420 B       |

## Layout

```
packages/feather-kit/        the published npm package
  src/
    typography.jsx   heading / title / overline / lead / body / muted / metric scale
  button.jsx       variants: primary, secondary, outline, ghost, destructive + sm size
  input.jsx        labeled field with focus ring + hint slot
  select.jsx       <select> with appearance:none + CSS chevron
  checkbox.jsx     custom box with SVG checkmark
  radio.jsx        custom dot radio
  switch.jsx       animated track with cubic-bezier
  slider.jsx       <input type=range> + live value readout
  badge.jsx        solid / soft / outline + optional dot
  avatar.jsx       initials circle, stacked group (.avatars)
  progress.jsx     <i> fill element
  card.jsx         head / body / foot slots
  table.jsx        th uppercase + tbody hover
  tabs.jsx         radio group wrapper
  accordion.jsx    <details> thin wrapper
  tooltip.jsx      CSS-only — renders no JS at all
  menu.jsx         Popover API trigger + panel
  dialog.jsx       <dialog> open/close + light-dismiss
  toast.jsx        timed notification with portal
    index.js         re-exports everything (the barrel)
  themes/
    variables.css    --fk-* token contract (Feather light defaults)
    light.css        base palette — @imports variables.css (always import this)
    dark.css         [data-theme=dark] + prefers-color-scheme override
  feather-kit.css    all component styles (.feather-*); import once as "feather-kit/styles.css"
  dist/              built output (committed; rebuilt by prepublishOnly)
  build.js           esbuild — one entry per component + barrel, ESM + CJS, size report
website/             Vite + React site that imports the library; deploys to gh-pages
  src/pages/         Landing.jsx, Customizer.jsx, Templates.jsx
  src/theme-presets.js   the 12 themes + colour helpers (shared by customizer & templates)
  vite.config.js     base "/feather-kit/"; aliases bare `feather-kit` → ../packages/feather-kit/src
reference/           original HTML prototypes (design source; not shipped, not built)
.github/workflows/   deploy.yml (gh-pages), publish.yml (npm on tag)
```

Components render `feather-*` class names; the visual styling lives in `feather-kit.css`
and reads from the `--fk-*` tokens. Components carry the tiny JS only; CSS ships separately.

## CSS variable contract

All components use `--fk-*` variables. The convention mirrors `feather-editor`'s `--fe-*` pattern:

```css
:root {
  --fk-accent:      #109488;
  --fk-accent-deep: #0C746B;
  --fk-accent-soft: rgba(16,148,136,0.12);
  --fk-ink:         #1A1917;
  --fk-ink-soft:    #57544E;
  --fk-muted:       #8C8980;
  --fk-bg:          #fff;
  --fk-bg-subtle:   #F2F0EA;
  --fk-border:      #D8D3C8;
  --fk-radius:      8px;
  --fk-danger:      #C5365E;
}
```

## Entry points (planned package.json exports)

```json
{
  ".":          { "import": "./dist/index.esm.js",   "require": "./dist/index.js" },
  "./button":   { "import": "./dist/button.esm.js",  "require": "./dist/button.js" },
  "./dialog":   { "import": "./dist/dialog.esm.js",  "require": "./dist/dialog.js" },
  "./themes/*": "./themes/*"
}
```

One subpath per component so users only ship bytes for what they import.

## Common commands

Run from the repo root (npm workspaces):

| Action              | Command                                              |
|---------------------|------------------------------------------------------|
| Install everything  | `npm install`                                        |
| Build the library   | `npm run build:lib`  (esbuild + size report)         |
| Build the website   | `npm run build:site` (Vite → `website/dist`)         |
| Build both          | `npm run build`                                      |
| Run the site (dev)  | `npm run dev`        (Vite on :5180, base `/feather-kit/`) |
| Publish the library | tag `feather-kit@x.y.z` / `vx.y.z` → CI publishes (needs `NPM_TOKEN`) |

The website builds straight from the library **source** (Vite alias), so you don't need
to build `dist/` first to preview the site. `dist/` is still built + committed for npm.

No unit tests yet — verification is: run the library build and check the size report,
run the site build, and confirm the three pages render (the site is the live integration test).

## Conventions

- **No dependencies.** `peerDependencies.react` is the only declared dep. Do not add runtime deps without explicit approval.
- **CSS-first.** Pure-CSS components have zero runtime cost. Only add JS when strictly required.
- **Zero-JS components are a selling point.** Accordion, Tabs, Tooltip, and Menu need no state, no event handlers, no hydration. Preserve this — don't add JS to them.
- **Popover API for menus.** Provides free focus management and light-dismiss. Use `anchor-name` / `position-anchor` / `top: anchor(bottom)` for positioning, wrapped in `@supports (top: anchor(bottom))` so it gracefully centers on older browsers.
- **`<dialog>` for modals.** Native focus trap, backdrop, Escape-to-close, top-layer — all free. Don't reimplement these.
- **No sanitization.** Components render developer-trusted strings — same contract as `feather-editor`. Don't add general-purpose sanitization; it adds bytes, runtime cost, and changes the documented contract.
- **No comments unless the *why* is non-obvious.** Same rule as `feather-editor`.
- **Bundle size is the single most important property.** Measure after every change. Surface any regression before merging.

## The feather family

| Package          | What it is                              | Status      |
|------------------|-----------------------------------------|-------------|
| `feather-editor` | React WYSIWYG editor, ≈ 440 B core      | Published   |
| `feather-dialog` | Standalone `<dialog>` wrapper           | Concept     |
| `feather-kit`    | Full component library (this package)   | In development |

Landing page prototype lives at `feather-kit.html` in the `feather-editor` repo.
GitHub org: `https://github.com/babanomania`

## Things not to do

- Don't add a JS implementation for components that work purely via CSS or browser primitives.
- Don't add dependencies beyond the React peer dep.
- Don't add general-purpose sanitization — not in scope, adds bytes.
- Don't widen `files` in `package.json` to include `feather-kit.html` or `build.js`.
- Don't add a build step for themes — CSS ships as-is.
- Don't add a markdown parser or any parser library.
- Don't forget to run `npm run build` and check the size report after every change.
