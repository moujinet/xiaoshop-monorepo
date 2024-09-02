import type { ISettingOptionMap } from '@xiaoshop/shared'

export const ProductSettings: ISettingOptionMap = {
  // 商品管理 - 显示设置
  'preference.enableInventory': '1',
  'preference.enableSales': '1',
  'preference.enableOriginalPrice': '1',

  // 商品管理 - 默认值
  'default.image': '',
  'default.deliveryMethods': '["express"]',
  'default.earlyWarning': '',
  'default.unit': '',

  // 商品管理 - 采集设置
  'crawler.apiKey': '',
}
