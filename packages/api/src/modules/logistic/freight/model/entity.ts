import type { ILogisticFreightFreeRule, ILogisticFreightLocationRule, LogisticFreightCalcMode, YesOrNo } from '@xiaoshop/shared'

import { Column, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity('logistic_freight_template', {
  comment: '运费模板',
})
@Index('IDX_logistic_freight_template', ['sort'])
export class LogisticFreightTemplateEntity {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number

  @Column({ name: 'is_enabled', type: 'tinyint', unsigned: true, default: 0, comment: '是否启用' })
  isEnabled: YesOrNo

  @Column({ type: 'varchar', length: 32, nullable: false, default: '', comment: '模板名称' })
  name: string

  @Column({ type: 'varchar', length: 200, nullable: false, default: '', comment: '模板描述' })
  desc: string

  @Column({ name: 'calc_mode', type: 'tinyint', unsigned: true, default: 0, comment: '运费计算方式' })
  calcMode: LogisticFreightCalcMode

  @Column({ name: 'enable_free_rules', type: 'tinyint', unsigned: true, default: 0, comment: '是否开启包邮规则' })
  enableFreeRules: YesOrNo

  @Column({ type: 'simple-json', default: null, comment: '运费规则' })
  rules: ILogisticFreightLocationRule[]

  @Column({ name: 'free_rules', type: 'simple-json', default: null, comment: '包邮规则' })
  freeRules: ILogisticFreightFreeRule[]

  @Column({ type: 'int', default: 1, unsigned: true, comment: '排序' })
  sort: number

  @UpdateDateColumn({ name: 'updated_time', type: 'datetime', default: null, comment: '更新时间' })
  updatedTime: string
}
