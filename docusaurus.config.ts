import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Superdesk Documentation',
  tagline: 'End-to-end news creation, production, and publishing',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  // Use environment variable or default to GitHub Pages URL
  url: process.env.DOCUSAURUS_URL || 'https://superdesk.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: process.env.DOCUSAURUS_BASE_URL || '/superdesk-docs/',

  // GitHub pages deployment config.
  organizationName: 'superdesk',
  projectName: 'superdesk-docs',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/superdesk/superdesk-docs/tree/master/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    [
      'docusaurus-plugin-openapi-docs',
      {
        id: 'openapi',
        docsPluginId: 'classic',
        config: {
          superdeskCore: {
            specPath: 'static/openapi/superdesk-core.yaml',
            outputDir: 'docs/api/superdesk-core',
            sidebarOptions: {
              groupPathsBy: 'tag',
            },
          },
          superdeskPlanning: {
            specPath: 'static/openapi/superdesk-planning.yaml',
            outputDir: 'docs/api/superdesk-planning',
            sidebarOptions: {
              groupPathsBy: 'tag',
            },
          },
        },
      },
    ],
  ],

  themes: ['docusaurus-theme-openapi-docs'],

  themeConfig: {
    image: 'img/superdesk-social-card.jpg',
    navbar: {
      title: 'Superdesk',
      logo: {
        alt: 'Superdesk Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Documentation',
        },
        {
          to: '/docs/api',
          label: 'API Reference',
          position: 'left',
        },
        {
          href: 'https://github.com/superdesk',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            {
              label: 'Getting Started',
              to: '/docs/getting-started/intro',
            },
            {
              label: 'User Guide',
              to: '/docs/user-guide',
            },
            {
              label: 'Developer Guide',
              to: '/docs/developer-guide/architecture',
            },
          ],
        },
        {
          title: 'Repositories',
          items: [
            {
              label: 'superdesk-core',
              href: 'https://github.com/superdesk/superdesk-core',
            },
            {
              label: 'superdesk-client-core',
              href: 'https://github.com/superdesk/superdesk-client-core',
            },
            {
              label: 'superdesk-planning',
              href: 'https://github.com/superdesk/superdesk-planning',
            },
            {
              label: 'superdesk',
              href: 'https://github.com/superdesk/superdesk',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Contributing',
              to: '/docs/contributing',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/superdesk',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Superdesk. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['python', 'typescript', 'bash'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
