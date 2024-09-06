import {
  NotificationScene,
  NotificationScope,
  NotificationSendStatus,
  NotificationStatus,
} from '@xiaoshop/shared'

export const example = {
  scope: NotificationScope.BUYER,
  status: NotificationStatus.UNREAD,
  sendStatus: NotificationSendStatus.SUCCESS,
  scene: NotificationScene.ORDER,
  title: '消息通知标题',
  content: '消息通知内容',
  extras: {
    key: 'value',
  },
}
