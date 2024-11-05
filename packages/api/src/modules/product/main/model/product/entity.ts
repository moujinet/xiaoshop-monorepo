import type {
  IProductAttribute,
  LogisticDeliveryMethod,
  ProductBuyBtnType,
  ProductFreightChargeMode,
  ProductPublishMode,
  ProductReturnsFreightBy,
  ProductSource,
  ProductStatus,
  ProductType,
  YesOrNo,
} from '@xiaoshop/shared'

import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

import { ProductTagEntity } from '@/product/tag/model/entity'
import { ProductBrandEntity } from '@/product/brand/model/entity'
import { ProductGroupEntity } from '@/product/group/model/entity'
import { ProductCategoryEntity } from '@/product/category/model/entity'
import { LogisticFreightTemplateEntity } from '@/logistic/freight/model/entity'
import { ProductServiceExtraEntity } from '@/product/service/model/extra/entity'
import { ProductServiceAdditionEntity } from '@/product/service/model/addition/entity'

import { ProductSkuEntity } from '../sku/entity'

@Entity('product', {
  comment: '商品信息',
})
@Index('IDX_product', ['status', 'sort', 'onSaleTime'])
@Index('IDX_product_search', ['status', 'name', 'desc', 'slogan', 'sort', 'onSaleTime'])
@Index('IDX_product_connect', ['connectId'])
export class ProductEntity {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number

  @Column({ name: 'connect_id', type: 'char', length: 36, nullable: false, default: '', comment: '商品云链 ID' })
  connectId: string

  @Column({ type: 'tinyint', unsigned: true, default: 0, comment: '商品类型' })
  type: ProductType

  @Column({ type: 'tinyint', unsigned: true, default: 0, comment: '商品状态' })
  status: ProductStatus

  @Column({ type: 'tinyint', unsigned: true, default: 0, comment: '商品来源' })
  source: ProductSource

  @Column({ type: 'varchar', length: 100, nullable: false, default: '', comment: '商品名称' })
  name: string

  @Column({ type: 'varchar', length: 36, nullable: false, default: '', comment: '商品分享描述' })
  desc: string

  @Column({ type: 'varchar', length: 60, nullable: false, default: '', comment: '商品卖点' })
  slogan: string

  @Column({ type: 'simple-array', default: null, comment: '商品图片' })
  images: string[]

  @Column({ type: 'varchar', length: 100, nullable: false, default: '', comment: '商品视频' })
  video: string

  @Column({ name: 'brand_id', type: 'int', default: 0, unsigned: true, comment: '商品品牌 ID' })
  brandId: number

