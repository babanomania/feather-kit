<p align="center">
  <a href="https://babanomania.github.io/feather-kit/">
    <img src="https://babanomania.github.io/feather-kit/hero.png" alt="feather-ui-kit components" width="100%">
  </a>
</p>

# feather-kit — monorepo

An ultra-lightweight React UI component library that leans on browser primitives,
published to npm as **[`feather-ui-kit`](https://www.npmjs.com/package/feather-ui-kit)**,
plus the marketing site that's built with it.

**[Live demo & docs →](https://babanomania.github.io/feather-kit/)**

| Package / app           | What it is                                                       |
|-------------------------|------------------------------------------------------------------|
| `packages/feather-kit`  | The published library → npm package **`feather-ui-kit`**. 20+ components, several **zero-JS**, one subpath export each. |
| `website`               | Vite + React site (landing · theme customizer · templates) that imports the library and deploys to GitHub Pages. |
| `reference/`            | The original single-file HTML prototypes, kept as design source. |

## Using the components

Install and import per component — see the full component reference with usage
examples in **[`packages/feather-kit/README.md`](packages/feather-kit/README.md)**.

```bash
npm i feather-ui-kit
```

```jsx
import "feather-ui-kit/themes/light.css";
import "feather-ui-kit/styles.css";
import { Button, Card, CardBody, Badge, Tabs } from "feather-ui-kit";
```

Everything themes through `--fk-*` CSS variables — try the
[theme customizer](https://babanomania.github.io/feather-kit/#/customizer).

## Develop

```bash
npm install        # installs both workspaces
npm run dev        # runs the website on http://localhost:5180/feather-kit/
npm run build:lib  # builds the library (esbuild) + prints the gzip size report
npm run build      # builds the library and the website
```

The website builds from the library **source** (a Vite alias), so changes to components
show up immediately without rebuilding `dist/`. See [`CLAUDE.md`](CLAUDE.md) for conventions.

MIT licensed.
