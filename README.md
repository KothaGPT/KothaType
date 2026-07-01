# KothaType

English → Bangla Phonetic Typing Platform

A full-featured TypeScript monorepo for phonetic Bangla transliteration with CLI, browser extension, and web interface.

## Features

- **Core Transliteration Engine** (`@kothatype/core`) - Avro-like phonetic rules
- **Fuzzy Matching** (`@kothatype/fuzzy`) - Smart suggestions and corrections
- **User Dictionary** (`@kothatype/user-dict`) - IndexedDB-based persistent storage
- **Command Line Interface** (`@kothatype/cli`) - Terminal transliteration with interactive mode
- **Browser Extension** (`apps/extension`) - Chrome extension (Manifest V3)
- **Web Application** (`apps/web`) - React app for dictionary management

## Quick Start

### Prerequisites

- Node.js 20+ (see `.nvmrc`)
- pnpm 9+

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/kothatype.git
cd kothatype

# Install dependencies
pnpm install

# Build all packages
pnpm build
```

## Usage

### CLI

```bash
# Basic transliteration
kothatype transliterate "ami bangla likhbo"

# With fuzzy matching
kothatype transliterate "ami bangla likhbo" --fuzzy

# Get suggestions
kothatype suggest "bangla"

# Interactive mode
kothatype interactive
```

### Web App

```bash
# Start development server
pnpm --filter kothatype-web dev

# Visit http://localhost:5173
```

### Browser Extension

1. Build the extension:
   ```bash
   pnpm --filter kothatype-extension build
   ```
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode"
4. Click "Load unpacked" and select `apps/extension/dist`
5. Type in any text field to see phonetic transliteration

## Development

### Available Scripts

```bash
# Install dependencies
pnpm install

# Build all packages
pnpm build

# Run all tests
pnpm test

# Run tests with coverage
pnpm test:coverage

# Run linting
pnpm lint

# Run type checking
pnpm typecheck

# Watch mode for development
pnpm test:watch
```

### Project Structure

```
kothatype/
├── packages/
│   ├── core/              # Transliteration engine
│   │   ├── src/
│   │   │   ├── index.ts       # Main transliterate function
│   │   │   └── index.test.ts  # Tests
│   │   └── package.json
│   ├── fuzzy/             # Fuzzy phonetic correction
│   │   ├── src/
│   │   │   ├── index.ts       # Suggest and useFuzzyMatch functions
│   │   │   └── index.test.ts  # Tests
│   │   └── package.json
│   ├── user-dict/         # IndexedDB user dictionary
│   │   ├── src/
│   │   │   ├── index.ts       # saveWord and all functions
│   │   │   └── index.test.ts  # Tests
│   │   └── package.json
│   └── cli/               # Command line interface
│       ├── src/
│       │   ├── cli.ts         # CLI commands and handlers
│       │   ├── cli.test.ts    # Tests
│       │   └── index.ts       # Exports
│       └── package.json
├── apps/
│   ├── extension/         # Browser extension (Manifest V3)
│   │   ├── src/
│   │   │   ├── content_script.ts       # Content script
│   │   │   └── content_script.test.ts  # Tests
│   │   └── package.json
│   └── web/               # React web app
│       ├── src/
│       │   ├── App.tsx            # Main component
│       │   ├── App.test.tsx       # Tests
│       │   └── main.tsx           # Entry point
│       └── package.json
├── .github/
│   └── workflows/
│       ├── test.yml       # CI test workflow
│       └── publish.yml    # Publish workflow
├── package.json           # Root package.json
├── pnpm-workspace.yaml    # pnpm workspace config
├── tsconfig.base.json     # Base TypeScript config
├── vitest.config.ts       # Vitest config
├── .eslintrc.cjs          # ESLint config
├── .prettierrc            # Prettier config
├── .editorconfig          # Editor config
├── .gitignore             # Git ignore
├── .nvmrc                 # Node version
├── CONTRIBUTING.md        # Contributing guide
└── README.md              # This file
```

## Architecture

### Core Transliteration

The transliteration engine uses regex-based rules to convert Roman text to Bangla:

```typescript
import { transliterate } from '@kothatype/core';

const result = transliterate('ami bangla');
// Output: 'আমি বাংলা'
```

### Fuzzy Matching

The fuzzy matching module provides suggestions based on Levenshtein distance:

```typescript
import { suggest, useFuzzyMatch } from '@kothatype/fuzzy';

const suggestions = suggest('am');
// Output: ['ami', 'bangla', ...]

const result = useFuzzyMatch('ami');
// Output: 'আমি' (if close match found)
```

### User Dictionary

The user dictionary module provides persistent storage using IndexedDB:

```typescript
import { saveWord, all } from '@kothatype/user-dict';

await saveWord('hello', 'হ্যালো');
const words = await all();
// Output: [{ roman: 'hello', bangla: 'হ্যালো' }]
```

## Testing

We use [Vitest](https://vitest.dev/) for testing with the following commands:

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage
```

### Coverage Report

Current test coverage:

| Package | Statements | Branches | Functions | Lines |
|---------|-----------|----------|-----------|-------|
| @kothatype/core | 100% | 100% | 100% | 100% |
| @kothatype/user-dict | 100% | 100% | 100% | 100% |
| @kothatype/fuzzy | 100% | 91.66% | 100% | 100% |
| @kothatype/cli | 83.95% | 90% | 60% | 83.95% |
| kothatype-extension | 100% | 100% | 100% | 100% |
| kothatype-web | 83.63% | 85.71% | 75% | 83.63% |

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## License

MIT License. See [LICENSE](LICENSE) for details.

## Support

- [GitHub Issues](https://github.com/your-username/kothatype/issues)
- [Documentation](./README.md)

## Acknowledgments

- Built with TypeScript, React, and Vite
- Uses [Commander.js](https://github.com/tj/commander.js/) for CLI
- Uses [fast-levenshtein](https://github.com/hiddysmart/fast-levenshtein) for fuzzy matching
- Uses [idb](https://github.com/nicolo-ribaudo/idb) for IndexedDB
