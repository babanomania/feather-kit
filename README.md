<p align="center">
  <a href="https://babanomania.github.io/feather-kit/">
    <img src="https://babanomania.github.io/feather-kit/hero.png" alt="feather-ui-kit components" width="100%">
  </a>
</p>

<h1 align="center">feather-ui-kit</h1>

<p align="center">
  An ultra-lightweight React UI component library that's <em>mostly the browser</em>.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/feather-ui-kit"><img src="https://img.shields.io/npm/v/feather-ui-kit?color=109488&label=npm" alt="npm version"></a>
  <a href="https://bundlephobia.com/package/feather-ui-kit"><img src="https://img.shields.io/badge/min%2Bgzip-~200%20B%2Fcomponent-109488" alt="bundle size"></a>
  <a href="https://www.npmjs.com/package/feather-ui-kit?activeTab=dependencies"><img src="https://img.shields.io/badge/dependencies-0-109488" alt="zero dependencies"></a>
  <img src="https://img.shields.io/badge/React-18%2B-109488" alt="React 18+">
  <a href="https://www.npmjs.com/package/feather-ui-kit"><img src="https://img.shields.io/npm/l/feather-ui-kit?color=109488" alt="MIT license"></a>
  <a href="https://babanomania.github.io/feather-kit/"><img src="https://img.shields.io/badge/demo-live-109488" alt="live demo"></a>
</p>

<p align="center">
  <a href="https://babanomania.github.io/feather-kit/"><b>Live demo & docs</b></a> ·
  <a href="https://babanomania.github.io/feather-kit/#/customizer"><b>Theme customizer</b></a> ·
  <a href="https://babanomania.github.io/feather-kit/#/templates"><b>Templates</b></a>
</p>

## Why it exists

Most component libraries reimplement things the browser already does well — focus
traps, light-dismiss, popovers, disclosure widgets, positioning — and ship tens of
kilobytes of JavaScript to do it. You pay for that weight on every page load.

But the platform has quietly caught up. The browser now ships accessible,
keyboard-ready primitives for almost everything an app UI needs:

- `<dialog>` + `showModal()` — modals with a focus trap, backdrop, `Esc`-to-close and the top layer, for free
- The **Popover API** — menus and popovers with focus management and light-dismiss, no JS
- `<details>` / `<summary>` — accordions that just work, no JS
- radio inputs + a CSS sibling selector — tabs with no state to wire, no JS
- `accent-color`, `appearance`, anchor positioning, `color-mix()` — the rest is well-made CSS

**feather-ui-kit is a thin React surface over those primitives.** It doesn't fight the
browser — it leans on it. The result:

- **Tiny.** A handful of components is about a kilobyte gzipped, where the big kits are
  tens of kilobytes. Each component is its own entry point, so you only ship what you import.
- **Several need zero JavaScript.** Accordion, Tabs, Tooltip and Menu render on markup +
  CSS alone — nothing to hydrate, nothing to re-render on a toggle.
- **Accessible by default.** Keyboard and screen-reader behavior come from the native
  elements, not from code we'd have to keep correct.
- **Yours to theme.** Everything reads from `--fk-*` CSS variables; restyle the whole kit
  by overriding a few custom properties.
- **Zero runtime dependencies.** React is the only peer dependency.

It's honest about the trade-off: leaning on native primitives means inheriting their
limits. There's no data grid, no virtualization, no unmount-animation choreography. If
you need those, reach for Radix, MUI or Mantine and budget the kilobytes. feather-ui-kit
is for the common case — accessible, native-feeling components that don't bloat your bundle.

## Install

```bash
npm i feather-ui-kit
```

## Quick start

Import the palette + component styles once, then use the components:

```jsx
import "feather-ui-kit/themes/light.css"; // --fk-* design tokens (always import)
import "feather-ui-kit/styles.css";       // component styles
// optional dark mode: import "feather-ui-kit/themes/dark.css";

import { Card, CardBody, CardFoot, Badge, Button } from "feather-ui-kit";

export default function App() {
  return (
    <Card>
      <CardBody>
        <Badge variant="soft" dot>Pro</Badge>
        <p>Deploy your project in one click.</p>
      </CardBody>
      <CardFoot>
        <Button variant="ghost">Cancel</Button>
        <Button variant="primary">Deploy →</Button>
      </CardFoot>
    </Card>
  );
}
```

