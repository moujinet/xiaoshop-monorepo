import type { IMemberCardBadgeStyle, MemberCardType, MemberCardUpgradeMethod } from '@xiaoshop/shared'

import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn } from 'typeorm'

@Entity('member_card_upgrade', {
  comment: '会员升级记录表',
})
@Index('IDX_member_card_upgrade', ['memberId', 'cardId'])
export class MemberCardUpgradeEntity {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number

  @Column({ name: 'member_id', type: 'int', unsigned: true, unique: true, default: 0, comment: '会员 ID' })
  memberId: number

  @Column({ name: 'card_id', type: 'int', unsigned: true, default: 0, comment: '会员卡 ID (冗余)' })
  cardId: number

  @Column({ name: 'card_plan_id', type: 'int', unsigned: true, default: 0, comment: '会员卡有效期 ID (冗余)' })
  cardPlanId: number

  @Column({ type: 'varchar', length: 32, nullable: false, default: '', comment: '会员卡标识 (冗余)' })
  key: string

  @Column({ type: 'tinyint', unsigned: true, default: 0, comment: '会员卡类型 (冗余)' })
  type: MemberCardType

  @Column({ type: 'varchar', length: 32, nullable: false, default: '', comment: '会员卡名称 (冗余)' })
  name: string

  @Column({ name: 'badge_style', type: 'simple-json', default: null, comment: '会员卡徽章样式 (冗余)' })
  badgeStyle: IMemberCardBadgeStyle

  @Column({ type: 'tinyint', unsigned: true, default: 0, comment: '升级方式' })
  method: MemberCardUpgradeMethod

  @Column({ type: 'varchar', length: 255, nullable: false, default: '', comment: '升级原因' })
  reason: string

  @CreateDateColumn({ name: 'created_time', type: 'datetime', default: null, update: false, comment: '升级时间' })
  createdTime: string
}
