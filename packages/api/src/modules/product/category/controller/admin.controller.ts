import { Body, Controller, Delete, Get, HttpCode, Post, Put, Query } from '@nestjs/common'

import { Admin } from '~/common/decorators'
import { ProductCategoryService } from '@/product/category/domain/manage/service'
import {
  CreateProductCategoryPayload,
  UpdateProductCategoryPayload,
} from '@/product/category/dto/payload'
import {
  DeleteProductCategoryRequest,
  GetProductCategoryListRequest,
  GetProductCategoryRequest,
} from '@/product/category/dto/request'

@Controller('admin/product/category')
export class ProductCategoryAdminController {
  constructor(
    private readonly service: ProductCategoryService,
  ) {}

  /**
   * Get Product Category List
   */
  @Get('list')
  @Admin()
  async list(@Query() query: GetProductCategoryListRequest) {
    return this.service.findList(query)
  }

  /**
   * Get Product Category Nested Dict List
   */
  @Get('root/list')
  @Admin()
  async rootList() {
    return this.service.findDictList({ parentId: 0 })
  }

  /**
   * Get Product Category Nested Dict List
   */
  @Get('dict/list')
  @Admin()
  async dictList(@Query() query: GetProductCategoryListRequest) {
    return this.service.findNestedDict(query)
  }

  /**
   * Get Product Category Detail
   */
  @Get('detail')
  @Admin()
  async detail(@Query() query: GetProductCategoryRequest) {
    return this.service.findById(+query.id)
  }

  /**
   * Create Product Category
   */
  @Post('create')
  @HttpCode(200)
  @Admin()
  async create(@Body() payload: CreateProductCategoryPayload) {
    return this.service.create(payload)
  }

  /**
   * Update Product Category
   */
  @Put('update')
  @Admin()
  async update(
    @Query() query: GetProductCategoryRequest,
    @Body() payload: UpdateProductCategoryPayload,
  ) {
    return this.service.update(+query.id, payload)
  }

  /**
   * Delete Product Category
   */
  @Delete('delete')
  @Admin()
  async delete(@Body() data: DeleteProductCategoryRequest) {
    return this.service.delete(data.id)
  }
}
