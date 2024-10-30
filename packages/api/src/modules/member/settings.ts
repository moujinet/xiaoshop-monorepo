export default {
  // 默认值
  'defaults.avatar': '',
  'defaults.cardId': '1',

  // 登录注册
  'register.enableUsername': '1',
  'register.enableMobile': '1',
  'register.enableOAuth': '1',

  // 注销设置
  'unregister.enable': '1',
  'unregister.enableAudit': '1',

  // 安全设置
  'security.enableBindMobile': '1',
  'security.passwordLength': '6',
  'security.passwordStrength': '["number", "lower"]',
} as const
