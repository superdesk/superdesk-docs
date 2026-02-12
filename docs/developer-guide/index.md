---
sidebar_position: 0
---

# Developer Guide

This section covers Superdesk architecture and development for the core backend, client frontend, and planning module.

## Start Here

- [Architecture Overview](/docs/developer-guide/architecture)
- [Superdesk Core (Backend)](/docs/developer-guide/core)
- [Superdesk Client Core (Frontend)](/docs/developer-guide/client)
- [Superdesk Planning](/docs/developer-guide/planning)

## Key Repositories

Superdesk is organized into several key repositories:

### [superdesk-core](https://github.com/superdesk/superdesk-core)
The Python/Flask backend providing the REST API, business logic, and data persistence. This is the core server component that handles:
- Content management and storage
- User authentication and authorization
- Workflow management
- Publishing and distribution
- Media handling

### [superdesk-client-core](https://github.com/superdesk/superdesk-client-core)
The TypeScript/React frontend providing the user interface. This includes:
- Rich text editor
- Desk and workspace management
- Search and filtering
- Content preview and publishing
- User management interface

### [superdesk-planning](https://github.com/superdesk/superdesk-planning)
Planning and assignments module that extends Superdesk with:
- Event management
- Planning items
- Assignment workflows
- Coverage tracking
- Calendar views

### [superdesk](https://github.com/superdesk/superdesk)
The main deployment repository that brings together all components:
- Docker configurations
- Deployment scripts
- Environment setup
- Integration configurations
