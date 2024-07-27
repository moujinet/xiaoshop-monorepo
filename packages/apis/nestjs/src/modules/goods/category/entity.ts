import type { IGoodsCategory } from '@xiaoshop/schema'
import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity('shop_goods_category', {
  comment: '商品分类表',
})
@Index('idx_shop_goods_category', ['sort', 'parentId', 'updatedTime'])
export class GoodsCategory implements IGoodsCategory {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true, primaryKeyConstraintName: 'pk_shop_goods_category' })
  id: number

  @Column({ name: 'parent_id', type: 'int', unsigned: true, default: 0, comment: '父分类 ID' })
  parentId: number

  @Column({ type: 'varchar', length: 32, nullable: false, default: '', comment: '分类名称' })
  name: string

  @Column({ type: 'varchar', length: 200, nullable: false, default: '', comment: '分类图片' })
  image: string

  @Column({ type: 'int', unsigned: true, default: 1, comment: '排序' })
  sort: number

  @CreateDateColumn({ name: 'created_time', update: false, type: 'datetime', default: null, comment: '创建时间' })
  createdTime: string

  @UpdateDateColumn({ name: 'updated_time', type: 'datetime', default: null, comment: '更新时间' })
  updatedTime: string
}
