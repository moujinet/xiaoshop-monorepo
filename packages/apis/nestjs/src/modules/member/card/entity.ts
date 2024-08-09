import {
  Enabled,
  type IEnabled,
  type IMemberCard,
  type IMemberCardBadgeStyles,
  type IMemberCardPlan,
  type IMemberCardStyles,
  type IMemberCardType,
  MemberCardType,
} from '@xiaoshop/schema'
import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn, VirtualColumn } from 'typeorm'

@Entity('shop_member_card', {
  comment: '会员卡信息表',
})
@Index('IDX_shop_member_card_level', ['type', 'isEnabled', 'key'])
@Index('IDX_shop_member_card_custom', ['type', 'isEnabled', 'updatedTime'])
export class MemberCard implements IMemberCard {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true, primaryKeyConstraintName: 'PK_shop_member_card' })
  id: number

  @Column({ type: 'varchar', length: 32, nullable: false, default: MemberCardType.CUSTOM, comment: '会员卡类型' })
  type: IMemberCardType

  @Column({ name: 'is_enabled', type: 'char', length: 1, nullable: false, default: Enabled.NO, comment: '会员卡启用状态' })
  isEnabled: IEnabled

  @Column({ type: 'varchar', length: 32, nullable: false, default: '', comment: '会员卡标识' })
  key: string

  @Column({ type: 'varchar', length: 32, nullable: false, default: '', comment: '会员卡名称' })
  name: string

  @Column({ type: 'varchar', length: 255, nullable: false, default: '', comment: '会员卡描述' })
  desc: string

  @Column({ name: 'card_styles', type: 'simple-json', default: null, comment: '会员卡样式' })
  cardStyles: IMemberCardStyles

  @Column({ name: 'badge_styles', type: 'simple-json', default: null, comment: '会员徽章样式' })
  badgeStyles: IMemberCardBadgeStyles

  @Column({ name: 'need_exp', type: 'int', unsigned: true, default: 0, comment: '所需成长值' })
  needExp: number

  @Column({ type: 'float', unsigned: true, default: 0, comment: '会员折扣' })
  discount: number

  @Column({ name: 'points_ratio', type: 'float', unsigned: true, default: 0, comment: '获得积分倍率' })
  pointsRatio: number

  @Column({ name: 'is_free_shipping', type: 'char', length: 1, nullable: false, default: Enabled.NO, comment: '是否包邮 (N:否 Y:是)' })
  isFreeShipping: IEnabled

  @Column({ type: 'simple-json', default: null, comment: '会员卡有效期套餐' })
  plans: IMemberCardPlan[]

  @CreateDateColumn({ name: 'created_time', update: false, type: 'datetime', default: null, comment: '创建时间' })
  createdTime: string

  @UpdateDateColumn({ name: 'updated_time', type: 'datetime', default: null, comment: '更新时间' })
  updatedTime: string

  @VirtualColumn({ query: alias => `SELECT COUNT(id) FROM shop_member_card_binding WHERE card_id = ${alias}.id` })
  total: number
}
