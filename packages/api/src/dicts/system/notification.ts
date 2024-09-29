import {
  ColorName,
  type IDict,
  SystemNotificationChannel,
  SystemNotificationScene,
  SystemNotificationSendStatus,
  SystemNotificationStatus,
  SystemNotificationType,
} from '@xiaoshop/shared'

/**
 * 字典: 消息类型
 *
 * @see {@link SystemNotificationType}
 */
export const SYSTEM_NOTIFICATION_TYPES: IDict[] = [
  { value: '买家消息', key: SystemNotificationType.BUYER, color: ColorName.ORANGERED },
  { value: '商家消息', key: SystemNotificationType.SELLER, color: ColorName.ARCOBLUE },
]

/**
 * 字典: 消息状态
 *
 * @see {@link SystemNotificationStatus}
 */
export const SYSTEM_NOTIFICATION_STATUSES: IDict[] = [
  { value: '未读', key: SystemNotificationStatus.UNREAD, color: ColorName.ARCOBLUE },
  { value: '已读', key: SystemNotificationStatus.READ, color: ColorName.GRAY },
]

/**
 * 字典: 消息发送状态
 *
 * @see {@link SystemNotificationSendStatus}
 */
export const SYSTEM_NOTIFICATION_SEND_STATUSES: IDict[] = [
  { value: '发送成功', key: SystemNotificationSendStatus.SUCCESS, color: ColorName.GREEN },
  { value: '发送失败', key: SystemNotificationSendStatus.FAILED, color: ColorName.RED },
]

/**
 * 字典: 消息发送通道
 *
 * @see {@link SystemNotificationChannel}
 */
export const SYSTEM_NOTIFICATION_CHANNELS: IDict[] = [
  { value: '系统通知', key: SystemNotificationChannel.SYSTEM, color: ColorName.ARCOBLUE, icon: 'mingcute:chat-4' },
  { value: '短信通知', key: SystemNotificationChannel.SMS, color: ColorName.PURPLE, icon: 'mingcute:message-4' },
  { value: '微信通知', key: SystemNotificationChannel.WECHAT, color: ColorName.GREEN, icon: 'mingcute:wechat' },
]

/**
 * 字典: 消息场景
 *
 * @see {@link SystemNotificationScene}
 */
export const SYSTEM_NOTIFICATION_SCENES: IDict[] = [
  { value: '系统消息', key: SystemNotificationScene.SYSTEM, color: ColorName.ARCOBLUE, icon: 'mingcute:settings-3' },
  { value: '云链消息', key: SystemNotificationScene.CONNECT, color: ColorName.PURPLE, icon: 'mingcute:cloud' },
  { value: '订单消息', key: SystemNotificationScene.ORDER, color: ColorName.ORANGERED, icon: 'mingcute:shopping-cart-1' },
  { value: '售后消息', key: SystemNotificationScene.AFTER_SALE, color: ColorName.CYAN, icon: 'mingcute:bill-2' },
  { value: '营销消息', key: SystemNotificationScene.PROMOTION, color: ColorName.PINKPURPLE, icon: 'mingcute:gift' },
]
