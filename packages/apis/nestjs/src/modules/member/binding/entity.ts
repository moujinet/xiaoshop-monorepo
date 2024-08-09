import {
  Enabled,
  type IEnabled,
  type IMemberCardBadgeStyles,
  type IMemberCardBinding,
  type IMemberCardPlanType,
  type IMemberCardStyles,
  type IMemberCardType,
  MemberCardPlanType,
  MemberCardType,
} from '@xiaoshop/schema'
import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn } from 'typeorm'

@Entity('shop_member_card_binding', {
  comment: '会员卡绑定表',
})
@Index('IDX_shop_member_card_binding', ['cardId', 'memberId', 'createdTime'])
export class MemberCardBinding implements IMemberCardBinding {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true, primaryKeyConstraintName: 'PK_shop_member_card_binding' })
  id: number

  @Column({ name: 'member_id', type: 'int', unsigned: true, default: 0, comment: '会员 ID (冗余)' })
  memberId: number

  @Column({ name: 'card_id', type: 'int', unsigned: true, default: 0, comment: '会员卡 ID (冗余)' })
  cardId: number

  @Column({ name: 'plan_id', type: 'int', unsigned: true, default: 0, comment: '会员卡有效期套餐 ID (冗余)' })
  planId: number

  @Column({ type: 'varchar', length: 32, nullable: false, default: '', comment: '会员卡标识 (冗余)' })
  key: string

  @Column({ type: 'varchar', length: 32, nullable: false, default: '', comment: '会员卡名称 (冗余)' })
  name: string

  @Column({ type: 'varchar', length: 32, nullable: false, default: MemberCardType.CUSTOM, comment: '会员卡类型 (冗余)' })
  type: IMemberCardType

  @Column({ name: 'plan_type', type: 'varchar', length: 32, nullable: false, default: MemberCardPlanType.TIMES, comment: '会员卡有效期类型 (冗余)' })
  planType: IMemberCardPlanType

  @Column({ type: 'float', unsigned: true, default: 0, comment: '会员折扣 (冗余)' })
  discount: number

  @Column({ name: 'points_ratio', type: 'float', unsigned: true, default: 0, comment: '获得积分倍率 (冗余)' })
  pointsRatio: number

  @Column({ name: 'is_free_shipping', type: 'char', length: 1, nullable: false, default: Enabled.NO, comment: '是否包邮 (N:否 Y:是) (冗余)' })
  isFreeShipping: IEnabled

  @Column({ name: 'is_upgradeable', type: 'char', length: 1, nullable: false, default: Enabled.NO, comment: '是否可升级 (N:否 Y:是)' })
  isUpgradeable: IEnabled

  @Column({ name: 'need_exp', type: 'int', unsigned: true, default: 0, comment: '所需成长值 (冗余)' })
  needExp: number

  @Column({ name: 'next_need_exp', type: 'int', unsigned: true, default: 0, comment: '下级所需成长值' })
  nextNeedExp: number

  @Column({ type: 'int', unsigned: true, default: 0, comment: '会员卡使用次数' })
  times: number

  @Column({ name: 'card_styles', type: 'simple-json', default: null, comment: '会员卡样式 (冗余)' })
  cardStyles: IMemberCardStyles

  @Column({ name: 'badge_styles', type: 'simple-json', default: null, comment: '会员徽章样式 (冗余)' })
  badgeStyles: IMemberCardBadgeStyles

  @Column({ name: 'due_time', type: 'datetime', default: null, comment: '到期时间' })
  dueTime: string

  @CreateDateColumn({ name: 'created_time', update: false, type: 'datetime', default: null, comment: '创建时间' })
  createdTime: string
}
