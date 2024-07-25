import {
  GOODS_EVENT_CLONE,
  GOODS_EVENT_CREATE,
  GOODS_EVENT_DELETE,
  GOODS_EVENT_IN_STOCK,
  GOODS_EVENT_RESTORE,
  GOODS_EVENT_SOLD_OUT,
  GOODS_EVENT_STOCKED,
  GOODS_EVENT_STOCK_WARN,
  GOODS_EVENT_UPDATE,
} from '@/goods/constants'

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
 *
 * {@see {@link GOODS_EVENT_CREATE}}
 */
export class GoodsCreateEvent extends GoodsManageEvent {
  /**
   * 事件名
   */
  static eventName = GOODS_EVENT_CREATE
}

/**
 * 更新商品事件
 *
 * {@see {@link GOODS_EVENT_UPDATE}}
 */
export class GoodsUpdateEvent extends GoodsManageEvent {
  /**
   * 事件名
   */
  static eventName = GOODS_EVENT_UPDATE
}

/**
 * 克隆商品事件
 *
 * {@see {@link GOODS_EVENT_CLONE}}
 */
export class GoodsCloneEvent extends GoodsManageEvent {
  /**
   * 事件名
   */
  static eventName = GOODS_EVENT_CLONE
}

/**
 * 删除商品事件
 *
 * {@see {@link GOODS_EVENT_DELETE}}
 */
export class GoodsDeleteEvent extends GoodsManageEvent {
  /**
   * 事件名
   */
  static eventName = GOODS_EVENT_DELETE
}

/**
 * 恢复商品事件
 *
 * {@see {@link GOODS_EVENT_RESTORE}}
 */
export class GoodsRestoreEvent extends GoodsManageEvent {
  /**
   * 事件名
   */
  static eventName = GOODS_EVENT_RESTORE
}

/**
 * 商品上架事件
 *
 * {@see {@link GOODS_EVENT_IN_STOCK}}
 */
export class GoodsInStockEvent extends GoodsManageEvent {
  /**
   * 事件名
   */
  static eventName = GOODS_EVENT_IN_STOCK
}

/**
 * 商品下架事件
 *
 * {@see {@link GOODS_EVENT_STOCKED}}
 */
export class GoodsStockedEvent extends GoodsManageEvent {
  /**
   * 事件名
   */
  static eventName = GOODS_EVENT_STOCKED
}

/**
 * 商品售罄事件
 *
 * {@see {@link GOODS_EVENT_SOLD_OUT}}
 */
export class GoodsSoldOutEvent extends GoodsManageEvent {
  /**
   * 事件名
   */
  static eventName = GOODS_EVENT_SOLD_OUT
}

/**
 * 商品库存预警事件
 *
 * {@see {@link GOODS_EVENT_STOCK_WARN}}
 */
export class GoodsStockWarnEvent extends GoodsManageEvent {
  /**
   * 事件名
   */
  static eventName = GOODS_EVENT_STOCK_WARN
}
