import {
  type IEnabled,
  type ILogisticsFreightTemplate,
  type ILogisticsFreightTemplateCalcMode,
  type ILogisticsFreightTemplateFreeRule,
  type ILogisticsFreightTemplateNormalRule,
  LogisticsFreightTemplateCalcMode,
} from '@xiaoshop/schema'
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity('manage_logistics_freight_template', {
  comment: '物流运费模板表',
})
export class LogisticsFreightTemplate implements ILogisticsFreightTemplate {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true, primaryKeyConstraintName: 'PK_manage_logistics_freight_template' })
  id: number

  @Column({ type: 'varchar', length: 32, nullable: false, default: '', comment: '模板名称' })
  name: string

  @Column({ name: 'calc_mode', type: 'varchar', length: 32, nullable: false, default: LogisticsFreightTemplateCalcMode.COUNT, comment: '运费计算方式' })
  calcMode: ILogisticsFreightTemplateCalcMode

  @Column({ type: 'simple-json', default: null, comment: '运费规则 (JSON)' })
  rules: ILogisticsFreightTemplateNormalRule[]

  @Column({ name: 'enable_free_rules', type: 'char', nullable: false, default: '', comment: '启用包邮地区 (N:否 Y:是)' })
  enableFreeRules: IEnabled

  @Column({ name: 'free_rules', type: 'simple-json', default: null, comment: '包邮规则 (JSON)' })
  freeRules: ILogisticsFreightTemplateFreeRule[]

  @CreateDateColumn({ name: 'created_time', update: false, type: 'datetime', default: null, comment: '创建时间' })
  createdTime: string

  @UpdateDateColumn({ name: 'updated_time', type: 'datetime', comment: '更新时间' })
  updatedTime: string
}
