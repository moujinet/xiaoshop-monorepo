import { Body, Controller, Delete, Get, HttpCode, Post, Put, Query } from '@nestjs/common'

import { Admin } from '~/common/decorators'
import { ProductGroupService } from '@/product/group/domain/manage/service'
import {
  CreateProductGroupPayload,
  UpdateProductGroupPayload,
} from '@/product/group/dto/payload'
import {
  DeleteProductGroupRequest,
  GetProductGroupPagesRequest,
  GetProductGroupRequest,
} from '@/product/group/dto/request'

@Controller('admin/product/group')
export class ProductGroupAdminController {
  constructor(
    private readonly service: ProductGroupService,
  ) {}

  /**
   * Get Product Group Pages
   */
  @Get('pages')
  @Admin()
  async pages(@Query() query: GetProductGroupPagesRequest) {
    return this.service.findPages(query)
  }

  /**
   * Get Product Group Dict List
   */
  @Get('dict/list')
  @Admin()
  async dictList() {
    return this.service.findDictList()
  }

  /**
   * Get Product Group Detail
   */
  @Get('detail')
  @Admin()
  async detail(@Query() query: GetProductGroupRequest) {
    return this.service.findById(+query.id)
  }

  /**
   * Create Product Group
   */
  @Post('create')
  @HttpCode(200)
  @Admin()
  async create(@Body() payload: CreateProductGroupPayload) {
    return this.service.create(payload)
  }

  /**
   * Update Product Group
   */
  @Put('update')
  @Admin()
  async update(
    @Query() query: GetProductGroupRequest,
    @Body() payload: UpdateProductGroupPayload,
  ) {
    return this.service.update(+query.id, payload)
  }

  /**
   * Delete Product Group
   */
  @Delete('delete')
  @Admin()
  async delete(@Body() data: DeleteProductGroupRequest) {
    return this.service.delete(data.id)
  }
}
