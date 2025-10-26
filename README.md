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

## Installation

```bash
# Install dependencies
pnpm install

# Build all packages
pnpm build

# Run web app in development mode
pnpm --filter kothatype-web dev

# Build extension
pnpm --filter kothatype-extension build

# Install CLI globally
pnpm --filter @kothatype/cli build
pnpm link ./packages/cli
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
cd apps/web
pnpm dev
# Visit http://localhost:5173
```

### Browser Extension

1. Build the extension: `pnpm --filter kothatype-extension build`
2. Load `apps/extension/dist` as an unpacked extension in Chrome
3. Type in any text field to see phonetic transliteration

## Development

```bash
# Install dependencies
pnpm install

# Build all packages
pnpm build

# Run linting
pnpm lint

# Watch mode for development
pnpm --filter @kothatype/core build --watch
```

## Architecture

```
kothatype/
├── packages/
│   ├── core/              # Transliteration engine
│   ├── fuzzy/             # Fuzzy phonetic correction
│   ├── user-dict/         # IndexedDB user dictionary
│   └── cli/               # Command line interface
├── apps/
│   ├── extension/         # Browser extension (Manifest V3)
│   └── web/               # React web app
├── pnpm-workspace.yaml
├── tsconfig.base.json
└── package.json
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT
