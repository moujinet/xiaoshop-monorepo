import {
  type IMemberBinding,
  type IMemberCardBadgeStyle,
  type IMemberCardPlanType,
  type IMemberCardStyle,
  type IMemberCardType,
  type IYesOrNo,
  MemberCardType,
  YesOrNo,
} from '@xiaoshop/shared'
import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity('shop_member_binding', {
  comment: '会员绑定会员卡表',
})
@Index('IDX_shop_member_binding', ['memberId'])
@Index('IDX_shop_member_binding_card', ['cardId', 'cardType'])
export class MemberBinding implements IMemberBinding {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true, primaryKeyConstraintName: 'PK_shop_member_binding' })
  id: number

  @Column({ name: 'member_id', type: 'int', unsigned: true, default: 0, comment: '会员 ID' })
  memberId: number

  @Column({ name: 'card_id', type: 'int', unsigned: true, default: 0, comment: '会员卡 ID (冗余)' })
  cardId: number

  @Column({ name: 'card_type', type: 'varchar', length: 32, nullable: false, default: MemberCardType.CUSTOM, comment: '会员卡类型 (冗余)' })
  cardType: IMemberCardType

  @Column({ name: 'plan_id', type: 'int', unsigned: true, default: 0, comment: '会员卡有效期 ID (冗余)' })
  planId: number

  @Column({ name: 'plan_type', type: 'varchar', length: 32, nullable: false, default: '', comment: '会员卡有效期类型 (冗余)' })
  planType: IMemberCardPlanType

  @Column({ type: 'varchar', length: 16, nullable: false, default: '', comment: '会员卡标识 (冗余)' })
  key: string

  @Column({ type: 'varchar', length: 32, nullable: false, default: '', comment: '会员卡名称 (冗余)' })
  name: string

  @Column({ name: 'card_style', type: 'simple-json', default: null, comment: '会员卡卡片样式 (冗余)' })
  cardStyle: IMemberCardStyle

  @Column({ name: 'badge_style', type: 'simple-json', default: null, comment: '会员卡徽章样式 (冗余)' })
  badgeStyle: IMemberCardBadgeStyle

  @Column({ type: 'float', unsigned: true, default: 0, comment: '会员折扣 (冗余)' })
  discount: number

  @Column({ name: 'points_ratio', type: 'float', unsigned: true, default: 0, comment: '获得积分倍率 (冗余)' })
  pointsRatio: number

  @Column({ name: 'need_exp', type: 'int', unsigned: true, default: 0, comment: '所需成长值 (冗余)' })
  needExp: number

  @Column({ name: 'next_level_exp', type: 'int', unsigned: true, default: 0, comment: '下级升级所需成长值' })
  nextLevelExp: number

  @Column({ name: 'free_shipping', type: 'char', length: 1, nullable: false, default: YesOrNo.NO, comment: '是否包邮 (N:否 Y:是) (冗余)' })
  freeShipping: IYesOrNo

  @Column({ type: 'char', length: 1, nullable: false, default: YesOrNo.NO, comment: '是否可升级 (N:否 Y:是)' })
  upgradeable: IYesOrNo

  @Column({ type: 'int', unsigned: true, default: 0, comment: '会员卡使用次数' })
  times: number

  @Column({ name: 'due_time', type: 'datetime', default: null, comment: '到期时间' })
  dueTime: string

  @CreateDateColumn({ name: 'created_time', type: 'datetime', default: null, update: false, comment: '创建时间' })
  createdTime: string

  @UpdateDateColumn({ name: 'updated_time', type: 'datetime', default: null, comment: '更新时间' })
  updatedTime: string
}
