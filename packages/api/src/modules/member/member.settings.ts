import type { ISettingOptionMap } from '@xiaoshop/shared'

export const MemberSettings: ISettingOptionMap = {
  // 登录注册
  'register.enableUsername': '1',
  'register.enableMobile': '1',
  'register.enableOAuth': '1',
  'register.enableBindingMobile': '1',
  'register.passwordLength': '6',
  'register.passwordStrong': '["number", "lower"]',
  'register.defaultAvatar': '',
  'register.defaultCardId': '1',

  // 注销设置
  'logout.enableLogout': '1',
  'logout.enableAudit': '1',

  // 积分规则
  'points.register': 'Y',
  'points.register.rule': '{"points": 100}',
  'points.order': 'Y',
  'points.order.rule': '{"perOrderRatio": 100}',
  'points.birthday': 'Y',
  'points.birthday.rule': '{"points": 500}',
  'points.signIn': 'Y',
  'points.signIn.rule': '{"points": 10, "perWeekRatio": 1.5, "perMonthRatio": 3}',
  'points.deduct': 'Y',
  'points.deduct.rule': '{"limit": 10000, "ratio": 10}',
}
