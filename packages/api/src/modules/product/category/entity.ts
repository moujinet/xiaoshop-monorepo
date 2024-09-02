import type { IProductCategory } from '@xiaoshop/shared'
import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity({
  name: 'shop_product_category',
  comment: '商品分类表',
})
@Index('IDX_shop_product_category', ['sort', 'updatedTime'])
export class ProductCategory implements IProductCategory {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number

  @Column({ type: 'int', unsigned: true, default: 0, comment: '父分类 ID' })
  parentId: number

  @Column({ type: 'varchar', length: 32, nullable: false, default: '', comment: '分类名称' })
  name: string

  @Column({ type: 'varchar', length: 255, nullable: false, default: '', comment: '分类图片' })
  image: string

  @Column({ type: 'varchar', length: 255, nullable: false, default: '', comment: '分类描述' })
  desc: string

  @Column({ type: 'int', unsigned: true, default: 1, comment: '排序' })
  sort: number

  @CreateDateColumn({ name: 'created_time', type: 'datetime', update: false, default: null, comment: '创建时间' })
  createdTime: string

  @UpdateDateColumn({ name: 'updated_time', type: 'datetime', default: null, comment: '更新时间' })
  updatedTime: string
}
