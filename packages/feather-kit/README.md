# feather-ui-kit

An ultra-lightweight React UI component library that leans on browser primitives.
Several components ship **zero JavaScript** (Accordion, Tabs, Tooltip, Menu). Each
component is its own subpath export, so you only ship the bytes you import.

```bash
npm i feather-ui-kit
```

## Usage

Import the base palette once (and the component styles), then import components per-subpath:

```jsx
import "feather-ui-kit/themes/light.css"; // the --fk-* token contract
import "feather-ui-kit/styles.css";       // component styles
// optional: import "feather-ui-kit/themes/dark.css";

import Button from "feather-ui-kit/button";
import Dialog, { DialogBody, DialogFoot } from "feather-ui-kit/dialog";

export default function App() {
  return <Button variant="primary">Deploy</Button>;
}
```

Or pull several from the barrel:

```jsx
import { Button, Card, CardBody, Badge, Tabs } from "feather-ui-kit";
```

## Components

`Typography` (Overline / Heading / Title / Lead / Text / Muted / Metric) ·
`Button` · `Input` · `Select` · `Checkbox` · `Radio` · `Switch` · `Slider` ·
`Badge` · `Avatar` (+ `AvatarGroup`) · `Progress` · `Card` (+ Head/Title/Desc/Body/Foot) ·
`Table` · `Tabs` · `Accordion` · `Tooltip` · `Menu` · `Dialog` · `ToastProvider`/`useToast`.

## Theming

Everything reads from `--fk-*` custom properties. Override them on `:root`
(or any container) to retheme all components at once:

```css
:root {
  --fk-accent: #4F46E5;
  --fk-radius: 12px;
}
```

The full token contract lives in `themes/variables.css`. Build a theme visually
with the [theme customizer](https://babanomania.github.io/feather-kit/#/customizer).

## Build

```bash
npm run build   # esbuild → dist/ (ESM + CJS, one entry per component) + size report
```

Zero runtime dependencies — React is the only peer dependency. MIT licensed.
