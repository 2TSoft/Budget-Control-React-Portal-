---
description: "Sử dụng khi cần hiểu cấu trúc và logic của Power Pages site gốc. Áp dụng cho việc phân tích forms, lists, web-templates, permissions trước khi migrate sang React."
applyTo: ".powerpages-site/**"
---
# Power Pages Reference

## Cấu trúc site gốc

Site này là nguồn tham chiếu cho việc migrate sang React SPA. KHÔNG chỉnh sửa files trong thư mục này.

Thư mục đã được rename từ `purchaserequisition---site-q342v2/` thành `.powerpages-site/`.

## Mapping cấu trúc

| Power Pages Folder | Chứa gì | Dùng để |
|-------------------|---------|---------|
| `web-files/` | Build artifacts (JS/CSS bundles) | Deployed code trên Power Pages |
| `web-pages/` | Page definitions | Map sang React Router routes |
| `web-templates/` | Liquid templates (Header, Footer...) | Tham khảo UI structure |
| `web-roles/` | Role definitions | Map sang role-based access trong React |
| `site-settings/` | Auth settings, search config | Tham khảo cấu hình |
| `content-snippets/` | Site name, footer, logos | UI text, constants |

## Lưu ý quan trọng

- Build artifacts trong `web-files/` là output từ `npm run build` → `pac pages upload-code-site`
- Web API đã được enable cho tất cả entities cần thiết
- Azure AD authentication đã được cấu hình
- 3 roles: Administrators, Authenticated Users, Anonymous Users (deprecated)
