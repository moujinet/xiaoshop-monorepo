import type {
  ISystemMessageExtrasInfo,
  ISystemMessageTemplateInfo,
  SystemMessageChannel,
  SystemMessageScene,
  SystemMessageSendStatus,
  SystemMessageType,
} from '@xiaoshop/shared'

import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

import { SystemMessageTemplate } from '../template/entity'

@Entity({
  name: 'system_message_log',
  comment: '消息发送日志信息',
})
@Index('IDX_system_message_log', ['type', 'scene', 'channel', 'templateId', 'receiver', 'status', 'sentTime'])
export class SystemMessageLog {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number

  @Column({ type: 'tinyint', unsigned: true, default: 0, comment: '消息类型' })
  type: SystemMessageType

  @Column({ type: 'tinyint', unsigned: true, default: 0, comment: '消息场景' })
  scene: SystemMessageScene

  @Column({ type: 'tinyint', unsigned: true, default: 0, comment: '发送通道' })
  channel: SystemMessageChannel

  @Column({ name: 'template_id', type: 'int', unsigned: true, default: 0, comment: '消息模板 ID' })
  templateId: ISystemMessageTemplateInfo['id']

  @ManyToOne(() => SystemMessageTemplate, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'template_id' })
  template: SystemMessageTemplate

  @Column({ type: 'varchar', length: 32, nullable: false, default: '', comment: '消息标题' })
  title: string

  @Column({ type: 'text', default: null, comment: '消息内容' })
  content: string

  @Column({ type: 'simple-json', default: null, comment: '附加数据' })
  extras: ISystemMessageExtrasInfo

  @Column({ type: 'varchar', length: 255, nullable: false, default: '', comment: '接收人' })
  receiver: string

  @Column({ type: 'tinyint', unsigned: true, default: 0, comment: '发送状态' })
  status: SystemMessageSendStatus

  @Column({ type: 'varchar', length: 255, nullable: false, default: '', comment: '发送结果' })
  result: string

  @CreateDateColumn({ name: 'sent_time', type: 'datetime', default: null, update: false, comment: '发送时间' })
  sentTime: string
}
