import type { IProductAddition } from '@xiaoshop/shared'
import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity({
  name: 'shop_product_addition',
  comment: '商品附加服务表',
})
@Index('IDX_shop_product_addition', ['sort', 'updatedTime'])
export class ProductAddition implements IProductAddition {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number

  @Column({ type: 'varchar', length: 32, nullable: false, default: '', comment: '附加服务名称' })
  name: string

  @Column({ type: 'varchar', length: 32, nullable: false, default: '', comment: '附加服务图标' })
  icon: string

  @Column({ type: 'varchar', length: 255, nullable: false, default: '', comment: '附加服务描述' })
  desc: string

  @Column({ type: 'float', unsigned: true, default: 0, comment: '附加服务价格' })
  price: number

  @Column({ type: 'int', unsigned: true, default: 1, comment: '排序' })
  sort: number

  @CreateDateColumn({ name: 'created_time', type: 'datetime', update: false, default: null, comment: '创建时间' })
  createdTime: string

  @UpdateDateColumn({ name: 'updated_time', type: 'datetime', default: null, comment: '更新时间' })
  updatedTime: string
}
