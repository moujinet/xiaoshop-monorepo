import { Body, Controller, Delete, Get, HttpCode, Post, Put, Query } from '@nestjs/common'

import { Admin } from '~/common/decorators'
import { ProductTagService } from '@/product/tag/domain/manage/service'
import {
  CreateProductTagPayload,
  UpdateProductTagPayload,
} from '@/product/tag/dto/payload'
import {
  DeleteProductTagRequest,
  GetProductTagPagesRequest,
  GetProductTagRequest,
} from '@/product/tag/dto/request'

@Controller('admin/product/tag')
export class ProductTagAdminController {
  constructor(
    private readonly service: ProductTagService,
  ) {}

  /**
   * Get Product Tag Pages
   */
  @Get('pages')
  @Admin()
  async pages(@Query() query: GetProductTagPagesRequest) {
    return this.service.findPages(query)
  }

  /**
   * Get Product Tag Dict List
   */
  @Get('dict/list')
  @Admin()
  async dictList() {
    return this.service.findDictList()
  }

  /**
   * Get Product Tag Detail
   */
  @Get('detail')
  @Admin()
  async detail(@Query() query: GetProductTagRequest) {
    return this.service.findById(+query.id)
  }

  /**
   * Create Product Tag
   */
  @Post('create')
  @HttpCode(200)
  @Admin()
  async create(@Body() payload: CreateProductTagPayload) {
    return this.service.create(payload)
  }

  /**
   * Update Product Tag
   */
  @Put('update')
  @Admin()
  async update(
    @Query() query: GetProductTagRequest,
    @Body() payload: UpdateProductTagPayload,
  ) {
    return this.service.update(+query.id, payload)
  }

  /**
   * Delete Product Tag
   */
  @Delete('delete')
  @Admin()
  async delete(@Body() data: DeleteProductTagRequest) {
    return this.service.delete(data.id)
  }
}
