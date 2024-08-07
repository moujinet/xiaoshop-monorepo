import {
  GoodsExportRecordStatus,
  type IGoodsExportConditions,
  type IGoodsExportRecord,
  type IGoodsExportRecordStatus,
} from '@xiaoshop/schema'
import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn } from 'typeorm'

@Entity('shop_goods_export', {
  comment: '商品导出记录表',
})
@Index('IDX_shop_goods_export', ['status', 'createdTime'])
export class GoodsExportRecord implements IGoodsExportRecord {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true, primaryKeyConstraintName: 'PK_shop_goods_export' })
  id: number

  @Column({ type: 'varchar', length: 32, nullable: false, default: GoodsExportRecordStatus.PENDING, comment: '导出状态' })
  status: IGoodsExportRecordStatus

  @Column({ type: 'simple-json', default: null, comment: '导出条件' })
  conditions: IGoodsExportConditions

  @Column({ type: 'int', unsigned: true, default: 1, comment: '导出数量' })
  count: number

  @Column({ type: 'varchar', length: 255, nullable: false, default: '', comment: '导出结果' })
  result: string

  @CreateDateColumn({ name: 'created_time', update: false, type: 'datetime', default: null, comment: '创建时间' })
  createdTime: string
}
