<!-- OPENSPEC:START -->
# OpenSpec Instructions

These instructions are for AI assistants working in this project.

Always open `@/openspec/AGENTS.md` when the request:
- Mentions planning or proposals (words like proposal, spec, change, plan)
- Introduces new capabilities, breaking changes, architecture shifts, or big performance/security work
- Sounds ambiguous and you need the authoritative spec before coding

Use `@/openspec/AGENTS.md` to learn:
- How to create and apply change proposals
- Spec format and conventions
- Project structure and guidelines

Keep this managed block so 'openspec update' can refresh the instructions.

<!-- OPENSPEC:END -->

## Commit Message Convention

Use [Conventional Commits](https://www.conventionalcommits.org/) format:

```
<type>(<scope>): <description>
```

**Types:** `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`

**Examples:**
- `feat(audiocontext): add external link to preview`
- `fix(media-recorder): resolve device selection bug`
- `docs: update README with setup instructions`
- `refactor(hooks): simplify code execution logic`

## Code Quality

After implementing any spec or making code changes, always run:

```bash
npm run lint    # Check for ESLint issues
npm run format  # Format code with Prettier
npm run build   # Verify TypeScript compiles and production build works
```

Fix any errors before committing.