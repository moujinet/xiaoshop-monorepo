import type { IMemberAccount, IMemberAccountKey, IMemberAccountStatus } from '@xiaoshop/schema'
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm'

@Entity('shop_member_account', {
  comment: '会员账户表',
})
@Index('idx_shop_member_account', ['key', 'status'], { unique: true })
export class MemberAccount implements IMemberAccount {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true, primaryKeyConstraintName: 'pk_shop_member_token' })
  id: number

  @Column({ name: 'member_id', type: 'int', unsigned: true, default: 0, comment: '会员 ID' })
  memberId: number

  @Column({ type: 'varchar', length: 32, nullable: false, default: '', comment: '账户标识' })
  key: IMemberAccountKey

  @Column({ type: 'varchar', length: 32, nullable: false, default: '', comment: '账户状态' })
  status: IMemberAccountStatus

  @Column({ type: 'varchar', length: 32, nullable: false, default: '', comment: '账户名' })
  name: string

  @Column({ type: 'float', default: 0, comment: '账户值' })
  value: number
}
