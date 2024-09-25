import type {
  IMemberCardBadgeStyle,
  IMemberCardInfo,
  IMemberCardPlanInfo,
  IMemberInfo,
  MemberCardType,
  MemberCardUpgradeMethod,
} from '@xiaoshop/shared'

import { Column, CreateDateColumn, Entity, Index, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm'

import { Member } from '../../member/entity'

@Entity('member_card_upgrade', {
  comment: '会员卡升级信息表',
})
@Index('IDX_member_card_upgrade', ['memberId', 'createdTime'])
export class MemberCardUpgrade {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number

  @Column({ name: 'member_id', type: 'int', unsigned: true, default: 0, comment: '会员 ID' })
  memberId: IMemberInfo['id']

  @OneToOne(() => Member)
  @JoinColumn({ name: 'member_id' })
  member: Member

  @Column({ type: 'tinyint', unsigned: true, default: 0, comment: '升级方式' })
  method: MemberCardUpgradeMethod

  @Column({ name: 'card_id', type: 'int', unsigned: true, default: 0, comment: '会员卡 ID' })
  cardId: IMemberCardInfo['id']

  @Column({ name: 'card_plan_id', type: 'int', unsigned: true, default: 0, comment: '会员卡有效期 ID' })
  cardPlanId: IMemberCardPlanInfo['id']

  @Column({ type: 'varchar', length: 32, nullable: false, default: '', comment: '会员卡标识' })
  key: string

  @Column({ type: 'tinyint', unsigned: true, default: 0, comment: '会员卡类型' })
  type: MemberCardType

  @Column({ type: 'varchar', length: 32, nullable: false, default: '', comment: '会员卡名称' })
  name: string

  @Column({ name: 'badge_style', type: 'simple-json', default: null, comment: '会员卡徽章样式' })
  badgeStyle: IMemberCardBadgeStyle

  @Column({ type: 'varchar', length: 255, nullable: false, default: '', comment: '升级原因' })
  reason: string

  @CreateDateColumn({ name: 'created_time', type: 'datetime', default: null, comment: '开通时间' })
  createdTime: string
}
