import { Column, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity('product_group', {
  comment: '商品分组',
})
@Index('IDX_product_group', ['sort'])
export class ProductGroupEntity {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number

  @Column({ type: 'varchar', length: 32, nullable: false, default: '', comment: '分组名称' })
  name: string

  @Column({ type: 'varchar', length: 200, nullable: false, default: '', comment: '分组介绍' })
  desc: string

  @Column({ type: 'int', default: 1, unsigned: true, comment: '排序' })
  sort: number

  @UpdateDateColumn({ name: 'updated_time', type: 'datetime', default: null, comment: '更新时间' })
  updatedTime: string
}
