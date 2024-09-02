import {
  ColorName,
  type IColorName,
  type IProductTag,
} from '@xiaoshop/shared'
import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity({
  name: 'shop_product_tag',
  comment: '商品标签信息表',
})
@Index('IDX_shop_product_tag', ['updatedTime'])
export class ProductTag implements IProductTag {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number

  @Column({ type: 'varchar', length: 32, nullable: false, default: '', comment: '标签名称' })
  name: string

  @Column({ type: 'varchar', length: 32, nullable: false, default: ColorName.GRAY, comment: '标签颜色' })
  color: IColorName

  @CreateDateColumn({ name: 'created_time', type: 'datetime', update: false, default: null, comment: '创建时间' })
  createdTime: string

  @UpdateDateColumn({ name: 'updated_time', type: 'datetime', default: null, comment: '更新时间' })
  updatedTime: string
}
