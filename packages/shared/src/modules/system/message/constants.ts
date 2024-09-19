import { ColorName, type IDict } from '~/common'

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

/**
 * 字典: 消息类型
 *
 * @see {@link SystemMessageType}
 */
export const SYSTEM_MESSAGE_TYPES: IDict[] = [
  { value: '买家消息', key: SystemMessageType.BUYER, color: ColorName.ORANGERED },
  { value: '商家消息', key: SystemMessageType.SELLER, color: ColorName.ARCOBLUE },
]

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

/**
 * 字典: 消息状态
 *
 * @see {@link SystemMessageStatus}
 */
export const SYSTEM_MESSAGE_STATUSES: IDict[] = [
  { value: '未读', key: SystemMessageStatus.UNREAD, color: ColorName.ARCOBLUE },
  { value: '已读', key: SystemMessageStatus.READ, color: ColorName.GRAY },
]

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

/**
 * 字典: 消息发送状态
 *
 * @see {@link SystemMessageSendStatus}
 */
export const SYSTEM_MESSAGE_SEND_STATUSES: IDict[] = [
  { value: '发送成功', key: SystemMessageSendStatus.SUCCESS, color: ColorName.GREEN },
  { value: '发送失败', key: SystemMessageSendStatus.FAILED, color: ColorName.RED },
]

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

/**
 * 字典: 消息发送通道
 *
 * @see {@link SystemMessageChannel}
 */
export const SYSTEM_MESSAGE_CHANNELS: IDict[] = [
  { value: '系统通知', key: SystemMessageChannel.SYSTEM, color: ColorName.ARCOBLUE, icon: 'mingcute:chat-4' },
  { value: '短信通知', key: SystemMessageChannel.SMS, color: ColorName.PURPLE, icon: 'mingcute:message-4' },
  { value: '微信通知', key: SystemMessageChannel.WECHAT, color: ColorName.GREEN, icon: 'mingcute:wechat' },
]

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

/**
 * 字典: 消息场景
 *
 * @see {@link SystemMessageScene}
 */
export const SYSTEM_MESSAGE_SCENES: IDict[] = [
  { value: '系统消息', key: SystemMessageScene.SYSTEM, color: ColorName.ARCOBLUE, icon: 'mingcute:settings-3' },
  { value: '云链消息', key: SystemMessageScene.CONNECT, color: ColorName.PURPLE, icon: 'mingcute:cloud' },
  { value: '订单消息', key: SystemMessageScene.ORDER, color: ColorName.ORANGERED, icon: 'mingcute:shopping-cart-1' },
  { value: '售后消息', key: SystemMessageScene.AFTER_SALE, color: ColorName.CYAN, icon: 'mingcute:bill-2' },
  { value: '营销消息', key: SystemMessageScene.MARKETING, color: ColorName.PINKPURPLE, icon: 'mingcute:gift' },
]
