import { Body, Controller, Delete, Get, HttpCode, Post, Put, Query } from '@nestjs/common'

import { Admin } from '~/common/decorators'
import { ProductAttributeTemplateService } from '@/product/attribute/domain/template/service'
import {
  CreateProductAttributeTemplatePayload,
  UpdateProductAttributeTemplatePayload,
} from '@/product/attribute/dto/payload'
import {
  DeleteProductAttributeTemplateRequest,
  GetProductAttributeTemplatePagesRequest,
  GetProductAttributeTemplateRequest,
} from '@/product/attribute/dto/request'

@Controller('admin/product/attribute/template')
export class ProductAttributeTemplateAdminController {
  constructor(
    private readonly service: ProductAttributeTemplateService,
  ) {}

  /**
   * Get Product Attribute Template Pages
   */
  @Get('pages')
  @Admin()
  async pages(@Query() query: GetProductAttributeTemplatePagesRequest) {
    return this.service.findPages(query)
  }

  /**
   * Get Product Attribute Template Dict List
   */
  @Get('dict/list')
  @Admin()
  async dictList() {
    return this.service.findDictList()
  }

  /**
   * Get Product Attribute Template Detail
   */
  @Get('detail')
  @Admin()
  async detail(@Query() query: GetProductAttributeTemplateRequest) {
    return this.service.findById(+query.id)
  }

  /**
   * Create Product Attribute Template
   */
  @Post('create')
  @HttpCode(200)
  @Admin()
  async create(@Body() payload: CreateProductAttributeTemplatePayload) {
    return this.service.create(payload)
  }

  /**
   * Update Product Attribute Template
   */
  @Put('update')
  @Admin()
  async update(
    @Query() query: GetProductAttributeTemplateRequest,
    @Body() payload: UpdateProductAttributeTemplatePayload,
  ) {
    return this.service.update(+query.id, payload)
  }

  /**
   * Delete Product Attribute Template
   */
  @Delete('delete')
  @Admin()
  async delete(@Body() data: DeleteProductAttributeTemplateRequest) {
    return this.service.delete(data.id)
  }
}
