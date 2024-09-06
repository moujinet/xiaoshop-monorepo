import {
  NotificationChannel,
  NotificationScene,
  NotificationScope,
  YesOrNo,
} from '@xiaoshop/shared'

export const example = {
  key: 'order.created',
  enable: YesOrNo.YES,
  scope: NotificationScope.BUYER,
  scene: NotificationScene.ORDER,
  channels: [NotificationChannel.SYSTEM],
  name: '订单创建通知',
  desc: '订单创建通知描述',
  contents: [
    {
      id: 1,
      channel: NotificationChannel.SYSTEM,
      title: '订单创建通知',
      content: '订单创建通知内容',
    },
  ],
  createdTime: '2022-01-01 00:00:00',
  updatedTime: '2022-01-01 00:00:00',
}
