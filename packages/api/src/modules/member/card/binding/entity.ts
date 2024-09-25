import type {
  IMemberCardBadgeStyle,
  IMemberCardInfo,
  IMemberCardPlanInfo,
  IMemberCardStyle,
  IMemberInfo,
  MemberCardPlanType,
  MemberCardType,
  YesOrNo,
} from '@xiaoshop/shared'

import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn } from 'typeorm'

@Entity('member_card_binding', {
  comment: '会员卡绑定信息表',
})
@Index('IDX_member_card_binding', ['memberId', 'cardId'])
export class MemberCardBinding {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number

  @Column({ name: 'member_id', type: 'int', unsigned: true, unique: true, default: 0, comment: '会员 ID' })
  memberId: IMemberInfo['id']

  @Column({ name: 'card_id', type: 'int', unsigned: true, default: 0, comment: '会员卡 ID' })
  cardId: IMemberCardInfo['id']

  @Column({ type: 'tinyint', unsigned: true, default: 0, comment: '会员卡类型' })
  type: MemberCardType

  @Column({ type: 'varchar', length: 32, nullable: false, default: '', comment: '会员卡标识' })
  key: string

  @Column({ type: 'varchar', length: 32, nullable: false, default: '', comment: '会员卡名称' })
  name: string

  @Column({ name: 'card_plan_id', type: 'int', unsigned: true, default: 0, comment: '会员卡有效期 ID' })
  cardPlanId: IMemberCardPlanInfo['id']

  @Column({ name: 'card_plan_type', type: 'tinyint', unsigned: true, default: 0, comment: '会员卡有效期类型' })
  cardPlanType: MemberCardPlanType

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

  @Column({ name: 'use_times', type: 'int', unsigned: true, default: 0, comment: '会员卡使用次数' })
  useTimes: number

  @Column({ name: 'due_time', type: 'datetime', default: null, comment: '到期时间' })
  dueTime: string

  @CreateDateColumn({ name: 'created_time', type: 'datetime', default: null, comment: '开通时间' })
  createdTime: string
}
