import type { IMemberToken } from '@xiaoshop/schema'
import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity('shop_member_token', {
  comment: '会员令牌表',
})
@Index('idx_shop_member_token', ['token', 'expires'], { unique: true })
export class MemberToken implements IMemberToken {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true, primaryKeyConstraintName: 'pk_shop_member_token' })
  id: number

  @Column({ type: 'int', unsigned: true, default: 0, comment: '会员 ID' })
  memberId: number

  @Column({ type: 'char', length: 48, nullable: false, default: '', comment: '会员令牌' })
  token: string

  @Column({ type: 'datetime', default: null, comment: '令牌过期时间' })
  expires: string

  @CreateDateColumn({ name: 'created_time', update: false, type: 'datetime', default: null, comment: '创建时间' })
  createdTime: string

  @UpdateDateColumn({ name: 'refresh_time', type: 'datetime', default: null, comment: '刷新时间' })
  refreshTime: string
}
