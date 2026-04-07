---
description: "Sử dụng khi cần hiểu cấu trúc và logic của Power Pages site gốc. Áp dụng cho việc phân tích forms, lists, web-templates, permissions trước khi migrate sang React."
applyTo: "purchaserequisition---site-q342v2/**"
---
# Power Pages Reference

## Cấu trúc site gốc

Site này là nguồn tham chiếu cho việc migrate sang React SPA. KHÔNG chỉnh sửa files trong thư mục này.

## Mapping cấu trúc

| Power Pages Folder | Chứa gì | Dùng để |
|-------------------|---------|---------|
| `basic-forms/` | YAML config cho Dataverse forms | Biết fields, validation, mode (Create/Edit/Read) |
| `lists/` | YAML config cho entity lists | Biết columns, actions, pagination, search |
| `web-templates/` | HTML + Liquid templates | Tham khảo UI structure, JS logic |
| `table-permissions/` | Permission configs | Map sang role-based access trong React |
| `content-snippets/` | Config values, UI text | Cloud Flow URLs, constants |
| `web-pages/` | Page hierarchy | Map sang React Router routes |
| `cloud-flow-consumer/` | Cloud Flow bindings | API endpoints cho workflows |

## Lưu ý quan trọng

- Tất cả custom_javascript.js files đều TRỐNG (placeholder)
- Logic chính nằm trong form configs + Power Automate Cloud Flows
- Web API đã được enable cho tất cả entities cần thiết
- Azure AD authentication đã được cấu hình
