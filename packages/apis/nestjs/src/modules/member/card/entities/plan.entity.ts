import {
  type IMemberCard,
  type IMemberCardPlan,
  type IMemberCardPlanType,
  MemberCardPlanType,
} from '@xiaoshop/schema'
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { MemberCard } from '@/member/card/entities'

@Entity('shop_member_card_plan', {
  comment: '会员卡自定义套餐表',
})
export class MemberCardPlan implements IMemberCardPlan {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true, primaryKeyConstraintName: 'pk_shop_member_card_plan' })
  id: number

  @Column({ type: 'varchar', length: 32, nullable: false, default: MemberCardPlanType.TIMES, comment: '会员卡类型' })
  type: IMemberCardPlanType

  @Column({ type: 'int', unsigned: true, default: 0, comment: '会员卡套餐有效期' })
  duration: number

  @Column({ type: 'float', unsigned: true, default: 0, comment: '会员卡套餐价格' })
  price: number

  @CreateDateColumn({ name: 'created_time', update: false, type: 'datetime', default: null, comment: '创建时间' })
  createdTime: string

  @ManyToOne(() => MemberCard, card => card.plans, { createForeignKeyConstraints: false })
  card: IMemberCard
}
