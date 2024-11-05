import type { IProductAttributeTemplateOption } from '@xiaoshop/shared'

import { Column, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity('product_attribute_template', {
  comment: '商品参数模板',
})
@Index('IDX_product_attribute_template', ['updatedTime'])
export class ProductAttributeTemplateEntity {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number

  @Column({ type: 'varchar', length: 32, nullable: false, default: '', comment: '参数模板名称' })
  name: string

  @Column({ type: 'varchar', length: 200, nullable: false, default: '', comment: '参数模板描述' })
  desc: string

  @Column({ type: 'simple-json', default: null, comment: '参数模板选项' })
  options: IProductAttributeTemplateOption[]

  @UpdateDateColumn({ name: 'updated_time', type: 'datetime', default: null, comment: '更新时间' })
  updatedTime: string
}
