import { Body, Controller, Delete, HttpCode, Post, Put, Query } from '@nestjs/common'

import { Admin } from '~/common/decorators'
import { ReplyProductReviewPayload } from '@/product/review/dto/payload'
import { ProductReviewReplyService } from '@/product/review/domain/reply/service'
import { DeleteProductReviewReplyRequest, GetProductReviewReplyRequest } from '@/product/review/dto/request'

@Controller('admin/product/review/reply')
export class ProductReplyAdminController {
  constructor(
    private readonly service: ProductReviewReplyService,
  ) {}

  /**
   * Create Product Review Reply
   */
  @Post('create')
  @HttpCode(200)
  @Admin()
  async create(
    @Body() payload: ReplyProductReviewPayload,
  ) {
    return this.service.create(payload)
  }

  /**
   * Update Product Review Reply
   */
  @Put('update')
  @Admin()
  async update(
    @Query() query: GetProductReviewReplyRequest,
    @Body() payload: ReplyProductReviewPayload,
  ) {
    return this.service.update(+query.id, payload)
  }

  /**
   * Delete Product Review Reply
   */
  @Delete('delete')
  @Admin()
  async delete(@Body() data: DeleteProductReviewReplyRequest) {
    return this.service.delete(data.id)
  }
}
