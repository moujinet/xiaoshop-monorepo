import { Body, Controller, Delete, HttpCode, Post, Put, Query } from '@nestjs/common'

import { Admin } from '~/common/decorators'
import { ProductService } from '@/product/main/domain/manage/service'
import {
  GetProductFromPostRequest,
  GetProductRequest,
} from '@/product/main/dto/request/product'
import {
  CreateProductPayload,
  UpdateProductPayload,
  UpdateProductPropertyPayload,
} from '@/product/main/dto/payload'

@Controller('admin/product')
export class ProductAdminController {
  constructor(
    private readonly service: ProductService,
  ) {}

  /**
   * Create Product
   */
  @Post('create')
  @HttpCode(200)
  @Admin()
  async create(@Body() payload: CreateProductPayload) {
    return this.service.create(payload)
  }

  /**
   * Update Product
   */
  @Put('update')
  @Admin()
  async update(
    @Query() query: GetProductRequest,
    @Body() payload: UpdateProductPayload,
  ) {
    return this.service.update(+query.id, payload)
  }

  /**
   * Update Product Properties
   */
  @Put('properties/update')
  @Admin()
  async updateProperties(
    @Body() payload: UpdateProductPropertyPayload,
  ) {
    return this.service.updateProperties(payload.ids, payload.properties)
  }

  /**
   * Copy Product
   */
  @Put('copy')
  @Admin()
  async copy(@Body() payload: GetProductFromPostRequest) {
    return this.service.copy(payload.id)
  }

  /**
   * Soft-Delete Product
   */
  @Delete('delete')
  @Admin()
  async delete(@Body() payload: GetProductFromPostRequest) {
    return this.service.softDelete(payload.id)
  }
}
