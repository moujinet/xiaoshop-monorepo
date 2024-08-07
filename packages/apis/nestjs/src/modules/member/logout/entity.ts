import {
  type IMemberLogout,
  type IMemberLogoutStatus,
  type IMemberSource,
  MemberLogoutStatus,
  MemberSource,
} from '@xiaoshop/schema'
import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn } from 'typeorm'

@Entity('shop_member_logout', {
  comment: '会员注销申请表',
})
@Index('IDX_shop_member_logout', ['status', 'source', 'username', 'nickname', 'mobile', 'createdTime'])
export class MemberLogout implements IMemberLogout {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true, primaryKeyConstraintName: 'PK_shop_member_logout' })
  id: number

  @Column({ type: 'varchar', length: 32, nullable: false, default: MemberLogoutStatus.PENDING, comment: '注销状态' })
  status: IMemberLogoutStatus

  @Column({ type: 'varchar', length: 32, nullable: false, default: MemberSource.MANUAL, comment: '注销来源' })
  source: IMemberSource

  @Column({ name: 'member_id', type: 'int', unsigned: false, default: 0, comment: '会员 ID' })
  memberId: number

  @Column({ type: 'varchar', length: 32, nullable: false, default: '', comment: '会员账号' })
  username: string

  @Column({ type: 'varchar', length: 32, nullable: false, default: '', comment: '会员昵称' })
  nickname: string

  @Column({ type: 'varchar', length: 16, nullable: false, default: '', comment: '会员手机号' })
  mobile: string

  @Column({ type: 'varchar', length: 255, nullable: false, default: '', comment: '注销原因' })
  reason: string

  @CreateDateColumn({ name: 'created_time', update: false, type: 'datetime', default: null, comment: '申请时间' })
  createdTime: string

  @Column({ name: 'logout_time', type: 'datetime', default: null, comment: '刷新时间' })
  logoutTime: string
}
