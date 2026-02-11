---
sidebar_position: 1
---

# API Reference

Welcome to the Superdesk API Reference documentation. This section provides comprehensive API documentation for all Superdesk components.

## Overview

Superdesk provides RESTful APIs for all its components. The APIs follow standard REST principles with JSON payloads and use HTTP methods (GET, POST, PATCH, DELETE) for CRUD operations.

## Documentation Formats

We provide the API documentation in two formats:

### 1. **Direct OpenAPI Rendering** (Recommended)

View the complete API documentation on a single page using Redoc:

- **[Superdesk Core API (Rundowns)](/api/superdesk-core-direct/)** - Single-page view with all endpoints

**Benefits:**
- ✅ No generated files - renders directly from OpenAPI spec
- ✅ All endpoints on one page with smooth scrolling navigation
- ✅ Clean, modern Redoc interface
- ✅ Automatic updates when spec changes
- ✅ Faster to navigate with left sidebar menu

### 2. Individual Endpoint Pages

Browse API endpoints as separate documentation pages:

- **[Superdesk Core API](/docs/api/superdesk-core/superdesk-rundowns-api)** - Individual pages per endpoint

**Benefits:**
- ✅ Integrated with Docusaurus navigation
- ✅ Interactive request builder
- ✅ Code examples in 20+ languages
- ✅ Deep linking to specific endpoints

## Available APIs

### Superdesk Core API

The Superdesk Core backend provides the main REST API for content management, workflow, and publishing.

**Base URL**: `https://your-superdesk-instance.com/api`

**Authentication**: Session-based or token-based authentication

Key endpoints:
- `/archive` - Content management
- `/desks` - Desk management
- `/users` - User management
- `/publish` - Publishing operations
- `/search` - Content search

### Superdesk Planning API

The Planning module extends the core API with event and planning management.

**Base URL**: `https://your-superdesk-instance.com/api`

Key endpoints:
- `/events` - Event management
- `/planning` - Planning items
- `/assignments` - Assignment management
- `/coverage` - Coverage tracking

## OpenAPI Specifications

Full OpenAPI 3.0 specifications are available for:

1. Place OpenAPI spec files in `static/openapi/`:
   - `superdesk-core.yaml`
   - `superdesk-planning.yaml`

2. Run the OpenAPI docs generator:
   ```bash
   npm run docusaurus gen-api-docs all
   ```

3. The API documentation will be automatically generated and integrated into the documentation site.

## API Authentication

### Session Authentication

Standard session-based authentication using cookies:

```bash
# Login
curl -X POST https://your-instance.com/api/auth \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "password"
  }'
```

### Token Authentication

API token authentication for integrations:

```bash
# Use API token in header
curl -X GET https://your-instance.com/api/archive \
  -H "Authorization: Bearer YOUR_API_TOKEN"
```

## Common Patterns

### Pagination

List endpoints support pagination:

```bash
GET /api/archive?page=1&max_results=25
```

### Filtering

Use MongoDB query syntax for filtering:

```bash
GET /api/archive?where={"type":"text","urgency":{"$gte":3}}
```

### Sorting

Sort results using the `sort` parameter:

```bash
GET /api/archive?sort=-versioncreated
```

### Embedded Resources

Include related resources using `embedded`:

```bash
GET /api/archive?embedded={"user":1}
```

### ETags

Update operations require ETags for optimistic locking:

```bash
PATCH /api/archive/123
If-Match: "etag-value"
```

## Error Handling

API errors follow standard HTTP status codes:

- `200 OK` - Success
- `201 Created` - Resource created
- `400 Bad Request` - Invalid request
- `401 Unauthorized` - Authentication required
- `403 Forbidden` - Permission denied
- `404 Not Found` - Resource not found
- `409 Conflict` - Conflict (e.g., ETag mismatch)
- `422 Unprocessable Entity` - Validation error
- `500 Internal Server Error` - Server error

Error response format:

```json
{
  "_status": "ERR",
  "_error": {
    "code": 400,
    "message": "Validation failed"
  },
  "_issues": {
    "headline": "required field"
  }
}
```

## Rate Limiting

API requests may be rate-limited. Check response headers:

- `X-RateLimit-Limit` - Maximum requests per window
- `X-RateLimit-Remaining` - Remaining requests
- `X-RateLimit-Reset` - Time when limit resets

## Examples

### Create an Article

```bash
curl -X POST https://your-instance.com/api/archive \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "headline": "Breaking News",
    "body_html": "<p>Story content here</p>",
    "type": "text",
    "urgency": 1
  }'
```

### Update an Article

```bash
curl -X PATCH https://your-instance.com/api/archive/abc123 \
  -H "Content-Type: application/json" \
  -H "If-Match: \"etag-value\"" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "headline": "Updated Headline"
  }'
```

### Search Articles

```bash
curl -X GET https://your-instance.com/api/archive \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -G \
  --data-urlencode 'where={"type":"text"}' \
  --data-urlencode 'sort=-versioncreated' \
  --data-urlencode 'max_results=10'
```

### Publish an Article

```bash
curl -X POST https://your-instance.com/api/publish \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "item_id": "abc123",
    "desk": "sports",
    "stage": "published"
  }'
```

## WebSocket API

For real-time updates, Superdesk uses WebSockets:

```javascript
const ws = new WebSocket('wss://your-instance.com/ws');

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log('Received update:', data);
};
```

## Next Steps

- [Developer Guide](/docs/developer-guide/architecture) - Understand the architecture
- [Core Backend Documentation](/docs/developer-guide/core) - Learn about the backend
- [Client Frontend Documentation](/docs/developer-guide/client) - Learn about the frontend
- [Contributing](/docs/contributing) - Help improve the API

## Resources

- [Eve Framework Documentation](https://docs.python-eve.org/) - Backend framework
- [OpenAPI Specification](https://swagger.io/specification/) - API spec format
- [REST API Best Practices](https://restfulapi.net/) - REST principles
