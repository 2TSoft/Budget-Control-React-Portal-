# Budget Control Portal — Repository Documentation & AI Configuration Plan

> **Publisher:** Balas Technologies Co., Ltd.
> **Repository:** `Nguyen-Trieu-dev/Budget-Control-React-Portal-`
> **Last Updated:** 2026-04-07

---

## 1. Tổng Quan Dự Án (Project Overview)

**Budget Control Portal** là ứng dụng React SPA (Single Page Application) dùng để quản lý yêu cầu mua hàng (Purchase Requisition) và kiểm soát ngân sách. Dự án đang trong quá trình **nâng cấp (migrate)** từ **Microsoft Power Pages** (Liquid templates + Bootstrap) sang **React SPA** hiện đại, giữ nguyên toàn bộ backend Dataverse và Business Central.

### Kiến Trúc Tổng Thể

```
Business Central ←— API —→ Dataverse ←— Web API —→ React SPA ←— UI —→ User
                            (/_api/)
                            (/_api/cloudflow/v1.0/trigger/)
```

- **Business Central**: ERP backend — đã hoàn tất API và sync dữ liệu với Dataverse
- **Dataverse**: Data platform trung tâm — lưu trữ tất cả entities (PR, Department, Contact, Budget...)
- **React SPA**: Frontend mới — giao tiếp qua Dataverse Web API và Cloud Flow triggers
- **Power Pages**: Platform cũ — code tham chiếu nằm trong `.powerpages-site/`

### Mục Tiêu

- Nâng cấp giao diện và trải nghiệm người dùng (UX)
- Giữ nguyên toàn bộ backend (Dataverse + Business Central APIs)
- Hỗ trợ responsive trên thiết bị mobile
- Deploy SPA lên Power Pages bằng lệnh `pac pages upload-code-site`

---

## 2. Công Nghệ Chính (Key Technologies)

| Layer | Technology | Version | Mục Đích |
|-------|-----------|---------|----------|
| **Framework** | React | 19.2.x | UI framework chính |
| **Build Tool** | Vite | 8.x | Dev server + production build |
| **Language** | TypeScript | 5.9.x | Type safety (strict mode) |
| **Routing** | React Router | 7.x | SPA navigation, lazy loading pages |
| **Server State** | TanStack Query | 5.x | Data fetching, caching, cache invalidation |
| **UI Library** | Ant Design (antd) | 6.x | Enterprise-grade component library |
| **Forms** | React Hook Form | 7.x | Form state management, performance |
| **Validation** | Zod | 4.x | Schema validation cho forms |
| **Auth** | MSAL.js | 5.x (browser) + 5.x (react) | Azure AD authentication |
| **HTTP Client** | Axios | 1.x | API calls, interceptors, token injection |
| **i18n** | react-i18next | 17.x | Đa ngôn ngữ (vi, en) — chưa triển khai đầy đủ |
| **Date** | Day.js | 1.x | Xử lý ngày tháng, locale Tiếng Việt |
| **Icons** | @ant-design/icons | 6.x | Icon library |
| **Linting** | ESLint | 9.x | Flat config, react-hooks + react-refresh plugins |

---

## 3. Cấu Trúc Thư Mục (Directory Structure)

