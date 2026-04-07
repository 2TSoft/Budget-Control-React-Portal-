# Budget Control Portal

> **Publisher:** Balas Technologies Co., Ltd.

Ứng dụng React SPA quản lý yêu cầu mua hàng (Purchase Requisition) và kiểm soát ngân sách, tích hợp Dynamics 365 Business Central qua Dataverse Web API.

## Kiến Trúc

```
Business Central ←— API —→ Dataverse ←— Web API —→ React SPA ←— UI —→ User
```

## Tech Stack

React 19 · Vite 8 · TypeScript 5.9 · TanStack Query 5 · Ant Design 6 · React Hook Form + Zod · MSAL.js (Azure AD) · Axios

## Quick Start

```bash
npm install
cp .env.example .env   # Cập nhật Azure AD credentials
npm run dev             # http://localhost:5173
```

## Scripts

| Script | Mô Tả |
|--------|--------|
| `npm run dev` | Vite dev server (proxy `/_api` → Power Pages portal) |
| `npm run build` | TypeScript check + production build |
| `npm run lint` | ESLint |
| `npm run preview` | Preview production build |

## Deployment

```bash
npm run build
pac pages upload-code-site --rootpath .powerpages-site --compiledPath ./dist --siteName "Budget Control Portal"
```

## Tài Liệu Chi Tiết

| # | File | Nội Dung |
|---|------|----------|
| 0 | [docs/0-README.md](docs/0-README.md) | Tổng quan dự án |
| 1 | [docs/1-ARCHITECTURE.md](docs/1-ARCHITECTURE.md) | Kiến trúc hệ thống |
| 2 | [docs/2-FEATURES.md](docs/2-FEATURES.md) | Tính năng & modules |
| 3 | [docs/3-SETUP.md](docs/3-SETUP.md) | Hướng dẫn cài đặt |
| 4 | [docs/4-CONTRIBUTING.md](docs/4-CONTRIBUTING.md) | Quy tắc đóng góp |
| 5 | [docs/5-ROADMAP.md](docs/5-ROADMAP.md) | Lộ trình phát triển |
| 6 | [docs/6-DEPLOYMENT.md](docs/6-DEPLOYMENT.md) | Build & deployment |

## Tiến Độ

- ✅ Phase 0: Foundation (project structure, auth, API clients, layout)
- ✅ Phase 1: Purchase Requisition (CRUD + approval workflow)
- 🔲 Phase 2: Master Data (Department, Approval Matrix, Contact, Company)
- 🔲 Phase 3: Supporting Features (Service Category, Vendor, Reports, Site Config)
- 🔲 Phase 4: Polish & Deploy (responsive, i18n, testing, CI/CD)

## License

© 2026 Balas Technologies Co., Ltd. All rights reserved.
