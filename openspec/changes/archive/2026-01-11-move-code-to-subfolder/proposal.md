# Change: Move application code to `/code` subfolder

## Why
The current project structure places all application code in the root directory alongside documentation and spec files. This makes it difficult to configure GitHub Actions to only trigger builds when actual code changes, leading to unnecessary deployments when only documentation or specs are updated.

## What Changes
- Move all application-related files to a new `/code` directory
- Update GitHub Actions workflow to only trigger on changes to `/code/**` and workflow files
- Update path references in configuration files

### Files to move to `/code`:
- `src/` - Application source code
- `public/` - Static assets
- `index.html` - Entry point
- `package.json`, `package-lock.json` - Dependencies
- `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json` - TypeScript config
- `vite.config.ts` - Build config
- `eslint.config.js` - Linting config
- `components.json` - shadcn/ui config
- `.prettierrc`, `.prettierignore` - Formatting config

### Files to keep in root:
- `.github/` - Workflows and prompts
- `openspec/` - Specifications
- `README.md`, `AGENTS.md` - Documentation
- `.gitignore` - Git config
- `.vscode/` - Editor config

## Impact
- Affected specs: None (infrastructure change only)
- Affected code: All paths in config files need updating
- Affected workflows: `.github/workflows/deploy.yml` needs path filters and working directory updates
