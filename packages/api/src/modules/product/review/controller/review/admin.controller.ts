import { Controller, Get, Query } from '@nestjs/common'

import { Admin } from '~/common/decorators'
import { GetProductReviewPagesRequest } from '@/product/review/dto/request'
import { ProductReviewService } from '@/product/review/domain/review/service'

@Controller('admin/product/review')
export class ProductReviewAdminController {
  constructor(
    private readonly service: ProductReviewService,
  ) {}

  /**
   * Get Product Review Pages
   */
  @Get('pages')
  @Admin()
  async pages(@Query() query: GetProductReviewPagesRequest) {
    return this.service.findPages(query)
  }
}
