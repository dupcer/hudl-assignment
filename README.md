# Hudl: Playwright + TypeScript Test Framework

## Prerequisites
- Node.js 18+ (Playwright requires Node 18+)
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
3. Create an env file (example: `.env.test`) with your credentials:
   ```bash
   BASE_URL=https://www.hudl.com
   LOGIN_USERNAME=your@email.com
   LOGIN_PASSWORD=your_password
   ```

By default the framework loads `.env.test`. You can override it with `ENV_FILE`:
```bash
ENV_FILE=.env.test npm test
```

## Running tests
- Run all tests:
  ```bash
  npm test
  ```
- Auth tests only:
  ```bash
  npm run test:auth
  ```
- Mobile Chrome project only:
  ```bash
  npm run test:mobile
  ```
- Headed:
  ```bash
  npm run test:headed
  ```
- UI mode:
  ```bash
  npm run test:ui
  ```

## Project structure
- `src/pages/` — Page Objects (POM)
- `src/fixtures/` — Playwright fixtures (typed test)
- `tests/` — Specs

HTML report is generated under `reports/html` (see `playwright.config.ts`).
TypeScript path aliases are configured in `tsconfig.json` (e.g. `@pages/*`, `@fixtures/*`).