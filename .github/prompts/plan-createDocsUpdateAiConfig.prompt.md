## Plan: Tạo 7 file docs + cập nhật AI config

Tạo 7 file documentation chuyên sâu trong `docs/` (0-README → 6-DEPLOYMENT) dựa trên phân tích toàn bộ codebase, sau đó cập nhật AI config files (.github/copilot-instructions.md, .wolf/cerebrum.md, .wolf/anatomy.md) để AI hiểu project tốt hơn trong các session sau.

---

### Phase 1: Tạo 7 file documentation *(song song — không phụ thuộc nhau)*

**Step 1** — `docs/0-README.md`: Tổng quan dự án, tên (Budget Control React Portal — Balas Technologies), kiến trúc tổng quát (BC ↔ Dataverse ↔ React SPA), tech stack summary, quick start, link tới 6 docs khác. Có thể bilingual VN+EN.
- Tham chiếu: `package.json` (deps/scripts), `docs/readme.md`, `docs/migration-plan.md` (section 1-3)

**Step 2** — `docs/1-ARCHITECTURE.md`: System diagram, frontend feature-based architecture, directory structure chi tiết, data flow (Component → Hook → API → Dataverse), auth flow (MSAL v3 → Azure AD → Token), state management (TanStack Query + Context + RHF), routing architecture, API layer design, 10 Dataverse tables + 14 Cloud Flow triggers.
- Tham chiếu: `src/app/providers.tsx`, `src/app/router.tsx`, `src/api/dataverse-client.ts`, `src/auth/AuthProvider.tsx`, `src/shared/utils/constants.ts`

**Step 3** — `docs/2-FEATURES.md`: 11 modules (P0→P3), chi tiết Purchase Requisition (đã implement): PRList, PRForm, PRView, PRLineTable, status workflow (Draft → Submitted → InProgress → Approved/Rejected → Closed/Cancelled), approval actions qua Cloud Flow. Liệt kê features chưa implement (Budget Check UI, Department, Approval Matrix...).
- Tham chiếu: `src/features/purchase-requisition/**`, `src/shared/components/Layout/Sidebar.tsx`

**Step 4** — `docs/3-SETUP.md`: Prerequisites (Node.js 20+), clone, install, 4 env vars (`VITE_AZURE_CLIENT_ID`, `VITE_AZURE_TENANT_ID`, `VITE_DATAVERSE_URL`, `VITE_PORTAL_URL`), Vite proxy, Azure AD app registration steps, dev/build/lint commands, path alias `@/`.
- Tham chiếu: `package.json`, `vite.config.ts`, `tsconfig.app.json`, `src/auth/msal-config.ts`

**Step 5** — `docs/4-CONTRIBUTING.md`: TypeScript strict (no `any`), naming conventions, functional components + hooks, feature module structure, commit convention (`<type>(<scope>): <subject>`), branch naming, API endpoint pattern, RHF+Zod pattern, TanStack Query hooks pattern, Dataverse field conventions, ESLint rules, AI-assisted dev (OpenWolf, Copilot instructions, agents, skills).
- Tham chiếu: `.github/copilot-instructions.md`, `.github/instructions/*`, `.github/skills/feature-scaffold/SKILL.md`, `eslint.config.js`

**Step 6** — `docs/5-ROADMAP.md`: Phase 0 ✅ Foundation, Phase 1 ✅ PR (còn thiếu Budget Check UI + Import Lines), Phase 2 🔲 Master Data, Phase 3 🔲 Supporting Features, Phase 4 🔲 Polish & Deploy, Future plans (Dashboard, PDF export, PWA...).
- Tham chiếu: `docs/migration-plan.md` (section 5)

**Step 7** — `docs/6-DEPLOYMENT.md`: Build (`tsc -b && vite build`), upload Power Pages (`pac pages upload-code-site`), env-specific config, Azure AD per environment, Power Pages settings, CORS/proxy, CI/CD suggestions (GitHub Actions), pre-deploy checklist, troubleshooting.
- Tham chiếu: `package.json`, `vite.config.ts`, `docs/readme.md` (pac CLI)

---

### Phase 2: Cập nhật AI config files *(tuần tự, sau Phase 1)*

**Step 8** — `.github/copilot-instructions.md`: Thêm section **Documentation** (7 file + mô tả), **Current Status** (Phase 0+1 done), **AI Context Files** (mô tả .github/instructions/, agents/, skills/, .wolf/)

**Step 9** — `.wolf/cerebrum.md`: Cập nhật Key Learnings từ generic "React + Vite template" → mô tả chi tiết (Budget Control Portal, Ant Design 6, 14 Cloud Flows, feature module pattern). Thêm User Preferences (tiếng Việt, 7-file docs structure). Thêm Decision Log.

**Step 10** — `.wolf/anatomy.md`: Thêm entries cho 7 file docs mới

---

### Relevant files

**Tạo mới:**
- `docs/0-README.md` — `docs/1-ARCHITECTURE.md` — `docs/2-FEATURES.md` — `docs/3-SETUP.md` — `docs/4-CONTRIBUTING.md` — `docs/5-ROADMAP.md` — `docs/6-DEPLOYMENT.md`

**Cập nhật:**
- `.github/copilot-instructions.md` — thêm docs references, status, AI context
- `.wolf/cerebrum.md` — cập nhật learnings, preferences, decisions
- `.wolf/anatomy.md` — thêm 7 docs entries

**Tham chiếu (không sửa):**
- `package.json`, `vite.config.ts`, `tsconfig.app.json` — config
- `src/app/providers.tsx`, `src/app/router.tsx` — architecture
- `src/auth/AuthProvider.tsx`, `src/auth/msal-config.ts` — auth
- `src/api/dataverse-client.ts`, `src/api/cloudflow-client.ts` — API
- `src/features/purchase-requisition/` — feature reference
- `docs/migration-plan.md` — original plan (giữ nguyên)

---

### Verification

1. Kiểm tra 7 file tồn tại: `ls docs/[0-6]-*.md`
2. Mỗi file ít nhất ~100 dòng, nội dung chuyên sâu
3. Cross-references giữa 7 docs hoạt động đúng
4. `.github/copilot-instructions.md` chứa references tới docs mới
5. `.wolf/cerebrum.md` mô tả đúng project (không còn "minimal Vite template")
6. `.wolf/anatomy.md` có entries cho 7 file mới
7. `npm run lint` pass — không sửa nhầm source code

---

### Decisions

- **Giữ nguyên `docs/migration-plan.md` + `docs/readme.md`** — migration-plan là reference gốc chứa Cloud Flow IDs, Dataverse endpoints chi tiết. 7 file mới tham chiếu tới thay vì duplicate.
- **Ngôn ngữ: Tiếng Việt** — theo copilot-instructions.md. `0-README` có thể bilingual cho GitHub visibility.
- **Đánh số 0→6** — theo yêu cầu trong hình đính kèm
- **Không sửa source code** — chỉ docs + AI config

---

### Further Considerations

1. **Xóa `docs/readme.md` cũ?** Nội dung đã được merge vào `0-README.md`. Recommend: giữ lại để không mất history, hoặc xóa nếu muốn gọn.
2. **Ngôn ngữ README**: Chỉ tiếng Việt hay bilingual VN+EN? Recommend: bilingual header + VN body.
3. **Thêm `docs/7-API-REFERENCE.md`?** Migration-plan đã chứa API details, nhưng nếu cần doc riêng cho API endpoints + Cloud Flows thì có thể thêm sau.
