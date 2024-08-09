import type { ISettingsDict } from '@xiaoshop/schema'

export const MemberSettings: ISettingsDict = {
  // 会员管理 - 登录注册
  'register.enableUsername': '1',
  'register.enableMobile': '1',
  'register.enableOAuth': '1',
  'register.enableBindingMobile': '1',
  'register.passwordLength': '6',
  'register.passwordStrong': '["number", "lower"]',
  'register.defaultAvatar': '',
  'register.defaultCardId': '1',

  // 会员管理 - 注销设置
  'logout.enableLogout': '1',
  'logout.enableAudit': '1',
}
