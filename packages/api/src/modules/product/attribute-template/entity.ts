import type {
  IProductAttributeTemplate,
  IProductAttributeTemplateOption,
} from '@xiaoshop/shared'
import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity({
  name: 'shop_product_attribute_template',
  comment: '商品参数模板表',
})
@Index('IDX_shop_product_attribute_template', ['updatedTime'])
export class ProductAttributeTemplate implements IProductAttributeTemplate {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number

  @Column({ type: 'varchar', length: 32, nullable: false, default: '', comment: '参数模板名称' })
  name: string

  @Column({ type: 'varchar', length: 255, nullable: false, default: '', comment: '参数模板描述' })
  desc: string

  @Column({ type: 'simple-json', default: null, comment: '参数模板选项' })
  options: IProductAttributeTemplateOption[]

  @CreateDateColumn({ name: 'created_time', type: 'datetime', update: false, default: null, comment: '创建时间' })
  createdTime: string

  @UpdateDateColumn({ name: 'updated_time', type: 'datetime', default: null, comment: '更新时间' })
  updatedTime: string
}
