import { Controller, Put, Query } from '@nestjs/common'

import { Admin } from '~/common/decorators'
import { GetProductReviewRequest } from '@/product/review/dto/request'
import { ProductAuditService } from '@/product/review/domain/audit/service'

@Controller('admin/product/review')
export class ProductReviewAuditAdminController {
  constructor(
    private readonly service: ProductAuditService,
  ) {}

  /**
   * Approve Product Review
   */
  @Put('approve')
  @Admin()
  async approve(@Query() query: GetProductReviewRequest) {
    return this.service.approve(+query.id)
  }

  /**
   * Reject Product Review
   */
  @Put('reject')
  @Admin()
  async reject(@Query() query: GetProductReviewRequest) {
    return this.service.reject(+query.id)
  }
}
