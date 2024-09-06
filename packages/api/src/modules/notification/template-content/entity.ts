import type {
  INotificationTemplate,
  INotificationTemplateContent,
  INotificationTemplateInfo,
  NotificationChannel,
} from '@xiaoshop/shared'
import { Column, Entity, Index, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { NotificationTemplate } from '@/notification/template/entity'

@Entity('shop_notification_template_content', {
  comment: '消息通知模板内容表',
})
@Index('IDX_shop_notification_template_content', ['templateId'])
export class NotificationTemplateContent implements INotificationTemplateContent {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number

  @Column({ name: 'template_id', type: 'int', unsigned: true, default: 0, comment: '消息模板 ID' })
  templateId: INotificationTemplate['id']

  @OneToOne(() => NotificationTemplate, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'template_id' })
  template: INotificationTemplateInfo

  @Column({ type: 'tinyint', unsigned: true, default: 0, comment: '消息发送通道' })
  channel: NotificationChannel

  @Column({ type: 'varchar', length: 32, nullable: false, default: '', comment: '消息标题' })
  title: string

  @Column({ type: 'text', default: null, comment: '消息内容' })
  content: string

  @UpdateDateColumn({ name: 'updated_time', type: 'datetime', default: null, comment: '更新时间' })
  updatedTime: string
}
