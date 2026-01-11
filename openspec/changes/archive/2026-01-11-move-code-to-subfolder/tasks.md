# Tasks: Move code to subfolder

## 1. Setup
- [x] 1.1 Create `/code` directory

## 2. Move files
- [x] 2.1 Move `src/` to `code/src/`
- [x] 2.2 Move `public/` to `code/public/`
- [x] 2.3 Move `index.html` to `code/index.html`
- [x] 2.4 Move `package.json` and `package-lock.json` to `code/`
- [x] 2.5 Move TypeScript configs (`tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`) to `code/`
- [x] 2.6 Move `vite.config.ts` to `code/`
- [x] 2.7 Move `eslint.config.js` to `code/`
- [x] 2.8 Move `components.json` to `code/`
- [x] 2.9 Move `.prettierrc` and `.prettierignore` to `code/`
- [x] 2.10 Move `.tanstack/` to `code/.tanstack/` (skipped - directory was empty)

## 3. Update configurations
- [x] 3.1 Update `components.json` paths if needed (no changes needed - relative paths work)
- [x] 3.2 Verify tsconfig paths are correct (worked as-is since relative)
- [x] 3.3 Verify vite.config.ts paths are correct (worked as-is since relative)

## 4. Update GitHub workflow
- [x] 4.1 Add `paths` filter to trigger only on code changes
- [x] 4.2 Add `working-directory: code` to npm steps
- [x] 4.3 Update artifact upload path to `code/dist`

## 5. Update documentation
- [x] 5.1 Update README.md with new directory structure and commands

## 6. Validation
- [x] 6.1 Run `npm install` in `/code`
- [x] 6.2 Run `npm run lint` to verify linting works
- [x] 6.3 Run `npm run build` to verify build works
- [ ] 6.4 Run `npm run dev` to verify dev server works
- [ ] 6.5 Commit and verify GitHub Actions runs correctly
