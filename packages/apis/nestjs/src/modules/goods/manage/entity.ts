import type {
  IEnabled,
  IGoods,
  IGoodsAttribute,
  IGoodsBuyBtnType,
  IGoodsFreightChargeMode,
  IGoodsInventoryDeductMode,
  IGoodsPublishMode,
  IGoodsRatingGrade,
  IGoodsReturnsFreightBy,
  IGoodsSource,
  IGoodsStatus,
  IGoodsType,
  ILogisticsDeliveryMode,
} from '@xiaoshop/schema'
import {
  Enabled,
  GoodsBuyBtnType,
  GoodsFreightChargeMode,
  GoodsInventoryDeductMode,
  GoodsPublishMode,
  GoodsRatingGrade,
  GoodsReturnsFreightBy,
  GoodsSource,
  GoodsStatus,
  GoodsType,
} from '@xiaoshop/schema'
import { Column, CreateDateColumn, Entity, Index, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryColumn } from 'typeorm'
import { GoodsTag } from '@/goods/tag/entity'
import { GoodsBrand } from '@/goods/brand/entity'
import { GoodsGroup } from '@/goods/group/entity'
import { GoodsCategory } from '@/goods/category/entity'
import { GoodsAddition } from '@/goods/addition/entity'
import { GoodsProtection } from '@/goods/protection/entity'

@Entity('shop_goods', {
  comment: '商品信息表',
})
@Index('IDX_shop_goods', ['isDeleted', 'status', 'sort', 'updatedTime'])
@Index('IDX_shop_goods_warning', ['isDeleted', 'isWarning', 'sort', 'updatedTime'])
export class Goods implements IGoods {
  @PrimaryColumn({ type: 'char', length: 32, primaryKeyConstraintName: 'PK_shop_goods' })
  id: string

  @Column({ type: 'varchar', length: 32, nullable: false, default: GoodsType.ENTITY, comment: '商品类型' })
  type: IGoodsType

  @Column({ type: 'varchar', length: 32, nullable: false, default: GoodsStatus.DRAFT, comment: '商品状态' })
  status: IGoodsStatus

  @Column({ type: 'varchar', length: 32, nullable: false, default: GoodsSource.MANUAL, comment: '商品来源' })
  source: IGoodsSource

  @Column({ name: 'is_multi_skus', type: 'char', length: 1, default: Enabled.NO, comment: '是否为多规格商品 (N:否 Y:是)' })
  isMultiSkus: IEnabled

  @Column({ name: 'is_deleted', type: 'char', length: 1, default: Enabled.NO, comment: '是否已删除 (N:否 Y:是)' })
  isDeleted: IEnabled

  @Column({ name: 'is_warning', type: 'char', length: 1, default: Enabled.NO, comment: '是否预警 (N:否 Y:是)' })
  isWarning: IEnabled

  @Column({ type: 'simple-json', default: null, comment: '商品图片' })
  images: string[]

  @Column({ type: 'varchar', length: 200, nullable: false, default: '', comment: '商品视频' })
  video: string

  @Column({ type: 'varchar', length: 100, nullable: false, default: '', comment: '商品名称' })
  name: string

  @Column({ name: 'share_desc', type: 'varchar', length: 36, nullable: false, default: '', comment: '分享描述' })
  shareDesc: string

  @Column({ type: 'varchar', length: 60, nullable: false, default: '', comment: '商品卖点' })
  slogan: string

  @Column({ name: 'sku_code', type: 'char', length: 32, nullable: false, default: '', comment: '商品编码' })
  skuCode: string

  @Column({ type: 'float', unsigned: true, default: 0, comment: '商品价格' })
  price: number

  @Column({ name: 'original_price', type: 'float', unsigned: true, default: 0, comment: '商品原价' })
  originalPrice: number

  @Column({ name: 'cost_price', type: 'float', unsigned: true, default: 0, comment: '商品成本价' })
  costPrice: number

  @Column({ type: 'int', unsigned: true, default: 0, comment: '商品库存' })
  inventory: number

  @Column({ name: 'inventory_early_warning', type: 'int', unsigned: true, default: 0, comment: '预警库存' })
  inventoryEarlyWarning: number

  @Column({ type: 'float', unsigned: true, default: 0, comment: '商品重量' })
  weight: number

  @Column({ type: 'float', unsigned: true, default: 0, comment: '商品体积' })
  volume: number

  @Column({ type: 'varchar', length: 8, nullable: false, default: '', comment: '商品单位' })
  unit: string

  @Column({ name: 'enable_vip_discount', type: 'char', length: 1, default: Enabled.NO, comment: '是否开启会员折扣 (N:否 Y:是)' })
  enableVipDiscount: IEnabled

