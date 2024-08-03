import type {
  IMemberCardBinding,
  IMemberCardInfo,
  IMemberCardPlanInfo,
} from '@xiaoshop/schema'
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import {
  MemberCard,
  MemberCardPlan,
} from '@/member/card/entities'

@Entity('shop_member_card_binding', {
  comment: '会员卡绑定表',
})
export class MemberCardBinding implements IMemberCardBinding {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true, primaryKeyConstraintName: 'pk_shop_member_card_binding' })
  id: number

  @Column({ type: 'int', unsigned: true, default: 0, comment: '会员卡使用次数' })
  times: number

  @Column({ name: 'due_time', type: 'datetime', default: null, comment: '到期时间' })
  dueTime: string

  @CreateDateColumn({ name: 'created_time', update: false, type: 'datetime', default: null, comment: '创建时间' })
  createdTime: string

  @OneToOne(() => MemberCard, { createForeignKeyConstraints: true })
  @JoinColumn()
  card: IMemberCardInfo

  @ManyToOne(() => MemberCardPlan, { createForeignKeyConstraints: true })
  @JoinColumn()
  plan: IMemberCardPlanInfo
}