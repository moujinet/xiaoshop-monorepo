import {
  Enabled,
  type IEnabled,
  type IMemberCardBinding,
  type IMemberCardPlanType,
  type IMemberCardStyleInfo,
  type IMemberCardType,
  MemberCardPlanType,
  MemberCardType,
} from '@xiaoshop/schema'
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { MemberCard } from '@/member/card/entities'

@Entity('shop_member_card_binding', {
  comment: '会员卡绑定表',
})
export class MemberCardBinding implements IMemberCardBinding {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true, primaryKeyConstraintName: 'PK_shop_member_card_binding' })
  id: number

  @Column({ name: 'card_id', type: 'int', unsigned: true, default: 0, comment: '会员卡 ID (冗余)' })
  cardId: number

  @Column({ type: 'varchar', length: 32, nullable: false, default: MemberCardType.CUSTOM, comment: '会员卡类型 (冗余)' })
  cardType: IMemberCardType

  @Column({ type: 'varchar', length: 32, nullable: false, default: MemberCardPlanType.TIMES, comment: '会员卡有效期类型 (冗余)' })
  cardPlanType: IMemberCardPlanType

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

  @OneToOne(() => MemberCard, { createForeignKeyConstraints: true })
  @JoinColumn()
  styles: IMemberCardStyleInfo

  @Column({ name: 'due_time', type: 'datetime', default: null, comment: '到期时间' })
  dueTime: string

  @CreateDateColumn({ name: 'created_time', update: false, type: 'datetime', default: null, comment: '创建时间' })
  createdTime: string
}
