import type {
  INotificationExtrasInfo,
  NotificationScene,
  NotificationStatus,
  NotificationType,
} from '@xiaoshop/shared'

import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn } from 'typeorm'

@Entity('notification_inbox', {
  comment: '通知消息收件箱',
})
@Index('IDX_notification_inbox', ['subscriberId', 'type', 'status', 'sentTime'])
export class NotificationInboxEntity {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number

  @Column({ name: 'subscriber_id', type: 'int', unsigned: true, default: 0, comment: '订阅者 ID' })
  subscriberId: number

  @Column({ type: 'tinyint', unsigned: true, default: 0, comment: '通知类型' })
  type: NotificationType

  @Column({ type: 'tinyint', unsigned: true, default: 0, comment: '通知场景' })
  scene: NotificationScene

  @Column({ type: 'tinyint', unsigned: true, default: 0, comment: '通知状态' })
  status: NotificationStatus

  @Column({ type: 'varchar', length: 64, nullable: false, default: '', comment: '通知标题' })
  title: string

  @Column({ type: 'text', default: null, comment: '通知内容' })
  content: string

  @Column({ type: 'simple-json', default: null, comment: '通知附加数据' })
  extras: INotificationExtrasInfo

  @CreateDateColumn({ name: 'sent_time', type: 'datetime', default: null, update: false, comment: '发送时间' })
  sentTime: string
}
