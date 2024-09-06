import type {
  INotificationTemplate,
  INotificationTemplateContentInfo,
  NotificationChannel,
  NotificationScene,
  NotificationScope,
  YesOrNo,
} from '@xiaoshop/shared'
import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { NotificationTemplateContent } from '@/notification/template-content/entity'

@Entity('shop_notification_template', {
  comment: '消息通知模板表',
})
@Index('IDX_shop_notification_template', ['scope', 'scene'])
@Index('IDX_shop_notification_template_key', ['key', 'enable'])
export class NotificationTemplate implements INotificationTemplate {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number

  @Column({ type: 'varchar', length: 255, nullable: false, default: '', comment: '消息模板标识' })
  key: string

  @Column({ type: 'tinyint', unsigned: true, default: 0, comment: '启用状态' })
  enable: YesOrNo

  @Column({ type: 'tinyint', unsigned: true, default: 0, comment: '通知范围' })
  scope: NotificationScope

  @Column({ type: 'tinyint', unsigned: true, default: 0, comment: '消息场景' })
  scene: NotificationScene

  @Column({ type: 'simple-json', default: null, comment: '发送通道' })
  channels: NotificationChannel[]

  @Column({ type: 'varchar', length: 32, nullable: false, default: '', comment: '模板名称' })
  name: string

  @Column({ type: 'varchar', length: 255, nullable: false, default: '', comment: '模板描述' })
  desc: string

  @OneToMany(() => NotificationTemplateContent, content => content.template, { createForeignKeyConstraints: false })
  contents: INotificationTemplateContentInfo[]

  @UpdateDateColumn({ name: 'updated_time', type: 'datetime', default: null, comment: '更新时间' })
  updatedTime: string
}
