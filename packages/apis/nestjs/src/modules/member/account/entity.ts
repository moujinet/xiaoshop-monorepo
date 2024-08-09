import type {
  IMember,
  IMemberAccount,
  IMemberAccountKey,
} from '@xiaoshop/schema'
import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Member } from '@/member/profile/entity'

@Entity('shop_member_account', {
  comment: '会员账户表',
})
@Index('IDX_shop_member_account', ['memberId', 'key'], { unique: true })
export class MemberAccount implements IMemberAccount {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true, primaryKeyConstraintName: 'PK_shop_member_account' })
  id: number

  @Column({ name: 'member_id', type: 'int', unsigned: true, default: 0, comment: '会员 ID' })
  memberId: number

  @Column({ type: 'varchar', length: 32, nullable: false, default: '', comment: '账户标识' })
  key: IMemberAccountKey

  @Column({ type: 'varchar', length: 32, nullable: false, default: '', comment: '账户名' })
  name: string

  @Column({ type: 'float', unsigned: true, default: 0, comment: '账户值' })
  value: number

  @ManyToOne(() => Member, member => member.account, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'member_id' })
  member: IMember
}
