import { OnEvent } from '@nestjs/event-emitter'
import { Inject, Injectable, Logger } from '@nestjs/common'
import {
  GoodsCopyEvent,
  GoodsInStockEvent,
  GoodsInventoryEarlyWarningEvent,
  GoodsSoldOutEvent,
} from '@/goods/goods.events'
import { GoodsService } from '@/goods/manage/service'
import { GoodsSkuService } from '@/goods/sku/service'
import { GoodsSpecService } from '@/goods/spec/service'

@Injectable()
export class GoodsListener {
  private readonly logger = new Logger(GoodsListener.name)

  constructor(
    @Inject(GoodsService)
    private readonly goods: GoodsService,

    @Inject(GoodsSpecService)
    private readonly spec: GoodsSpecService,

    @Inject(GoodsSkuService)
    private readonly sku: GoodsSkuService,
  ) {}

  @OnEvent(GoodsCopyEvent.name)
  async handleGoodsClone(payload: GoodsCopyEvent) {
    this.logger.debug('复制商品至草稿')

    try {
      const goodsId = await this.goods.copyToDraft(payload.id)
      const specs = await this.spec.cloneTo(payload.id, goodsId)
      await this.sku.cloneTo(payload.id, goodsId, specs)
    }
    catch (e) {
      this.logger.error(e.message)
    }
  }

  @OnEvent(GoodsSoldOutEvent.name)
  async handleGoodsSoldOut(payload: GoodsSoldOutEvent) {
    // TODO: 后台消息推送
    this.logger.debug('售罄商品', payload.id)
  }

  @OnEvent(GoodsInventoryEarlyWarningEvent.name)
  async handleGoodsStockWarn(payload: GoodsInventoryEarlyWarningEvent) {
    // TODO: 后台消息推送
    this.logger.debug('库存预警', payload.id)
  }

  @OnEvent(GoodsInStockEvent.name)
  async handleGoodsInStock(payload: GoodsInStockEvent) {
    // TODO: 后台消息推送
    this.logger.debug('商品上架', payload.id)
  }
}
