import { MessageScene, MessageStatus } from '@xiaoshop/shared'
import { Column, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity({
  name: 'system_message_notice',
  comment: '系统消息通知表',
})
@Index('IDX_system_message_notice', ['scene', 'status', 'sentTime'])
export class MessageNotice {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number

  @Column({ type: 'tinyint', unsigned: true, default: MessageScene.SYSTEM, comment: '消息场景' })
  scene: MessageScene

  @Column({ type: 'tinyint', unsigned: true, default: MessageStatus.UNREAD, comment: '通知状态' })
  status: MessageStatus

  @Column({ type: 'varchar', length: 32, nullable: false, default: '', comment: '通知标题' })
  title: string

  @Column({ type: 'text', default: null, comment: '通知内容' })
  content: string

  @Column({ type: 'simple-json', default: null, comment: '附加数据' })
  extras: Record<string, any>

  @UpdateDateColumn({ name: 'sent_time', type: 'datetime', default: null, comment: '发送时间' })
  sentTime: string
}
