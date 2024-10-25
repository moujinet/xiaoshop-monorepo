import type { NotificationType } from '@xiaoshop/shared'

import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm'

@Entity('notification_subscriber', {
  comment: '通知消息订阅者',
})
@Index('IDX_notification_subscriber', ['messageId', 'subscriberId'])
export class NotificationSubscriberEntity {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number

  @Column({ type: 'tinyint', unsigned: true, default: 0, comment: '通知消息类型' })
  type: NotificationType

  @Column({ name: 'message_id', type: 'int', default: 0, unsigned: true, comment: '通知消息 ID' })
  messageId: number

  @Column({ name: 'subscriber_id', type: 'int', default: 0, unsigned: true, comment: '订阅者 ID' })
  subscriberId: number
}
