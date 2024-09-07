import { BaseEvent } from '~/common/events'

/**
 * 商品 SKU 库存预警事件
 */
export class ProductSkuInventoryWarningEvent extends BaseEvent {
  constructor(
    public readonly productConnectId: string,
    public readonly productName: string,
    public readonly skuCode: string,
    public readonly inventory: number,
  ) {
    super('商品管理')
  }

  getAuthLogs() {
    return `商品 ${this.productName} 的 SKU ${this.skuCode} 库存低于预警值 - 库存 ${this.inventory}`
  }
}
