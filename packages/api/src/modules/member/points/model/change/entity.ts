import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn } from 'typeorm'

@Entity('member_points_change', {
  comment: '会员积分变动',
})
@Index('IDX_member_points_change', ['memberId', 'createdTime'])
export class MemberPointsChangeEntity {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number

  @Column({ type: 'int', default: 0, unsigned: true, comment: '会员 ID' })
  memberId: number

  @Column({ type: 'int', default: 0, comment: '变动积分' })
  points: number

  @Column({ type: 'varchar', length: 255, nullable: false, default: '', comment: '变动原因' })
  reason: string

  @CreateDateColumn({ name: 'created_time', type: 'datetime', default: null, update: false, comment: '变动时间' })
  createdTime: string
}