  @OneToOne(() => ProductBrandEntity, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'brand_id' })
  brand: ProductBrandEntity

  @ManyToMany(() => ProductCategoryEntity, { createForeignKeyConstraints: false })
  @JoinTable({ name: 'product_has_categories', joinColumn: { name: 'product_id' }, inverseJoinColumn: { name: 'category_id' } })
  categories: ProductCategoryEntity[]

  @ManyToMany(() => ProductTagEntity, { createForeignKeyConstraints: false })
  @JoinTable({ name: 'product_has_tags', joinColumn: { name: 'product_id' }, inverseJoinColumn: { name: 'tag_id' } })
  tags: ProductTagEntity[]

  @ManyToMany(() => ProductGroupEntity, { createForeignKeyConstraints: false })
  @JoinTable({ name: 'product_has_groups', joinColumn: { name: 'product_id' }, inverseJoinColumn: { name: 'group_id' } })
  groups: ProductGroupEntity[]

  @ManyToMany(() => ProductServiceAdditionEntity, { createForeignKeyConstraints: false })
  @JoinTable({ name: 'product_has_addition_services', joinColumn: { name: 'product_id' }, inverseJoinColumn: { name: 'service_id' } })
  additions: ProductServiceAdditionEntity[]

  @ManyToMany(() => ProductServiceExtraEntity, { createForeignKeyConstraints: false })
  @JoinTable({ name: 'product_has_extra_services', joinColumn: { name: 'product_id' }, inverseJoinColumn: { name: 'service_id' } })
  extras: ProductServiceExtraEntity[]

  @OneToMany(() => ProductSkuEntity, t => t.product, { createForeignKeyConstraints: false })
  skus: ProductSkuEntity[]

  @Column({ type: 'float', precision: 10, scale: 2, default: 0, unsigned: true, comment: '单价 (冗余 SKU 最低价)' })
  price: number

  @Column({ type: 'int', default: 0, unsigned: true, comment: '库存 (合计 SKU 库存)' })
  inventory: number

  @Column({ type: 'int', default: 1, unsigned: true, comment: '排序' })
  sort: number

  @Column({ name: 'is_enable_vip_discount', type: 'tinyint', unsigned: true, default: 0, comment: '是否开启会员折扣' })
  isEnableVipDiscount: YesOrNo

  @Column({ name: 'is_enable_limits', type: 'tinyint', unsigned: true, default: 0, comment: '是否开启限购' })
  isEnableLimits: YesOrNo

  @Column({ name: 'limits_max_qty', type: 'int', default: 0, unsigned: true, comment: '限购数量' })
  limitsMaxQty: number

  @Column({ name: 'limits_min_qty', type: 'int', default: 1, unsigned: true, comment: '最低购买数量' })
  limitsMinQty: number

  @Column({ name: 'delivery_methods', type: 'simple-array', default: null, comment: '发货方式' })
  deliveryMethods: LogisticDeliveryMethod[]

  @Column({ name: 'freight_charge_mode', type: 'tinyint', unsigned: true, default: 0, comment: '运费计算方式' })
  freightChargeMode: ProductFreightChargeMode

  @Column({ type: 'float', precision: 10, scale: 2, unsigned: true, default: 0, comment: '统一运费' })
  freight: number

  @Column({ name: 'freight_template_id', type: 'int', unsigned: true, default: 0, comment: '运费模板 ID' })
  freightTemplateId: number

  @OneToOne(() => LogisticFreightTemplateEntity, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'freight_template_id' })
  template: LogisticFreightTemplateEntity

  @Column({ name: 'returns_freight_by', type: 'tinyint', unsigned: true, default: 0, comment: '退货运费承担方' })
  returnsFreightBy: ProductReturnsFreightBy

  @Column({ name: 'buy_btn_name_type', type: 'tinyint', unsigned: true, default: 0, comment: '购买按钮名称类型' })
  buyBtnNameType: ProductBuyBtnType

  @Column({ name: 'buy_btn_name', type: 'varchar', length: 32, nullable: false, default: '', comment: '购买按钮名称' })
  buyBtnName: string

  @Column({ name: 'publish_mode', type: 'tinyint', unsigned: true, default: 0, comment: '发布方式' })
  publishMode: ProductPublishMode

  @Column({ name: 'auto_on_sale_at', type: 'datetime', default: null, comment: '自动上架时间' })
  autoOnSaleAt: string

  @Column({ type: 'int', default: 0, unsigned: true, comment: '累计销量' })
  sales: number

  @Column({ type: 'int', default: 0, unsigned: true, comment: '累计浏览量' })
  views: number

  @Column({ type: 'int', default: 0, unsigned: true, comment: '累计收藏量' })
  favorites: number

  @Column({ name: 'overall_score', type: 'float', precision: 1, scale: 1, default: 0, unsigned: true, comment: '综合评价' })
  overallScore: number

  @Column({ name: 'overall_product_score', type: 'float', precision: 1, scale: 1, default: 0, unsigned: true, comment: '综合商品评分' })
  overallProductScore: number

  @Column({ name: 'overall_service_score', type: 'float', precision: 1, scale: 1, default: 0, unsigned: true, comment: '综合服务评分' })
  overallServiceScore: number

  @Column({ name: 'overall_logistics_score', type: 'float', precision: 1, scale: 1, default: 0, unsigned: true, comment: '综合物流评分' })
  overallLogisticsScore: number

  @Column({ type: 'simple-json', default: null, comment: '商品参数' })
  attributes: IProductAttribute[]

  @Column({ type: 'text', default: null, comment: '商品详情' })
  content: string

  @Column({ name: 'is_multi_skus', type: 'tinyint', unsigned: true, default: 0, comment: '是否为多规格商品' })
  isMultiSkus: YesOrNo

  @Column({ name: 'is_warning', type: 'tinyint', unsigned: true, default: 0, comment: '是否预警中' })
  isWarning: YesOrNo

  @Column({ name: 'is_deleted', type: 'tinyint', unsigned: true, default: 0, comment: '是否已删除' })
  isDeleted: YesOrNo

  @CreateDateColumn({ name: 'created_time', type: 'datetime', default: null, update: false, comment: '创建时间' })
  createdTime: string

  @UpdateDateColumn({ name: 'updated_time', type: 'datetime', default: null, comment: '更新时间' })
  updatedTime: string

  @Column({ name: 'on_sale_time', type: 'datetime', default: null, comment: '上架时间' })
  onSaleTime: string

  @Column({ name: 'stocked_time', type: 'datetime', default: null, comment: '下架时间' })
  stockedTime: string

  @Column({ name: 'sold_out_time', type: 'datetime', default: null, comment: '售罄时间' })
  soldOutTime: string

  @Column({ name: 'deleted_time', type: 'datetime', default: null, comment: '删除时间' })
  deletedTime: string
}