```
Budget-Control-React-Portal-/
├── .claude/                      # Claude AI hook scripts (OpenWolf)
│   ├── settings.json             # Hook configs (session start, pre/post read/write)
│   └── rules/openwolf.md         # Claude-specific OpenWolf rules
│
├── .github/                      # GitHub Copilot AI configuration
│   ├── copilot-instructions.md   # Copilot global instructions
│   ├── agents/                   # Custom Copilot agents
│   │   ├── dataverse-api.agent.md    # Agent tạo API layer cho Dataverse tables
│   │   └── migrate.agent.md          # Agent phân tích & migrate từ Power Pages
│   ├── instructions/             # Context-aware instructions (file pattern matching)
│   │   ├── auth.instructions.md          # Auth patterns (src/auth/**)
│   │   ├── dataverse-api.instructions.md # API patterns (src/api/**)
│   │   ├── power-pages-reference.instructions.md  # Power Pages reference
│   │   └── react-components.instructions.md       # Component patterns (src/**/*.tsx)
│   ├── skills/                   # Copilot skills
│   │   └── feature-scaffold/SKILL.md   # Scaffold feature modules
│   └── prompts/                  # Copilot prompts
│       └── ui-ux-pro-max/        # UI/UX design system tool (Python scripts + CSV data)
│
├── .wolf/                        # OpenWolf context management system
│   ├── OPENWOLF.md               # Operating protocol (rules for every AI session)
│   ├── anatomy.md                # Auto-maintained file index (~266 files tracked)
│   ├── cerebrum.md               # Learning memory across sessions
│   ├── memory.md                 # Session action log
│   ├── identity.md               # Project identity
│   └── reframe-frameworks.md     # UI framework comparison knowledge base
│
├── .powerpages-site/             # ⚠️ REFERENCE ONLY — Power Pages site gốc
│   ├── web-files/                # Build artifacts (JS/CSS bundles) deployed to Power Pages
│   ├── web-pages/                # Page definitions (Home, Search, Profile, etc.)
│   ├── web-templates/            # Liquid templates (Header, Footer, Breadcrumbs, etc.)
│   ├── web-roles/                # Role definitions (Administrators, Authenticated Users)
│   ├── site-settings/            # Auth settings, search config, etc.
│   └── content-snippets/         # Site name, footer, logos
│
├── docs/
│   ├── migration-plan.md         # 📋 Kế hoạch migration chi tiết (phases, mapping, roadmap)
│   └── readme.md                 # Mô tả dự án gốc (Power Pages context)
│
├── src/                          # 🎯 Source code chính
│   ├── app/                      # App-level configuration
│   │   ├── providers.tsx         # Provider tree: MSAL → QueryClient → Ant Design → Auth
│   │   └── router.tsx            # Route definitions (lazy-loaded pages)
│   │
│   ├── auth/                     # Authentication module
│   │   ├── msal-config.ts        # MSAL configuration (Azure AD client ID, tenant, scopes)
│   │   └── AuthProvider.tsx      # Auth context: user info, roles, token acquisition, logout
│   │
│   ├── api/                      # API layer
│   │   ├── dataverse-client.ts   # Axios instance — auto-injects Bearer token via interceptor
│   │   ├── cloudflow-client.ts   # Generic Cloud Flow trigger function
│   │   └── endpoints/
│   │       └── purchase-requisition.ts  # CRUD operations cho PR Header & PR Line
│   │
│   ├── features/                 # Feature modules (self-contained)
│   │   └── purchase-requisition/ # ✅ Phase 1 — HOÀN THÀNH
│   │       ├── components/
│   │       │   ├── PRListPage.tsx    # Danh sách PR: Table, search, pagination, delete
│   │       │   ├── PRFormPage.tsx    # Tạo/Sửa PR: React Hook Form + Zod, dynamic mode
│   │       │   ├── PRViewPage.tsx    # Chi tiết PR: Descriptions + action buttons theo status
│   │       │   └── PRLineTable.tsx   # Subgrid PR lines: inline add/edit/delete rows
│   │       ├── hooks/
│   │       │   └── usePurchaseRequisition.ts  # TanStack Query hooks (queries + mutations)
│   │       ├── types.ts          # Interfaces, const enums, Zod schemas
│   │       └── index.ts          # Barrel exports
│   │
│   ├── shared/                   # Shared/reusable code
│   │   ├── components/
│   │   │   ├── Layout/
│   │   │   │   ├── AppLayout.tsx     # Main layout: Sidebar + Content area
│   │   │   │   ├── Sidebar.tsx       # Navigation menu (role-aware: admin sees Config)
│   │   │   │   └── Header.tsx        # Top bar: breadcrumb, user info, logout
│   │   │   ├── ProtectedRoute.tsx    # Auth guard: auto-redirect login, role check
│   │   │   └── NotFoundPage.tsx      # 404 page
│   │   └── utils/
│   │       └── constants.ts      # Cloud Flow IDs, Dataverse entity paths, defaults
│   │
│   ├── types/                    # Global TypeScript types
│   │   ├── dataverse.ts          # ODataResponse, ODataParams, DataverseBaseEntity
│   │   └── auth.ts               # AppRole, AppUser
│   │
│   ├── styles/                   # Global styles
│   │   ├── inclusive-design.css   # Accessibility-focused styles
│   │   └── glassmorphism.css     # Glass effect styles
│   │
│   ├── main.tsx                  # Entry point: render AppProviders
│   ├── App.tsx                   # Vite default template (không dùng trong production)
│   ├── App.css                   # Vite default styles
│   └── index.css                 # Global CSS + CSS variables
│
├── package.json                  # Dependencies & scripts
├── tsconfig.json                 # Base TypeScript config
├── tsconfig.app.json             # App-specific TS config (strict, erasableSyntaxOnly)
├── tsconfig.node.json            # Node/Vite TS config
├── vite.config.ts                # Vite config: React plugin, @/ alias, proxy /_api
├── eslint.config.js              # ESLint flat config
├── index.html                    # HTML entry point
├── .env.example                  # Environment variables template
└── .env                          # Local environment variables (gitignored)
```

