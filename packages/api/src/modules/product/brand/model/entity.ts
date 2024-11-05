import { Column, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity('product_brand', {
  comment: '商品品牌',
})
@Index('IDX_product_brand', ['sort'])
export class ProductBrandEntity {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number

  @Column({ type: 'varchar', length: 32, nullable: false, default: '', comment: '品牌名称' })
  name: string

  @Column({ type: 'varchar', length: 100, nullable: false, default: '', comment: '品牌 LOGO' })
  logo: string

  @Column({ type: 'varchar', length: 200, nullable: false, default: '', comment: '品牌介绍' })
  desc: string

  @Column({ type: 'int', default: 1, unsigned: true, comment: '排序' })
  sort: number

  @UpdateDateColumn({ name: 'updated_time', type: 'datetime', default: null, comment: '更新时间' })
  updatedTime: string
}
