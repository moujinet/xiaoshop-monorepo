import type {
  ISystemMessageExtrasInfo,
  SystemMessageScene,
  SystemMessageStatus,
  SystemMessageType,
} from '@xiaoshop/shared'

import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn } from 'typeorm'

@Entity({
  name: 'system_message',
  comment: '系统消息表',
})
@Index('IDX_system_message', ['receiverId', 'type', 'status', 'sentTime'])
export class SystemMessage {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number

  @Column({ name: 'receiver_id', type: 'int', unsigned: true, default: 0, comment: '接收用户 ID' })
  receiverId: number

  @Column({ type: 'tinyint', unsigned: true, default: 0, comment: '消息类型' })
  type: SystemMessageType

  @Column({ type: 'tinyint', unsigned: true, default: 0, comment: '消息场景' })
  scene: SystemMessageScene

  @Column({ type: 'tinyint', unsigned: true, default: 0, comment: '消息状态' })
  status: SystemMessageStatus

  @Column({ type: 'varchar', length: 32, nullable: false, default: '', comment: '消息标题' })
  title: string

  @Column({ type: 'text', default: null, comment: '消息内容' })
  content: string

  @Column({ type: 'simple-json', default: null, comment: '附加数据' })
  extras: ISystemMessageExtrasInfo

  @CreateDateColumn({ name: 'sent_time', type: 'datetime', default: null, update: false, comment: '发送时间' })
  sentTime: string
}
