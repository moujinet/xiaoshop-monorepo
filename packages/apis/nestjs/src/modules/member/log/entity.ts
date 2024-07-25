import type { IMemberInfo, IMemberLog, IMemberLogExtra, IMemberLogType, IMemberSource } from '@xiaoshop/schema'
import { Column, CreateDateColumn, Entity, Index, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Member } from '@/member/account/entities/profile.entity'

@Entity('shop_member_log', {
  comment: '会员日志表',
  orderBy: {
    createdTime: 'DESC',
  },
})
@Index('idx_shop_member_log', ['type', 'source', 'action'], { unique: true })
export class MemberLog implements IMemberLog {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true, primaryKeyConstraintName: 'pk_shop_member_log' })
  id: number

  @Column({ type: 'varchar', length: 32, nullable: false, default: '', comment: '日志类型' })
  type: IMemberLogType

  @Column({ type: 'varchar', length: 32, nullable: false, default: '', comment: '日志来源' })
  source: IMemberSource

  @Column({ type: 'varchar', length: 32, nullable: false, default: '', comment: '日志操作' })
  action: string

  @Column({ type: 'text', default: null, comment: '日志内容' })
  content: string

  @Column({ type: 'simple-json', default: null, comment: '额外信息' })
  extra: IMemberLogExtra

  @CreateDateColumn({ name: 'created_time', update: false, type: 'datetime', default: null, comment: '创建时间' })
  createdTime: string

  @OneToOne(() => Member, { createForeignKeyConstraints: false })
  @JoinColumn()
  member: IMemberInfo
}
