import { EnabledEnum, type IEnabled, type IGoodsSpec, type IGoodsSpecValue } from '@xiaoshop/schema'
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'
import { Goods } from '@/goods/manage/entity'

@Entity('shop_goods_spec', {
  comment: '商品规格表',
  orderBy: {
    id: 'ASC',
  },
})
export class GoodsSpec implements IGoodsSpec {
  @PrimaryColumn({ type: 'char', length: 32, primaryKeyConstraintName: 'pk_shop_goods_spec' })
  id: string

  @Column({ type: 'varchar', length: 32, nullable: false, default: '', comment: '规格名' })
  name: string

  @Column({ type: 'simple-json', comment: '规格值' })
  values: IGoodsSpecValue[]

  @Column({ name: 'enable_image', type: 'char', nullable: false, default: EnabledEnum.NO, comment: '启用图片 (N:否 Y:是)' })
  enableImage: IEnabled

  @ManyToOne(() => Goods, { createForeignKeyConstraints: false })
  @JoinColumn()
  goods: Goods
}
