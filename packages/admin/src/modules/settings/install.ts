export default defineModule({
  id: 'settings',
  space: 'manage',
  name: '设置',
  icon: 'mingcute:settings-1',
  desc: '系统设置',
  version: '1.0.0',
  sort: 1,
  menus: [
    {
      id: 'store',
      name: '店铺设置',
      icon: 'mingcute:store-2',
      children: [
        { id: 'info', name: '基本信息' },
        { id: 'contact', name: '联系方式' },
      ],
    },
    {
      id: 'notification',
      name: '消息通知',
      icon: 'mingcute:notification-newdot',
      children: [
        { id: 'templates', name: '消息模板' },
        { id: 'settings', name: '消息设置' },
      ],
    },
    {
      id: 'sms',
      name: '短信中心',
      icon: 'mingcute:message-4',
      children: [
        { id: 'settings', name: '短信配置' },
        { id: 'logs', name: '发送记录' },
      ],
    },
    {
      id: 'customer-service',
      name: '客服设置',
      icon: 'mingcute:service',
      children: [
        { id: 'wechat', name: '微信小程序' },
        { id: 'h5', name: 'H5 端' },
      ],
    },
    {
      id: 'others',
      name: '其他设置',
      icon: 'mingcute:more-3',
      children: [
        { id: 'map', name: '地图设置' },
        { id: 'verify-code', name: '验证码设置' },
      ],
    },
  ],
  setup: () => {
    // Refresh Settings
    useSettings().refresh()
  },
})
