import { Inject, Injectable, Logger } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'
import { GoodsService } from '@/goods/manage/service'

@Injectable()
export class GoodsScheduler {
  private readonly logger = new Logger(GoodsScheduler.name)

  constructor(
    @Inject(GoodsService)
    private readonly goods: GoodsService,
  ) {}

  /**
   * 售馨商品自动下架 (每 10 分钟执行一次)
   */
  @Cron(CronExpression.EVERY_10_MINUTES)
  async handleSoldOutGoods() {
    try {
      const goodsIds = await this.goods.updateSoldOutGoods()

      if (goodsIds)
        this.logger.debug('下架售馨商品', goodsIds)
    }
    catch (e) {
      this.logger.error(e.message)
    }
  }

  /**
   * 库存预警 (每 30 分钟执行一次)
   */
  @Cron(CronExpression.EVERY_30_MINUTES)
  async handleInventoryEarlyWarning() {
    try {
      const goodsIds = await this.goods.updateInventoryEarlyWarning()

      if (goodsIds)
        this.logger.debug('库存预警', goodsIds)
    }
    catch (e) {
      this.logger.error(e.message)
    }
  }

  /**
   * 自动上架 (每 60 分钟执行一次)
   */
  @Cron(CronExpression.EVERY_HOUR)
  async handleAutoInStock() {
    try {
      // ------------------------------- 自动上架 -------------------------------- //
      const goodsIds = await this.goods.updateAutoInStockGoods()

      if (goodsIds)
        this.logger.debug('自动上架', goodsIds)
    }
    catch (e) {
      this.logger.error(e.message)
    }
  }
}
