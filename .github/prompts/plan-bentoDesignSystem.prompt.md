# Plan: Bento Design System + Full UI Overhaul

Thay thế hoàn toàn neumorphism theme bằng **Bento UI Design System** — Apple-inspired, nền trắng sạch, CSS Grid layout, micro-interactions (Framer Motion). Đóng gói thành componentized design system dưới `src/shared/design-system/`.

---

## Phase A: Design Tokens & Foundation

1. **Tạo `tokens.css`** — CSS Custom Properties: colors (#FAFAFA bg, #FFFFFF cards, **#00A1E4 primary Balas blue** — từ logo Balas Technologies, hover #0090CC, active #007FB5), shadows (soft drop — không phải neumorphism dual-shadow), radii (8-24px), spacing 4px scale, typography Inter
2. **Tạo `antd-theme.ts`** — Map tokens vào Ant Design ConfigProvider, thay thế `neumorphism.ts`
3. **Tạo `global.css`** — Body reset, typography scale, scrollbar, focus-visible, Ant Design shadow overrides. Thay thế `index.css` + `neumorphism.css`
4. **Install Framer Motion + tạo `motion.ts`** — Reusable variants: `fadeInUp`, `cardHover`, `pressEffect`, `staggerContainer`, `bentoItemReveal`, `pageTransition`

## Phase B: Core Layout Components

5. **`AppShell`** — Sidebar trái (260px, collapsible 72px) + TopBar + main content. Responsive: <768px sidebar → drawer. *depends on A*
6. **`Sidebar`** — Logo, nav items với icons + active indicator animation (`layoutId`), grouped sections, user info bottom
7. **`TopBar`** — Hamburger toggle + breadcrumb left, avatar dropdown right
8. **`PageContainer`** — Page wrapper: title + subtitle + action buttons, animated mount

## Phase C: Bento Grid System *(parallel with B)*

9. **`BentoGrid`** — CSS Grid container, `columns` prop (2/3/4), responsive breakpoints
10. **`BentoCard`** — Core block: `span`/`rowSpan` props, variants (default/primary/accent/glass), hover lift + press + stagger reveal
11. **`BentoStat`** — Stat card preset: icon + value (animated count-up) + trend indicator
12. **`BentoChart`** — Chart wrapper card placeholder

## Phase D: Shared UI Components *(parallel with B, C)*

13. **`BentoTable`** — Ant Design Table wrapper, bento card styling, animated row enter
14. **`BentoForm`** — Card-based form sections, React Hook Form integration
15. **`StatusBadge`** — Workflow status (draft/pending/approved/rejected), pulse animation on pending
16. **`EmptyState`** — Illustration + text + CTA button

## Phase E: Login Page *(depends on A + C)*

17. **`LoginPage`** — Full-screen bento composition: Hero card (span 2, app name + tagline + CTA), 3 feature cards, trust/company card, subtle gradient background animation
18. **Route guard** — Chưa login → LoginPage, đã login → redirect Dashboard

## Phase F: Page Redesigns *(depends on B + C + D)*

19. **Home → Dashboard** — Bento Grid: welcome card, stat cards (Tổng PR, Pending, Budget %), recent PRs table, quick links
20. **PurchaseRequisitionList** — PageContainer + filter bar + BentoTable
21. **BudgetPage** — PageContainer + BentoGrid stats
22. **DepartmentPage** — PageContainer + BentoTable

## Phase G: Integration & Cleanup *(last)*

23. **Update `App.tsx`** — AppShell wrapper cho authenticated routes, LoginPage outside
24. **Update `main.tsx`** — Import new theme
25. **Delete old files**: `neumorphism.css`, `neumorphism.ts`, `App.css`
26. **Barrel export** `src/shared/design-system/index.ts`
27. **Update .wolf files**

---

## Relevant Files

### Files to CREATE (`src/shared/design-system/`)

| File | Purpose |
|------|---------|
| `tokens.css` | CSS Custom Properties — colors, shadows, radii, spacing, typography |
| `antd-theme.ts` | Ant Design ThemeConfig mapping tokens |
| `global.css` | Body reset, typography, scrollbar, focus-visible, AntD overrides |
| `motion.ts` | Framer Motion reusable variants & presets |
| `index.ts` | Barrel export for all design system components |
| `components/AppShell/AppShell.tsx` + `.module.css` | Authenticated layout wrapper |
| `components/Sidebar/Sidebar.tsx` + `.module.css` | Navigation sidebar |
| `components/TopBar/TopBar.tsx` + `.module.css` | Top header bar |
| `components/PageContainer/PageContainer.tsx` + `.module.css` | Standard page wrapper |
| `components/BentoGrid/BentoGrid.tsx` + `.module.css` | CSS Grid container |
| `components/BentoGrid/BentoCard.tsx` + `.module.css` | Core bento building block |
| `components/BentoGrid/BentoStat.tsx` | Statistic card preset |
| `components/BentoGrid/BentoChart.tsx` | Chart wrapper card placeholder |
| `components/BentoTable/BentoTable.tsx` + `.module.css` | Data table wrapper |
| `components/BentoForm/BentoForm.tsx` | Card-based form sections |
| `components/StatusBadge/StatusBadge.tsx` + `.module.css` | Workflow status badge |
| `components/EmptyState/EmptyState.tsx` + `.module.css` | Empty data placeholder |

### Files to CREATE (pages)

| File | Purpose |
|------|---------|
| `src/pages/LoginPage.tsx` + `LoginPage.module.css` | Full-screen bento login page |

### Files to MODIFY

| File | Changes |
|------|---------|
| `src/App.tsx` | New routing, AppShell wrapper, LoginPage route |
| `src/main.tsx` | Import new antd-theme + global.css |
| `src/pages/Home.tsx` | Dashboard redesign with BentoGrid |
| `src/pages/PurchaseRequisitionList.tsx` | PageContainer + BentoTable |
| `src/pages/BudgetPage.tsx` | BentoGrid stats layout |
| `src/pages/DepartmentPage.tsx` | PageContainer + BentoTable |
| `src/shared/components/AuthButton.tsx` | Redesign for TopBar integration |
| `package.json` | Add `framer-motion` dependency |

### Files to DELETE

| File | Reason |
|------|--------|
| `src/shared/theme/neumorphism.css` | Replaced by `design-system/global.css` |
| `src/shared/theme/neumorphism.ts` | Replaced by `design-system/antd-theme.ts` |
| `src/App.css` | Replaced by CSS Modules |

---

## Dependency Order

```
A (Foundation) ──→ B (Layout) ──→ E (Login) ──→ G (Integration)
       │                │
       ├──→ C (Bento Grid) ──→ F (Pages) ──→ G
       │                │
       └──→ D (UI Components) ──────────────→ G
```

## Verification

1. `npm run build` — TypeScript pass
2. `npm run lint` — No new errors
3. Visual check: Login bento → Sidebar layout → Navigate pages → Responsive (mobile/tablet/desktop)
4. Micro-interactions: card hover lift, sidebar collapse, page transitions, button press, stagger reveal
5. Accessibility: focus rings, keyboard nav, ARIA labels
6. `npm test` — Existing tests pass

## Excluded Scope

- Dark mode (chỉ light mode)
- Real Dataverse data (chỉ mock/placeholder)
- i18n (chỉ Vietnamese hardcoded)
- Unit tests cho design system components
- Chart library integration (chỉ placeholder)
- PWA / offline support
