import { Column, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity('product_service_addition', {
  comment: '商品附加服务',
})
@Index('IDX_product_service_addition', ['sort'])
export class ProductServiceAdditionEntity {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number

  @Column({ type: 'varchar', length: 32, nullable: false, default: '', comment: '服务名称' })
  name: string

  @Column({ type: 'varchar', length: 32, nullable: false, default: '', comment: '服务图标' })
  icon: string

  @Column({ type: 'varchar', length: 32, nullable: false, default: '', comment: '服务描述' })
  desc: string

  @Column({ type: 'float', precision: 10, scale: 2, default: 0, unsigned: true, comment: '服务价格' })
  price: number

  @Column({ type: 'int', default: 1, unsigned: true, comment: '排序' })
  sort: number

  @UpdateDateColumn({ name: 'updated_time', type: 'datetime', default: null, comment: '更新时间' })
  updatedTime: string
}
