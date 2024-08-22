import type { ILogisticsCompany } from '@xiaoshop/shared'
import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity('manage_logistics_company', {
  comment: '物流公司管理表',
})
@Index('IDX_manage_logistics_company', ['sort', 'updatedTime'])
export class LogisticsCompany implements ILogisticsCompany {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true, primaryKeyConstraintName: 'PK_manage_logistics_company' })
  id: number

  @Column({ type: 'varchar', length: 32, nullable: false, default: '', comment: '公司名称' })
  name: string

  @Column({ type: 'varchar', length: 255, nullable: false, default: '', comment: '公司介绍' })
  desc: string

  @Column({ type: 'varchar', length: 32, nullable: false, default: '', comment: '公司官网' })
  url: string

  @Column({ type: 'int', unsigned: true, default: 1, comment: '排序' })
  sort: number

  @CreateDateColumn({ name: 'created_time', update: false, type: 'datetime', default: null, comment: '创建时间' })
  createdTime: string

  @UpdateDateColumn({ name: 'updated_time', type: 'datetime', default: null, comment: '更新时间' })
  updatedTime: string
}
