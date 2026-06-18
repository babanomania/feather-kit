<p align="center">
  <a href="https://babanomania.github.io/feather-kit/">
    <img src="https://babanomania.github.io/feather-kit/hero.png" alt="feather-ui-kit components — typography, buttons, inputs, select, checkbox, switch, slider" width="100%">
  </a>
</p>

# feather-ui-kit

An ultra-lightweight React UI component library that leans on browser primitives.
20+ components, several of them **zero-JavaScript** (Accordion, Tabs, Tooltip, Menu).
Each component is its own subpath export, so you only ship the bytes you import.

**[Live demo & docs →](https://babanomania.github.io/feather-kit/)** &nbsp;·&nbsp; **[Theme customizer →](https://babanomania.github.io/feather-kit/#/customizer)**

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
themes and a live editor live in the **[theme customizer](https://babanomania.github.io/feather-kit/#/customizer)**.

## Why it's tiny

The browser already ships accessible, keyboard-ready primitives — `<dialog>`,
`<details>`, the Popover API, radio inputs, `accent-color` — so feather-ui-kit is a
thin React surface over them plus well-made CSS. Several components render no
JavaScript at all, and a handful of components is about a kilobyte gzipped.

Zero runtime dependencies — React (>=18) is the only peer dependency. MIT licensed.
