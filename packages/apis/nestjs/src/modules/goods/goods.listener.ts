import { OnEvent } from '@nestjs/event-emitter'
import { Inject, Injectable, Logger } from '@nestjs/common'
import {
  GoodsCloneEvent,
  GoodsInStockEvent,
  GoodsSoldOutEvent,
  GoodsStockWarnEvent,
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

  @OnEvent(GoodsCloneEvent.eventName)
  async handleGoodsClone(payload: GoodsCloneEvent) {
    this.logger.debug('复制商品至草稿')

    try {
      const goodsId = await this.goods.cloneToDraft(payload.id)
      const specs = await this.spec.cloneTo(payload.id, goodsId)
      await this.sku.cloneTo(payload.id, goodsId, specs)
    }
    catch (e) {
      this.logger.error(e.message)
    }
  }

  @OnEvent(GoodsSoldOutEvent.eventName)
  async handleGoodsSoldOut(payload: GoodsSoldOutEvent) {
    // TODO: 后台消息推送
    this.logger.debug('售罄商品', payload.id)
  }

  @OnEvent(GoodsStockWarnEvent.eventName)
  async handleGoodsStockWarn(payload: GoodsStockWarnEvent) {
    // TODO: 后台消息推送
    this.logger.debug('库存预警', payload.id)
  }

  @OnEvent(GoodsInStockEvent.eventName)
  async handleGoodsInStock(payload: GoodsInStockEvent) {
    // TODO: 后台消息推送
    this.logger.debug('商品上架', payload.id)
  }
}
