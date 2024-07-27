import type { IGoodsAddition } from '@xiaoshop/schema'
import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity('shop_goods_addition', {
  comment: '商品附加服务表',
})
@Index('idx_shop_goods_addition', ['sort', 'updatedTime'])
export class GoodsAddition implements IGoodsAddition {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true, primaryKeyConstraintName: 'pk_shop_goods_addition' })
  id: number

  @Column({ type: 'varchar', length: 32, nullable: false, default: '', comment: '服务名称' })
  name: string

  @Column({ type: 'varchar', length: 200, nullable: false, default: '', comment: '服务介绍' })
  desc: string

  @Column({ type: 'varchar', length: 200, nullable: false, default: '', comment: '服务图标' })
  icon: string

  @Column({ type: 'float', unsigned: true, default: 0, comment: '服务价格' })
  price: number

  @Column({ type: 'int', unsigned: true, default: 1, comment: '排序' })
  sort: number

  @CreateDateColumn({ name: 'created_time', update: false, type: 'datetime', default: null, comment: '创建时间' })
  createdTime: string

  @UpdateDateColumn({ name: 'updated_time', type: 'datetime', default: null, comment: '更新时间' })
  updatedTime: string
}
