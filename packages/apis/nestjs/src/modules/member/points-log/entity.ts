import {
  type IMemberPointsLog,
  type IMemberPointsLogChangeType,
  MemberPointsLogChangeType,
} from '@xiaoshop/schema'
import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn } from 'typeorm'

@Entity('shop_member_points_log', {
  comment: '会员积分规则表',
})
@Index('IDX_shop_member_points_log', ['memberId', 'createdTime'])
export class MemberPointsLog implements IMemberPointsLog {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true, primaryKeyConstraintName: 'PK_shop_member_points_log' })
  id: number

  @Column({ name: 'member_id', type: 'int', unsigned: false, default: 0, comment: '会员 ID' })
  memberId: number

  @Column({ type: 'varchar', length: 32, nullable: false, default: MemberPointsLogChangeType.SET, comment: '变更类型' })
  type: IMemberPointsLogChangeType

  @Column({ type: 'int', unsigned: false, default: 0, comment: '积分变化' })
  change: number

  @Column({ type: 'int', unsigned: false, default: 0, comment: '变化后积分' })
  points: number

  @Column({ type: 'varchar', length: 255, nullable: false, default: '', comment: '变化原因' })
  reason: string

  @CreateDateColumn({ name: 'created_time', update: false, type: 'datetime', default: null, comment: '申请时间' })
  createdTime: string
}
