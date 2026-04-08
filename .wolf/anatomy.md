# anatomy.md

> Auto-maintained by OpenWolf. Last scanned: 2026-04-07T08:41:41.670Z
> Files: 266 tracked | Anatomy hits: 0 | Misses: 0

## ./

- `.gitignore` — Git ignore rules (~68 tok)
- `CLAUDE.md` — OpenWolf (~57 tok)
- `eslint.config.js` — ESLint flat configuration (~176 tok)
- `index.html` — powerpages-spa (~98 tok)
- `package-lock.json` — npm lock file (~45544 tok)
- `package.json` — Node.js package manifest (~332 tok)
- `README.md` — Budget Control Portal: tổng quan, tech stack, quick start, docs links (~550 tok)
- `tsconfig.app.json` (~235 tok)
- `tsconfig.json` — TypeScript configuration (~34 tok)
- `tsconfig.node.json` (~187 tok)
- `vite.config.ts` — Vite build configuration (~134 tok)

## .claude/

- `settings.json` (~441 tok)

## .claude/rules/

- `openwolf.md` (~313 tok)

## .github/

- `copilot-instructions.md` — Budget Control Portal - React SPA (~523 tok)

## .github/agents/

- `dataverse-api.agent.md` — Vai trò (~502 tok)
- `migrate.agent.md` — Vai trò (~523 tok)

## .github/instructions/

- `auth.instructions.md` — Authentication & Authorization (~416 tok)
- `dataverse-api.instructions.md` — Dataverse API Standards: CRUD pattern, hooks, lookup fields, Cloud Flow (~1800 tok)
- `phase2-master-data.instructions.md` — Phase 2 Master Data modules: Department, Approval Matrix, Contact, Company (~700 tok)
- `power-pages-reference.instructions.md` — Power Pages Reference (~337 tok)
- `react-components.instructions.md` — React Component Standards: List/Form/View patterns (~1200 tok)

## .github/skills/feature-scaffold/

- `SKILL.md` — Feature Module Scaffolding (~680 tok)


## docs/

- `0-README.md` — Tổng quan dự án: kiến trúc, tech stack, quick start, links (~600 tok)
- `1-ARCHITECTURE.md` — Kiến trúc chi tiết: provider tree, auth flow, API layer, state management, routing (~1800 tok)
- `2-FEATURES.md` — Tính năng & modules: PR, Budget, Department, Approval Matrix, Contact... (~1100 tok)
- `3-SETUP.md` — Hướng dẫn cài đặt, chạy dev, env config, troubleshooting (~850 tok)
- `4-CONTRIBUTING.md` — Quy tắc đóng góp: coding standards, naming, patterns, commit convention (~1100 tok)
- `5-ROADMAP.md` — Lộ trình phát triển: Phase 0-4, chi tiết tasks cho Phase 2 (~1050 tok)
- `6-DEPLOYMENT.md` — Build & deploy: production build, Power Pages upload, checklist (~700 tok)

## src/

- `App.css` — Styles: 8 rules, 6 media queries (~826 tok)
- `App.tsx` — App — uses useState (~1035 tok)
- `index.css` — Styles: 3 rules, 23 vars, 4 media queries (~620 tok)
- `main.tsx` (~84 tok)

## src/api/

- `cloudflow-client.ts` — Exports triggerCloudFlow (~100 tok)
- `dataverse-client.ts` — Hàm callback để lấy access token - được inject từ AuthProvider (~314 tok)

## src/api/endpoints/

- `purchase-requisition.ts` — API routes: PATCH, DELETE (4 endpoints) (~614 tok)

## src/app/

- `providers.tsx` — msalInstance (~398 tok)
- `router.tsx` — Lazy load pages để tối ưu bundle size (~436 tok)

## src/auth/

- `AuthProvider.tsx` — AuthContext — uses useState, useEffect, useCallback, useContext (~764 tok)
- `msal-config.ts` — Exports msalConfig, dataverseLoginRequest (~211 tok)

## src/features/purchase-requisition/

- `index.ts` (~39 tok)
- `types.ts` — Enums - map từ Dataverse option sets (~1194 tok)

## src/features/purchase-requisition/components/

- `PRFormPage.tsx` — PRFormPage — renders form — uses useNavigate, useEffect (~1560 tok)
- `PRLineTable.tsx` — emptyLine — renders table — uses useState (~2506 tok)
- `PRListPage.tsx` — STATUS_COLOR — renders table — uses useNavigate, useState (~1590 tok)
- `PRViewPage.tsx` — STATUS_COLOR — uses useNavigate (~1950 tok)

## src/features/purchase-requisition/hooks/

- `usePurchaseRequisition.ts` — PR Header Queries (~1519 tok)

## src/shared/theme/

- `neumorphism.ts` — Ant Design ThemeConfig cho neumorphism (màu, borderRadius, shadows, component overrides) (~150 tok)
- `neumorphism.css` — CSS custom properties + global overrides cho hiệu ứng neumorphism (~250 tok)

## src/shared/components/

- `NotFoundPage.tsx` — NotFoundPage — uses useNavigate (~122 tok)
- `ProtectedRoute.tsx` — ProtectedRoute (~315 tok)

## src/shared/components/Layout/

- `AppLayout.tsx` — AppLayout — uses useState (~265 tok)
- `Header.tsx` — AppHeader (~466 tok)
- `Sidebar.tsx` — AppSidebar — uses useNavigate (~940 tok)

## src/shared/utils/

- `constants.ts` — Cloud Flow Trigger IDs (từ Power Pages content snippet "Config") (~442 tok)

## src/types/

- `auth.ts` — Exports AppRole, AppUser (~76 tok)
- `dataverse.ts` — Kiểu dữ liệu chung cho Dataverse Web API responses (~206 tok)
