import { Body, Controller, Delete, Get, HttpCode, Post, Put, Query } from '@nestjs/common'

import { Admin } from '~/common/decorators'
import { ProductBrandService } from '@/product/brand/domain/manage/service'
import {
  CreateProductBrandPayload,
  UpdateProductBrandPayload,
} from '@/product/brand/dto/payload'
import {
  DeleteProductBrandRequest,
  GetProductBrandPagesRequest,
  GetProductBrandRequest,
} from '@/product/brand/dto/request'

@Controller('admin/product/brand')
export class ProductBrandAdminController {
  constructor(
    private readonly service: ProductBrandService,
  ) {}

  /**
   * Get Product Brand Pages
   */
  @Get('pages')
  @Admin()
  async pages(@Query() query: GetProductBrandPagesRequest) {
    return this.service.findPages(query)
  }

  /**
   * Get Product Brand Dict List
   */
  @Get('dict/list')
  @Admin()
  async dictList() {
    return this.service.findDictList()
  }

  /**
   * Get Product Brand Detail
   */
  @Get('detail')
  @Admin()
  async detail(@Query() query: GetProductBrandRequest) {
    return this.service.findById(+query.id)
  }

  /**
   * Create Product Brand
   */
  @Post('create')
  @HttpCode(200)
  @Admin()
  async create(@Body() payload: CreateProductBrandPayload) {
    return this.service.create(payload)
  }

  /**
   * Update Product Brand
   */
  @Put('update')
  @Admin()
  async update(
    @Query() query: GetProductBrandRequest,
    @Body() payload: UpdateProductBrandPayload,
  ) {
    return this.service.update(+query.id, payload)
  }

  /**
   * Delete Product Brand
   */
  @Delete('delete')
  @Admin()
  async delete(@Body() data: DeleteProductBrandRequest) {
    return this.service.delete(data.id)
  }
}
