import { Body, Controller, Delete, Put } from '@nestjs/common'

import { Admin } from '~/common/decorators'
import { GetProductFromPostRequest } from '@/product/main/dto/request'
import { ProductRecycleService } from '@/product/main/domain/recycle/service'

@Controller('admin/product/recycle')
export class ProductRecycleAdminController {
  constructor(
    private readonly service: ProductRecycleService,
  ) {}

  /**
   * Restore Product From Recycle
   */
  @Put('restore')
  @Admin()
  async restore(@Body() data: GetProductFromPostRequest) {
    return this.service.restore(data.id)
  }

  /**
   * Delete Product From Recycle
   */
  @Delete('delete')
  @Admin()
  async delete(@Body() data: GetProductFromPostRequest) {
    return this.service.delete(data.id)
  }
}
