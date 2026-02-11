---
sidebar_position: 1
---

# Deployment Guide

This guide covers deploying Superdesk to production environments.

## Overview

Superdesk can be deployed in various configurations depending on your requirements:
- Single server deployment
- Multi-server deployment
- Cloud deployment (AWS, GCP, Azure)
- Kubernetes deployment
- Docker Swarm deployment

## Production Requirements

### Hardware Requirements

**Minimum Configuration:**
- 4 CPU cores
- 8GB RAM
- 50GB storage
- 100Mbps network

**Recommended Configuration:**
- 8+ CPU cores
- 16GB+ RAM
- 200GB+ SSD storage
- 1Gbps network

### Software Requirements

- **Operating System**: Ubuntu 20.04/22.04 LTS or RHEL 8+
- **Docker**: 20.10+ (for containerized deployment)
- **Kubernetes**: 1.24+ (for K8s deployment)
- **MongoDB**: 4.4+ (or managed service)
- **Elasticsearch**: 7.x (or managed service)
- **Redis**: 6.x+ (or managed service)
- **Python**: 3.8+ (for non-containerized)
- **Node.js**: 16.x+ (for frontend builds)

## Deployment Methods

### Docker Compose (Recommended for Small/Medium)

```bash
# Clone the repository
git clone https://github.com/superdesk/superdesk.git
cd superdesk

# Configure environment
cp .env.example .env
# Edit .env with your settings

# Start services
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d

# Initialize data
docker-compose exec backend python manage.py app:initialize_data
docker-compose exec backend python manage.py users:create -u admin -p admin -e admin@example.com --admin
```

### Kubernetes

```bash
# Coming soon: Kubernetes Helm charts
# For now, see the Docker deployment guide and adapt for K8s
```

### Manual Installation

For detailed manual installation instructions, see the [Installation Guide](/docs/getting-started/installation).

## Configuration

### Environment Variables

Key production environment variables:

```bash
# Application
SUPERDESK_URL=https://superdesk.example.com
SUPERDESK_CLIENT_URL=https://superdesk.example.com

# Security
SECRET_KEY=your-very-long-random-secret-key
BCRYPT_GENSALT_WORK_FACTOR=12

# Database
MONGO_URI=mongodb://mongo-host:27017/superdesk
ELASTICSEARCH_URL=http://elasticsearch-host:9200
REDIS_URL=redis://redis-host:6379

# Media Storage
MEDIA_PREFIX=https://media.example.com
AMAZON_CONTAINER_NAME=superdesk-media
AMAZON_ACCESS_KEY_ID=your-access-key
AMAZON_SECRET_ACCESS_KEY=your-secret-key
AMAZON_REGION=us-east-1
AMAZON_S3_SUBFOLDER=superdesk

# Email
MAIL_SERVER=smtp.example.com
MAIL_PORT=587
MAIL_USE_TLS=True
MAIL_USERNAME=noreply@example.com
MAIL_PASSWORD=your-mail-password

# Features
PLANNING_MODULE_ENABLED=True
ANALYTICS_ENABLED=True
```

### Reverse Proxy (Nginx)

```nginx
server {
    listen 80;
    server_name superdesk.example.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name superdesk.example.com;

    ssl_certificate /etc/ssl/certs/superdesk.crt;
    ssl_certificate_key /etc/ssl/private/superdesk.key;

    # Frontend
    location / {
        proxy_pass http://frontend:9000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Backend API
    location /api {
        proxy_pass http://backend:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # WebSocket support
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }

    # Media files
    location /api/upload {
        proxy_pass http://backend:5000;
        client_max_body_size 500M;
    }
}
```

## Database Management

### Backup

```bash
# MongoDB backup
mongodump --uri="mongodb://localhost/superdesk" --out=/backup/mongo

# Elasticsearch backup
# Use Elasticsearch snapshot API or managed service backups
```

### Restore

```bash
# MongoDB restore
mongorestore --uri="mongodb://localhost/superdesk" /backup/mongo/superdesk
```

### Migration

```bash
# Run database migrations
docker-compose exec backend python manage.py db:upgrade
```

## Monitoring

### Health Checks

```bash
# Backend health
curl https://superdesk.example.com/api/

# Elasticsearch health
curl http://elasticsearch:9200/_cluster/health

# MongoDB health
mongo --eval "db.serverStatus()"
```

### Logging

Configure centralized logging:

```python
# settings.py
import logging

LOGGING = {
    'version': 1,
    'handlers': {
        'file': {
            'class': 'logging.handlers.RotatingFileHandler',
            'filename': '/var/log/superdesk/superdesk.log',
            'maxBytes': 10485760,  # 10MB
            'backupCount': 10,
        },
    },
    'loggers': {
        'superdesk': {
            'level': 'INFO',
            'handlers': ['file'],
        },
    },
}
```

### Metrics

- Monitor CPU, memory, disk usage
- Track API response times
- Monitor database query performance
- Track user activity
- Alert on errors and exceptions

## Security

### SSL/TLS

Always use HTTPS in production:
- Obtain SSL certificates (Let's Encrypt recommended)
- Configure strong cipher suites
- Enable HSTS
- Use certificate pinning where appropriate

### Firewall

Configure firewall rules:

```bash
# Allow HTTP/HTTPS
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Allow MongoDB (internal only)
sudo ufw allow from 10.0.0.0/8 to any port 27017

# Allow Elasticsearch (internal only)
sudo ufw allow from 10.0.0.0/8 to any port 9200

# Allow Redis (internal only)
sudo ufw allow from 10.0.0.0/8 to any port 6379
```

### Security Updates

- Keep all components updated
- Monitor security advisories
- Apply patches promptly
- Regular security audits

## Scaling

### Horizontal Scaling

- Load balance multiple backend servers
- Use managed database services
- CDN for media files
- Redis cluster for caching

### Vertical Scaling

- Increase CPU/RAM as needed
- Use faster storage (SSD/NVMe)
- Optimize database queries
- Tune Elasticsearch

## Troubleshooting

### Common Issues

**High CPU Usage**
- Check Elasticsearch queries
- Review backend logs for slow operations
- Monitor background jobs

**Memory Issues**
- Check for memory leaks in background tasks
- Tune MongoDB cache settings
- Review Elasticsearch heap size

**Slow Performance**
- Add database indexes
- Enable query caching
- Optimize media delivery
- Review network latency

## Maintenance

### Regular Tasks

- **Daily**: Check logs for errors
- **Weekly**: Review system metrics
- **Monthly**: Database maintenance, update packages
- **Quarterly**: Security audit, capacity planning

### Update Process

```bash
# Backup first
./backup.sh

# Pull latest images
docker-compose pull

# Update containers
docker-compose up -d

# Run migrations
docker-compose exec backend python manage.py db:upgrade

# Verify
curl https://superdesk.example.com/api/
```

## Support

For production deployment assistance:
- Review [Installation Guide](/docs/getting-started/installation)
- Check [GitHub Issues](https://github.com/superdesk/superdesk)
- Contact the Superdesk team

## Next Steps

- [Getting Started](/docs/getting-started/intro)
- [Architecture Overview](/docs/developer-guide/architecture)
- [Contributing](/docs/contributing)
