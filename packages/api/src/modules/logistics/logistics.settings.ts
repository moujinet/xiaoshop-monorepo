import type { ISettingOptionMap } from '@xiaoshop/shared'

export const LogisticsSettings: ISettingOptionMap = {
  // 发货管理 - 发货设置
  'deliveryMode.enableExpress': '1',
  'deliveryMode.enableLocal': '0',
  'deliveryMode.enableSelf': '0',

  // 发货管理 - 快递查询
  'express.kd100.appKey': '',
  'express.kd100.customer': '',

  // 发货管理 - 自提设置
  'selfPickup.days': '[1, 2, 3, 4, 5, 6, 7]',
  'selfPickup.timeFrames': '[["9:00", "23:00"]]',
  'selfPickup.timeStep': '30',
}
