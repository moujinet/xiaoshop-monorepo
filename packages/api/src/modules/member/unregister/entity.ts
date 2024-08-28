import {
  type IMemberSource,
  type IMemberUnregister,
  type IMemberUnregisterStatus,
  MemberSource,
  MemberUnregisterStatus,
} from '@xiaoshop/shared'
import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn } from 'typeorm'

@Entity('shop_member_unregister', {
  comment: '会员注销申请表',
})
@Index('IDX_shop_member_unregister', ['createdTime'])
@Index('IDX_shop_member_unregister_member', ['memberId', 'createdTime'])
export class MemberUnregister implements IMemberUnregister {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true, primaryKeyConstraintName: 'PK_shop_member_unregister' })
  id: number

  @Column({ name: 'member_id', type: 'int', unsigned: true, default: 0, comment: '会员 ID' })
  memberId: number

  @Column({ type: 'varchar', length: 32, nullable: false, default: MemberUnregisterStatus.PENDING, comment: '注销状态' })
  status: IMemberUnregisterStatus

  @Column({ type: 'varchar', length: 32, nullable: false, default: '', comment: '会员账号' })
  username: string

  @Column({ type: 'varchar', length: 32, nullable: false, default: '', comment: '会员昵称' })
  nickname: string

  @Column({ type: 'varchar', length: 16, nullable: false, default: '', comment: '会员手机' })
  mobile: string

  @Column({ type: 'varchar', length: 255, nullable: false, default: '', comment: '注销原因' })
  reason: string

  @Column({ type: 'varchar', length: 32, nullable: false, default: MemberSource.WECHAT_MP, comment: '注销来源' })
  source: IMemberSource

  @CreateDateColumn({ name: 'created_time', update: false, type: 'datetime', default: null, comment: '创建时间' })
  createdTime: string

  @Column({ name: 'unregister_time', update: false, type: 'datetime', default: null, comment: '注销时间' })
  unregisterTime: string
}
