---
sidebar_position: 3
---

# Quick Start

Get up and running with Superdesk in minutes!

## Using Docker (Fastest Method)

The quickest way to try Superdesk is using Docker:

```bash
# Clone and start
git clone https://github.com/superdesk/superdesk.git
cd superdesk
docker-compose up

# In another terminal, initialize data
docker-compose exec backend python manage.py app:initialize_data
docker-compose exec backend python manage.py users:create -u admin -p admin -e admin@example.com --admin
```

:::warning Security Note
The `admin` / `admin` credentials shown above are for **local testing only**. For any non-local or production deployment, use a strong, unique password for the admin user and never keep default credentials. If you used these example credentials temporarily, change the admin password immediately after the first login.
:::

Access Superdesk at `http://localhost:9000` and log in with:
- **Username:** admin
- **Password:** admin (change immediately for non-local environments)

## Basic Workflow

Once logged in, here's a quick overview of the basic workflow:

### 1. Create Content

1. Click on **"+ Create"** in the top navigation
2. Select the content type (e.g., "Article")
3. Fill in the headline and body
4. Add media, tags, and metadata as needed

### 2. Edit and Collaborate

1. Content appears in your **Personal Space**
2. Move content to different desks using drag-and-drop
3. Use the commenting feature to collaborate with team members
4. Track changes and versions in the history panel

### 3. Publish

1. Click **"Publish"** to send content live
2. Choose the publishing destination
3. Set embargo times if needed
4. Confirm and publish

## Key Features to Explore

### Content Management
- Create articles, photos, videos, and multimedia packages
- Rich text editing with formatting options
- Media library for managing assets
- Metadata and tagging system

### Workflow
- Desk-based organization
- Stage-based workflow (e.g., Working, Submitted, Published)
- Assignment and task management
- Publishing queues

### Search and Filtering
- Advanced search with multiple criteria
- Saved searches for quick access
- Filter by desk, stage, type, date, and more

### Planning (if installed)
- Event management
- Planning items for coverage
- Assignment workflow
- Calendar views

## Common Tasks

### Creating a New User

```bash
# Using Docker
docker-compose exec backend python manage.py users:create \
  -u username \
  -p password \
  -e email@example.com

# Or in development
python manage.py users:create -u username -p password -e email@example.com
```

### Managing Desks

1. Navigate to **Settings** → **Desks**
2. Click **"+ Add Desk"**
3. Configure desk name, working stages, and permissions
4. Assign users to the desk

### Configuring Publishing Destinations

1. Go to **Settings** → **Publish**
2. Add subscribers and destinations
3. Configure output formats (NINJS, NewsML, etc.)
4. Set up transmit configurations

## Development Quick Start

For developers wanting to customize or extend Superdesk:

### Backend Development

```bash
# Clone and set up
git clone https://github.com/superdesk/superdesk-core.git
cd superdesk-core
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Run in development mode
python manage.py app:run --reload
```

### Frontend Development

```bash
# Clone and set up
git clone https://github.com/superdesk/superdesk-client-core.git
cd superdesk-client-core
npm install

# Run development server with hot reload
npm start
```

### Creating a Plugin

```bash
# Create a new backend plugin
cd superdesk-core/apps
mkdir my_plugin
# Create __init__.py and implement your service

# Create a new frontend extension
cd superdesk-client-core/scripts/extensions
mkdir my-extension
# Create index.tsx and implement your React component
```

## Configuration Tips

### Essential Settings

Edit your `settings.py` (backend) or environment variables:

```python
# Backend (settings.py)
MONGO_URI = 'mongodb://localhost/superdesk'
ELASTICSEARCH_URL = 'http://localhost:9200'
SECRET_KEY = 'your-secret-key-change-this'

# Enable features
PLANNING_MODULE_ENABLED = True
PUBLISH_ASSOCIATED_ITEMS = True
```

### Frontend Configuration

Create a `superdesk.config.js`:

```javascript
module.exports = {
    apps: ['superdesk-core'],
    defaultRoute: '/workspace/monitoring',
    langOverride: {
        'en': {
            'Dashboard': 'My Dashboard'
        }
    }
};
```

## Next Steps

Now that you have Superdesk running:

1. **[User Guide](/docs/user-guide)** - Learn how to use all features
2. **[Developer Guide](/docs/developer-guide/architecture)** - Understand the architecture
3. **[API Reference](/docs/api)** - Explore the REST API
4. **[Contributing](/docs/contributing)** - Help improve Superdesk

## Getting Help

- **Documentation:** Browse this documentation site
- **GitHub Issues:** Report bugs on the specific repository
- **Community:** Join discussions on GitHub

## Clean Up (Docker)

When you're done testing:

```bash
# Stop services
docker-compose down

# Remove volumes (deletes all data)
docker-compose down -v
```
