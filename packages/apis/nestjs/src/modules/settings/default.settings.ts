import type { ISettingsDict } from '@xiaoshop/schema'

export const DefaultSettings: ISettingsDict = {
  // 店铺设置 - 基本信息
  'store.name': 'XiaoShop',
  'store.logo': '',
  'store.tel': '',
  'store.enableWeapp': '1',
  'store.enableH5': '1',

  // 店铺设置 - 联系信息
  'store.contact': '云链小朔',
  'store.contactMobile': '',
  'store.contactPhone': '',
  'store.email': 'xiaos@mouji.net',
  'store.location': '[]',
  'store.address': '',
  'store.longitude': '',
  'store.latitude': '',

  // 其它 - 地图设置
  'map.key': '',
  'map.enableMobileLocation': '1',
  'map.mobileLocationExpire': '15',

  // 其它 - 验证码设置
  'verifyCode.enableOnAdminLogin': '1',
  'verifyCode.enableOnLogin': '1',
  'verifyCode.enableOnRegister': '1',
}
