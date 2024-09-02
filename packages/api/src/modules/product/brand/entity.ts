import type { IProductBrand } from '@xiaoshop/shared'
import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity({
  name: 'shop_product_brand',
  comment: '商品品牌信息表',
})
@Index('IDX_shop_product_brand', ['sort', 'updatedTime'])
export class ProductBrand implements IProductBrand {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number

  @Column({ type: 'varchar', length: 32, nullable: false, default: '', comment: '品牌名称' })
  name: string

  @Column({ type: 'varchar', length: 255, nullable: false, default: '', comment: '品牌 LOGO' })
  logo: string

  @Column({ type: 'varchar', length: 255, nullable: false, default: '', comment: '品牌描述' })
  desc: string

  @Column({ type: 'int', unsigned: true, default: 1, comment: '排序' })
  sort: number

  @CreateDateColumn({ name: 'created_time', type: 'datetime', update: false, default: null, comment: '创建时间' })
  createdTime: string

  @UpdateDateColumn({ name: 'updated_time', type: 'datetime', default: null, comment: '更新时间' })
  updatedTime: string
}
