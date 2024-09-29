import type {
  ISystemNotificationExtrasInfo,
  SystemNotificationScene,
  SystemNotificationStatus,
  SystemNotificationType,
} from '@xiaoshop/shared'

import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn } from 'typeorm'

@Entity({
  name: 'system_notification',
  comment: '系统通知表',
})
@Index('IDX_system_notification', ['receiverId', 'type', 'status', 'sentTime'])
export class SystemNotificationEntity {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number

  @Column({ name: 'receiver_id', type: 'int', unsigned: true, default: 0, comment: '通知用户 ID' })
  receiverId: number

  @Column({ type: 'tinyint', unsigned: true, default: 0, comment: '通知类型' })
  type: SystemNotificationType

  @Column({ type: 'tinyint', unsigned: true, default: 0, comment: '通知场景' })
  scene: SystemNotificationScene

  @Column({ type: 'tinyint', unsigned: true, default: 0, comment: '通知状态' })
  status: SystemNotificationStatus

  @Column({ type: 'varchar', length: 32, nullable: false, default: '', comment: '通知标题' })
  title: string

  @Column({ type: 'text', default: null, comment: '通知内容' })
  content: string

  @Column({ type: 'simple-json', default: null, comment: '附加数据' })
  extras: ISystemNotificationExtrasInfo

  @CreateDateColumn({ name: 'sent_time', type: 'datetime', default: null, update: false, comment: '发送时间' })
  sentTime: string
}
