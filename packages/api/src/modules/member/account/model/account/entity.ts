import type { IMemberAccountKey } from '@xiaoshop/shared'

import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Relation } from 'typeorm'

import { MemberProfileEntity } from '@/member/account/model/profile/entity'

@Entity('member_account', {
  comment: '会员账户信息',
})
@Index('IDX_member_account', ['memberId', 'key'])
export class MemberAccountEntity {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number

  @Column({ name: 'member_id', type: 'int', unsigned: true, default: 0, comment: '会员 ID' })
  memberId: number

  @ManyToOne(() => MemberProfileEntity)
  @JoinColumn({ name: 'member_id' })
  member: Relation<MemberProfileEntity>

  @Column({ type: 'varchar', length: 32, nullable: false, default: '', comment: '会员账户标识' })
  key: IMemberAccountKey

  @Column({ type: 'float', precision: 10, scale: 2, unsigned: true, default: 0, comment: '会员账户值' })
  value: number
}
