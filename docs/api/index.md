---
sidebar_position: 1
---

# API Reference

Welcome to the Superdesk API Reference documentation. This section provides comprehensive API documentation for all Superdesk components.

## Overview

Superdesk provides RESTful APIs for all its components. The APIs follow standard REST principles with JSON payloads and use HTTP methods (GET, POST, PATCH, DELETE) for CRUD operations.

## Available APIs

### Superdesk Core API

The Superdesk Core backend provides the main REST API for content management, workflow, and publishing.

**Base URL**: `https://your-superdesk-instance.com/api`

**Authentication**: Session-based or token-based authentication

**Documentation**: OpenAPI specification coming soon

Key endpoints:
- `/archive` - Content management
- `/desks` - Desk management
- `/users` - User management
- `/publish` - Publishing operations
- `/search` - Content search

### Superdesk Planning API

The Planning module extends the core API with event and planning management.

**Base URL**: `https://your-superdesk-instance.com/api`

**Documentation**: OpenAPI specification coming soon

Key endpoints:
- `/events` - Event management
- `/planning` - Planning items
- `/assignments` - Assignment management
- `/coverage` - Coverage tracking

## OpenAPI Specifications

Full OpenAPI 3.0 specifications will be available here once they are generated from the source repositories.

To generate API documentation:

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