  @Column({ name: 'enable_purchase_limits', type: 'char', length: 1, default: Enabled.NO, comment: '是否开启限购 (N:否 Y:是)' })
  enablePurchaseLimits: IEnabled

  @Column({ name: 'purchase_max_qty', type: 'int', unsigned: true, default: 0, comment: '限购数量' })
  purchaseMaxQty: number

  @Column({ name: 'purchase_min_qty', type: 'int', unsigned: true, default: 1, comment: '起购数量' })
  purchaseMinQty: number

  @Column({ name: 'inventory_deduct_mode', type: 'varchar', length: 32, nullable: false, default: GoodsInventoryDeductMode.ORDER, comment: '库存扣减方式' })
  inventoryDeductMode: IGoodsInventoryDeductMode

  @Column({ name: 'delivery_modes', type: 'simple-json', default: null, comment: '商品配送方式 (JSON)' })
  deliveryModes: ILogisticsDeliveryMode[]

  @Column({ name: 'freight_charge_mode', type: 'varchar', length: 32, nullable: false, default: GoodsFreightChargeMode.STD, comment: '商品物流费用计算方式' })
  freightChargeMode: IGoodsFreightChargeMode

  @Column({ type: 'float', unsigned: true, default: 0, comment: '统一运费' })
  freight: number

  @Column({ name: 'freight_template_id', type: 'int', unsigned: true, default: 0, comment: '运费模板 ID' })
  freightTemplateId: number

  @Column({ name: 'returns_freight_by', type: 'varchar', length: 32, nullable: false, default: GoodsReturnsFreightBy.BUYER, comment: '商品退货运费承担方' })
  returnsFreightBy: IGoodsReturnsFreightBy

  @Column({ name: 'publish_mode', type: 'varchar', length: 32, nullable: false, default: GoodsPublishMode.DIRECT, comment: '商品上架方式' })
  publishMode: IGoodsPublishMode

  @Column({ name: 'auto_in_stock_at', type: 'datetime', nullable: true, comment: '自定义上架时间' })
  autoInStockAt: string

  @Column({ name: 'buy_btn_name_type', type: 'varchar', length: 32, nullable: false, default: GoodsBuyBtnType.DEFAULT, comment: '商品购买按钮类型' })
  buyBtnNameType: IGoodsBuyBtnType

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

  @Column({ name: 'overall_grade', type: 'char', length: 8, nullable: false, default: GoodsRatingGrade.HIGH, comment: '综合评级' })
  overallGrade: IGoodsRatingGrade

  @Column({ name: 'overall_goods_score', type: 'int', unsigned: true, default: 5, comment: '商品评分' })
  overallGoodsScore: number

  @Column({ name: 'overall_service_score', type: 'int', unsigned: true, default: 5, comment: '服务评分' })
  overallServiceScore: number

  @Column({ name: 'overall_logistics_score', type: 'int', unsigned: true, default: 5, comment: '物流评分' })
  overallLogisticsScore: number

  @Column({ type: 'simple-json', default: null, comment: '商品参数 (JSON)' })
  attributes: IGoodsAttribute[]

  @OneToOne(() => GoodsTag, { createForeignKeyConstraints: false })
  @JoinColumn()
  tag: GoodsTag

  @OneToOne(() => GoodsGroup, { createForeignKeyConstraints: false })
  @JoinColumn()
  group: GoodsGroup

  @OneToOne(() => GoodsBrand, { createForeignKeyConstraints: false })
  @JoinColumn()
  brand: GoodsBrand

  @ManyToMany(() => GoodsCategory, { createForeignKeyConstraints: false })
  @JoinTable({ name: 'shop_goods_has_categories' })
  categories: GoodsCategory[]

  @ManyToMany(() => GoodsProtection, { createForeignKeyConstraints: false })
  @JoinTable({ name: 'shop_goods_has_protections' })
  protections: GoodsProtection[]

  @ManyToMany(() => GoodsAddition, { createForeignKeyConstraints: false })
  @JoinTable({ name: 'shop_goods_has_additions' })
  additions: GoodsAddition[]

  @CreateDateColumn({ name: 'created_time', update: false, type: 'datetime', comment: '创建时间' })
  createdTime: string

  @Column({ name: 'updated_time', type: 'datetime', nullable: true, default: null, comment: '更新时间' })
  updatedTime: string

  @Column({ name: 'in_stock_time', type: 'datetime', nullable: true, default: null, comment: '上架时间' })
  inStockTime: string

  @Column({ name: 'stocked_time', type: 'datetime', nullable: true, default: null, comment: '下架时间' })
  stockedTime: string

  @Column({ name: 'sold_out_time', type: 'datetime', nullable: true, default: null, comment: '售罄时间' })
  soldOutTime: string

  @Column({ name: 'deleted_time', type: 'datetime', nullable: true, default: null, comment: '删除时间' })
  deletedTime: string
}
