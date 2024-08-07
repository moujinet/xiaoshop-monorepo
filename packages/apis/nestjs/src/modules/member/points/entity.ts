import type {
  IEnabled,
  IMemberPointsRule,
  IMemberPointsRuleKey,
  IMemberPointsRuleOptions,
} from '@xiaoshop/schema'
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm'

@Entity('shop_member_points_rule', {
  comment: '会员积分规则表',
})
@Index('IDX_shop_member_points_rule', ['enable'])
export class MemberPointsRule implements IMemberPointsRule {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true, primaryKeyConstraintName: 'PK_shop_member_points_rule' })
  id: number

  @Column({ type: 'varchar', length: 32, nullable: false, default: '', comment: '积分规则标识' })
  key: IMemberPointsRuleKey

  @Column({ type: 'char', nullable: false, default: '', comment: '积分规则启用状态' })
  enable: IEnabled

  @Column({ type: 'varchar', length: 32, nullable: false, default: '', comment: '积分规则名称' })
  name: string

  @Column({ type: 'varchar', length: 255, nullable: false, default: '', comment: '积分规则描述' })
  desc: string

  @Column({ type: 'varchar', length: 32, nullable: false, default: '', comment: '积分规则图标' })
  icon: string

  @Column({ type: 'simple-json', default: null, comment: '积分规则选项' })
  options: IMemberPointsRuleOptions
}
