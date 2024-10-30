import type { IMemberPointsRuleKey, IMemberPointsRuleOptions, YesOrNo } from '@xiaoshop/shared'

import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity('member_points_rule', {
  comment: '会员积分规则',
})
export class MemberPointsRuleEntity {
  @PrimaryColumn({ type: 'varchar', length: 32, nullable: false, default: '', comment: '主键' })
  key: IMemberPointsRuleKey

  @Column({ name: 'is_enabled', type: 'tinyint', unsigned: true, default: 0, comment: '是否启用' })
  isEnabled: YesOrNo

  @Column({ type: 'varchar', length: 32, nullable: false, default: '', comment: '规则名称' })
  name: string

  @Column({ type: 'varchar', length: 255, nullable: false, default: '', comment: '规则描述' })
  desc: string

  @Column({ type: 'varchar', length: 32, nullable: false, default: '', comment: '规则图标' })
  icon: string

  @Column({ type: 'simple-json', default: null, comment: '规则选项' })
  options: IMemberPointsRuleOptions
}
