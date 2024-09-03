import type {
  IMemberCard,
  IMemberCardBadgeStyle,
  IMemberCardPlan,
  IMemberCardStyle,
  MemberCardType,
  YesOrNo,
} from '@xiaoshop/shared'
import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn, VirtualColumn } from 'typeorm'

@Entity('shop_member_card', {
  comment: '会员卡信息表',
})
@Index('IDX_shop_member_card_level', ['type', 'key'])
@Index('IDX_shop_member_card_custom', ['type', 'key', 'updatedTime'])
@Index('IDX_shop_member_card_dict', ['enable', 'type', 'key', 'updatedTime'])
export class MemberCard implements IMemberCard {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number

  @Column({ type: 'tinyint', unsigned: true, default: 0, comment: '类型' })
  type: MemberCardType

  @Column({ type: 'tinyint', unsigned: true, default: 0, comment: '是否启用' })
  enable: YesOrNo

  @Column({ type: 'varchar', length: 16, nullable: false, default: '', comment: '标识' })
  key: string

  @Column({ type: 'varchar', length: 32, nullable: false, default: '', comment: '名称' })
  name: string

  @Column({ type: 'varchar', length: 255, nullable: false, default: '', comment: '描述' })
  desc: string

  @Column({ name: 'card_style', type: 'simple-json', default: null, comment: '卡片样式' })
  cardStyle: IMemberCardStyle

  @Column({ name: 'badge_style', type: 'simple-json', default: null, comment: '徽章样式' })
  badgeStyle: IMemberCardBadgeStyle

  @Column({ type: 'simple-json', default: null, comment: '有效期套餐' })
  plans: IMemberCardPlan[]

  @Column({ name: 'need_exp', type: 'int', unsigned: true, default: 0, comment: '所需成长值' })
  needExp: number

  @Column({ type: 'float', unsigned: true, default: 0, comment: '会员折扣' })
  discount: number

  @Column({ name: 'points_ratio', type: 'float', unsigned: true, default: 0, comment: '获得积分倍率' })
  pointsRatio: number

  @Column({ name: 'free_shipping', type: 'tinyint', unsigned: true, default: 0, comment: '是否包邮' })
  freeShipping: YesOrNo

  @VirtualColumn({ query: alias => `SELECT COUNT(id) FROM \`shop_member_binding\` WHERE \`card_id\` = ${alias}.id` })
  total: number

  @CreateDateColumn({ name: 'created_time', type: 'datetime', default: null, update: false, comment: '创建时间' })
  createdTime: string

  @UpdateDateColumn({ name: 'updated_time', type: 'datetime', default: null, comment: '更新时间' })
  updatedTime: string
}