---

## 4. Kiến Trúc Code Chi Tiết (Code Architecture)

### 4.1 Entry Point & Provider Tree

```
main.tsx
  └── <StrictMode>
        └── <AppProviders>    (src/app/providers.tsx)
              ├── MSAL Initialize → wait for msalReady
              └── <MsalProvider>
                    └── <QueryClientProvider>   (staleTime: 5 min, retry: 1)
                          └── <ConfigProvider>  (Ant Design: vi_VN locale, custom theme)
                                └── <AntApp>
                                      └── <AuthProvider>    (src/auth/AuthProvider.tsx)
                                            └── <RouterProvider>  (src/app/router.tsx)
```

### 4.2 Authentication Flow

1. **MSAL v3** khởi tạo → `msalInstance.initialize()`
2. **ProtectedRoute** kiểm tra `isAuthenticated`:
   - Chưa đăng nhập → `loginRedirect()` (tự động redirect tới Azure AD)
   - Đã đăng nhập → kiểm tra role nếu route yêu cầu
3. **AuthProvider** cung cấp context:
   - `user`: thông tin user (id, name, email, roles)
   - `hasRole()`: kiểm tra quyền
   - `getAccessToken()`: lấy token silently (MSAL acquireTokenSilent)
   - `logout()`: redirect logout
4. **Token injection**: `AuthProvider` gọi `setTokenProvider(getAccessToken)` → `dataverse-client.ts` interceptor tự động thêm `Bearer` token vào mọi API call

### 4.3 API Layer

```
dataverse-client.ts          (Axios instance: baseURL = /_api/, OData headers)
  ├── interceptor: auto Bearer token
  └── endpoints/
        └── purchase-requisition.ts
              ├── prHeaderApi.list(params)       → GET  /_api/balas_purchaserequisitionheaders
              ├── prHeaderApi.get(id, params)     → GET  /_api/balas_purchaserequisitionheaders(guid)
              ├── prHeaderApi.create(data)        → POST /_api/balas_purchaserequisitionheaders
              ├── prHeaderApi.update(id, data)    → PATCH /_api/balas_purchaserequisitionheaders(guid)
              ├── prHeaderApi.delete(id)          → DELETE
              ├── prLineApi.listByHeader(headerId)→ GET  /_api/balas_purchaserequisitionlines?$filter=...
              ├── prLineApi.create(data)          → POST
              ├── prLineApi.update(id, data)      → PATCH
              └── prLineApi.delete(id)            → DELETE

cloudflow-client.ts
  └── triggerCloudFlow(flowId, payload)  → POST /_api/cloudflow/v1.0/trigger/{flowId}
```

### 4.4 Feature Module Pattern

Mỗi feature module tuân theo cấu trúc tự chứa:

```
features/<module>/
├── components/         # React components (pages + sub-components)
├── hooks/              # TanStack Query hooks (queries + mutations)
├── types.ts            # TypeScript interfaces + Zod schemas
└── index.ts            # Public barrel exports
```

**Hiện tại đã hoàn thành:** `purchase-requisition` (Phase 1)

**Chưa triển khai (Phase 2-4):**
- `department`, `approval-matrix`, `contact`, `company`
- `service-category`, `vendor`, `dimension-value`, `reports`
- `site-config`, `budget`

