# Superdesk Documentation

Welcome to the unified documentation portal for all Superdesk repositories. This site provides comprehensive documentation for Superdesk, an open-source headless CMS designed for newsrooms.

## 🌐 Live Documentation

Visit the live documentation at: [https://docs.superdesk.org](https://docs.superdesk.org) (or GitHub Pages URL)

## 📚 What's Inside

This documentation covers:

- **Getting Started**: Installation guides, quick start, and introduction to Superdesk
- **User Guide**: How to use Superdesk for daily news operations
- **Developer Guide**: Technical documentation for developers
  - Core Backend (Python/Flask)
  - Client Frontend (TypeScript/React)
  - Planning Module
  - Architecture Overview
- **API Reference**: REST API documentation with OpenAPI specifications
- **Deployment**: Production deployment guides
- **Contributing**: How to contribute to Superdesk

## 🚀 Running Locally

### Prerequisites

- Node.js 18.x or higher
- npm 8.x or higher

### Installation

```bash
# Clone the repository
git clone https://github.com/superdesk/superdesk-docs.git
cd superdesk-docs

# Install dependencies
npm install

# Start development server
npm start
```

The documentation site will be available at `http://localhost:3000`.

### Build

```bash
# Build for production
npm run build

# The static site will be generated in the build/ directory
```

### Serve Production Build

```bash
# Serve the production build locally
npm run serve
```

## 📖 Documentation Structure

```
superdesk-docs/
├── docs/                          # Documentation content
│   ├── getting-started/          # Getting started guides
│   ├── user-guide/               # User documentation
│   ├── developer-guide/          # Developer documentation
│   │   ├── core/                # Backend (superdesk-core)
│   │   ├── client/              # Frontend (superdesk-client-core)
│   │   └── planning/            # Planning module
│   ├── deployment/              # Deployment guides
│   └── contributing/            # Contribution guidelines
├── static/                       # Static assets
│   ├── img/                     # Images
│   └── openapi/                 # OpenAPI specifications
├── src/                         # Custom React components
│   ├── css/                     # Stylesheets
│   └── pages/                   # Custom pages
├── scripts/                     # Utility scripts
│   └── pull-docs.sh            # Documentation sync script
├── docusaurus.config.ts         # Docusaurus configuration
├── sidebars.ts                  # Sidebar configuration
└── package.json                 # Dependencies
```

## 🔄 Syncing Documentation

The `scripts/pull-docs.sh` script can be used to automatically sync documentation from source repositories:

```bash
./scripts/pull-docs.sh
```

This script:
- Pulls README files from source repositories
- Downloads OpenAPI specifications
- Syncs additional documentation (placeholders for future enhancements)

The sync runs automatically daily via GitHub Actions (see `.github/workflows/sync-docs.yml`).

## 🏗️ Built With

- **[Docusaurus 3](https://docusaurus.io/)**: Modern static website generator
- **[TypeScript](https://www.typescriptlang.org/)**: Type-safe JavaScript
- **[OpenAPI Docs Plugin](https://github.com/PaloAltoNetworks/docusaurus-openapi-docs)**: API documentation from OpenAPI specs
- **[React](https://react.dev/)**: UI framework

## 📦 Superdesk Repositories

This documentation covers the following repositories:

- **[superdesk-core](https://github.com/superdesk/superdesk-core)**: Python backend (Flask/Eve)
- **[superdesk-client-core](https://github.com/superdesk/superdesk-client-core)**: TypeScript/React frontend
- **[superdesk-planning](https://github.com/superdesk/superdesk-planning)**: Planning and events module
- **[superdesk](https://github.com/superdesk/superdesk)**: Main deployment repository

## 📝 Contributing to Documentation

We welcome contributions to improve the documentation! Here's how you can help:

1. **Fork the repository**
2. **Create a branch**: `git checkout -b docs/my-improvement`
3. **Make your changes**: Edit markdown files in the `docs/` directory
4. **Test locally**: Run `npm start` to preview changes
5. **Commit**: `git commit -m "docs: describe your changes"`
6. **Push**: `git push origin docs/my-improvement`
7. **Create a Pull Request**

See [CONTRIBUTING.md](https://github.com/superdesk/superdesk-docs/blob/master/docs/contributing/index.md) for detailed guidelines.

## 🔀 Migration from Legacy Folders

This repository previously contained documentation in the following folders:

- `api-reference/`: Legacy API reference documentation
- `good-practices/`: Best practices and tips
- `install-guide/`: Installation guides
- `quick-start/`: Quick start guides

**Migration Status**: Content from these folders is being migrated into the new Docusaurus structure. The legacy folders are preserved for reference but will eventually be removed once all content is migrated.

If you have content in these folders that needs to be migrated:
1. Review the existing content
2. Identify the appropriate location in the new structure
3. Convert to Markdown if needed
4. Submit a PR with the migrated content

## 🤝 Contributing to Superdesk

Want to contribute to Superdesk itself? Check out:

- [Contributing Guide](https://github.com/superdesk/superdesk-docs/blob/master/docs/contributing/index.md)
- [Developer Documentation](https://github.com/superdesk/superdesk-docs/blob/master/docs/developer-guide/architecture.md)

## 📄 License

The documentation content is licensed under [Creative Commons Attribution 4.0 International](https://creativecommons.org/licenses/by/4.0/).

The Superdesk software is licensed under [GNU Affero General Public License v3.0](https://www.gnu.org/licenses/agpl-3.0.en.html).

## 🆘 Getting Help

- **Documentation Issues**: Open an issue in this repository
- **Superdesk Issues**: Open an issue in the respective repository
- **Questions**: Use GitHub Discussions

## 🙏 Acknowledgments

This documentation is maintained by the Superdesk community. Special thanks to all contributors who help improve the documentation.

---

Built with ❤️ using [Docusaurus](https://docusaurus.io/)
