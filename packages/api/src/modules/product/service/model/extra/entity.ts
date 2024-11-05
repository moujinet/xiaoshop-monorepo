import { Column, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity('product_service_extra', {
  comment: '商品服务保障',
})
@Index('IDX_product_service_extra', ['sort'])
export class ProductServiceExtraEntity {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number

  @Column({ type: 'varchar', length: 32, nullable: false, default: '', comment: '服务名称' })
  name: string

  @Column({ type: 'varchar', length: 32, nullable: false, default: '', comment: '服务图标' })
  icon: string

  @Column({ type: 'varchar', length: 32, nullable: false, default: '', comment: '服务描述' })
  desc: string

  @Column({ type: 'int', default: 1, unsigned: true, comment: '排序' })
  sort: number

  @UpdateDateColumn({ name: 'updated_time', type: 'datetime', default: null, comment: '更新时间' })
  updatedTime: string
}