### 4.5 State Management Strategy

| Loại State | Công Cụ | Ví Dụ |
|-----------|---------|-------|
| **Server State** | TanStack Query | `usePRHeaders()`, `usePRHeader(id)`, cache invalidation |
| **Form State** | React Hook Form + Zod | `useForm<PRHeaderFormData>({ resolver: zodResolver(schema) })` |
| **Auth State** | React Context | `useAuth()` → user, roles, token |
| **UI State** | React `useState` | sidebar collapsed, search text, pagination |
| **Routing State** | React Router v7 | `useNavigate()`, `useParams()`, lazy loading |

### 4.6 Routing

```
/                                → Redirect → /purchase-requisitions
/purchase-requisitions           → PRListPage (lazy loaded)
/purchase-requisitions/new       → PRFormPage mode="create" (lazy loaded)
/purchase-requisitions/:id       → PRViewPage (lazy loaded)
/purchase-requisitions/:id/edit  → PRFormPage mode="edit" (lazy loaded)
*                                → NotFoundPage
```

Tất cả routes nằm trong `<ProtectedRoute>` → yêu cầu Azure AD authentication.

### 4.7 Dataverse Integration

**10 Dataverse Tables** được sử dụng:

| Entity | API Path | OData | Dùng Cho |
|--------|----------|-------|----------|
| PR Header | `balas_purchaserequisitionheaders` | ✅ | Purchase Requisition |
| PR Line | `balas_purchaserequisitionlines` | ✅ | PR Line Items |
| Department | `balas_departments` | ✅ | Phòng Ban |
| Approval Matrix | `balas_approvalmatrixes` | ✅ | Ma Trận Phê Duyệt |
| Service Category | `balas_servicecategories` | ✅ | Danh Mục Dịch Vụ |
| Dimension Value | `balas_dimensionvalues` | ✅ | Giá Trị Chiều |
| Site Config | `balas_siteconfigurations` | ✅ | Cấu Hình Site |
| Company | `bcbi_companies` | ❌ | Công Ty (BC sync) |
| Contact | `contacts` | ✅ | Users |
| Account | `accounts` | ✅ | Vendors |

**14 Cloud Flows** trigger qua `/_api/cloudflow/v1.0/trigger/{flowId}`:
- Approval workflow: Submit, Approve, Reject, Reopen, Cancel, Close
- Budget: Budget Control Entry, Status, Check
- Master data: Vendor Purchase Price, Special PR, Item UOM, Update Vendor, Import Lines

### 4.8 Role-Based Access Control

| Role | Nguồn | Quyền |
|------|-------|-------|
| `admin` | Azure AD token claims → `roles` | Full access, bao gồm Site Config |
| `local-admin` | Azure AD token claims → `roles` | CRUD departments, contacts, approval matrix |
| `authenticated` | Đăng nhập thành công qua MSAL | Xem/tạo PR, xem budget |

Sidebar tự động ẩn/hiện menu items dựa trên role (ví dụ: "Cấu Hình" chỉ hiện cho `admin`).

---

## 5. AI Configuration (Copilot, Claude, OpenWolf)

### 5.1 GitHub Copilot Configuration

Repository có cấu hình AI phong phú cho GitHub Copilot:

#### Global Instructions (`.github/copilot-instructions.md`)
- Ngôn ngữ giao tiếp: Tiếng Việt
- Coding standards: TypeScript strict, functional components, hooks
- Naming conventions, commit convention
- Dataverse table reference

#### Context-Aware Instructions (`.github/instructions/`)
Các file `.instructions.md` được **tự động áp dụng** dựa trên file pattern:

| File | ApplyTo Pattern | Nội Dung |
|------|----------------|----------|
| `react-components.instructions.md` | `src/**/*.tsx` | Component structure, DataTable/Form patterns |
| `dataverse-api.instructions.md` | `src/api/**` | CRUD patterns, OData, Cloud Flow, lookup fields |
| `auth.instructions.md` | `src/auth/**` | MSAL config, role mapping, protected routes |
| `power-pages-reference.instructions.md` | `purchaserequisition---site-q342v2/**` | Power Pages folder mapping |

