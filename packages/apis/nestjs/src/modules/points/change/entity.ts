import type {
  IMemberInfo,
  IPointsChangeLog,
  IPointsChangeType,
} from '@xiaoshop/schema'
import { Column, CreateDateColumn, Entity, Index, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Member } from '@/member/profile/entity'

@Entity('shop_points_change_log', {
  comment: '会员积分变更日志表',
})
@Index('IDX_shop_points_change_log', ['memberId', 'createdTime'])
export class PointsChangeLog implements IPointsChangeLog {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true, primaryKeyConstraintName: 'PK_shop_points_change_log' })
  id: number

  @Column({ name: 'member_id', type: 'int', unsigned: true, nullable: false, default: 0, comment: '会员 ID' })
  memberId: number

  @OneToOne(() => Member, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'member_id' })
  member: IMemberInfo

  @Column({ type: 'varchar', length: 32, nullable: false, default: '', comment: '积分变更类型' })
  type: IPointsChangeType

  @Column({ type: 'int', unsigned: true, nullable: false, default: 0, comment: '积分变化' })
  change: number

  @Column({ type: 'int', unsigned: true, nullable: false, default: 0, comment: '变化后积分' })
  points: number

  @Column({ type: 'varchar', length: 255, nullable: false, default: '', comment: '变化原因' })
  reason: string

  @CreateDateColumn({ name: 'created_time', type: 'datetime', nullable: false, comment: '发生时间' })
  createdTime: string
}
