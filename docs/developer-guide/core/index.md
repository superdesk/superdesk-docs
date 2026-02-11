---
sidebar_position: 1
---

# Superdesk Core (Backend)

The Superdesk Core is the Python/Flask backend that provides the REST API and business logic for the Superdesk system.

## Overview

Repository: [superdesk/superdesk-core](https://github.com/superdesk/superdesk-core)

Superdesk Core is built on:
- **Flask**: Lightweight web framework
- **Eve**: REST API framework
- **Python 3.8+**: Modern Python
- **MongoDB**: Primary database
- **Elasticsearch**: Search engine
- **Celery**: Background tasks

## Key Features

- RESTful API with HATEOAS
- Extensible app architecture
- Workflow and state management
- Publishing and distribution
- Media processing and storage
- User authentication and authorization
- Real-time notifications via WebSockets

## Architecture

### App Structure

```
superdesk-core/
├── apps/                   # Core applications
│   ├── archive/           # Content management
│   ├── auth/              # Authentication
│   ├── content_api/       # Public content API
│   ├── desks/             # Desk management
│   ├── io/                # Import/export
│   ├── publish/           # Publishing system
│   ├── search/            # Search functionality
│   ├── stages/            # Workflow stages
│   └── users/             # User management
├── features/              # Feature definitions
├── settings.py            # Configuration
└── superdesk/            # Core framework
```

### Resource Definition

Resources are the building blocks of the API:

```python
from superdesk.resource import Resource

class ArticlesResource(Resource):
    schema = {
        'headline': {'type': 'string', 'required': True},
        'body_html': {'type': 'string'},
        'urgency': {'type': 'integer'},
        'keywords': {'type': 'list'}
    }
    
    privileges = {'POST': 'archive', 'PATCH': 'archive', 'DELETE': 'archive'}
```

### Service Layer

Services implement business logic:

```python
from superdesk.services import BaseService

class ArticlesService(BaseService):
    def on_create(self, docs):
        for doc in docs:
            # Add creator information
            doc['created_by'] = get_user()
            # Set default values
            if not doc.get('urgency'):
                doc['urgency'] = 3
    
    def on_update(self, updates, original):
        # Track modifications
        updates['version'] += 1
```

## Development Setup

### Prerequisites

- Python 3.8 or higher
- MongoDB 4.4+
- Elasticsearch 7.x
- Redis 6.x
- Virtual environment

### Installation

```bash
# Clone the repository
git clone https://github.com/superdesk/superdesk-core.git
cd superdesk-core

# Create virtual environment
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Install development dependencies
pip install -r dev-requirements.txt

# Set up configuration
cp settings_sample.py settings.py
# Edit settings.py with your configurations

# Initialize database
python manage.py app:initialize_data

# Create admin user
python manage.py users:create -u admin -p admin -e admin@example.com --admin

# Run development server
python manage.py app:run --reload
```

## Creating an App

Apps extend Superdesk functionality:

```python
# apps/my_app/__init__.py
import superdesk

def init_app(app):
    # Register resource
    endpoint_name = 'my_resource'
    service = MyResourceService(endpoint_name, backend=superdesk.get_backend())
    MyResourceResource(endpoint_name, app=app, service=service)

class MyResourceResource(superdesk.Resource):
    schema = {
        'name': {'type': 'string', 'required': True},
        'description': {'type': 'string'}
    }
    privileges = {'POST': 'my_resource', 'DELETE': 'my_resource'}

class MyResourceService(superdesk.Service):
    def on_create(self, docs):
        for doc in docs:
            doc['created_at'] = utcnow()
```

Register the app in `settings.py`:

```python
INSTALLED_APPS = [
    'apps.my_app'
]
```

## Testing

```bash
# Run all tests
python -m pytest

# Run specific test file
python -m pytest apps/archive/archive_test.py

# Run with coverage
python -m pytest --cov=apps

# Run with verbose output
python -m pytest -v
```

## API Examples

### Creating Content

```bash
# POST /archive
curl -X POST http://localhost:5000/api/archive \
  -H "Content-Type: application/json" \
  -H "Authorization: Basic base64credentials" \
  -d '{
    "headline": "Breaking News",
    "body_html": "<p>Story content here</p>",
    "type": "text",
    "urgency": 1
  }'
```

### Updating Content

```bash
# PATCH /archive/{id}
curl -X PATCH http://localhost:5000/api/archive/123 \
  -H "Content-Type: application/json" \
  -H "If-Match: etag_value" \
  -H "Authorization: Basic base64credentials" \
  -d '{
    "headline": "Updated Headline"
  }'
```

### Publishing Content

```bash
# POST /publish
curl -X POST http://localhost:5000/api/publish \
  -H "Content-Type: application/json" \
  -H "Authorization: Basic base64credentials" \
  -d '{
    "item_id": "123",
    "desk": "sports",
    "stage": "published"
  }'
```

## Configuration

Key configuration options in `settings.py`:

```python
# Database
MONGO_URI = 'mongodb://localhost/superdesk'
ELASTICSEARCH_URL = 'http://localhost:9200'
REDIS_URL = 'redis://localhost:6379'

# Security
SECRET_KEY = 'your-secret-key'
BCRYPT_GENSALT_WORK_FACTOR = 12

# Features
SUPERDESK_TESTING = False
PLANNING_MODULE_ENABLED = True
PUBLISH_ASSOCIATED_ITEMS = True

# Media Storage
MEDIA_PREFIX = 'http://localhost:5000/api/upload'
AMAZON_CONTAINER_NAME = 'superdesk-media'
```

## Common Tasks

### Adding a New Field to Archive

```python
# In apps/archive/__init__.py
superdesk.register_schema('archive', {
    'custom_field': {
        'type': 'string',
        'nullable': True
    }
})
```

### Creating a Background Task

```python
from celery import Celery
from superdesk import get_resource_service

@celery.task
def process_content(item_id):
    service = get_resource_service('archive')
    item = service.find_one(req=None, _id=item_id)
    # Process the item
    service.patch(item_id, {'processed': True})
```

### Custom Validator

```python
from eve.io.mongo import Validator

class MyValidator(Validator):
    def _validate_custom_rule(self, custom_rule, field, value):
        if custom_rule and not meets_requirement(value):
            self._error(field, "Does not meet custom requirement")
```

## Best Practices

1. **Use Services for Business Logic**: Keep resource definitions simple, put logic in services
2. **Validate Early**: Use schema validation and custom validators
3. **Handle Errors Gracefully**: Use appropriate HTTP status codes and error messages
4. **Write Tests**: Cover your code with unit and integration tests
5. **Document APIs**: Use docstrings and OpenAPI specs
6. **Log Appropriately**: Use proper log levels (debug, info, warning, error)

## Resources

- [Repository](https://github.com/superdesk/superdesk-core)
- [API Documentation](/docs/api)
- [Flask Documentation](https://flask.palletsprojects.com/)
- [Eve Documentation](https://docs.python-eve.org/)

## Next Steps

- Explore the [Client Documentation](/docs/developer-guide/client)
- Learn about [Planning Module](/docs/developer-guide/planning)
- Check the [API Reference](/docs/api)
