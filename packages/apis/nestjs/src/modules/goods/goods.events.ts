/**
 * 商品管理事件
 */
abstract class GoodsManageEvent {
  /**
   * 商品 ID
   */
  id: string

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
