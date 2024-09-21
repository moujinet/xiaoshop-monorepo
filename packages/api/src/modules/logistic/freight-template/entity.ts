import type {
  ILogisticFreightFreeRule,
  ILogisticFreightLocationRule,
  LogisticFreightCalcMode,
  YesOrNo,
} from '@xiaoshop/shared'

import { Column, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity('logistic_freight_template', {
  comment: '物流运费模板表',
})
@Index('IDX_logistic_freight_template', ['sort', 'updatedTime'])
export class LogisticFreightTemplate {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number

  @Column({ type: 'varchar', length: 32, nullable: false, default: '', comment: '模板名称' })
  name: string

  @Column({ type: 'varchar', length: 255, nullable: false, default: '', comment: '模板描述' })
  desc: string

  @Column({ type: 'int', unsigned: true, default: 1, comment: '排序' })
  sort: number

  @Column({ name: 'calc_mode', type: 'tinyint', unsigned: true, default: 0, comment: '运费计算方式' })
  calcMode: LogisticFreightCalcMode

  @Column({ type: 'simple-json', default: null, comment: '运费规则 (JSON)' })
  rules: ILogisticFreightLocationRule[]

  @Column({ name: 'enable_free_rules', type: 'tinyint', unsigned: true, default: 0, comment: '启用包邮地区' })
  enableFreeRules: YesOrNo

  @Column({ name: 'free_rules', type: 'simple-json', default: null, comment: '包邮规则 (JSON)' })
  freeRules: ILogisticFreightFreeRule[]

  @UpdateDateColumn({ name: 'updated_time', type: 'datetime', comment: '更新时间' })
  updatedTime: string
}
