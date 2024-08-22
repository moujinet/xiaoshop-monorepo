import {
  type ILogisticsCalcMode,
  type ILogisticsTemplate,
  type ILogisticsTemplateFreeRule,
  type ILogisticsTemplateRule,
  type IYesOrNo,
  LogisticsCalcMode,
  YesOrNo,
} from '@xiaoshop/shared'
import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity('manage_logistics_template', {
  comment: '物流运费模板表',
})
@Index('IDX_manage_logistics_template', ['sort', 'updatedTime'])
export class LogisticsFreightTemplate implements ILogisticsTemplate {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true, primaryKeyConstraintName: 'PK_manage_logistics_template' })
  id: number

  @Column({ type: 'varchar', length: 32, nullable: false, default: '', comment: '模板名称' })
  name: string

  @Column({ type: 'varchar', length: 255, nullable: false, default: '', comment: '模板描述' })
  desc: string

  @Column({ type: 'int', unsigned: true, default: 1, comment: '排序' })
  sort: number

  @Column({ name: 'calc_mode', type: 'varchar', length: 32, nullable: false, default: LogisticsCalcMode.COUNT, comment: '运费计算方式' })
  calcMode: ILogisticsCalcMode

  @Column({ type: 'simple-json', default: null, comment: '运费规则 (JSON)' })
  rules: ILogisticsTemplateRule[]

  @Column({ name: 'enable_free_rules', type: 'char', length: 1, nullable: false, default: YesOrNo.NO, comment: '启用包邮地区 (N:否 Y:是)' })
  enableFreeRules: IYesOrNo

  @Column({ name: 'free_rules', type: 'simple-json', default: null, comment: '包邮规则 (JSON)' })
  freeRules: ILogisticsTemplateFreeRule[]

  @CreateDateColumn({ name: 'created_time', update: false, type: 'datetime', default: null, comment: '创建时间' })
  createdTime: string

  @UpdateDateColumn({ name: 'updated_time', type: 'datetime', comment: '更新时间' })
  updatedTime: string
}
