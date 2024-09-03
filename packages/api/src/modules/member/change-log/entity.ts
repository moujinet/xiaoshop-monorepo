import type {
  IMemberAccount,
  IMemberAccountChangeLog,
  IMemberAccountKeys,
  MemberAccountChangeType,
} from '@xiaoshop/shared'
import { Column, CreateDateColumn, Entity, Index, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { MemberAccount } from '@/member/account/entity'

@Entity('shop_member_account_change', {
  comment: '会员账户变更日志表',
})
@Index('IDX_shop_member_account_change', ['memberId', 'createdTime'])
export class MemberAccountChangeLog implements IMemberAccountChangeLog {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number

  @Column({ name: 'member_id', type: 'int', unsigned: true, default: 0, comment: '会员 ID' })
  memberId: number

  @OneToOne(() => MemberAccount, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'member_id' })
  member: IMemberAccount

  @Column({ type: 'varchar', length: 32, nullable: false, default: '', comment: '变更账户' })
  key: IMemberAccountKeys

  @Column({ type: 'tinyint', unsigned: true, default: 0, comment: '变更类型' })
  type: MemberAccountChangeType

  @Column({ type: 'int', unsigned: true, default: 0, comment: '变更值' })
  value: number

  @Column({ type: 'varchar', length: 255, nullable: false, default: '', comment: '变更原因' })
  reason: string

  @CreateDateColumn({ name: 'created_time', update: false, type: 'datetime', default: null, comment: '创建时间' })
  createdTime: string
}
