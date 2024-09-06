import type {
  IMemberAccount,
  INotificationLog,
  INotificationTemplate,
  NotificationChannel,
  NotificationScene,
  NotificationScope,
  NotificationSendStatus,
} from '@xiaoshop/shared'
import { Column, CreateDateColumn, Entity, Index, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { NotificationTemplate } from '@/notification/template/entity'

@Entity('shop_notification_log', {
  comment: '消息通知日志表',
})
@Index('IDX_shop_notification_log', ['scope', 'scene', 'memberId', 'templateId', 'createdTime'])
export class NotificationLog implements INotificationLog {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number

  @Column({ type: 'tinyint', unsigned: true, default: 0, comment: '通知范围' })
  scope: NotificationScope

  @Column({ type: 'tinyint', unsigned: true, default: 0, comment: '发送状态' })
  status: NotificationSendStatus

  @Column({ type: 'tinyint', unsigned: true, default: 0, comment: '消息场景' })
  scene: NotificationScene

  @Column({ type: 'tinyint', unsigned: true, default: 0, comment: '发送通道' })
  channel: NotificationChannel

  @Column({ name: 'member_id', type: 'int', unsigned: true, default: 0, comment: '会员 ID' })
  memberId: IMemberAccount['id']

  @Column({ name: 'template_id', type: 'int', unsigned: true, default: 0, comment: '消息模板 ID' })
  templateId: INotificationTemplate['id']

  @OneToOne(() => NotificationTemplate, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'template_id' })
  template: INotificationTemplate

  @Column({ name: 'send_to', type: 'varchar', length: 32, nullable: false, default: '', comment: '消息发送目标' })
  sendTo: string

  @Column({ type: 'varchar', length: 32, nullable: false, default: '', comment: '消息标题' })
  title: string

  @Column({ type: 'varchar', length: 255, nullable: false, default: '', comment: '消息内容' })
  content: string

  @Column({ type: 'varchar', length: 255, nullable: false, default: '', comment: '返回结果' })
  result: string

  @CreateDateColumn({ name: 'created_time', update: false, type: 'datetime', default: null, comment: '创建时间' })
  createdTime: string
}
