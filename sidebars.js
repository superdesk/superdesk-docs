"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sidebars = {
    tutorialSidebar: [
        {
            type: 'category',
            label: 'Getting Started',
            items: [
                'getting-started/intro',
                'getting-started/installation',
                'getting-started/quick-start',
            ],
        },
        {
            type: 'category',
            label: 'User Guide',
            items: ['user-guide/index'],
        },
        {
            type: 'category',
            label: 'Developer Guide',
            items: [
                'developer-guide/architecture',
                {
                    type: 'category',
                    label: 'Core',
                    items: ['developer-guide/core/index'],
                },
                {
                    type: 'category',
                    label: 'Client',
                    items: [
                        'developer-guide/client/index',
                        'developer-guide/client/angular-performance-tips',
                    ],
                },
                {
                    type: 'category',
                    label: 'Planning',
                    items: ['developer-guide/planning/index'],
                },
            ],
        },
        {
            type: 'category',
            label: 'Deployment',
            items: ['deployment/index'],
        },
        {
            type: 'category',
            label: 'API Reference',
            items: ['api/index'],
        },
        {
            type: 'category',
            label: 'Contributing',
            items: ['contributing/index'],
        },
    ],
};
exports.default = sidebars;
