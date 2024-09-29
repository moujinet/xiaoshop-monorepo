import type {
  ISystemNotificationTemplateContent,
  SystemNotificationChannel,
  SystemNotificationScene,
  SystemNotificationType,
  YesOrNo,
} from '@xiaoshop/shared'

import { Column, Entity, Index, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

import { SystemUserEntity } from '@/system/auth/user/entity'

@Entity({
  name: 'system_notification_template',
  comment: '系统通知模板表',
})
@Index('IDX_system_notification_template', ['type', 'scene', 'updatedTime'])
@Index('IDX_system_notification_template_subscribe', ['isEnabled', 'trigger'])
export class SystemNotificationTemplateEntity {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number

  @Column({ name: 'is_enabled', type: 'tinyint', unsigned: true, default: 0, comment: '是否启用' })
  isEnabled: YesOrNo

  @Column({ type: 'varchar', length: 64, nullable: false, default: '', comment: '触发事件' })
  trigger: string

  @Column({ type: 'tinyint', unsigned: true, default: 0, comment: '通知类型' })
  type: SystemNotificationType

  @Column({ type: 'tinyint', unsigned: true, default: 0, comment: '通知场景' })
  scene: SystemNotificationScene

  @Column({ type: 'varchar', length: 32, nullable: false, default: '', comment: '模板名称' })
  name: string

  @Column({ type: 'varchar', length: 255, nullable: false, default: '', comment: '模板描述' })
  desc: string

  @Column({ type: 'simple-array', default: null, comment: '通知发送通道' })
  channels: SystemNotificationChannel[]

  @Column({ type: 'simple-json', default: null, comment: '通知模板内容' })
  contents: ISystemNotificationTemplateContent[]

  @ManyToMany(() => SystemUserEntity, { cascade: true, createForeignKeyConstraints: false })
  @JoinTable({ name: 'system_notification_template_subscribers', joinColumn: { name: 'template_id' }, inverseJoinColumn: { name: 'user_id' } })
  subscribers: SystemUserEntity[]

  @UpdateDateColumn({ name: 'updated_time', type: 'datetime', default: null, comment: '更新时间' })
  updatedTime: string
}
