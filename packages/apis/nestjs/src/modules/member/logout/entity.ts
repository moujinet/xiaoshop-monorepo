import type { IMemberLogout, IMemberLogoutStatus, IMemberSource } from '@xiaoshop/schema'
import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn } from 'typeorm'

@Entity('shop_member_logout', {
  comment: '会员注销申请表',
  orderBy: {
    createdTime: 'DESC',
  },
})
@Index('idx_shop_member_logout', ['status', 'source', 'username', 'nickname', 'mobile'])
export class MemberLogout implements IMemberLogout {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true, primaryKeyConstraintName: 'pk_shop_member_logout' })
  id: number

  @Column({ name: 'member_id', type: 'int', unsigned: true, default: 0, comment: '会员 ID' })
  memberId: number

  @Column({ type: 'varchar', length: 32, nullable: false, default: '', comment: '注销状态' })
  status: IMemberLogoutStatus

  @Column({ type: 'varchar', length: 32, nullable: false, default: '', comment: '注销来源' })
  source: IMemberSource

  @Column({ type: 'varchar', length: 32, nullable: false, default: '', comment: '会员账号' })
  username: string

  @Column({ type: 'varchar', length: 32, nullable: false, default: '', comment: '会员昵称' })
  nickname: string

  @Column({ type: 'varchar', length: 16, nullable: false, default: '', comment: '会员手机' })
  mobile: string

  @Column({ type: 'varchar', length: 255, nullable: false, default: '', comment: '注销原因' })
  reason: string

  @CreateDateColumn({ name: 'created_time', update: false, type: 'datetime', default: null, comment: '创建时间' })
  createdTime: string

  @Column({ name: 'logout_time', type: 'datetime', default: null, comment: '注销时间' })
  logoutTime: string
}
