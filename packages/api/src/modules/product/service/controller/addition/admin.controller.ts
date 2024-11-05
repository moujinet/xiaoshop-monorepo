import { Body, Controller, Delete, Get, HttpCode, Post, Put, Query } from '@nestjs/common'

import { Admin } from '~/common/decorators'
import { ProductServiceAdditionService } from '@/product/service/domain/addition/service'
import {
  CreateProductAdditionServicePayload,
  UpdateProductAdditionServicePayload,
} from '@/product/service/dto/payload'
import {
  DeleteProductServiceRequest,
  GetProductServicePagesRequest,
  GetProductServiceRequest,
} from '@/product/service/dto/request'

@Controller('admin/product/service/addition')
export class ProductServiceAdditionAdminController {
  constructor(
    private readonly service: ProductServiceAdditionService,
  ) {}

  /**
   * Get Product Value-Added Service Pages
   */
  @Get('pages')
  @Admin()
  async pages(@Query() query: GetProductServicePagesRequest) {
    return this.service.findPages(query)
  }

  /**
   * Get Product Value-Added Service Dict List
   */
  @Get('dict/list')
  @Admin()
  async dictList() {
    return this.service.findDictList()
  }

  /**
   * Get Product Value-Added Service Detail
   */
  @Get('detail')
  @Admin()
  async detail(@Query() query: GetProductServiceRequest) {
    return this.service.findById(+query.id)
  }

  /**
   * Create Product Value-Added Service
   */
  @Post('create')
  @HttpCode(200)
  @Admin()
  async create(@Body() payload: CreateProductAdditionServicePayload) {
    return this.service.create(payload)
  }

  /**
   * Update Product Value-Added Service
   */
  @Put('update')
  @Admin()
  async update(
    @Query() query: GetProductServiceRequest,
    @Body() payload: UpdateProductAdditionServicePayload,
  ) {
    return this.service.update(+query.id, payload)
  }

  /**
   * Delete Product Value-Added Service
   */
  @Delete('delete')
  @Admin()
  async delete(@Body() data: DeleteProductServiceRequest) {
    return this.service.delete(data.id)
  }
}
