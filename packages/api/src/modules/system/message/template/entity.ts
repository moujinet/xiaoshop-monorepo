import { Column, Entity, Index, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import {
  type ISystemMessageTemplateContent,
  type SystemMessageChannel,
  SystemMessageScene,
  SystemMessageType,
  YesOrNo,
} from '@xiaoshop/shared'

import { SystemUser } from '@/system/auth/user/entity'

@Entity({
  name: 'system_message_template',
  comment: '系统消息模板表',
})
@Index('IDX_system_message_template', ['type', 'scene', 'updatedTime'])
@Index('IDX_system_message_template_key', ['key', 'isEnabled'])
export class SystemMessageTemplate {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number

  @Column({ type: 'varchar', length: 64, nullable: false, default: '', comment: '模板标识 (同事件名)' })
  key: string

  @Column({ name: 'is_enabled', type: 'tinyint', unsigned: true, default: YesOrNo.YES, comment: '是否启用' })
  isEnabled: YesOrNo

  @Column({ type: 'tinyint', unsigned: true, default: 0, comment: '消息类型' })
  type: SystemMessageType

  @Column({ type: 'tinyint', unsigned: true, default: 0, comment: '消息场景' })
  scene: SystemMessageScene

  @Column({ type: 'varchar', length: 32, nullable: false, default: '', comment: '模板名称' })
  name: string

  @Column({ type: 'varchar', length: 255, nullable: false, default: '', comment: '模板描述' })
  desc: string

  @Column({ type: 'simple-json', default: null, comment: '消息发送通道' })
  channels: SystemMessageChannel[]

  @Column({ type: 'simple-json', default: null, comment: '消息模板内容' })
  contents: ISystemMessageTemplateContent[]

  @ManyToMany(() => SystemUser, { cascade: true, createForeignKeyConstraints: false })
  @JoinTable({ name: 'system_message_template_subscribers', joinColumn: { name: 'template_id' }, inverseJoinColumn: { name: 'user_id' } })
  subscribers: SystemUser[]

  @UpdateDateColumn({ name: 'updated_time', type: 'datetime', default: null, comment: '更新时间' })
  updatedTime: string
}
