import type {
  IProduct,
  IProductSku,
  IProductSkuAttribute,
} from '@xiaoshop/shared'
import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Product } from '@/product/product/entity'

@Entity({
  name: 'shop_product_sku',
  comment: '商品 SKU 信息表',
})
@Index('IDX_shop_product_sku', ['productId', 'skuCode', 'price', 'inventory', 'sales'])
export class ProductSku implements IProductSku {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number

  @Column({ type: 'char', length: 36, primary: true, unique: true, nullable: false, default: '', comment: 'SKU UUID' })
  uuid: string

  @Column({ name: 'product_id', type: 'int', unsigned: true, default: 0, comment: '商品 ID' })
  productId: number

  @Column({ name: 'product_uuid', type: 'char', length: 36, nullable: false, default: '', comment: '商品 UUID' })
  productUuid: string

  @ManyToOne(() => Product, product => product.skus, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'product_id' })
  product: IProduct

  @Column({ name: 'sku_code', type: 'char', length: 32, nullable: false, default: '', comment: 'SKU 编码' })
  skuCode: string

  @Column({ type: 'varchar', length: 255, nullable: false, default: '', comment: 'SKU 名称' })
  name: string

  @Column({ type: 'simple-json', default: null, comment: 'SKU 属性' })
  attributes: IProductSkuAttribute[]

  @Column({ type: 'varchar', length: 255, nullable: false, default: '', comment: 'SKU 图片' })
  image: string

  @Column({ type: 'float', unsigned: true, default: 0, comment: '单价' })
  price: number

  @Column({ name: 'original_price', type: 'float', unsigned: true, default: 0, comment: '原价' })
  originalPrice: number

  @Column({ name: 'cost_price', type: 'float', unsigned: true, default: 0, comment: '成本价' })
  costPrice: number

  @Column({ type: 'int', unsigned: true, default: 0, comment: '库存' })
  inventory: number

  @Column({ name: 'inventory_early_warning', type: 'int', unsigned: true, default: 0, comment: '预警库存' })
  inventoryEarlyWarning: number

  @Column({ type: 'float', unsigned: true, default: 0, comment: '重量' })
  weight: number

  @Column({ type: 'float', unsigned: true, default: 0, comment: '体积' })
  volume: number

  @Column({ type: 'varchar', length: 32, nullable: false, default: '', comment: '单位' })
  unit: string

  @Column({ type: 'int', unsigned: true, default: 0, comment: '销量' })
  sales: number
}
