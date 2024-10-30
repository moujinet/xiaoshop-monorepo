import type { MemberUnregisterStatus } from '@xiaoshop/shared'

import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn } from 'typeorm'

@Entity('member_unregister', {
  comment: '会员注销申请',
})
@Index('IDX_member_unregister', ['status', 'username', 'nickname', 'mobile', 'applyTime'])
export class MemberUnregisterEntity {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number

  @Column({ name: 'member_id', type: 'int', unsigned: true, unique: true, default: 0, comment: '会员 ID' })
  memberId: number

  @Column({ type: 'varchar', length: 64, nullable: false, default: '', comment: '会员账号' })
  username: string

  @Column({ type: 'varchar', length: 32, nullable: false, default: '', comment: '会员昵称' })
  nickname: string

  @Column({ type: 'varchar', length: 16, nullable: false, default: '', comment: '会员手机号' })
  mobile: string

  @Column({ type: 'tinyint', unsigned: true, default: 0, comment: '注销状态' })
  status: MemberUnregisterStatus

  @Column({ type: 'varchar', length: 200, nullable: false, default: '', comment: '注销原因' })
  reason: string

  @Column({ name: 'audit_reason', type: 'varchar', length: 200, nullable: false, default: '', comment: '审核原因' })
  auditReason: string

  @CreateDateColumn({ name: 'apply_time', type: 'datetime', default: null, comment: '申请时间' })
  applyTime: string

  @Column({ name: 'audit_time', type: 'datetime', default: null, comment: '审核时间' })
  auditTime: string

  @Column({ name: 'unregister_time', type: 'datetime', default: null, comment: '注销时间' })
  unregisterTime: string
}
