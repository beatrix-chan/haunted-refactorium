import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'Haunted Refactorium',
  description: 'Where legacy code goes to be resurrected',
  ignoreDeadLinks: true,
  themeConfig: {
    logo: '/ghost.svg',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'API', link: '/api/overview' },
      { text: 'GitHub', link: 'https://github.com/beatrix-chan/haunted-refactorium' },
    ],
    sidebar: {
      '/guide/': [
        {
          text: 'Introduction',
          items: [
            { text: 'What is Haunted Refactorium?', link: '/guide/what-is-haunted-refactorium' },
            { text: 'Getting Started', link: '/guide/getting-started' },
            { text: 'Quick Start', link: '/guide/quick-start' },
            { text: 'Project Summary', link: '/guide/project-summary' },
          ],
        },
        {
          text: 'Features',
          items: [
            { text: 'All Features', link: '/guide/features' },
            { text: 'Code Analysis', link: '/guide/code-analysis' },
            { text: 'Architecture Proposals', link: '/guide/architecture-proposals' },
            { text: 'Theme Customization', link: '/guide/theme-customization' },
            { text: 'Accessibility', link: '/guide/accessibility' },
          ],
        },
        {
          text: 'Deployment',
          items: [
            { text: 'Local Development', link: '/guide/local-development' },
            { text: 'Docker Deployment', link: '/guide/docker-deployment' },
            { text: 'Railway Deployment', link: '/guide/railway-deployment' },
          ],
        },
      ],
      '/api/': [
        {
          text: 'API Reference',
          items: [
            { text: 'Overview', link: '/api/overview' },
            { text: 'Clone Endpoint', link: '/api/clone' },
            { text: 'Upload Endpoint', link: '/api/upload' },
            { text: 'Analysis Endpoint', link: '/api/analysis' },
            { text: 'Proposal Endpoint', link: '/api/proposal' },
            { text: 'Scaffold Endpoint', link: '/api/scaffold' },
          ],
        },
      ],
    },
    socialLinks: [{ icon: 'github', link: 'https://github.com/beatrix-chan/haunted-refactorium' }],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2025 Beatrix Chan',
    },
  },
  head: [['link', { rel: 'icon', type: 'image/svg+xml', href: '/ghost.svg' }]],
});
