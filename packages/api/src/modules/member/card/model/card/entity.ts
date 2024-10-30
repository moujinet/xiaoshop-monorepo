import type { IMemberCardBadgeStyle, IMemberCardPlanInfo, IMemberCardStyle, MemberCardType, YesOrNo } from '@xiaoshop/shared'

import { Column, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn, VirtualColumn } from 'typeorm'

import { toFullTableName } from '~/utils/typeorm'

@Entity('member_card', {
  comment: '会员卡信息表',
})
@Index('IDX_member_card', ['isEnabled', 'type', 'key'])
export class MemberCardEntity {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number

  @Column({ name: 'is_enabled', type: 'tinyint', unsigned: true, default: 0, comment: '是否启用' })
  isEnabled: YesOrNo

  @Column({ type: 'tinyint', unsigned: true, default: 0, comment: '会员卡类型' })
  type: MemberCardType

  @Column({ type: 'varchar', length: 32, nullable: false, unique: true, default: '', comment: '会员卡标识' })
  key: string

  @Column({ type: 'varchar', length: 32, nullable: false, default: '', comment: '会员卡名称' })
  name: string

  @Column({ type: 'varchar', length: 255, nullable: false, default: '', comment: '会员卡描述' })
  desc: string

  @Column({ name: 'card_style', type: 'simple-json', default: null, comment: '会员卡卡片样式' })
  cardStyle: IMemberCardStyle

  @Column({ name: 'badge_style', type: 'simple-json', default: null, comment: '会员卡徽章样式' })
  badgeStyle: IMemberCardBadgeStyle

  @Column({ name: 'need_exp', type: 'int', unsigned: true, default: 0, comment: '所需成长值' })
  needExp: number

  @Column({ type: 'int', unsigned: true, default: 0, comment: '会员折扣' })
  discount: number

  @Column({ name: 'points_ratio', type: 'int', unsigned: true, default: 0, comment: '获得积分倍率' })
  pointsRatio: number

  @Column({ name: 'is_free_shipping', type: 'tinyint', unsigned: true, default: 0, comment: '是否包邮' })
  isFreeShipping: YesOrNo

  @Column({ type: 'simple-json', default: null, comment: '会员卡套餐' })
  plans: IMemberCardPlanInfo[]

  @VirtualColumn({ query: alias => `SELECT COUNT(id) FROM \`${toFullTableName('member_card_binding')}\` WHERE \`card_id\` = ${alias}.id` })
  total: number

  @UpdateDateColumn({ name: 'updated_time', type: 'datetime', default: null, comment: '更新时间' })
  updatedTime: string
}
