import type { IGoodsAttributeTemplate, IGoodsAttributeTemplateOption } from '@xiaoshop/schema'
import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity('shop_goods_attribute_template', {
  comment: '商品参数模板表',
})
@Index('idx_shop_goods_attribute_template', ['updatedTime'])
export class GoodsAttributeTemplate implements IGoodsAttributeTemplate {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true, primaryKeyConstraintName: 'pk_shop_goods_attribute_template' })
  id: number

  @Column({ type: 'varchar', length: 32, nullable: false, default: '', comment: '模板名称' })
  name: string

  @Column({ type: 'varchar', length: 200, nullable: false, default: '', comment: '模板介绍' })
  desc: string

  @Column({ type: 'simple-json', default: null, comment: '模板参数选项' })
  options: IGoodsAttributeTemplateOption[]

  @CreateDateColumn({ name: 'created_time', update: false, type: 'datetime', default: null, comment: '创建时间' })
  createdTime: string

  @UpdateDateColumn({ name: 'updated_time', type: 'datetime', default: null, comment: '更新时间' })
  updatedTime: string
}
