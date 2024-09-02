import type { IProductCommitment } from '@xiaoshop/shared'
import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity({
  name: 'shop_product_commitment',
  comment: '商品服务承诺表',
})
@Index('IDX_shop_product_commitment', ['sort', 'updatedTime'])
export class ProductCommitment implements IProductCommitment {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number

  @Column({ type: 'varchar', length: 32, nullable: false, default: '', comment: '服务承诺名称' })
  name: string

  @Column({ type: 'varchar', length: 32, nullable: false, default: '', comment: '服务承诺图标' })
  icon: string

  @Column({ type: 'varchar', length: 255, nullable: false, default: '', comment: '服务承诺描述' })
  desc: string

  @Column({ type: 'int', unsigned: true, default: 1, comment: '排序' })
  sort: number

  @CreateDateColumn({ name: 'created_time', type: 'datetime', update: false, default: null, comment: '创建时间' })
  createdTime: string

  @UpdateDateColumn({ name: 'updated_time', type: 'datetime', default: null, comment: '更新时间' })
  updatedTime: string
}
