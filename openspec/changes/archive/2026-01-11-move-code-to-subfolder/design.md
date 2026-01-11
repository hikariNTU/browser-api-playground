# Design: Move code to subfolder

## Context
The project currently has all files in the root directory. GitHub Actions triggers on every push to main, causing unnecessary builds when only documentation or spec files change.

## Goals
- Enable path-based filtering in GitHub Actions to skip builds for non-code changes
- Cleaner separation between code and documentation/specs
- Reduce CI/CD costs and deployment frequency

## Non-Goals
- Changing the application's functionality
- Modifying the build output structure
- Creating a monorepo structure

## Decisions

### Directory name: `/code`
**Rationale**: Simple, clear, and conventional for application code.
**Alternatives considered**:
- `/app` - Could conflict with Next.js conventions
- `/packages/app` - Overkill for single package
- `/website` - Less generic

### GitHub Actions path filter approach
**Decision**: Use `paths` filter on the push trigger to only build when:
- `code/**` changes
- `.github/workflows/deploy.yml` changes

```yaml
on:
  push:
    branches: [main]
    paths:
      - 'code/**'
      - '.github/workflows/deploy.yml'
```

**Rationale**: Simple, built-in GitHub feature. No external dependencies.

### Working directory for npm commands
**Decision**: Use `working-directory: code` in workflow steps.

## Risks / Trade-offs
- **Risk**: Path references in config files may break
  - **Mitigation**: Update all relative paths in tsconfig, vite.config, etc.
- **Risk**: IDE/tooling may need reconfiguration
  - **Mitigation**: Update `.vscode/` settings if needed

## Migration Plan
1. Create `/code` directory
2. Move all application files
3. Update configuration file paths
4. Update GitHub workflow
5. Update root README if needed
6. Test build locally before pushing

## Open Questions
- None
