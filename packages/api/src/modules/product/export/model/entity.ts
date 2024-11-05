import type { IProductExportConditions, ProductExportStatus } from '@xiaoshop/shared'

import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn } from 'typeorm'

@Entity('product_export', {
  comment: '商品导出',
})
@Index('IDX_product_export', ['status', 'createdTime'])
export class ProductExportEntity {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number

  @Column({ type: 'tinyint', default: 0, unsigned: true, comment: '导出状态' })
  status: ProductExportStatus

  @Column({ type: 'simple-json', default: null, comment: '导出条件' })
  conditions: IProductExportConditions

  @Column({ type: 'int', default: 0, unsigned: true, comment: '导出数量' })
  count: number

  @Column({ name: 'file_path', type: 'varchar', length: 100, nullable: false, default: '', comment: '导出文件路径' })
  filePath: string

  @CreateDateColumn({ name: 'created_time', type: 'datetime', default: null, update: false, comment: '导出时间' })
  createdTime: string
}
