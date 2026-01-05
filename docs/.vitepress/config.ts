import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'Haunted Refactorium',
  description: 'Where legacy code goes to be resurrected',
  base: '/docs/',
  ignoreDeadLinks: true,
  themeConfig: {
    logo: '/favicon-32x32.png',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'API', link: '/api/overview' },
      { text: 'Swagger', link: 'https://haunted-refactorium.onrender.com/api-docs/' },
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
            { text: '🔮 Swagger UI', link: 'https://haunted-refactorium.onrender.com/api-docs/' },
          ],
        },
      ],
    },
    socialLinks: [{ icon: 'github', link: 'https://github.com/beatrix-chan/haunted-refactorium' }],
    footer: {
      message: 'Released under the GPL-2.0 License.',
      copyright: 'Copyright © 2026 Beatrix Chan',
    },
  },
  head: [
    ['link', { rel: 'icon', type: 'image/x-icon', href: '/docs/favicon.ico' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/docs/favicon-16x16.png' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/docs/favicon-32x32.png' }],
    ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/docs/apple-touch-icon.png' }],
  ],
});
