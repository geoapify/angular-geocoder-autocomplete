# Build & Run Guide

This repository contains the Angular component library, a showcase demo app, and the MkDocs documentation site.  
Use the checklist below to set up a local workstation and verify changes before publishing.

## 1. Prerequisites
- Node.js 18.18+ (Angular 20 requirement) and npm 10+.
- Angular CLI (`npm install -g @angular/cli`) if you prefer global tooling.
- For the documentation site: Python 3.9+ with `pip`.

## 2. Install Dependencies
```bash
npm install        # or npm ci on CI to use lockfile versions
```
This installs all workspace packages, including the demo app and the `projects/angular-geocoder-autocomplete` library.

## 3. Build the Library
```bash
npm run build
```
- Runs `ng build angular-geocoder-autocomplete`.
- Outputs the distributable package under `dist/angular-geocoder-autocomplete/`.
- Add `--watch` when iterating locally: `ng build angular-geocoder-autocomplete --watch`.

## 4. Run Quality Gates
- Unit tests: `npm run test`
- Linting: `npm run lint`
These should be clean before submitting changes or publishing.

## 5. Run the Demo Application
1. Update the API key passed to `GeoapifyGeocoderAutocompleteModule.withConfig()` in `projects/demo/src/app/app.module.ts`. The checked-in key is for demos only and may be throttled.
2. Start the dev server:
   ```bash
   npm run start      # serves the demo on http://localhost:4200
   ```
3. The CLI watches both the library and demo; rebuilding the library will refresh the demo automatically.

## 6. Preview / Build the Documentation Site (optional)
The docs live under `docs-site/` and use MkDocs Material.

```bash
cd docs-site
pip install -r requirements.txt
mkdocs serve        # live preview at http://127.0.0.1:8000
# or
mkdocs build        # outputs static site into site/
```

## 7. Publishing (outline)
1. Ensure `npm run build` output is up to date.
2. Update version fields in `projects/angular-geocoder-autocomplete/package.json` and root `package.json` if needed.
3. From the repo root, publish the package in `dist/angular-geocoder-autocomplete` (`npm publish dist/angular-geocoder-autocomplete --access public`).
4. Push docs to the hosting repo/site if content changed.

Following the sequence above keeps the component, demo, and docs in sync and prevents missing build steps before release.
