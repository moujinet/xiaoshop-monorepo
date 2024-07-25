import type {
  IEnabled,
  IMemberCard,
  IMemberCardPlan,
  IMemberCardStyles,
  IMemberCardType,
} from '@xiaoshop/schema'
import { Column, CreateDateColumn, Entity, Index, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { MemberCardPlan } from './card-plan.entity'

@Entity('shop_member_card', {
  comment: '会员卡信息表',
  orderBy: {
    createdTime: 'DESC',
  },
})
@Index('idx_shop_member_card', ['type', 'key'], { unique: true })
export class MemberCard implements IMemberCard {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true, primaryKeyConstraintName: 'pk_shop_member_card' })
  id: number

  @Column({ type: 'varchar', length: 32, nullable: false, default: '', comment: '会员卡类型' })
  type: IMemberCardType

  @Column({ name: 'is_enabled', type: 'varchar', length: 32, nullable: false, default: '', comment: '会员卡启用状态' })
  isEnabled: IEnabled

  @Column({ type: 'varchar', length: 32, nullable: false, default: '', comment: '会员卡标识' })
  key: string

  @Column({ type: 'varchar', length: 32, nullable: false, default: '', comment: '会员卡名称' })
  name: string

  @Column({ type: 'varchar', length: 255, nullable: false, default: '', comment: '会员卡描述' })
  desc: string

  @Column({ type: 'simple-json', default: null, comment: '会员卡样式' })
  styles: IMemberCardStyles

  @Column({ name: 'need_exp', type: 'int', unsigned: true, default: 0, comment: '所需成长值' })
  needExp: number

  @Column({ type: 'float', unsigned: true, default: 0, comment: '会员折扣' })
  discount: number

  @Column({ name: 'points_ratio', type: 'float', unsigned: true, default: 0, comment: '获得积分倍率' })
  pointsRatio: number

  @Column({ name: 'is_free_shipping', type: 'char', nullable: false, default: '', comment: '是否包邮 (N:否 Y:是)' })
  isFreeShipping: IEnabled

  @CreateDateColumn({ name: 'created_time', update: false, type: 'datetime', default: null, comment: '创建时间' })
  createdTime: string

  @OneToMany(() => MemberCardPlan, plan => plan.card, { cascade: true, createForeignKeyConstraints: false })
  plans: IMemberCardPlan[]
}
