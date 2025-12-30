# Hudl: Playwright + TypeScript Test Framework

## Prerequisites
- Node.js 18+
- npm

## Setup
1. Install dependencies:
   ```bash
   npm ci
   ```
2. Install Playwright browsers:
   ```bash
   npx playwright install
   ```
3. Create `.env.test`:
   ```bash
   BASE_URL=https://www.hudl.com
   LOGIN_USERNAME=your@email.com
   LOGIN_PASSWORD=your_password
   ```

By default the framework loads `.env.test`. Override with:
```bash
ENV_FILE=.env.staging npm test
```

## Running tests
- All tests:
  ```bash
  npm test
  ```
- Auth tests only:
  ```bash
  npm run test:auth
  ```
- Run a specific target (browser/device):
  ```bash
  npx playwright test --project=chromium
  npx playwright test --project=firefox
  npx playwright test --project="Mobile Chrome"
  ```
- Headed / UI / debug:
  ```bash
  npm run test:headed
  npm run test:ui
  npm run test:debug
  ```

## Reports
- HTML report output: `reports/html`
- Open the report:
  ```bash
  npx playwright show-report reports/html
  ```

## Project structure
- `src/pages/` — Page Objects (POM)
- `src/fixtures/` — Playwright fixtures (typed `test`)
- `tests/` — Specs

TypeScript path aliases are configured in `tsconfig.json` (e.g. `@pages/*`, `@fixtures/*`).

## CI (minimal)
Typical CI steps:
```bash
npm ci
npx playwright install --with-deps
npm test
```
Publish `reports/html` and `test-results/` as pipeline artifacts.

## Notes
- Uses real credentials from `.env.*` for the login flow. Keep secrets out of git.
- Traces/screenshot/video settings are configured in `playwright.config.ts`.