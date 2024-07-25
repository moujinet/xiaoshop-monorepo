import type { IGoodsProtection } from '@xiaoshop/schema'
import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity('shop_goods_protection', {
  comment: '商品保障服务表',
  orderBy: {
    sort: 'ASC',
    updatedTime: 'DESC',
  },
})
@Index('idx_shop_goods_protection', ['sort', 'updatedTime'])
export class GoodsProtection implements IGoodsProtection {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true, primaryKeyConstraintName: 'pk_shop_goods_protection' })
  id: number

  @Column({ type: 'varchar', length: 32, nullable: false, default: '', comment: '服务名称' })
  name: string

  @Column({ type: 'varchar', length: 200, nullable: false, default: '', comment: '服务介绍' })
  desc: string

  @Column({ type: 'varchar', length: 200, nullable: false, default: '', comment: '服务图标' })
  icon: string

  @Column({ type: 'int', unsigned: true, default: 1, comment: '排序' })
  sort: number

  @CreateDateColumn({ name: 'created_time', update: false, type: 'datetime', default: null, comment: '创建时间' })
  createdTime: string

  @UpdateDateColumn({ name: 'updated_time', type: 'datetime', default: null, comment: '更新时间' })
  updatedTime: string
}
