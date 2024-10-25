import {
  ColorName,
  type IDict,
  NotificationChannel,
  NotificationScene,
  NotificationSendStatus,
  NotificationStatus,
  NotificationType,
} from '@xiaoshop/shared'

/**
 * 消息类型 - 字典
 *
 * @see {@link NotificationType}
 */
export const NOTIFICATION_TYPES: IDict[] = [
  { value: '买家消息', key: NotificationType.BUYER, color: ColorName.ORANGERED },
  { value: '商家消息', key: NotificationType.SELLER, color: ColorName.ARCOBLUE },
]

/**
 * 消息状态 - 字典
 *
 * @see {@link NotificationStatus}
 */
export const NOTIFICATION_STATUSES: IDict[] = [
  { value: '未读', key: NotificationStatus.UNREAD, color: ColorName.ARCOBLUE },
  { value: '已读', key: NotificationStatus.READ, color: ColorName.GRAY },
]

/**
 * 消息场景 - 字典
 *
 * @see {@link NotificationScene}
 */
export const NOTIFICATION_SCENES: IDict[] = [
  { value: '系统消息', key: NotificationScene.SYSTEM, color: ColorName.ARCOBLUE, icon: 'mingcute:settings-3' },
  { value: '云链消息', key: NotificationScene.CONNECT, color: ColorName.PURPLE, icon: 'mingcute:cloud' },
  { value: '订单消息', key: NotificationScene.ORDER, color: ColorName.ORANGERED, icon: 'mingcute:shopping-cart-1' },
  { value: '售后消息', key: NotificationScene.AFTER_SALE, color: ColorName.CYAN, icon: 'mingcute:bill-2' },
  { value: '营销消息', key: NotificationScene.PROMOTION, color: ColorName.PINKPURPLE, icon: 'mingcute:gift' },
]

/**
 * 消息发送状态 - 字典
 *
 * @see {@link NotificationSendStatus}
 */
export const NOTIFICATION_SEND_STATUSES: IDict[] = [
  { value: '发送成功', key: NotificationSendStatus.SUCCESS, color: ColorName.GREEN },
  { value: '发送失败', key: NotificationSendStatus.FAILED, color: ColorName.RED },
]

/**
 * 消息发送通道 - 字典
 *
 * @see {@link NotificationChannel}
 */
export const NOTIFICATION_CHANNELS: IDict[] = [
  { value: '系统通知', key: NotificationChannel.SYSTEM, color: ColorName.ARCOBLUE, icon: 'mingcute:chat-4' },
  { value: '短信通知', key: NotificationChannel.SMS, color: ColorName.PURPLE, icon: 'mingcute:message-4' },
  { value: '微信通知', key: NotificationChannel.WECHAT, color: ColorName.GREEN, icon: 'mingcute:wechat' },
]
