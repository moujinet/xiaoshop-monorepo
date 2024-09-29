// --------------------------------
// 通知 - 类型
// --------------------------------

/**
 * 通知类型
 *
 * - `BUYER` 买家通知
 * - `SELLER` 商家通知
 */
export enum SystemNotificationType {
  BUYER = 1,
  SELLER,
}

// --------------------------------
// 通知 - 状态
// --------------------------------

/**
 * 通知状态
 *
 * - `UNREAD` 未读
 * - `READ` 已读
 */
export enum SystemNotificationStatus {
  UNREAD,
  READ,
}

// --------------------------------
// 通知 - 发送状态
// --------------------------------

/**
 * 通知发送状态
 *
 * - `SUCCESS` 发送成功
 * - `FAILED` 发送失败
 */
export enum SystemNotificationSendStatus {
  SUCCESS = 1,
  FAILED,
}

// --------------------------------
// 通知 - 发送通道
// --------------------------------

/**
 * 通知发送通道
 *
 * - `SYSTEM`: 系统通知
 * - `SMS`: 短信通知
 * - `WECHAT`: 微信通知
 */
export enum SystemNotificationChannel {
  SYSTEM = 1,
  SMS,
  WECHAT,
}

// --------------------------------
// 通知 - 场景
// --------------------------------

/**
 * 通知场景
 *
 * - `SYSTEM`: 系统通知
 * - `CONNECT`: 云链通知
 * - `ORDER`: 订单通知
 * - `AFTER_SALE`: 售后通知
 * - `PROMOTION`: 活动通知
 */
export enum SystemNotificationScene {
  SYSTEM = 1,
  CONNECT,
  ORDER,
  AFTER_SALE,
  PROMOTION,
}
