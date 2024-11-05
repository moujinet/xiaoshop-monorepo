import type { IColorName } from '@xiaoshop/shared'

import { Column, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity('product_tag', {
  comment: '商品标签',
})
@Index('IDX_product_tag', ['updatedTime'])
export class ProductTagEntity {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number

  @Column({ type: 'varchar', length: 32, nullable: false, default: '', comment: '标签名称' })
  name: string

  @Column({ type: 'varchar', length: 16, nullable: false, default: '', comment: '标签颜色' })
  color: IColorName

  @UpdateDateColumn({ name: 'updated_time', type: 'datetime', default: null, comment: '更新时间' })
  updatedTime: string
}
