import {
  type ILogisticsDeliveryMethod,
  type IProduct,
  type IProductAddition,
  type IProductAttribute,
  type IProductBrand,
  type IProductBuyBtnType,
  type IProductCategoryDict,
  type IProductCommitment,
  type IProductFreightChargeMode,
  type IProductGroup,
  type IProductInventoryDeductMode,
  type IProductPublishMode,
  type IProductRatingGrade,
  type IProductReturnsFreightBy,
  type IProductSku,
  type IProductSource,
  type IProductStatus,
  type IProductTag,
  type IProductType,
  type IYesOrNo,
  ProductBuyBtnType,
  ProductFreightChargeMode,
  ProductInventoryDeductMode,
  ProductPublishMode,
  ProductRatingGrade,
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
import { ProductSku } from '@/product/sku/entity'
import { ProductTag } from '@/product/tag/entity'
import { ProductBrand } from '@/product/brand/entity'
import { ProductGroup } from '@/product/group/entity'
import { ProductAddition } from '@/product/addition/entity'
import { ProductCategory } from '@/product/category/entity'
import { ProductCommitment } from '@/product/commitment/entity'

@Entity({
  name: 'shop_product',
  comment: '商品信息表',
})
@Index('IDX_shop_product', ['isDeleted', 'status', 'tagId', 'brandId', 'groupId', 'price', 'inventory', 'sort', 'createdTime'])
@Index('IDX_shop_product_uuid', ['uuid'], { unique: true })
export class Product implements IProduct {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number

  @Column({ type: 'char', length: 36, nullable: false, default: '', comment: '商品 UUID' })
  uuid: string

  @Column({ type: 'varchar', length: 32, nullable: false, default: ProductType.ENTITY, comment: '商品类型' })
  type: IProductType

  @Column({ type: 'varchar', length: 32, nullable: false, default: ProductStatus.DRAFT, comment: '商品状态' })
  status: IProductStatus

  @Column({ type: 'varchar', length: 32, nullable: false, default: ProductSource.MANUAL, comment: '商品来源' })
  source: IProductSource

  @OneToMany(() => ProductSku, sku => sku.product, { cascade: true, createForeignKeyConstraints: false })
  @JoinColumn({ name: 'id' })
  skus: IProductSku[]

  @ManyToMany(() => ProductCategory, { cascade: true, createForeignKeyConstraints: false })
  @JoinTable({ name: 'shop_product_has_categories', joinColumn: { name: 'product_id' }, inverseJoinColumn: { name: 'category_id' } })
  categories: IProductCategoryDict[]

  @Column({ name: 'tag_id', type: 'int', unsigned: true, default: 0, comment: '商品标签 ID' })
  tagId: number

  @OneToOne(() => ProductTag, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'tag_id' })
  tag: IProductTag

  @Column({ name: 'group_id', type: 'int', unsigned: true, default: 0, comment: '商品分组 ID' })
  groupId: number

  @OneToOne(() => ProductGroup, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'group_id' })
  group: IProductGroup

  @Column({ name: 'brand_id', type: 'int', unsigned: true, default: 0, comment: '商品品牌 ID' })
  brandId: number

  @OneToOne(() => ProductBrand, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'brand_id' })
  brand: IProductBrand

  @Column({ type: 'varchar', length: 100, nullable: false, default: '', comment: '商品名称' })
  name: string

  @Column({ type: 'varchar', length: 36, nullable: false, default: '', comment: '分享描述' })
  desc: string

  @Column({ type: 'varchar', length: 60, nullable: false, default: '', comment: '商品卖点' })
  slogan: string

  @Column({ type: 'simple-json', default: null, comment: '商品图片' })
  images: string[]

  @Column({ type: 'varchar', length: 255, nullable: false, default: '', comment: '商品视频' })
  video: string

  @Column({ type: 'simple-json', default: null, comment: '商品参数' })
  attributes: IProductAttribute[]

  @ManyToMany(() => ProductCommitment, { cascade: true, createForeignKeyConstraints: false })
  @JoinTable({ name: 'shop_product_has_commitments', joinColumn: { name: 'product_id' }, inverseJoinColumn: { name: 'commitment_id' } })
  commitments: IProductCommitment[]

  @ManyToMany(() => ProductAddition, { cascade: true, createForeignKeyConstraints: false })
  @JoinTable({ name: 'shop_product_has_additions', joinColumn: { name: 'product_id' }, inverseJoinColumn: { name: 'addition_id' } })
  additions: IProductAddition[]

  @Column({ type: 'float', unsigned: true, default: 0, comment: '商品价格' })
  price: number

  @Column({ type: 'int', unsigned: true, default: 0, comment: '商品库存' })
  inventory: number

  @Column({ name: 'enable_vip_discount', type: 'char', length: 1, default: YesOrNo.NO, comment: '是否开启会员折扣 (N:否 Y:是)' })
  enableVipDiscount: IYesOrNo

  @Column({ name: 'enable_purchase_limits', type: 'char', length: 1, default: YesOrNo.NO, comment: '是否开启限购 (N:否 Y:是)' })
  enablePurchaseLimits: IYesOrNo

  @Column({ name: 'purchase_max_qty', type: 'int', unsigned: true, default: 0, comment: '限购数量' })
  purchaseMaxQty: number

  @Column({ name: 'purchase_min_qty', type: 'int', unsigned: true, default: 1, comment: '最低购买数量' })
  purchaseMinQty: number

  @Column({ name: 'inventory_deduct_mode', type: 'varchar', length: 32, nullable: false, default: ProductInventoryDeductMode.PAID, comment: '库存扣减方式' })
  inventoryDeductMode: IProductInventoryDeductMode

  @Column({ name: 'delivery_methods', type: 'simple-json', default: null, comment: '发货方式' })
  deliveryMethods: ILogisticsDeliveryMethod[]

  @Column({ name: 'freight_charge_mode', type: 'varchar', length: 32, nullable: false, default: ProductFreightChargeMode.TEMPLATE, comment: '运费计算方式' })
  freightChargeMode: IProductFreightChargeMode

  @Column({ type: 'float', unsigned: true, default: 0, comment: '统一运费' })
  freight: number

  @Column({ name: 'freight_template_id', type: 'int', unsigned: true, default: 0, comment: '运费模板 ID' })
  freightTemplateId: number

  @Column({ name: 'returns_freight_by', type: 'varchar', length: 32, nullable: false, default: ProductReturnsFreightBy.BUYER, comment: '退货运费承担方' })
  returnsFreightBy: IProductReturnsFreightBy

  @Column({ name: 'publish_mode', type: 'varchar', length: 32, nullable: false, default: ProductPublishMode.DIRECT, comment: '发布方式' })
  publishMode: IProductPublishMode

  @Column({ name: 'auto_in_stock_at', type: 'datetime', default: null, comment: '自定义上架时间' })
  autoInStockAt: string

  @Column({ name: 'buy_btn_name_type', type: 'varchar', length: 32, nullable: false, default: ProductBuyBtnType.DEFAULT, comment: '商品购买按钮类型' })
  buyBtnNameType: IProductBuyBtnType

  @Column({ name: 'buy_btn_name', type: 'varchar', length: 32, nullable: false, default: '', comment: '商品购买按钮名称' })
  buyBtnName: string

  @Column({ type: 'text', default: null, comment: '商品详情' })
  detail: string

  @Column({ type: 'int', unsigned: true, default: 1, comment: '排序' })
  sort: number

  @Column({ type: 'int', unsigned: true, default: 0, comment: '商品销量' })
  sales: number

  @Column({ type: 'int', unsigned: true, default: 0, comment: '商品浏览量' })
  views: number

  @Column({ type: 'int', unsigned: true, default: 0, comment: '商品收藏量' })
  favorites: number

  @Column({ name: 'overall_grade', type: 'varchar', length: 32, nullable: false, default: ProductRatingGrade.HIGH, comment: '综合评级' })
  overallGrade: IProductRatingGrade

  @Column({ name: 'overall_goods_score', type: 'int', unsigned: true, default: 5, comment: '商品评分' })
  overallProductScore: number

  @Column({ name: 'overall_service_score', type: 'int', unsigned: true, default: 5, comment: '服务评分' })
  overallServiceScore: number

  @Column({ name: 'overall_logistics_score', type: 'int', unsigned: true, default: 5, comment: '物流评分' })
  overallLogisticsScore: number

  @Column({ name: 'is_multi_skus', type: 'char', length: 1, default: YesOrNo.NO, comment: '是否为多规格商品 (N:否 Y:是)' })
  isMultiSkus: IYesOrNo

  @Column({ name: 'is_deleted', type: 'char', length: 1, default: YesOrNo.NO, comment: '是否已删除 (N:否 Y:是)' })
  isDeleted: IYesOrNo

  @Column({ name: 'is_warning', type: 'char', length: 1, default: YesOrNo.NO, comment: '是否预警 (N:否 Y:是)' })
  isWarning: IYesOrNo

  @CreateDateColumn({ name: 'created_time', update: false, type: 'datetime', default: null, comment: '创建时间' })
  createdTime: string

  @UpdateDateColumn({ name: 'updated_time', type: 'datetime', default: null, comment: '更新时间' })
  updatedTime: string

  @Column({ name: 'deleted_time', type: 'datetime', default: null, comment: '删除时间' })
  deletedTime: string

  @Column({ name: 'on_sale_time', type: 'datetime', default: null, comment: '上架时间' })
  onSaleTime: string

  @Column({ name: 'stocked_time', type: 'datetime', default: null, comment: '下架时间' })
  stockedTime: string

  @Column({ name: 'sold_out_time', type: 'datetime', default: null, comment: '售罄时间' })
  soldOutTime: string
}
