# Budget Control Portal

> **Publisher:** Balas Technologies Co., Ltd.
> **Repository:** `Nguyen-Trieu-dev/Budget-Control-React-Portal-`

## Tổng Quan

**Budget Control Portal** là ứng dụng React SPA (Single Page Application) quản lý yêu cầu mua hàng (Purchase Requisition) và kiểm soát ngân sách. Dự án đang nâng cấp (migrate) từ **Microsoft Power Pages** (Liquid templates + Bootstrap) sang **React SPA** hiện đại, giữ nguyên backend Dataverse và Business Central.

## Kiến Trúc Tổng Thể

```
Business Central ←— API —→ Dataverse ←— Web API —→ React SPA ←— UI —→ User
                            (/_api/)
                            (/_api/cloudflow/v1.0/trigger/)
```

- **Business Central**: ERP backend — đã hoàn tất API và sync dữ liệu với Dataverse
- **Dataverse**: Data platform trung tâm — lưu trữ tất cả entities (PR, Department, Contact, Budget...)
- **React SPA**: Frontend mới — giao tiếp qua Dataverse Web API và Cloud Flow triggers
- **Power Pages**: Platform cũ — code tham chiếu nằm trong `.powerpages-site/`

## Mục Tiêu

- Nâng cấp giao diện và trải nghiệm người dùng (UX)
- Giữ nguyên toàn bộ backend (Dataverse + Business Central APIs)
- Hỗ trợ responsive trên thiết bị mobile
- Deploy SPA lên Power Pages bằng lệnh `pac pages upload-code-site`

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | React | 19.x |
| Build Tool | Vite | 8.x |
| Language | TypeScript | 5.9.x (strict mode) |
| Routing | React Router | 7.x |
| Server State | TanStack Query | 5.x |
| UI Library | Ant Design (antd) | 6.x |
| Forms | React Hook Form + Zod | 7.x + 4.x |
| Auth | MSAL.js | 5.x |
| HTTP Client | Axios | 1.x |
| i18n | react-i18next | 17.x |
| Date | Day.js | 1.x |

## Quick Start

```bash
# Clone repository
git clone https://github.com/Nguyen-Trieu-dev/Budget-Control-React-Portal-.git
cd Budget-Control-React-Portal-

# Cài đặt dependencies
npm install

# Tạo file .env từ template
cp .env.example .env
# Cập nhật Azure AD credentials trong .env

# Chạy development server
npm run dev
```

## Tài Liệu

| File | Nội Dung |
|------|----------|
| [1-ARCHITECTURE.md](./1-ARCHITECTURE.md) | Kiến trúc chi tiết: provider tree, auth flow, API layer, state management |
| [2-FEATURES.md](./2-FEATURES.md) | Tính năng & modules: PR, Budget, Department, Approval Matrix... |
| [3-SETUP.md](./3-SETUP.md) | Hướng dẫn cài đặt & chạy development |
| [4-CONTRIBUTING.md](./4-CONTRIBUTING.md) | Quy tắc đóng góp, coding standards, commit conventions |
| [5-ROADMAP.md](./5-ROADMAP.md) | Lộ trình phát triển theo phases |
| [6-DEPLOYMENT.md](./6-DEPLOYMENT.md) | Hướng dẫn build & deploy lên Power Pages |

## License

© 2026 Balas Technologies Co., Ltd. All rights reserved.
