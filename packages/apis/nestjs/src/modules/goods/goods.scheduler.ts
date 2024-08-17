import { Inject, Injectable, Logger } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'
import { GoodsService } from '@/goods/manage/service'
import { StaffLogService } from '@/staff/log/service'

@Injectable()
export class GoodsScheduler {
  private readonly logger = new Logger(GoodsScheduler.name)

  constructor(
    @Inject(GoodsService)
    private readonly goods: GoodsService,

    @Inject(StaffLogService)
    private readonly log: StaffLogService,
  ) {}

  /**
   * 售馨商品自动下架 (每 10 分钟执行一次)
   */
  @Cron(CronExpression.EVERY_10_MINUTES)
  async handleSoldOutGoods() {
    try {
      const goodsIds = await this.goods.updateSoldOutGoods()

      if (goodsIds.length > 0) {
        this.log.writeCrontabLog('商品管理', `售馨商品自动下架成功, 商品ID: ${goodsIds.join(',')}`)

        this.logger.debug('下架售馨商品', goodsIds)
        // TODO: 通知商家
      }
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

      if (goodsIds.length > 0)
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
      const goodsIds = await this.goods.updateAutoInStockGoods()

      if (goodsIds.length > 0)
        this.logger.debug('自动上架', goodsIds)
    }
    catch (e) {
      this.logger.error(e.message)
    }
  }
}
