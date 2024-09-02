import {
  type IProductExport,
  type IProductExportConditions,
  type IProductExportStatus,
  ProductExportStatus,
} from '@xiaoshop/shared'
import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn } from 'typeorm'

@Entity({
  name: 'shop_product_export',
  comment: '商品导出记录表',
})
@Index('IDX_shop_product_export', ['status', 'createdTime'])
export class ProductExport implements IProductExport {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number

  @Column({ type: 'varchar', length: 32, nullable: false, default: ProductExportStatus.PENDING, comment: '导出状态' })
  status: IProductExportStatus

  @Column({ type: 'simple-json', default: null, comment: '导出条件' })
  conditions: IProductExportConditions

  @Column({ type: 'int', unsigned: true, default: 0, comment: '导出数量' })
  count: number

  @Column({ name: 'file_path', type: 'varchar', length: 255, nullable: false, default: '', comment: '导出文件路径' })
  filePath: string

  @CreateDateColumn({ name: 'created_time', type: 'datetime', update: false, default: null, comment: '导出时间' })
  createdTime: string
}
