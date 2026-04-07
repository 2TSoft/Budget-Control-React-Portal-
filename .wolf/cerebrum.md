# Cerebrum

> OpenWolf's learning memory. Updated automatically as the AI learns from interactions.
> Do not edit manually unless correcting an error.
> Last updated: 2026-04-07

## User Preferences

- Ngôn ngữ giao tiếp: Tiếng Việt (có dấu)
- Code language: TypeScript strict mode, English variable names
- Commit messages: English, following `<type>(<scope>): <subject>` convention
- Documentation: Tiếng Việt, numbered docs files (0-README.md → 6-DEPLOYMENT.md)

## Key Learnings

- **Project:** Budget Control Portal (powerpages-spa)
- **Description:** React SPA quản lý Purchase Requisition & Budget Control, migrate từ Power Pages
- **Phase 0 + 1 hoàn thành:** Foundation + Purchase Requisition CRUD + Approval Workflow
- **Const object thay enum:** tsconfig có `erasableSyntaxOnly: true` → dùng `const X = {} as const` + `type X = (typeof X)[keyof typeof X]`
- **API endpoint pattern:** Mỗi entity 1 const object (`entityApi`) với `list`, `get`, `create`, `update`, `delete` methods
- **Hook naming:** Queries dùng `use + Noun` (usePRHeaders), Mutations dùng `use + Verb + Noun` (useCreatePR)
- **QueryKey convention:** Plural cho list (`['prHeaders', params]`), Singular cho get (`['prHeader', id]`)
- **Mutation invalidation:** Luôn invalidate cả list và single queries sau mutation
- **Lookup field pattern:** Read dùng `_fieldname_value`, Write dùng `'fieldname@odata.bind': '/entities(guid)'`
- **Cloud Flow action pattern:** `usePRCloudFlowAction(flowKey)` wrapper cho reusable mutation hooks
- **Zod schema import:** Import `z` from `'zod'` (v4), dùng `z.object()` + `zodResolver`
- **Ant Design v6:** Dùng `ConfigProvider` với `vi_VN` locale, custom theme
- **Path alias:** `@/` → `src/` (cấu hình trong vite.config.ts + tsconfig.app.json)
- **Constants centralized:** `CLOUD_FLOWS`, `DATAVERSE_ENTITIES`, `DEFAULT_CURRENCY_ID`, `DEFAULT_PAGE_SIZE` tại `src/shared/utils/constants.ts`
- **Power Pages site gốc:** Nằm trong `.powerpages-site/` (chỉ đọc, tham chiếu)
- **Docs structure:** `docs/0-README.md` → `docs/6-DEPLOYMENT.md` (7 files, numbered)

## Do-Not-Repeat

- [2026-04-07] Không dùng TypeScript `enum` — tsconfig có `erasableSyntaxOnly: true`. Dùng `const object as const` + type extraction thay thế.
- [2026-04-07] Không tham chiếu `purchaserequisition---site-q342v2/` — folder đã rename thành `.powerpages-site/`.
- [2026-04-07] Không tham chiếu `docs/migration-plan.md` hoặc `docs/readme.md` — đã xóa, thay bằng docs/0-README.md → docs/6-DEPLOYMENT.md.

## Decision Log

- [2026-04-07] Chọn numbered docs structure (0-README → 6-DEPLOYMENT) thay vì flat naming — dễ sắp xếp, dễ tìm.
- [2026-04-07] Docs tách thành 7 files thay vì 1 file lớn — mỗi file phục vụ 1 mục đích rõ ràng, AI dễ tham chiếu.
