# API Documentation Approaches

This directory contains API documentation generated from OpenAPI specifications. We support two approaches:

## Approach 1: Direct OpenAPI Rendering (Redocusaurus)

**Location:** `/api/superdesk-core-direct/`

Uses [Redocusaurus](https://github.com/rohit-gohri/redocusaurus) to render OpenAPI specs directly without generating files.

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

### When to Use

- For complete API overviews
- When you want users to browse all endpoints easily
- When maintaining generated files is burdensome
- For external API consumers who want a comprehensive view

## Approach 2: Generated Endpoint Pages (docusaurus-plugin-openapi-docs)

**Location:** `/docs/api/superdesk-core/`

Uses [docusaurus-plugin-openapi-docs](https://github.com/PaloAltoNetworks/docusaurus-openapi-docs) to generate individual MDX pages per endpoint.

### Configuration

```typescript
// docusaurus.config.ts
plugins: [
  [
    'docusaurus-plugin-openapi-docs',
    {
      config: {
        superdeskCore: {
          specPath: 'static/openapi/superdesk-core.yaml',
          outputDir: 'docs/api/superdesk-core',
          sidebarOptions: {
            groupPathsBy: 'tag',
          },
        },
      },
    },
  ],
],
themes: ['docusaurus-theme-openapi-docs'],
```

### Generation Command

```bash
npm run gen-api-docs
```

### Advantages

- ✅ **Deep integration** - Full Docusaurus features (breadcrumbs, next/prev, etc.)
- ✅ **SEO friendly** - Individual pages per endpoint
- ✅ **Code samples** - 20+ language examples
- ✅ **Interactive** - Try-it-out request builder
- ✅ **Customizable** - Full MDX editing capability

### When to Use

- When you need deep Docusaurus integration
- For SEO optimization (one page per endpoint)
- When you want customizable per-endpoint documentation
- For interactive API exploration with request builder

## Comparison

| Feature | Redocusaurus | Generated Pages |
|---------|-------------|-----------------|
| File Generation | ❌ None | ✅ 50+ MDX files |
| Navigation Style | Left sidebar menu | Docusaurus sidebar tree |
| Page Count | 1 page total | 1 page per endpoint |
| Code Samples | ✅ Yes | ✅ Yes (20+ langs) |
| Try-it-out | ✅ Basic | ✅ Full interactive |
| Customization | Theme config | Full MDX editing |
| Repository Size | Smaller | Larger |
| Update Process | Edit YAML only | Edit YAML + regenerate |
| SEO | Single page | Multiple pages |
| Loading Speed | Fast (single page) | Fast (per page) |

## Recommendation

For most users, we recommend **starting with Redocusaurus** (direct rendering) because:

1. It's simpler to maintain (no file generation)
2. All endpoints are visible in one place
3. Updates are immediate (just edit the YAML)
4. Cleaner repository (no generated files)

Use the **generated pages** approach when you need:
- Individual SEO-optimized pages per endpoint
- Deep customization of specific endpoint docs
- Full interactive request builder functionality

## Adding New APIs

### For Redocusaurus

Add a new spec to the `redocusaurus` preset in `docusaurus.config.ts`:

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

### For Generated Pages

1. Add configuration in `docusaurus.config.ts`
2. Run `npm run gen-api-docs`
3. Commit the generated files
