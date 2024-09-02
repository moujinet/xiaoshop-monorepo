import { YesOrNo } from '@xiaoshop/shared'
import { Cron, CronExpression } from '@nestjs/schedule'
import { Inject, Injectable, Logger } from '@nestjs/common'
import { ProductService } from '@/product/product/service'
import { ProductSkuService } from '@/product/sku/service'

@Injectable()
export class ProductScheduler {
  private readonly logger = new Logger(ProductScheduler.name)

  constructor(
    @Inject(ProductService)
    private readonly product: ProductService,

    @Inject(ProductSkuService)
    private readonly sku: ProductSkuService,
  ) {}

  /**
   * 售罄商品处理 (每 10 分钟执行一次)
   */
  @Cron(CronExpression.EVERY_10_MINUTES)
  async handleSoldOutProducts() {
    try {
      await this.product.updateSoldOutProducts()
    }
    catch (e) {
      this.logger.error(e.message)
    }
  }

  /**
   * 库存预警处理 (每 30 分钟执行一次)
   */
  @Cron(CronExpression.EVERY_30_MINUTES)
  async handleSkuInventoryWarning() {
    try {
      const ids = await this.sku.updateInventoryWarning()
      await this.product.updateWarningStatus(ids, YesOrNo.YES)
    }
    catch (e) {
      this.logger.error(e.message)
    }
  }

  /**
   * 自动上架商品处理 (每小时执行一次)
   */
  @Cron(CronExpression.EVERY_HOUR)
  async handleAutoInStockProducts() {
    try {
      await this.product.updateAutoInStock()
    }
    catch (e) {
      this.logger.error(e.message)
    }
  }
}
