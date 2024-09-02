import { Queue } from 'bull'
import { InjectQueue } from '@nestjs/bull'
import { OnEvent } from '@nestjs/event-emitter'
import { Inject, Injectable, Logger } from '@nestjs/common'
import { ProductService } from '@/product/product/service'
import {
  ProductExportCreatedEvent,
  ProductSkusUpdatedEvent,
} from '@/product/events'
import {
  PRODUCT_EXPORT_PROCESS,
  PRODUCT_QUEUE_ID,
} from '@/product/constants'
import { toEventName } from '~/utils/transformers'
import type { IProductExportProcessContext } from '@/product/interface'

@Injectable()
export class ProductListener {
  private readonly logger = new Logger(ProductListener.name)

  constructor(
    @Inject(ProductService)
    private readonly product: ProductService,

    @InjectQueue(PRODUCT_QUEUE_ID)
    private readonly queue: Queue<IProductExportProcessContext>,
  ) {}

  /**
   * 商品 SKU 更新
   *
   * - 同步商品库存
   * - 同步商品销量
   * - 同步商品价格
   *
   * @param payload ProductSkusUpdatedEvent
   */
  @OnEvent(toEventName(ProductSkusUpdatedEvent.name))
  async handleProductSkuUpdated(payload: ProductSkusUpdatedEvent) {
    try {
      await this.product.syncFromSkus(
        payload.id,
        payload.skus,
      )
    }
    catch (e) {
      this.logger.error(e.message)
    }
  }

  /**
   * 商品导出
   *
   * @param payload ProductExportCreated
   */
  @OnEvent(toEventName(ProductExportCreatedEvent.name))
  async handleProductExportCreated(payload: ProductExportCreatedEvent) {
    this.logger.debug(`商品导出 - ${JSON.stringify(payload)}`)

    await this.queue.add(PRODUCT_EXPORT_PROCESS, payload)
  }
}
