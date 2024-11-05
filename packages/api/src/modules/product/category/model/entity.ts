import { Column, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity('product_category', {
  comment: '商品管理分类',
})
@Index('IDX_product_category', ['sort'])
export class ProductCategoryEntity {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number

  @Column({ name: 'parent_id', type: 'int', default: 0, unsigned: true, comment: '父分类 ID' })
  parentId: number

  @Column({ type: 'varchar', length: 32, nullable: false, default: '', comment: '分类名称' })
  name: string

  @Column({ type: 'varchar', length: 200, nullable: false, default: '', comment: '分类描述' })
  desc: string

  @Column({ type: 'varchar', length: 100, nullable: false, default: '', comment: '分类图片' })
  image: string

  @Column({ type: 'int', default: 1, unsigned: true, comment: '排序' })
  sort: number

  @UpdateDateColumn({ name: 'updated_time', type: 'datetime', default: null, comment: '更新时间' })
  updatedTime: string
}
