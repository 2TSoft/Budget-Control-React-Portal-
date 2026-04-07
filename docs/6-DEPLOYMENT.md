# Hướng Dẫn Build & Deployment

## 1. Build Production

```bash
# TypeScript check + Vite production build
npm run build
```

Output sẽ được tạo trong thư mục `dist/`:

```
dist/
├── index.html
├── assets/
│   ├── index-[hash].js     # Main bundle
│   ├── index-[hash].css    # Styles
│   └── [chunk]-[hash].js   # Code-split chunks (lazy-loaded pages)
```

### Preview Build Locally

```bash
npm run preview
```

Mở `http://localhost:4173` để kiểm tra production build.

## 2. Deploy Lên Power Pages

### Yêu Cầu

- **Power Platform CLI** (`pac`) đã cài đặt
- **Power Pages site** đã tạo và cấu hình SPA mode
- **Quyền** để upload code lên site

### Cài Đặt Power Platform CLI

```bash
# Cài đặt qua npm
npm install -g @microsoft/power-platform-cli

# Hoặc download installer từ Microsoft
# https://learn.microsoft.com/power-platform/developer/cli/introduction
```

### Upload Code

```bash
# Build production
npm run build

# Upload SPA lên Power Pages
pac pages upload-code-site \
  --rootpath .powerpages-site \
  --compiledPath ./dist \
  --siteName "Budget Control Portal"
```

### Tham Số

| Tham Số | Mô Tả |
|---------|--------|
| `--rootpath` | Đường dẫn tới thư mục Power Pages site (chứa `website.yml`) |
| `--compiledPath` | Đường dẫn tới thư mục build output (`./dist`) |
| `--siteName` | Tên Power Pages site |

## 3. Cấu Hình Power Pages

### SPA Mode

Power Pages site phải được cấu hình với **Code Site Enabled**:
- Site Settings: `CodeSite-Enabled` = `true`
- Home page sẽ load `index.html` từ web-files

### Web API Configuration

Đảm bảo Dataverse Web API đã được enable cho các entities cần thiết:
- Tất cả 10 tables trong dự án đã có Web API enabled
- Table permissions phải được cấu hình cho từng role

### Azure AD Configuration

- App Registration phải có Redirect URI bao gồm Power Pages portal URL
- Ví dụ: `https://your-portal.powerappsportals.com`

## 4. Environment Khác Nhau

| Environment | URL | Mục Đích |
|-------------|-----|----------|
| Development | `http://localhost:5173` | Local development (Vite dev server + proxy) |
| Preview | `http://localhost:4173` | Preview production build locally |
| Production | `https://your-portal.powerappsportals.com` | Power Pages deployment |

### Lưu Ý

- **Development**: API calls được proxy qua Vite → tránh CORS
- **Production**: API calls đi trực tiếp qua Power Pages `/_api/` endpoint → không có CORS issue vì cùng origin
- **Azure AD Redirect URIs** phải bao gồm tất cả environments

## 5. Checklist Trước Khi Deploy

- [ ] `npm run lint` — không có lỗi
- [ ] `npm run build` — build thành công
- [ ] `npm run preview` — kiểm tra UI và chức năng
- [ ] Kiểm tra `.env` có đúng credentials cho production
- [ ] Azure AD Redirect URI bao gồm production URL
- [ ] Table permissions đã cấu hình cho tất cả roles
- [ ] Cloud Flow connections đã active

## 6. Rollback

Nếu cần rollback:

1. Checkout commit trước đó: `git checkout <previous-commit>`
2. Build lại: `npm run build`
3. Upload lại: `pac pages upload-code-site ...`

Hoặc restore từ Power Pages portal admin:
- Power Platform Admin Center → Environments → Site → Restore
