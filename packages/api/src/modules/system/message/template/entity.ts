import { Column, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { IMessageTemplateContent, MessageChannel, MessageScene, MessageType, YesOrNo } from '@xiaoshop/shared'

@Entity({
  name: 'system_message_template',
  comment: '系统消息模板表',
})
@Index('IDX_system_message_template', ['type', 'scene', 'channels', 'updatedTime'])
@Index('IDX_system_message_template_key', ['key', 'isEnabled'])
export class MessageTemplate {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number

  @Column({ type: 'varchar', length: 64, nullable: false, default: '', comment: '模板标识 (事件名)' })
  key: string

  @Column({ name: 'is_enabled', type: 'tinyint', unsigned: true, default: YesOrNo.YES, comment: '是否启用' })
  isEnabled: YesOrNo

  @Column({ type: 'tinyint', unsigned: true, default: MessageType.BUYER, comment: '消息类型' })
  type: MessageType

  @Column({ type: 'tinyint', unsigned: true, default: MessageScene.SYSTEM, comment: '消息场景' })
  scene: MessageScene

  @Column({ type: 'varchar', length: 32, nullable: false, default: '', comment: '模板名称' })
  name: string

  @Column({ type: 'varchar', length: 255, nullable: false, default: '', comment: '模板描述' })
  desc: string

  @Column({ type: 'simple-json', default: null, comment: '消息发送通道' })
  channels: MessageChannel[]

  @Column({ type: 'simple-json', default: null, comment: '消息模板内容' })
  contents: IMessageTemplateContent[]

  @UpdateDateColumn({ name: 'updated_time', type: 'datetime', default: null, comment: '更新时间' })
  updatedTime: string
}
