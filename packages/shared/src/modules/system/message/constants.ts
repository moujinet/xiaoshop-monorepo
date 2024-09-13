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
export enum MessageType {
  BUYER = 1,
  SELLER,
}

/**
 * 字典: 消息类型
 *
 * @see {@link MessageType}
 */
export const MESSAGE_TYPES: IDict[] = [
  { value: '买家消息', key: MessageType.BUYER, color: ColorName.ORANGERED },
  { value: '商家消息', key: MessageType.SELLER, color: ColorName.ARCOBLUE },
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
export enum MessageStatus {
  UNREAD,
  READ,
}

/**
 * 字典: 消息状态
 *
 * @see {@link MessageStatus}
 */
export const MESSAGE_STATUSES: IDict[] = [
  { value: '未读', key: MessageStatus.UNREAD, color: ColorName.ARCOBLUE },
  { value: '已读', key: MessageStatus.READ, color: ColorName.GRAY },
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
export enum MessageSendStatus {
  SUCCESS = 1,
  FAILED,
}

/**
 * 字典: 消息发送状态
 *
 * @see {@link MessageSendStatus}
 */
export const MESSAGE_SEND_STATUSES: IDict[] = [
  { value: '发送成功', key: MessageSendStatus.SUCCESS, color: ColorName.GREEN },
  { value: '发送失败', key: MessageSendStatus.FAILED, color: ColorName.RED },
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
export enum MessageChannel {
  SYSTEM = 1,
  SMS,
  WECHAT,
}

/**
 * 字典: 消息发送通道
 *
 * @see {@link MessageChannel}
 */
export const MESSAGE_CHANNELS: IDict[] = [
  { value: '系统通知', key: MessageChannel.SYSTEM, color: ColorName.ARCOBLUE, icon: 'mingcute:chat-4' },
  { value: '短信通知', key: MessageChannel.SMS, color: ColorName.PURPLE, icon: 'mingcute:message-4' },
  { value: '微信通知', key: MessageChannel.WECHAT, color: ColorName.GREEN, icon: 'mingcute:wechat' },
]

// --------------------------------
// 消息 - 场景
// --------------------------------

/**
 * 消息场景
 *
 * - `SYSTEM`: 系统消息
 * - `ORDER`: 订单消息
 * - `PAYMENT`: 支付消息
 * - `LOGISTICS`: 物流消息
 * - `AFTER_SALE`: 售后消息
 * - `MARKETING`: 营销消息
 * - `PRODUCT`: 商品消息
 * - `MEMBER`: 会员消息
 */
export enum MessageScene {
  SYSTEM = 1,
  ORDER,
  PAYMENT,
  LOGISTICS,
  AFTER_SALE,
  MARKETING,
  PRODUCT,
  MEMBER,
}

/**
 * 字典: 消息场景
 *
 * @see {@link MessageScene}
 */
export const MESSAGE_SCENES: IDict[] = [
  { value: '系统消息', key: MessageScene.SYSTEM, color: ColorName.ARCOBLUE, icon: 'mingcute:settings-3' },
  { value: '订单消息', key: MessageScene.ORDER, color: ColorName.ORANGERED, icon: 'mingcute:shopping-cart-1' },
  { value: '支付消息', key: MessageScene.PAYMENT, color: ColorName.GREEN, icon: 'mingcute:wechat-pay' },
  { value: '物流消息', key: MessageScene.LOGISTICS, color: ColorName.PURPLE, icon: 'mingcute:truck' },
  { value: '售后消息', key: MessageScene.AFTER_SALE, color: ColorName.CYAN, icon: 'mingcute:bill-2' },
  { value: '营销消息', key: MessageScene.MARKETING, color: ColorName.PINKPURPLE, icon: 'mingcute:gift' },
  { value: '商品消息', key: MessageScene.PRODUCT, color: ColorName.BLUE, icon: 'mingcute:package-2' },
  { value: '会员消息', key: MessageScene.MEMBER, color: ColorName.LIME, icon: 'mingcute:user-3' },
]
