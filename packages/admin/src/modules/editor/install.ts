export default defineModule({
  id: 'editor',
  space: 'app',
  name: '设计',
  icon: 'mingcute:device',
  desc: '应用设计',
  version: '1.0.0',
  sort: 1,
  menus: [
    {
      id: 'pages',
      name: '页面',
      icon: 'mingcute:layer',
      children: [
        { id: 'home', name: '店铺首页' },
        { id: 'catalog', name: '商品分类' },
        { id: 'list', name: '商品列表' },
        { id: 'detail', name: '商品详情' },
        { id: 'member', name: '会员中心' },
        { id: 'tabbar', name: '底部导航' },
      ],
    },
    {
      id: 'tools',
      name: '工具',
      icon: 'mingcute:magic-1',
      children: [
        { id: 'templates', name: '风格模板' },
        { id: 'custom', name: '微页面' },
      ],
    },
    {
      id: 'publish',
      name: '发布设置',
      icon: 'mingcute:rocket',
      children: [
        { id: 'h5', name: 'H5 端' },
        { id: 'wechat', name: '微信小程序' },
      ],
    },
  ],
})
