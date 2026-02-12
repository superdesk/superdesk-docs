import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
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
      items: [
        'user-guide/index',
        'user-guide/foreword',
        'user-guide/what-is-superdesk',
        {
          type: 'category',
          label: 'Workspace & Navigation',
          items: [
            'user-guide/desks-and-custom-workspaces',
            'user-guide/dashboards-and-widgets',
            'user-guide/monitoring-tab',
            'user-guide/searching-content-in-superdesk',
            'user-guide/highlights',
          ],
        },
        {
          type: 'category',
          label: 'Content Management',
          items: [
            'user-guide/creating-and-editing-content-items',
            'user-guide/packages',
            'user-guide/spiked-items',
          ],
        },
        {
          type: 'category',
          label: 'Workflow Tools',
          items: [
            'user-guide/journalist-workflow-tools',
            'user-guide/editor-workflow-tools',
          ],
        },
        {
          type: 'category',
          label: 'Administration',
          items: [
            'user-guide/desk-creation-and-desk-management',
            'user-guide/user-management-and-user-roles',
            'user-guide/defining-publishing-in-superdesk',
            'user-guide/content-configuration',
          ],
        },
        {
          type: 'category',
          label: 'Integrations & Advanced',
          items: [
            'user-guide/superdesk-api',
            'user-guide/ingesting-news-items-and-events',
            'user-guide/superdesk-planning-component',
          ],
        },
        'user-guide/superdesk---glossary-and-terminology-guide',
      ],
    },
    {
      type: 'category',
      label: 'Developer Guide',
      items: [
        'developer-guide/index',
        'developer-guide/architecture',
        'developer-guide/contributing-workflow',
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

export default sidebars;
