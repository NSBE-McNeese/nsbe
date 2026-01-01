# Code Formatting Guide

This project uses automated code formatting to maintain consistent code style across the entire codebase.

## Tools

- **Python**: [Black](https://black.readthedocs.io/)
- **JavaScript/JSX/CSS**: [Prettier](https://prettier.io/)

## Local Setup

### Python Formatting

Install Black:
```bash
pip install black
```

Format all Python files:
```bash
black server/
```

Or with specific line length:
```bash
black server/ --line-length 100
```

Check formatting without changes:
```bash
black server/ --check
```

### JavaScript/JSX/CSS Formatting

Install dependencies (from client directory):
```bash
npm install
```

Format all frontend files:
```bash
npm run format
```

Check formatting without changes:
```bash
npm run format:check
```

## Configuration Files

- **Python**: `pyproject.toml` - Contains Black configuration
- **JavaScript**: `client/.prettierrc` - Contains Prettier configuration
- **Ignore files**: `client/.prettierignore` - Specifies files to ignore

## Pre-commit Formatting

Before committing code, run:

```bash
# Format Python
black server/ --line-length 100

# Format Frontend (from client directory)
npm run format
```

## Automated Formatting

A GitHub Actions workflow automatically:
1. Checks formatting on pull requests
2. Auto-formats code on pushes to main/develop branches
3. Commits formatting changes automatically

See `.github/workflows/format.yml` for details.

## IDE Integration

### VS Code

Install extensions:
- [Black Formatter](https://marketplace.visualstudio.com/items?itemName=ms-python.black-formatter)
- [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

Add to `.vscode/settings.json`:
```json
{
  "[python]": {
    "editor.defaultFormatter": "ms-python.black-formatter",
    "editor.formatOnSave": true
  },
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true
  },
  "[jsx]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true
  },
  "[css]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true
  }
}
```

## Formatting Rules

### Black (Python)
- Line length: 100 characters
- String quotes: Double quotes
- Target version: Python 3.9+
- Excludes: migrations directory

### Prettier (JavaScript/CSS)
- Line length: 100 characters
- Semicolons: Yes
- Single quotes: No (use double quotes)
- Trailing commas: ES5
- Tab width: 2 spaces
- Line ending: LF

## Quick Commands

```bash
# Format everything
npm run format && black server/ --line-length 100

# Check formatting
npm run format:check && black server/ --check --line-length 100
```
