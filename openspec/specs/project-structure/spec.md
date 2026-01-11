# project-structure Specification

## Purpose
TBD - created by archiving change move-code-to-subfolder. Update Purpose after archive.
## Requirements
### Requirement: Code directory separation
The project SHALL organize application code in a dedicated `/code` subdirectory to enable path-based CI/CD filtering.

#### Scenario: Code changes trigger deployment
- **WHEN** files in `/code/**` are modified and pushed to main
- **THEN** the GitHub Actions deployment workflow SHALL execute

#### Scenario: Documentation changes skip deployment
- **WHEN** only files outside `/code/` (e.g., `README.md`, `openspec/`) are modified and pushed to main
- **THEN** the GitHub Actions deployment workflow SHALL NOT execute

### Requirement: Working directory configuration
The GitHub Actions workflow SHALL use `working-directory: code` for all npm commands to execute in the correct context.

#### Scenario: Build executes in code directory
- **WHEN** the deployment workflow runs
- **THEN** npm install, lint, and build commands SHALL execute with `/code` as the working directory