#### Custom Agents (`.github/agents/`)

| Agent | Mục Đích |
|-------|----------|
| `dataverse-api.agent.md` | Tạo API hooks, endpoints, TypeScript types từ entity schema |
| `migrate.agent.md` | Phân tích Power Pages forms/lists → đề xuất cách migrate sang React |

#### Skills (`.github/skills/`)

| Skill | Mục Đích |
|-------|----------|
| `feature-scaffold` | Scaffold toàn bộ feature module mới (types, API, hooks, components) |

#### Prompts (`.github/prompts/`)

| Prompt | Mục Đích |
|--------|----------|
| `ui-ux-pro-max` | Comprehensive design system tool — Python scripts + CSV databases cho style, color, typography, UX, chart recommendations |

### 5.2 OpenWolf Context Management (`.wolf/`)

OpenWolf là hệ thống quản lý context xuyên session cho AI:

| File | Vai Trò |
|------|---------|
| `OPENWOLF.md` | Operating protocol — rules áp dụng mỗi turn |
| `anatomy.md` | File index tự động cập nhật — mô tả + token estimate cho mỗi file |
| `cerebrum.md` | Learning memory — user preferences, key learnings, mistakes to avoid |
| `memory.md` | Session action log |
| `identity.md` | Project identity |
| `reframe-frameworks.md` | UI framework comparison knowledge base |

**Workflow:**
1. AI đọc `anatomy.md` trước khi mở file (tránh đọc không cần thiết)
2. AI đọc `cerebrum.md` trước khi generate code (respect conventions)
3. Sau mỗi action → cập nhật `memory.md`
4. Sau mỗi lỗi → cập nhật `buglog.json`
5. Sau mỗi learning → cập nhật `cerebrum.md`

### 5.3 Claude Configuration (`.claude/`)

| File | Vai Trò |
|------|---------|
| `settings.json` | Hook scripts: SessionStart, PreToolUse (Read/Write), PostToolUse, Stop |
| `rules/openwolf.md` | Claude-specific OpenWolf integration rules |

Hooks tự động chạy Node.js scripts tại `.wolf/hooks/` để maintain `anatomy.md` và `memory.md`.

---

## 6. Build & Development

### Scripts

```bash
npm run dev       # Vite dev server (proxy /_api → Power Pages portal)
npm run build     # TypeScript check + Vite production build
npm run lint      # ESLint
npm run preview   # Preview production build
```

### Environment Variables

```env
VITE_AZURE_CLIENT_ID=     # Azure AD App Registration client ID
VITE_AZURE_TENANT_ID=     # Azure AD tenant ID
VITE_DATAVERSE_URL=       # Dataverse org URL (e.g. https://orgXXX.crm5.dynamics.com)
VITE_PORTAL_URL=          # Power Pages portal URL (for dev proxy)
```

### Path Alias

```typescript
// vite.config.ts + tsconfig.app.json
'@/' → 'src/'
```

### Dev Proxy

Vite proxy `/_api/*` → Power Pages portal URL trong development, cho phép gọi Dataverse Web API mà không gặp CORS.

### Deployment

```bash
pac pages upload-code-site \
  --rootpath <site-path> \
  --compiledPath ./dist \
  --siteName <sitename>
```

---

## 7. Tiến Độ Phát Triển (Development Progress)

### ✅ Phase 0: Foundation (HOÀN THÀNH)
- Project structure, dependencies, MSAL auth, Dataverse/Cloud Flow clients
- Routing, layout (Sidebar + Header + Content), Ant Design theme
- Global types, constants, path alias

### ✅ Phase 1: Purchase Requisition (HOÀN THÀNH)
- PR List (Table + search + pagination + status tags + delete)
- PR Create/Edit form (React Hook Form + Zod, dynamic mode)
- PR View (Descriptions + approval action buttons theo status)
- PR Line items subgrid (inline add/edit/delete)
- Approval workflow (Submit, Approve, Reject, Reopen, Cancel, Close via Cloud Flow)
- All TanStack Query hooks with cache invalidation

### 🔲 Phase 2: Master Data (Chưa triển khai)
- Department CRUD
- Approval Matrix CRUD
- Contact Management
- Company view + department subgrid

