import { Body, Controller, Delete, Get, HttpCode, Post, Put, Query } from '@nestjs/common'

import { Admin } from '~/common/decorators'
import { ProductServiceExtraService } from '@/product/service/domain/extra/service'
import {
  CreateProductExtraServicePayload,
  UpdateProductExtraServicePayload,
} from '@/product/service/dto/payload'
import {
  DeleteProductServiceRequest,
  GetProductServicePagesRequest,
  GetProductServiceRequest,
} from '@/product/service/dto/request'

@Controller('admin/product/service/extra')
export class ProductServiceExtraAdminController {
  constructor(
    private readonly service: ProductServiceExtraService,
  ) {}

  /**
   * Get Product Extra Service Pages
   */
  @Get('pages')
  @Admin()
  async pages(@Query() query: GetProductServicePagesRequest) {
    return this.service.findPages(query)
  }

  /**
   * Get Product Extra Service Dict List
   */
  @Get('dict/list')
  @Admin()
  async dictList() {
    return this.service.findDictList()
  }

  /**
   * Get Product Extra Service Detail
   */
  @Get('detail')
  @Admin()
  async detail(@Query() query: GetProductServiceRequest) {
    return this.service.findById(+query.id)
  }

  /**
   * Create Product Extra
   */
  @Post('create')
  @HttpCode(200)
  @Admin()
  async create(@Body() payload: CreateProductExtraServicePayload) {
    return this.service.create(payload)
  }

  /**
   * Update Product Extra
   */
  @Put('update')
  @Admin()
  async update(
    @Query() query: GetProductServiceRequest,
    @Body() payload: UpdateProductExtraServicePayload,
  ) {
    return this.service.update(+query.id, payload)
  }

  /**
   * Delete Product Extra
   */
  @Delete('delete')
  @Admin()
  async delete(@Body() data: DeleteProductServiceRequest) {
    return this.service.delete(data.id)
  }
}
