import { Enabled, type IEnabled, type IGoodsSpec, type IGoodsSpecValue } from '@xiaoshop/schema'
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'
import { Goods } from '@/goods/manage/entity'

@Entity('shop_goods_spec', {
  comment: '商品规格表',
})
export class GoodsSpec implements IGoodsSpec {
  @PrimaryColumn({ type: 'char', length: 32, primaryKeyConstraintName: 'PK_shop_goods_spec' })
  id: string

  @Column({ name: 'goods_id', type: 'char', length: 32, nullable: false, default: '', comment: '商品 ID' })
  goodsId: string

  @Column({ type: 'varchar', length: 32, nullable: false, default: '', comment: '规格名' })
  name: string

  @Column({ type: 'simple-json', default: null, comment: '规格值' })
  values: IGoodsSpecValue[]

  @Column({ name: 'enable_image', type: 'char', length: 1, nullable: false, default: Enabled.NO, comment: '启用图片 (N:否 Y:是)' })
  enableImage: IEnabled

  @ManyToOne(() => Goods, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'goods_id' })
  goods: Goods
}
