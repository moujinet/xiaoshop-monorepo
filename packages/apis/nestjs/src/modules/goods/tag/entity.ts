import type { IGoodsTag } from '@xiaoshop/schema'
import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity('shop_goods_tag', {
  comment: '商品标签表',
})
@Index('IDX_shop_goods_tag', ['sort', 'updatedTime'])
export class GoodsTag implements IGoodsTag {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true, primaryKeyConstraintName: 'PK_shop_goods_tag' })
  id: number

  @Column({ type: 'varchar', length: 32, nullable: false, default: '', comment: '标签名称' })
  name: string

  @Column({ type: 'int', unsigned: true, default: 1, comment: '排序' })
  sort: number

  @CreateDateColumn({ name: 'created_time', update: false, type: 'datetime', default: null, comment: '创建时间' })
  createdTime: string

  @UpdateDateColumn({ name: 'updated_time', type: 'datetime', default: null, comment: '更新时间' })
  updatedTime: string
}
