export default defineModule({
  id: 'finance',
  space: 'shop',
  name: '财务',
  icon: 'mingcute:bank-card',
  desc: '财务管理',
  version: '1.0.0',
  sort: 7,
  menus: [
    {
      id: 'settings',
      name: '模块设置',
      icon: 'mingcute:settings-6',
      children: [
        { id: 'payouts', name: '提现设置' },
      ],
    },
  ],
})
