import type { IProductSkuAttribute } from '@xiaoshop/shared'

import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Relation } from 'typeorm'

import { ProductEntity } from '../product/entity'

@Entity('product_sku', {
  comment: '商品多规格信息',
})
@Index('IDX_product_sku', ['connectId', 'skuCode'])
@Index('IDX_product_sku_product', ['productId', 'productConnectId'])
export class ProductSkuEntity {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number

  @Column({ name: 'connect_id', type: 'char', length: 36, nullable: false, default: '', comment: 'SKU 云链 ID' })
  connectId: string

  @Column({ name: 'product_id', type: 'int', unsigned: true, default: 0, comment: '商品 ID' })
  productId: number

  @ManyToOne(() => ProductEntity)
  @JoinColumn({ name: 'product_id' })
  product: Relation<ProductEntity>

  @Column({ name: 'product_connect_id', type: 'char', length: 36, nullable: false, default: '', comment: '商品云链 ID' })
  productConnectId: string

  @Column({ type: 'char', length: 16, nullable: false, default: '', comment: 'SKU 编码' })
  skuCode: string

  @Column({ type: 'varchar', length: 64, nullable: false, default: '', comment: 'SKU 名称' })
  name: string

  @Column({ type: 'varchar', length: 200, nullable: false, default: '', comment: 'SKU 图片' })
  image: string

  @Column({ type: 'simple-json', default: null, comment: 'SKU 属性' })
  attributes: IProductSkuAttribute[]

  @Column({ type: 'float', precision: 10, scale: 2, default: 0, unsigned: true, comment: '单价' })
  price: number

  @Column({ name: 'original_price', type: 'float', precision: 10, scale: 2, default: 0, unsigned: true, comment: '原价' })
  originalPrice: number

  @Column({ name: 'cost_price', type: 'float', precision: 10, scale: 2, default: 0, unsigned: true, comment: '成本价' })
  costPrice: number

  @Column({ type: 'float', default: 0, unsigned: true, comment: '库存数量' })
  quantity: number

  @Column({ type: 'int', default: 0, unsigned: true, comment: '库存预警值' })
  threshold: number

  @Column({ type: 'float', precision: 10, scale: 2, default: 0, unsigned: true, comment: '重量' })
  weight: number

  @Column({ type: 'float', precision: 10, scale: 2, default: 0, unsigned: true, comment: '体积' })
  volume: number

  @Column({ type: 'char', length: 8, default: '', comment: '商品单位' })
  unit: string
}
