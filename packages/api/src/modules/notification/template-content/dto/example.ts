import { NotificationChannel, NotificationScene, YesOrNo } from '@xiaoshop/shared'

export const example = {
  template: {
    id: 1,
    key: 'order.created',
    enable: YesOrNo.YES,
    scene: NotificationScene.ORDER,
    name: '订单创建通知',
    desc: '订单创建通知描述',
  },
  channel: NotificationChannel.SYSTEM,
  title: '订单创建通知',
  content: '订单创建通知内容',
}
