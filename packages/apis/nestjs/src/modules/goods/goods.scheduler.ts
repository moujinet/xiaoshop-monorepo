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
      // ------------------------------ 下架售馨商品 ------------------------------- //
      const soldOutGoodsIds = await this.goods.updateSoldOutGoods()
      this.logger.debug('下架售馨商品', soldOutGoodsIds)

      // ------------------------------- 库存预警 -------------------------------- //
      const stockWarnGoodsIds = await this.goods.updateStockWarnGoods()
      this.logger.debug('库存预警', stockWarnGoodsIds)
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
      const inStockGoodsIds = await this.goods.updateAutoInStockGoods()
      this.logger.debug('自动上架', inStockGoodsIds)
    }
    catch (e) {
      this.logger.error(e.message)
    }
  }
}
