import type {
  INotificationMessageContent,
  NotificationChannel,
  NotificationScene,
  NotificationType,
  YesOrNo,
} from '@xiaoshop/shared'

import { Column, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity('notification_message', {
  comment: '通知消息模板',
})
@Index('IDX_notification_message', ['isEnabled', 'listenTo', 'type', 'scene'])
export class NotificationMessageEntity {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number

  @Column({ name: 'is_enabled', type: 'tinyint', unsigned: true, default: 0, comment: '是否启用' })
  isEnabled: YesOrNo

  @Column({ name: 'listen_to', type: 'varchar', length: 64, nullable: false, default: '', comment: '触发事件' })
  listenTo: string

  @Column({ type: 'tinyint', unsigned: true, default: 0, comment: '通知类型' })
  type: NotificationType

  @Column({ type: 'tinyint', unsigned: true, default: 0, comment: '通知场景' })
  scene: NotificationScene

  @Column({ type: 'varchar', length: 32, nullable: false, default: '', comment: '通知名称' })
  name: string

  @Column({ type: 'varchar', length: 200, nullable: false, default: '', comment: '通知描述' })
  desc: string

  @Column({ type: 'simple-array', default: null, comment: '通知发送通道' })
  channels: NotificationChannel[]

  @Column({ type: 'simple-json', default: null, comment: '通知模板内容' })
  contents: INotificationMessageContent[]

  @UpdateDateColumn({ name: 'updated_time', type: 'datetime', default: null, comment: '更新时间' })
  updatedTime: string
}
