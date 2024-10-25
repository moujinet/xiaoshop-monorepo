import type {
  NotificationChannel,
  NotificationScene,
  NotificationSendStatus,
  NotificationType,
} from '@xiaoshop/shared'

import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn } from 'typeorm'

@Entity('notification_log', {
  comment: '消息发送日志',
})
@Index('IDX_notification_log', ['type', 'scene', 'channel', 'subscriber', 'status', 'sentTime'])
export class NotificationLogEntity {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number

  @Column({ type: 'tinyint', unsigned: true, default: 0, comment: '通知类型' })
  type: NotificationType

  @Column({ type: 'tinyint', unsigned: true, default: 0, comment: '通知场景' })
  scene: NotificationScene

  @Column({ type: 'tinyint', unsigned: true, default: 0, comment: '发送通道' })
  channel: NotificationChannel

  @Column({ type: 'varchar', length: 200, nullable: false, default: '', comment: '订阅者' })
  subscriber: string

  @Column({ type: 'varchar', length: 64, nullable: false, default: '', comment: '通知标题' })
  title: string

  @Column({ type: 'text', default: null, comment: '通知内容' })
  content: string

  @Column({ type: 'tinyint', unsigned: true, default: 0, comment: '发送状态' })
  status: NotificationSendStatus

  @Column({ type: 'varchar', length: 255, nullable: false, default: '', comment: '发送结果' })
  result: string

  @CreateDateColumn({ name: 'sent_time', type: 'datetime', default: null, update: false, comment: '发送时间' })
  sentTime: string
}