### 🔲 Phase 3: Supporting Features (Chưa triển khai)
- Service Category CRUD
- Vendor List (read-only)
- Dimension Values list
- Reports, Site Configuration

### 🔲 Phase 4: Polish & Deploy (Chưa triển khai)
- Responsive/mobile, error handling, i18n, performance, testing, CI/CD

---

## 8. Kế Hoạch Cập Nhật Documentation & AI Config

### 8.1 Documentation Cần Tạo/Cập Nhật

| # | File | Hành Động | Mô Tả |
|---|------|-----------|--------|
| 1 | `docs/architecture.md` | **Tạo mới** | Mô tả chi tiết kiến trúc: provider tree, auth flow, API layer, state management |
| 2 | `docs/development-guide.md` | **Tạo mới** | Hướng dẫn setup, chạy dev, thêm feature mới, coding conventions |
| 3 | `docs/dataverse-entities.md` | **Tạo mới** | Chi tiết tất cả entities: fields, lookups, option sets, relationships |
| 4 | `docs/cloud-flow-reference.md` | **Tạo mới** | Tất cả Cloud Flow triggers: input/output schema, error handling |
| 5 | `docs/migration-plan.md` | **Cập nhật** | Đánh dấu Phase 0-1 hoàn thành, cập nhật notes cho Phase 2 |
| 6 | `README.md` | **Viết lại** | Thay thế template README bằng project-specific docs |
| 7 | `docs/readme.md` | **Cập nhật** | Thêm kiến trúc React, tech stack, setup guide |

### 8.2 AI Configuration Cần Cập Nhật

| # | File | Hành Động | Mô Tả |
|---|------|-----------|--------|
| 1 | `.github/copilot-instructions.md` | **Cập nhật** | Thêm coding patterns đã establish từ Phase 1 (hook naming, API pattern) |
| 2 | `.github/instructions/react-components.instructions.md` | **Cập nhật** | Thêm PRListPage/PRFormPage/PRViewPage patterns làm reference |
| 3 | `.github/instructions/dataverse-api.instructions.md` | **Cập nhật** | Thêm prHeaderApi/prLineApi patterns đã implement |
| 4 | `.wolf/cerebrum.md` | **Cập nhật** | Thêm key learnings từ Phase 1 (const enum pattern, Zod schema, hook structure) |
| 5 | `.github/skills/feature-scaffold/SKILL.md` | **Cập nhật** | Cập nhật template dựa trên actual PR module structure |
| 6 | `.github/instructions/phase2-master-data.instructions.md` | **Tạo mới** | Instructions cho Phase 2 modules (Department, Approval Matrix, Contact, Company) |

### 8.3 Thứ Tự Thực Hiện

1. **Cập nhật `README.md`** — first impression cho developers mới
2. **Tạo `docs/architecture.md`** — tài liệu kiến trúc chi tiết
3. **Tạo `docs/development-guide.md`** — hướng dẫn development
4. **Cập nhật `.wolf/cerebrum.md`** — ghi nhận learnings từ Phase 1
5. **Cập nhật `.github/copilot-instructions.md`** — nâng cao chất lượng AI assistance
6. **Cập nhật `.github/instructions/`** — context-aware instructions chính xác hơn
7. **Tạo Phase 2 instructions** — chuẩn bị cho giai đoạn tiếp theo

---

## 9. Tóm Tắt

Budget Control Portal là một dự án React SPA **đang phát triển** (~30% hoàn thành), migrate từ Power Pages. Dự án nổi bật với:

- **Kiến trúc rõ ràng**: Feature-based modules, clean separation of concerns
- **AI-first development**: Cấu hình AI phong phú (Copilot instructions, agents, skills, OpenWolf)
- **Type-safe end-to-end**: TypeScript strict + Zod validation + Dataverse types
- **Modern stack**: React 19, Vite 8, TanStack Query, Ant Design 6
- **Enterprise-ready**: Azure AD auth, role-based access, approval workflow via Cloud Flows

Ưu tiên tiếp theo là hoàn thành Phase 2 (Master Data modules) và cải thiện documentation + AI configuration để tăng tốc phát triển.
