# feather-kit — monorepo

An ultra-lightweight React UI component library that leans on browser primitives,
plus the marketing site that's built with it.

| Package / app           | What it is                                                       |
|-------------------------|------------------------------------------------------------------|
| `packages/feather-kit`  | The published library → [npm](https://www.npmjs.com/package/feather-kit). 20+ components, several **zero-JS**, one subpath export each. |
| `website`               | Vite + React site (landing · theme customizer · templates) that imports the library and deploys to GitHub Pages. |
| `reference/`            | The original single-file HTML prototypes, kept as design source. |

## Develop

```bash
npm install        # installs both workspaces
npm run dev        # runs the website on http://localhost:5180/feather-kit/
npm run build:lib  # builds the library (esbuild) + prints the gzip size report
npm run build      # builds the library and the website
```

The website builds from the library **source** (a Vite alias), so changes to components
show up immediately without rebuilding `dist/`.

## Ship

- **Website** → pushing to `main` runs [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml),
  which builds `website/dist` and publishes it to GitHub Pages.
- **Library** → push a `feather-kit@x.y.z` (or `vx.y.z`) tag and
  [`.github/workflows/publish.yml`](.github/workflows/publish.yml) publishes to npm
  (needs an `NPM_TOKEN` repo secret).

See [`packages/feather-kit/README.md`](packages/feather-kit/README.md) for library usage,
and [`CLAUDE.md`](CLAUDE.md) for project conventions.

MIT licensed.
