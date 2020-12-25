import { defineConfig } from 'dumi';

export default defineConfig({
  title: 'components',
  // favicon: 'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  // logo: 'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  outputPath: 'docs-dist',
  mode: 'site',
  menus: {
    // 指南
    '/guide': [
      {
        title: '介绍',
        children: ['guide/index', 'guide/getting-started'],
      },
      {
        title: '写组件 Demo',
        children: ['guide/demo-principle', 'guide/demo-types', 'guide/control-demo-render'],
      },
      {
        title: '控制菜单和路由生成',
        children: [
          'guide/control-route-generate',
          'guide/control-menu-generate',
          'guide/control-nav-generate',
        ],
      },
      {
        title: '更多用法',
        children: ['guide/mode', 'guide/multi-language', 'guide/seo'],
      },
      {
        title: '其他',
        children: ['guide/migration', 'guide/faq'],
      },
    ],
  },
  extraBabelPlugins: [
    [
      'import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: 'css',
      },
    ],
  ],
});
