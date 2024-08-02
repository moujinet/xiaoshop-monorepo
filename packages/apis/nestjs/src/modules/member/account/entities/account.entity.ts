import {
  type IMember,
  type IMemberAccount,
  type IMemberAccountKey,
  type IMemberAccountStatus,
  MemberAccountStatus,
} from '@xiaoshop/schema'
import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Member } from '@/member/account/entities'

@Entity('shop_member_account', {
  comment: '会员账户表',
})
@Index('idx_shop_member_account', ['status', 'key'])
export class MemberAccount implements IMemberAccount {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true, primaryKeyConstraintName: 'pk_shop_member_account' })
  id: number

  @Column({ type: 'varchar', length: 32, nullable: false, default: '', comment: '账户标识' })
  key: IMemberAccountKey

  @Column({ type: 'varchar', length: 32, nullable: false, default: MemberAccountStatus.ENABLE, comment: '账户状态' })
  status: IMemberAccountStatus

  @Column({ type: 'varchar', length: 32, nullable: false, default: '', comment: '账户名' })
  name: string

  @Column({ type: 'float', default: 0, comment: '账户值' })
  value: number

  @ManyToOne(() => Member, member => member.account, { createForeignKeyConstraints: false })
  @JoinColumn()
  member: IMember
}
