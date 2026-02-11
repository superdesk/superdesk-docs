---
sidebar_position: 2
---

# Superdesk Client Core (Frontend)

The Superdesk Client Core is the TypeScript/React frontend that provides the user interface for the Superdesk system.

## Overview

Repository: [superdesk/superdesk-client-core](https://github.com/superdesk/superdesk-client-core)

Superdesk Client is built on:
- **React 18**: Modern UI framework
- **TypeScript**: Type-safe JavaScript
- **Redux**: State management
- **RxJS**: Reactive programming
- **Webpack**: Module bundling
- **SCSS**: Styling

## Key Features

- Rich text editor with formatting
- Drag-and-drop interface
- Real-time content updates
- Extensible architecture
- Responsive design
- Multi-language support
- Keyboard shortcuts
- Advanced search and filtering

## Architecture

### Project Structure

```
superdesk-client-core/
├── scripts/
│   ├── core/              # Core functionality
│   │   ├── api/          # API client
│   │   ├── services/     # Business logic services
│   │   ├── ui/           # UI components
│   │   └── helpers/      # Utility functions
│   ├── apps/              # Feature modules
│   │   ├── archive/      # Content management
│   │   ├── authoring/    # Article editing
│   │   ├── desks/        # Desk management
│   │   ├── monitoring/   # Content monitoring
│   │   ├── search/       # Search functionality
│   │   └── workspace/    # Workspace management
│   ├── extensions/        # Extension points
│   └── index.ts          # Application entry
├── styles/               # Global styles
└── package.json
```

### Component Architecture

Components follow React best practices:

```typescript
// Functional component with hooks
import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';

interface IProps {
    item: IArticle;
    onSave: (item: IArticle) => void;
}

export const ArticleEditor: React.FC<IProps> = ({item, onSave}) => {
    const [headline, setHeadline] = useState(item.headline);
    
    useEffect(() => {
        // Load related data
    }, [item._id]);
    
    const handleSave = () => {
        onSave({...item, headline});
    };
    
    return (
        <div className="article-editor">
            <input 
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
            />
            <button onClick={handleSave}>Save</button>
        </div>
    );
};
```

### State Management

Redux is used for global state:

```typescript
// Action
export const updateArticle = (id: string, updates: Partial<IArticle>) => ({
    type: 'UPDATE_ARTICLE',
    payload: {id, updates}
});

// Reducer
const articlesReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_ARTICLE':
            return {
                ...state,
                items: state.items.map(item => 
                    item._id === action.payload.id 
                        ? {...item, ...action.payload.updates}
                        : item
                )
            };
        default:
            return state;
    }
};

// Selector
export const getArticleById = (state, id) => 
    state.articles.items.find(item => item._id === id);
```

## Development Setup

### Prerequisites

- Node.js 16.x or higher
- npm 8.x or higher
- Backend API running (superdesk-core)

### Installation

```bash
# Clone the repository
git clone https://github.com/superdesk/superdesk-client-core.git
cd superdesk-client-core

# Install dependencies
npm install

# Start development server
npm start

# Application will be available at http://localhost:9000
```

### Development Server

The development server includes:
- Hot module replacement (HMR)
- TypeScript compilation
- SCSS compilation
- Automatic browser refresh
- Source maps

## Creating an Extension

Extensions allow you to customize and extend Superdesk:

```typescript
// scripts/extensions/my-extension/index.tsx
import {ISuperdesk, IExtension} from 'superdesk-api';

const extension: IExtension = {
    id: 'my-extension',
    activate: (superdesk: ISuperdesk) => {
        // Register custom page
        superdesk.navigation.registerCustomRoute({
            path: '/my-page',
            component: MyCustomPage,
            label: 'My Page',
        });
        
        // Extend article editor
        superdesk.entities.article.addEditorField({
            id: 'custom-field',
            label: 'Custom Field',
            component: CustomFieldComponent,
        });
        
        // Add toolbar action
        superdesk.ui.article.addTopbarAction({
            text: 'Custom Action',
            icon: 'custom-icon',
            onClick: handleCustomAction,
        });
        
        return Promise.resolve({});
    },
};

export default extension;
```

Register the extension in `superdesk.config.js`:

```javascript
module.exports = {
    apps: ['superdesk-core'],
    importApps: ['../superdesk-planning'],
    extensions: {
        'my-extension': {},
    },
    defaultRoute: '/workspace/monitoring',
};
```

## API Integration

### Making API Calls

```typescript
import {httpRequestJsonLocal} from 'core/helpers/network';
import {IArticle} from 'superdesk-api';

// GET request
const getArticle = (id: string): Promise<IArticle> => {
    return httpRequestJsonLocal({
        method: 'GET',
        path: `/archive/${id}`,
    });
};

// POST request
const createArticle = (article: Partial<IArticle>): Promise<IArticle> => {
    return httpRequestJsonLocal({
        method: 'POST',
        path: '/archive',
        payload: article,
    });
};

// PATCH request with ETag
const updateArticle = (id: string, etag: string, updates: Partial<IArticle>): Promise<IArticle> => {
    return httpRequestJsonLocal({
        method: 'PATCH',
        path: `/archive/${id}`,
        payload: updates,
        headers: {'If-Match': etag},
    });
};
```

### Using Services

Services provide higher-level abstractions:

```typescript
import ng from 'core/services/ng';

// Get a service
const api = ng.get('api');
const notify = ng.get('notify');

// Use the API service
api('archive')
    .query({source: {query: {filtered: {}}}})
    .then((result) => {
        console.log('Articles:', result._items);
    });

// Show notification
notify.success('Article saved successfully');
notify.error('Failed to save article');
```

## UI Components

### Using Core Components

```typescript
import {Button, Modal, IconButton} from 'core/ui/components';
import {Icon} from 'core/ui/components/Icon';

export const MyComponent = () => (
    <div>
        <Button 
            text="Save"
            onClick={handleSave}
            type="primary"
        />
        
        <IconButton
            icon="edit"
            onClick={handleEdit}
            ariaLabel="Edit article"
        />
        
        <Modal
            visible={isModalOpen}
            onHide={() => setIsModalOpen(false)}
            headerTemplate="Confirm Action"
        >
            <p>Are you sure?</p>
        </Modal>
    </div>
);
```

### Styling Components

```scss
// my-component.scss
.my-component {
    display: flex;
    padding: 1rem;
    
    &__header {
        font-size: 1.5rem;
        font-weight: bold;
        margin-bottom: 1rem;
    }
    
    &__content {
        flex: 1;
    }
    
    // Use theme variables
    background-color: var(--sd-colour-bg);
    color: var(--sd-colour-text);
}
```

## Testing

### Unit Tests

```typescript
import {render, screen, fireEvent} from '@testing-library/react';
import {ArticleEditor} from './ArticleEditor';

describe('ArticleEditor', () => {
    it('renders headline input', () => {
        const item = {headline: 'Test Headline'};
        render(<ArticleEditor item={item} onSave={jest.fn()} />);
        
        const input = screen.getByDisplayValue('Test Headline');
        expect(input).toBeInTheDocument();
    });
    
    it('calls onSave when save button is clicked', () => {
        const onSave = jest.fn();
        const item = {headline: 'Test'};
        render(<ArticleEditor item={item} onSave={onSave} />);
        
        const button = screen.getByText('Save');
        fireEvent.click(button);
        
        expect(onSave).toHaveBeenCalled();
    });
});
```

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run specific test file
npm test -- ArticleEditor.spec.ts

# Run with coverage
npm test -- --coverage
```

## Building for Production

```bash
# Build for production
npm run build

# Output will be in the dist/ directory

# Build with specific configuration
npm run build -- --env=production

# Analyze bundle size
npm run build -- --analyze
```

## Common Tasks

### Adding a New Menu Item

```typescript
superdesk.navigation.registerItem({
    id: 'my-menu-item',
    label: 'My Feature',
    icon: 'list',
    route: '/my-feature',
    order: 100,
});
```

### Creating a Custom Widget

```typescript
import {IWidget} from 'superdesk-api';

const myWidget: IWidget = {
    id: 'my-widget',
    label: 'My Widget',
    icon: 'widget',
    component: MyWidgetComponent,
    settings: MyWidgetSettings,
};

superdesk.ui.workspace.addWidget(myWidget);
```

### Implementing Search

```typescript
const searchArticles = (query: string) => {
    const criteria = {
        repo: 'archive',
        source: {
            query: {
                filtered: {
                    filter: {term: {type: 'text'}},
                    query: {query_string: {query}},
                },
            },
        },
    };
    
    return api('archive').query(criteria);
};
```

## Best Practices

1. **Use TypeScript**: Leverage type safety for better code quality
2. **Component Composition**: Build small, reusable components
3. **Hooks over Classes**: Use functional components with hooks
4. **Immutable Updates**: Never mutate state directly
5. **Error Boundaries**: Handle errors gracefully
6. **Accessibility**: Use semantic HTML and ARIA labels
7. **Performance**: Use React.memo and useMemo for optimization
8. **Testing**: Write tests for critical functionality

## Keyboard Shortcuts

Common keyboard shortcuts:
- `Ctrl/Cmd + S`: Save
- `Ctrl/Cmd + Shift + E`: Edit
- `Ctrl/Cmd + Shift + U`: Publish
- `/`: Focus search
- `Esc`: Close modals

Register custom shortcuts:

```typescript
keyboardManager.bind('ctrl+shift+x', () => {
    // Handle custom shortcut
});
```

## Resources

- [Repository](https://github.com/superdesk/superdesk-client-core)
- [React Documentation](https://react.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [Redux Documentation](https://redux.js.org/)

## Next Steps

- Explore the [Core Backend](/docs/developer-guide/core)
- Learn about [Planning Module](/docs/developer-guide/planning)
- Check the [Architecture Overview](/docs/developer-guide/architecture)
