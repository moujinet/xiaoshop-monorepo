import type {
  IMemberAccount,
  INotificationMessage,
  NotificationScene,
  NotificationScope,
  NotificationStatus,
} from '@xiaoshop/shared'
import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn } from 'typeorm'

@Entity('shop_notification_message', {
  comment: '系统消息通知表',
})
@Index('IDX_shop_notification_message', ['memberId', 'scope', 'scene', 'sentTime'])
export class NotificationMessage implements INotificationMessage {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number

  @Column({ name: 'member_id', type: 'int', unsigned: true, default: 0, comment: '接收会员 ID' })
  memberId: IMemberAccount['id']

  @Column({ type: 'tinyint', unsigned: true, default: 0, comment: '通知范围' })
  scope: NotificationScope

  @Column({ type: 'tinyint', unsigned: true, default: 0, comment: '消息场景' })
  scene: NotificationScene

  @Column({ type: 'tinyint', unsigned: true, default: 0, comment: '通知状态' })
  status: NotificationStatus

  @Column({ type: 'varchar', length: 32, nullable: false, default: '', comment: '消息标题' })
  title: string

  @Column({ type: 'varchar', length: 255, nullable: false, default: '', comment: '消息内容' })
  content: string

  @Column({ type: 'simple-json', default: null, comment: '附加数据' })
  extras: Record<string, any>

  @CreateDateColumn({ name: 'sent_time', update: false, type: 'datetime', default: null, comment: '发送时间' })
  sentTime: string
}
