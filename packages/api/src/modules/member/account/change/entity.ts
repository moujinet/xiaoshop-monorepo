import type { IMemberAccountKey, IMemberInfo, MemberAccountChangeMethod } from '@xiaoshop/shared'

import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn } from 'typeorm'

@Entity('member_account_change', {
  comment: '会员账户变更信息表',
})
@Index('IDX_member_account_change', ['memberId', 'key'])
export class MemberAccountChange {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number

  @Column({ name: 'member_id', type: 'int', unsigned: true, default: 0, comment: '会员 ID' })
  memberId: IMemberInfo['id']

  @Column({ type: 'varchar', length: 32, nullable: false, default: '', comment: '账户标识' })
  key: IMemberAccountKey

  @Column({ type: 'tinyint', unsigned: true, default: 0, comment: '账户标识' })
  method: MemberAccountChangeMethod

  @Column({ type: 'float', unsigned: true, default: 0, comment: '变更值' })
  value: number

  @Column({ type: 'varchar', length: 255, nullable: false, default: '', comment: '变更原因' })
  reason: string

  @CreateDateColumn({ name: 'created_time', type: 'datetime', default: null, comment: '变更时间' })
  createdTime: string
}
