import { ColorName } from '~/common'

// --------------------------------
// 消息通知 - 范围
// --------------------------------

/**
 * 消息通知范围 - 枚举
 *
 * - `BUYER`: 买家
 * - `SELLER`: 商家
 */
export enum NotificationScope {
  BUYER = 1,
  SELLER,
}

/**
 * 消息通知范围 - 字典
 *
 * @see {@link NotificationScope}
 */
export const NOTIFICATION_SCOPES = [
  { label: '买家', value: NotificationScope.BUYER, color: ColorName.ORANGERED },
  { label: '商家', value: NotificationScope.SELLER, color: ColorName.PURPLE },
]

// --------------------------------
// 消息通知 - 状态
// --------------------------------

/**
 * 消息通知状态 - 枚举
 *
 * - `UNREAD`: 未读
 * - `READ`: 已读
 */
export enum NotificationStatus {
  UNREAD,
  READ,
}

/**
 * 消息通知状态 - 字典
 *
 * @see {@link NotificationStatus}
 */
export const NOTIFICATION_STATUSES = [
  { label: '未读', value: NotificationStatus.UNREAD, color: ColorName.ARCOBLUE },
  { label: '已读', value: NotificationStatus.READ, color: ColorName.GRAY },
]

// --------------------------------
// 消息通知 - 发送状态
// --------------------------------

/**
 * 消息通知发送状态 - 枚举
 *
 * - `SUCCESS`: 发送成功
 * - `FAILED`: 发送失败
 */
export enum NotificationSendStatus {
  SUCCESS = 1,
  FAILED,
}

/**
 * 消息通知发送状态 - 字典
 *
 * @see {@link NotificationSendStatus}
 */
export const NOTIFICATION_SEND_STATUSES = [
  { label: '发送成功', value: NotificationSendStatus.SUCCESS, color: ColorName.GREEN },
  { label: '发送失败', value: NotificationSendStatus.FAILED, color: ColorName.RED },
]

// --------------------------------
// 消息通知 - 发送通道
// --------------------------------

/**
 * 消息通知发送通道 - 枚举
 *
 * - `SYSTEM`: 系统通知
 * - `SMS`: 短信通知
 * - `WECHAT_MP`: 微信小程序
 * - `WECHAT_OA`: 微信公众号
 */
export enum NotificationChannel {
  SYSTEM = 1,
  SMS,
  WECHAT_MP,
  WECHAT_OA,
}

/**
 * 消息通知发送通道 - 字典
 *
 * @see {@link NotificationChannel}
 */
export const NOTIFICATION_CHANNELS = [
  { label: '系统通知', value: NotificationChannel.SYSTEM, color: ColorName.ARCOBLUE, icon: 'mingcute:chat-4' },
  { label: '短信通知', value: NotificationChannel.SMS, color: ColorName.CYAN, icon: 'mingcute:message-4' },
  { label: '微信小程序', value: NotificationChannel.WECHAT_MP, color: ColorName.GRAY, icon: 'mingcute:wechat-miniprogram' },
  { label: '微信公众号', value: NotificationChannel.WECHAT_OA, color: ColorName.GREEN, icon: 'mingcute:wechat' },
]

// --------------------------------
// 消息通知 - 场景
// --------------------------------

/**
 * 消息通知场景 - 枚举
 *
 * - `SYSTEM`: 系统
 * - `ORDER`: 订单
 * - `PAYMENT`: 支付
 * - `LOGISTICS`: 物流
 * - `MARKETING`: 营销
 * - `PRODUCT`: 商品
 * - `MEMBER`: 会员
 */
export enum NotificationScene {
  ORDER,
  PAYMENT,
  LOGISTICS,
  MARKETING,
  PRODUCT,
  MEMBER,
}

/**
 * 消息通知场景 - 字典
 *
 * @see {@link NotificationScene}
 */
export const NOTIFICATION_SCENES = [
  { label: '订单', value: NotificationScene.ORDER, color: ColorName.ARCOBLUE, icon: 'mingcute:shopping-cart-1' },
  { label: '支付', value: NotificationScene.PAYMENT, color: ColorName.GREEN, icon: 'mingcute:card-pay' },
  { label: '物流', value: NotificationScene.LOGISTICS, color: ColorName.ORANGERED, icon: 'mingcute:truck' },
  { label: '营销', value: NotificationScene.MARKETING, color: ColorName.PINKPURPLE, icon: 'mingcute:gift-2' },
  { label: '商品', value: NotificationScene.PRODUCT, color: ColorName.GRAY, icon: 'mingcute:box' },
  { label: '会员', value: NotificationScene.MEMBER, color: ColorName.GOLD, icon: 'mingcute:user-3' },
]
