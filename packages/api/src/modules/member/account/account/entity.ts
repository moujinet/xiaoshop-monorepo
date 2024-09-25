import type { IMemberAccountKey, IMemberInfo } from '@xiaoshop/shared'

import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

import { Member } from '@/member/member/entity'

@Entity('member_account', {
  comment: '会员账户信息表',
})
@Index('IDX_member_account', ['memberId', 'key'])
export class MemberAccount {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number

  @Column({ name: 'member_id', type: 'int', unsigned: true, default: 0, comment: '会员 ID' })
  memberId: IMemberInfo['id']

  @ManyToOne(() => Member)
  @JoinColumn({ name: 'member_id' })
  member: Member

  @Column({ type: 'varchar', length: 32, nullable: false, default: '', comment: '账户标识' })
  key: IMemberAccountKey

  @Column({ type: 'float', unsigned: true, default: 0, comment: '账户值' })
  value: number
}
