# API Documentation with Redocusaurus

This directory contains API documentation rendered directly from OpenAPI specifications using [Redocusaurus](https://github.com/rohit-gohri/redocusaurus).

## Direct OpenAPI Rendering

**Location:** `/api/superdesk-core-direct/`

Redocusaurus renders OpenAPI specs directly without generating files, providing a clean single-page API documentation experience.

### Configuration

```typescript
// docusaurus.config.ts
presets: [
  [
    'redocusaurus',
    {
      specs: [
        {
          spec: 'static/openapi/superdesk-core.yaml',
          route: '/api/superdesk-core-direct/',
        },
      ],
      theme: {
        primaryColor: '#1eb06c',
      },
    },
  ],
]
```

### Advantages

- ✅ **No file generation** - Renders directly from OpenAPI YAML
- ✅ **Single page** - All endpoints on one scrollable page
- ✅ **Clean navigation** - Left sidebar with endpoint menu
- ✅ **Automatic updates** - Changes to spec reflect immediately
- ✅ **Smaller repository** - No generated MDX files to commit
- ✅ **Easier maintenance** - Just edit the YAML file

### Features

- **Interactive API Explorer** - Test endpoints directly from the documentation
- **Code examples** - Auto-generated examples in multiple languages
- **Dark mode support** - Integrated with Docusaurus theming
- **Search functionality** - Quickly find endpoints
- **Responsive design** - Works on all devices

## Adding New APIs

To add additional API specifications:

1. Place the OpenAPI spec in `static/openapi/` directory
2. Add configuration to the `redocusaurus` preset in `docusaurus.config.ts`:

```typescript
specs: [
  {
    spec: 'static/openapi/superdesk-core.yaml',
    route: '/api/superdesk-core-direct/',
  },
  {
    spec: 'static/openapi/superdesk-planning.yaml',
    route: '/api/superdesk-planning-direct/',
  },
],
```

3. Rebuild the site - no file generation needed!

## Customization

Theme options can be configured in the Redocusaurus preset:

```typescript
theme: {
  primaryColor: '#1eb06c',  // Superdesk brand color
  options: {
    disableSearch: false,
    hideDownloadButton: false,
    hideHostname: false,
    expandResponses: '200,201',
    // More options available - see Redoc documentation
  },
},
```

## OpenAPI Specification Files

All OpenAPI specs should be placed in the `static/openapi/` directory:

- `static/openapi/superdesk-core.yaml` - Superdesk Core API (Rundowns)
- `static/openapi/superdesk-planning.yaml` - Superdesk Planning API (future)

These files are the single source of truth for API documentation.

## Benefits Over Generated Files

Traditional approaches (like `docusaurus-plugin-openapi-docs`) generate 50+ MDX files per API:
- One file per endpoint
- JSON files for schemas, parameters, responses
- Sidebar configuration files

**With Redocusaurus:**
- Zero generated files
- One YAML file per API
- Instant updates without regeneration
- Cleaner git history
- Smaller repository size

## Resources

- [Redocusaurus Documentation](https://redocusaurus.vercel.app/docs)
- [Redoc Documentation](https://redocly.com/docs/redoc/)
- [OpenAPI Specification](https://swagger.io/specification/)
