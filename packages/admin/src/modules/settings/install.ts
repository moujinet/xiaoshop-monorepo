export default defineModule({
  id: 'settings',
  space: 'manage',
  name: '设置',
  icon: 'ph:sliders',
  desc: '系统设置',
  version: '1.0.0',
  sort: 1,
  menus: [
    {
      id: 'store',
      name: '店铺设置',
      icon: 'ph:storefront',
      children: [
        { id: 'info', name: '基本信息' },
        { id: 'contact', name: '联系方式' },
      ],
    },
    {
      id: 'register',
      name: '登录注册',
      icon: 'ph:key',
      children: [
        { id: 'settings', name: '注册设置' },
        { id: 'license', name: '用户协议' },
        { id: 'privacy', name: '隐私政策' },
      ],
    },
    {
      id: 'notification',
      name: '消息通知',
      icon: 'ph:notification',
      children: [
        { id: 'templates', name: '消息模板' },
        { id: 'settings', name: '消息设置' },
      ],
    },
    {
      id: 'sms',
      name: '短信中心',
      icon: 'ph:chat-circle-dots',
      children: [
        { id: 'settings', name: '短信配置' },
        { id: 'logs', name: '发送记录' },
      ],
    },
    {
      id: 'order',
      name: '交易设置',
      icon: 'ph:shopping-cart',
      children: [
        { id: 'settings', name: '订单设置' },
        { id: 'remind', name: '提醒设置' },
      ],
    },
    {
      id: 'payment',
      name: '支付设置',
      icon: 'ph:paypal-logo',
      children: [
        { id: 'wechat', name: '微信支付' },
        { id: 'alipay', name: '支付宝支付' },
      ],
    },
    {
      id: 'customer-service',
      name: '客服设置',
      icon: 'ph:headset',
      children: [
        { id: 'wechat', name: '微信小程序' },
        { id: 'h5', name: 'H5 端' },
      ],
    },
    {
      id: 'shipment',
      name: '配送设置',
      icon: 'ph:truck',
      children: [
        {
          id: 'express',
          name: '物流配送',
          children: [
            { id: 'index', name: '快递公司' },
            { id: 'freight', name: '运费设置' },
          ],
        },
        {
          id: 'in-store',
          name: '到店自提',
        },
        {
          id: 'city-delivery',
          name: '同城配送',
          children: [
            { id: 'index', name: '配送员' },
            { id: 'settings', name: '配送设置' },
          ],
        },
      ],
    },
    {
      id: 'areas',
      name: '地区设置',
      icon: 'ph:map-trifold',
    },
    {
      id: 'others',
      name: '其他设置',
      icon: 'ph:dots-three-circle',
      children: [
        { id: 'defaults', name: '默认图片' },
        { id: 'map', name: '地图设置' },
        { id: 'verify-code', name: '验证码设置' },
        { id: 'upload', name: '上传设置' },
      ],
    },
  ],
})
