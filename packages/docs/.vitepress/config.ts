import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: '云链小店',
  description: '开源电商系统',
  cleanUrls: true,
  head: [
    [
      'link',
      { rel: 'icon', href: '/favicon.ico' },
    ],
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/logo-sm.png',
    nav: [
      {
        text: '文档',
        items: [
          { text: '开发文档', link: '/docs/' },
          { text: '数据字典', link: '/dbs/' },
          { text: '使用手册', link: '/manual/' },
        ],
      },
      { text: 'API', link: '/api/' },
      {
        text: '生态',
        items: [
          {
            text: '资源',
            items: [
              { text: '主题风格', link: '/themes/' },
              { text: '功能组件', link: '/widgets/' },
              { text: '系统模块', link: '/modules/' },
            ],
          },
          {
            text: '服务',
            items: [
              { text: '定制开发', link: '/service/develop' },
              { text: '培训服务', link: '/service/training' },
              { text: '视频教程', link: '/service/courses' },
            ],
          },
          {
            text: '商业',
            items: [
              { text: '云链', link: '/cloud-chain' },
              { text: '技术合伙人', link: '/partners' },
            ],
          },
        ],
      },
      {
        text: '关于',
        items: [
          { text: 'FAQ', link: '/faq' },
          { text: '团队', link: '/team' },
          { text: '发行版', link: '/release' },
        ],
      },
    ],

    sidebar: {
      '/docs/': [
        {
          text: 'Guide',
          items: [
            { text: 'Index', link: '/guide/' },
            { text: 'One', link: '/guide/one' },
            { text: 'Two', link: '/guide/two' },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/moujinet/xiaoshop-monorepo' },
    ],
  },
})