Import **per component** for the smallest possible bundle (each is its own entry point):

```jsx
import Button from "feather-ui-kit/button";          // ~90 B
import Dialog, { DialogBody } from "feather-ui-kit/dialog";
```

## Components

### Typography
```jsx
import { Overline, Heading, Title, Lead, Text, Muted, Metric } from "feather-ui-kit";

<Overline>Analytics overview</Overline>
<Heading level={2}>Type that carries the brand</Heading>
<Lead>One scale for headings, titles, body and metrics.</Lead>
<Metric unit="MRR">$48,210</Metric>
```

### Button
```jsx
// variant: primary | secondary | outline | ghost | destructive · size: "sm"
<Button variant="primary">Save</Button>
<Button variant="outline" size="sm">Cancel</Button>
```

### Form controls
```jsx
<Input label="Email" placeholder="you@example.com" hint="We'll never share it." />
<Select><option>Owner</option><option>Editor</option></Select>
<Checkbox label="Accept terms" defaultChecked />
<Radio name="plan" label="Monthly billing" defaultChecked />
<Switch title="Private repository" description="Only invited members can see it." defaultChecked />
<Slider label="Volume" min={0} max={100} defaultValue={68} showValue />
```

### Data display
```jsx
<Badge variant="soft" dot>Live</Badge>
<AvatarGroup>
  <Avatar initials="AK" />
  <Avatar initials="RS" />
</AvatarGroup>
<Progress value={68} />

<Card>
  <CardHead><CardTitle>Recent orders</CardTitle></CardHead>
  <CardBody>…</CardBody>
</Card>

<Table>
  <thead><tr><th>Plan</th><th className="feather-num">Amount</th></tr></thead>
  <tbody><tr><td>Pro</td><td className="feather-num">$290</td></tr></tbody>
</Table>
```

### Disclosure & overlays
```jsx
// Tabs — zero JS (radio group + CSS). `items` is { label, content }[].
<Tabs items={[
  { label: "Account", content: <p>Account settings…</p> },
  { label: "Team", content: <p>Invite teammates…</p> },
]} />

// Accordion — native <details>, also zero JS
<Accordion summary="Is it accessible?" open>Yes — keyboard & screen-reader behavior is built in.</Accordion>

// Tooltip — CSS only
<Tooltip tip="Copied to clipboard ✓"><button>Hover or focus me</button></Tooltip>

// Menu — Popover API, free focus management & light-dismiss
<Menu label="Actions">
  <button>Rename <span className="feather-kbd">⌘R</span></button>
  <hr />
  <button className="feather-menu-danger">Delete</button>
</Menu>

// Dialog — native <dialog>, controlled by `open`
<Dialog open={open} onClose={() => setOpen(false)}>
  <DialogBody><h3>Delete project?</h3><p>This can't be undone.</p></DialogBody>
  <DialogFoot>
    <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
    <Button variant="destructive">Delete</Button>
  </DialogFoot>
</Dialog>
```

```jsx
// Toast — wrap your app once, then fire from anywhere
import { ToastProvider, useToast } from "feather-ui-kit";

<ToastProvider><App /></ToastProvider>;

const toast = useToast();
toast({ title: "Changes saved", desc: "Just now" });
```

## Theming

Every component reads from `--fk-*` custom properties. Override them on `:root`
(or any container) to retheme everything at once — no rebuild, no config:

```css
:root {
  --fk-accent: #4F46E5;
  --fk-bg:     #FFFFFF;
  --fk-radius: 12px;
}
```

The full token contract is in `feather-ui-kit/themes/variables.css`. Twelve ready-made
themes and a live editor live in the
**[theme customizer](https://babanomania.github.io/feather-kit/#/customizer)**.

## Repository

This repo is an npm-workspaces monorepo:

- `packages/feather-kit/` — the published library (npm: **`feather-ui-kit`**)
- `website/` — the Vite + React site that's built with the library and deploys to GitHub Pages
- `reference/` — the original single-file HTML prototypes, kept as design source

```bash
npm install        # installs both workspaces
npm run dev        # runs the website on http://localhost:5180/feather-kit/
npm run build:lib  # builds the library (esbuild) + prints the gzip size report
```

See [`CLAUDE.md`](CLAUDE.md) for conventions.

## License

MIT
