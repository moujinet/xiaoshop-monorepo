import {
  NotificationChannel,
  NotificationScene,
  NotificationScope,
  NotificationStatus,
  YesOrNo,
} from '@xiaoshop/shared'

export const example = {
  scope: NotificationScope.BUYER,
  status: NotificationStatus.UNREAD,
  scene: NotificationScene.ORDER,
  channel: NotificationChannel.SYSTEM,
  template: {
    id: 1,
    key: 'order.created',
    enable: YesOrNo.NO,
    scene: NotificationScene.ORDER,
    name: '订单创建通知',
    desc: '订单创建通知',
  },
  sendTo: 'username',
  title: '订单创建通知',
  content: '订单创建通知',
  result: 'success',
}
