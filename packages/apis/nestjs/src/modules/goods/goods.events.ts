import { IGoodsExportConditions } from '@xiaoshop/schema'

/**
 * 商品管理事件
 */
abstract class GoodsManageEvent {
  /**
   * 商品 ID
   */
  readonly id: string

  /**
   * 初始化
   *
   * @param id string
   */
  constructor(id: string) {
    this.id = id
  }
}

/**
 * 创建商品事件
 */
export class GoodsCreateEvent extends GoodsManageEvent {}

/**
 * 更新商品事件
 */
export class GoodsUpdateEvent extends GoodsManageEvent {}

/**
 * 商品上架事件
 */
export class GoodsInStockEvent extends GoodsManageEvent {}

/**
 * 商品下架事件
 */
export class GoodsStockedEvent extends GoodsManageEvent {}

/**
 * 复制商品事件
 */
export class GoodsCopyEvent extends GoodsManageEvent {}

/**
 * 删除商品事件
 */
export class GoodsDeleteEvent extends GoodsManageEvent {}

/**
 * 恢复商品事件
 */
export class GoodsRestoreEvent extends GoodsManageEvent {}

/**
 * 商品售罄事件
 */
export class GoodsSoldOutEvent extends GoodsManageEvent {}

/**
 * 商品库存预警事件
 */
export class GoodsInventoryEarlyWarningEvent extends GoodsManageEvent {}

/**
 * 商品导出事件
 */
export class GoodsExportEvent {
  /**
   * 导出记录 ID
   */
  readonly id: number
  /**
   * 商品导出条件
   *
   * @see {@link IGoodsExportConditions}
   */
  readonly conditions: IGoodsExportConditions

  constructor(
    id: number,
    conditions: IGoodsExportConditions,
  ) {
    this.id = id
    this.conditions = conditions
  }
}
