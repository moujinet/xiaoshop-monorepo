import type { IMemberCardBinding } from '@xiaoshop/schema'
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { MemberCard } from './card.entity'
import { MemberCardPlan } from './card-plan.entity'

@Entity('shop_member_card_plan_binding', {
  comment: '会员卡自定义套餐表',
  orderBy: {
    createdTime: 'DESC',
  },
})
export class MemberCardBinding implements IMemberCardBinding {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true, primaryKeyConstraintName: 'pk_shop_member_card_plan_binding' })
  id: number

  @OneToOne(() => MemberCard, { createForeignKeyConstraints: true })
  @JoinColumn()
  card: MemberCard

  @ManyToOne(() => MemberCardPlan, { createForeignKeyConstraints: true })
  @JoinColumn()
  plan: MemberCardPlan

  @Column({ type: 'int', unsigned: true, default: 0, comment: '会员卡使用次数' })
  times: number

  @Column({ name: 'due_time', type: 'datetime', default: null, comment: '到期时间' })
  dueTime: string

  @CreateDateColumn({ name: 'created_time', update: false, type: 'datetime', default: null, comment: '创建时间' })
  createdTime: string
}
