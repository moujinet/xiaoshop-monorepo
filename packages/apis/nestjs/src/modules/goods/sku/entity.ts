import type { IGoodsSku, IGoodsSkuSpec } from '@xiaoshop/schema'
import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'
import { Goods } from '@/goods/manage/entity'

@Entity('shop_goods_sku', {
  comment: '商品 SKU 表',
})
@Index('idx_shop_goods_sku', ['skuCode'], { unique: true })
export class GoodsSku implements IGoodsSku {
  @PrimaryColumn({ type: 'char', length: 32, primaryKeyConstraintName: 'pk_shop_goods_sku' })
  id: string

  @Column({ name: 'sku_code', type: 'char', length: 32, nullable: false, default: '', comment: 'SKU 编码' })
  skuCode: string

  @Column({ type: 'varchar', length: 200, nullable: false, default: '', comment: 'SKU 图片' })
  image: string

  @Column({ type: 'varchar', length: 100, nullable: false, default: '', comment: '商品名称' })
  name: string

  @Column({ type: 'simple-json', default: null, comment: '商品规格' })
  specs: IGoodsSkuSpec[]

  @Column({ type: 'float', unsigned: true, default: 0, comment: '商品价格' })
  price: number

  @Column({ name: 'original_price', type: 'float', unsigned: true, default: 0, comment: '商品原价' })
  originalPrice: number

  @Column({ name: 'cost_price', type: 'float', unsigned: true, default: 0, comment: '商品成本价' })
  costPrice: number

  @Column({ type: 'int', unsigned: true, default: 0, comment: '商品库存' })
  inventory: number

  @Column({ name: 'inventory_early_warning', type: 'int', unsigned: true, default: 0, comment: '预警库存' })
  inventoryEarlyWarning: number

  @Column({ type: 'float', unsigned: true, default: 0, comment: '商品重量' })
  weight: number

  @Column({ type: 'float', unsigned: true, default: 0, comment: '商品体积' })
  volume: number

  @Column({ type: 'int', unsigned: true, default: 0, comment: '商品销量' })
  sales: number

  @ManyToOne(() => Goods, { createForeignKeyConstraints: false })
  @JoinColumn()
  goods: Goods
}
