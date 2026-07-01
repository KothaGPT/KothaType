# Contributing to KothaType

Thank you for your interest in contributing to KothaType! This document provides guidelines and information for contributors.

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/your-username/kothatype.git
   cd kothatype
   ```
3. **Install dependencies**:
   ```bash
   pnpm install
   ```

## Development Workflow

### Branch Naming

Use descriptive branch names with prefixes:
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation changes
- `refactor/` - Code refactoring
- `test/` - Adding or updating tests
- `chore/` - Maintenance tasks

Example:
```bash
git checkout -b feature/add-new-transliteration-rule
```

### Making Changes

1. **Create a feature branch** from `main`
2. **Make your changes** following the code style guidelines
3. **Write or update tests** for your changes
4. **Run the test suite** to ensure nothing is broken:
   ```bash
   pnpm test
   ```
5. **Run linting and type checking**:
   ```bash
   pnpm lint
   pnpm typecheck
   ```

### Commit Messages

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- `feat:` - A new feature
- `fix:` - A bug fix
- `docs:` - Documentation only changes
- `style:` - Code style changes (formatting, missing semi-colons, etc)
- `refactor:` - Code change that neither fixes a bug nor adds a feature
- `test:` - Adding or updating tests
- `chore:` - Changes to the build process or auxiliary tools

Examples:
```bash
git commit -m "feat: add new transliteration rule for 'kh'"
git commit -m "fix: handle edge case in fuzzy matching"
git commit -m "docs: update README with new CLI commands"
```

### Pull Request Process

1. **Update documentation** if needed
2. **Add tests** for new functionality
3. **Ensure all tests pass**:
   ```bash
   pnpm test
   pnpm lint
   pnpm typecheck
   ```
4. **Create a pull request** with:
   - Clear title and description
   - Reference any related issues
   - Screenshots or examples if applicable

### Code Review

All submissions require review before merging. We use GitHub pull requests for this purpose. Please respond to review feedback promptly.

## Code Style

### TypeScript

- Use TypeScript for all new code
- Follow the existing code style in the project
- Use meaningful variable and function names
- Add type annotations where helpful
- Avoid `any` type when possible

### Testing

- Write tests for new functionality
- Maintain or improve test coverage
- Use descriptive test names
- Follow the existing test patterns

### Documentation

- Update README.md if adding new features
- Add JSDoc comments for public APIs
- Include examples where appropriate

## Reporting Issues

- Use GitHub Issues for bug reports
- Include steps to reproduce the issue
- Provide expected vs actual behavior
- Include your environment details (OS, Node.js version, etc.)

## License

By contributing to KothaType, you agree that your contributions will be licensed under the MIT License.

## Questions?

If you have questions about contributing, please open an issue or reach out to the maintainers.
