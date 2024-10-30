import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Relation } from 'typeorm'

import { MemberProfileEntity } from '@/member/account/model/profile/entity'

@Entity('member_invite', {
  comment: '会员邀请信息',
})
@Index('IDX_member_invite', ['memberId', 'inviteeId'])
export class MemberInviteEntity {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number

  @Column({ name: 'member_id', type: 'int', unsigned: true, unique: true, default: 0, comment: '会员 ID' })
  memberId: number

  @Column({ name: 'invitee_id', type: 'int', unsigned: true, unique: true, default: 0, comment: '受邀会员 ID' })
  inviteeId: number

  @ManyToOne(() => MemberProfileEntity)
  @JoinColumn({ name: 'invitee_id' })
  invitee: Relation<MemberProfileEntity>

  @CreateDateColumn({ name: 'created_time', type: 'datetime', default: null, comment: '邀请时间' })
  createdTime: string
}
