import type {
  ISystemNotificationExtrasInfo,
  ISystemNotificationTemplateInfo,
  SystemNotificationChannel,
  SystemNotificationScene,
  SystemNotificationSendStatus,
  SystemNotificationType,
} from '@xiaoshop/shared'

import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

import { SystemNotificationTemplateEntity } from '../template/entity'

@Entity({
  name: 'system_notification_log',
  comment: '通知发送日志信息',
})
@Index('IDX_system_notification_log', ['type', 'scene', 'channel', 'templateId', 'sendTo', 'status', 'sentTime'])
export class SystemNotificationLogEntity {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number

  @Column({ name: 'template_id', type: 'int', unsigned: true, default: 0, comment: '通知模板 ID' })
  templateId: ISystemNotificationTemplateInfo['id']

  @ManyToOne(() => SystemNotificationTemplateEntity, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'template_id' })
  template: SystemNotificationTemplateEntity

  @Column({ type: 'tinyint', unsigned: true, default: 0, comment: '通知类型' })
  type: SystemNotificationType

  @Column({ type: 'tinyint', unsigned: true, default: 0, comment: '通知场景' })
  scene: SystemNotificationScene

  @Column({ type: 'tinyint', unsigned: true, default: 0, comment: '发送通道' })
  channel: SystemNotificationChannel

  @Column({ type: 'varchar', length: 32, nullable: false, default: '', comment: '通知标题' })
  title: string

  @Column({ type: 'text', default: null, comment: '通知内容' })
  content: string

  @Column({ type: 'simple-json', default: null, comment: '附加数据' })
  extras: ISystemNotificationExtrasInfo

  @Column({ name: 'send_to', type: 'varchar', length: 255, nullable: false, default: '', comment: '接收人' })
  sendTo: string

  @Column({ type: 'tinyint', unsigned: true, default: 0, comment: '发送状态' })
  status: SystemNotificationSendStatus

  @Column({ type: 'varchar', length: 255, nullable: false, default: '', comment: '发送结果' })
  result: string

  @CreateDateColumn({ name: 'sent_time', type: 'datetime', default: null, update: false, comment: '发送时间' })
  sentTime: string
}
