/**
 * Logistic Settings
 */
export default {
  // 物流跟踪
  'tracking.method': 'kd100',
  'tracking.appKey': '',
  'tracking.customer': '',

  // 自提设置
  'selfPickup.days': '[1, 2, 3, 4, 5, 6, 7]',
  'selfPickup.timeFrames': '[["9:00", "23:00"]]',
  'selfPickup.timeStep': '30',
} as const
