// --------------------------------
// 消息 - 类型
// --------------------------------

/**
 * 消息类型
 *
 * - `BUYER` 买家消息
 * - `SELLER` 商家消息
 */
export enum SystemMessageType {
  BUYER = 1,
  SELLER,
}

// --------------------------------
// 消息 - 状态
// --------------------------------

/**
 * 消息状态
 *
 * - `UNREAD` 未读
 * - `READ` 已读
 */
export enum SystemMessageStatus {
  UNREAD,
  READ,
}

// --------------------------------
// 消息 - 发送状态
// --------------------------------

/**
 * 消息发送状态
 *
 * - `SUCCESS` 发送成功
 * - `FAILED` 发送失败
 */
export enum SystemMessageSendStatus {
  SUCCESS = 1,
  FAILED,
}

// --------------------------------
// 消息 - 发送通道
// --------------------------------

/**
 * 消息发送通道
 *
 * - `SYSTEM`: 系统通知
 * - `SMS`: 短信通知
 * - `WECHAT`: 微信通知
 */
export enum SystemMessageChannel {
  SYSTEM = 1,
  SMS,
  WECHAT,
}

// --------------------------------
// 消息 - 场景
// --------------------------------

/**
 * 消息场景
 *
 * - `SYSTEM`: 系统消息
 * - `CONNECT`: 云链消息
 * - `ORDER`: 订单消息
 * - `AFTER_SALE`: 售后消息
 * - `MARKETING`: 营销消息
 */
export enum SystemMessageScene {
  SYSTEM = 1,
  CONNECT,
  ORDER,
  AFTER_SALE,
  MARKETING,
}
