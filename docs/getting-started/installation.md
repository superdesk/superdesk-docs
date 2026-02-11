---
sidebar_position: 2
---

# Installation Guide

This guide will help you install Superdesk on your system.

## Prerequisites

Before installing Superdesk, ensure you have the following prerequisites:

### For Docker Installation (Recommended)
- Docker (version 20.10 or higher)
- Docker Compose (version 2.0 or higher)
- At least 4GB of RAM available
- At least 10GB of disk space

### For Development Installation
- **Backend Requirements:**
  - Python 3.8 or higher
  - MongoDB 4.4 or higher
  - Elasticsearch 7.x
  - Redis 6.x
  - Node.js 16.x or higher (for some build tools)

- **Frontend Requirements:**
  - Node.js 16.x or higher
  - npm 8.x or higher

## Installation Methods

### Docker Installation (Recommended for Production)

The easiest way to get Superdesk up and running is using Docker:

```bash
# Clone the main repository
git clone https://github.com/superdesk/superdesk.git
cd superdesk

# Start all services
docker-compose -f docker-compose.yml up -d

# Initialize the database
docker-compose exec backend python manage.py app:initialize_data
docker-compose exec backend python manage.py users:create -u admin -p admin -e admin@example.com --admin
```

> **Security note:** The `admin` / `admin` credentials shown above are for local testing only. For any non-local or production deployment, use a strong, unique password for the admin user and never keep default credentials. If you used these example credentials temporarily, change the admin password immediately after the first login.
Access Superdesk at `http://localhost:9000` with the credentials you created.

### Development Installation

For development, you'll want to run the components separately:

#### 1. Install Backend (superdesk-core)

```bash
# Clone the repository
git clone https://github.com/superdesk/superdesk-core.git
cd superdesk-core

# Create and activate virtual environment
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Set up configuration
cp settings_sample.py settings.py
# Edit settings.py with your database and service configurations

# Initialize the database
python manage.py app:initialize_data
python manage.py users:create -u admin -p admin -e admin@example.com --admin

# Run the server
python manage.py app:run
```

#### 2. Install Frontend (superdesk-client-core)

```bash
# Clone the repository
git clone https://github.com/superdesk/superdesk-client-core.git
cd superdesk-client-core

# Install dependencies
npm install

# Start development server
npm start
```

#### 3. Optional: Install Planning Module

```bash
# Clone the planning repository
git clone https://github.com/superdesk/superdesk-planning.git
cd superdesk-planning

# Follow the installation instructions in the planning repository
```

## Configuration

### Environment Variables

Key environment variables for configuration:

```bash
# Backend
MONGO_URI=mongodb://localhost/superdesk
ELASTICSEARCH_URL=http://localhost:9200
REDIS_URL=redis://localhost:6379
SECRET_KEY=your-secret-key

# Frontend
SUPERDESK_URL=http://localhost:5000/api
```

### Database Configuration

Ensure MongoDB and Elasticsearch are running and accessible:

```bash
# Check MongoDB
mongo --eval "db.version()"

# Check Elasticsearch
curl http://localhost:9200
```

## Verification

After installation, verify that Superdesk is running correctly:

1. Access the frontend at `http://localhost:9000`
2. Log in with your admin credentials
3. Check that all services are healthy in the system status page

## Troubleshooting

### Common Issues

**Port Already in Use**
```bash
# Check what's using the port
lsof -i :9000

# Kill the process or change the port in your configuration
```

**Database Connection Failed**
- Ensure MongoDB and Elasticsearch are running
- Check connection strings in your configuration
- Verify firewall settings

**Frontend Build Errors**
```bash
# Clear npm cache
npm cache clean --force

# Remove node_modules and reinstall
rm -rf node_modules
npm install
```

## Next Steps

- **[Quick Start Guide](./quick-start.md)** - Learn the basics
- **[Developer Guide](/docs/developer-guide/architecture)** - Understand the architecture
- **[Deployment Guide](/docs/deployment)** - Deploy to production

## Additional Resources

- [superdesk-core README](https://github.com/superdesk/superdesk-core)
- [superdesk-client-core README](https://github.com/superdesk/superdesk-client-core)
- [Docker Hub](https://hub.docker.com/u/superdesk)
