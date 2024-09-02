import { Body, Controller, Delete, Get, HttpCode, Post, Put, Query } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { ProductService } from '@/product/product/service'
import {
  BatchUpdateProductPropertiesPayload,
  BatchUpdateProductStatusPayload,
  GetProductPagesRequest,
  GetProductPostRequest,
  GetProductRequest,
  GetProductsPostRequest,
  ProductListResponse,
  ProductPayload,
  ProductResponse,
} from '@/product/product/dto'
import {
  ApiAnyResponse,
  ApiDoneResponse,
  ApiExistsExceptionResponse,
  ApiFailedExceptionResponse,
  ApiNotFoundExceptionResponse,
  ApiObjectResponse,
  ApiPaginatedResponse,
} from '~/common/decorators'
import { Admin } from '@/auth/decorators'

@ApiTags('管理/商品')
@Controller('admin/product')
export class ProductAdminController {
  constructor(
    private readonly service: ProductService,
  ) {}

  @ApiOperation({
    summary: '获取商品分页列表',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiPaginatedResponse(ProductListResponse)
  @ApiFailedExceptionResponse({ description: '获取商品列表分页失败' })
  @Get('pages')
  async pages(@Query() query: GetProductPagesRequest) {
    return this.service.findPages(query)
  }

  @ApiOperation({
    summary: '获取商品详情',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiObjectResponse(ProductResponse)
  @ApiFailedExceptionResponse({ description: '获取商品详情失败' })
  @ApiNotFoundExceptionResponse({ description: '商品不存在' })
  @Get('detail')
  async detail(@Query() query: GetProductRequest) {
    return this.service.findById(+query.id)
  }

  @ApiOperation({
    summary: '创建商品',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiDoneResponse('创建成功')
  @ApiFailedExceptionResponse({ description: '创建商品失败' })
  @ApiExistsExceptionResponse({ description: '商品已存在' })
  @HttpCode(200)
  @Post('create')
  async create(@Body() data: ProductPayload) {
    return this.service.create(data)
  }

  @ApiOperation({
    summary: '更新商品',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiDoneResponse('更新成功')
  @ApiFailedExceptionResponse({ description: '更新商品失败' })
  @ApiNotFoundExceptionResponse({ description: '商品不存在' })
  @ApiExistsExceptionResponse({ description: '商品已存在' })
  @Put('update')
  async update(
    @Query() query: GetProductRequest,
    @Body() data: ProductPayload,
  ) {
    return this.service.update(+query.id, data)
  }

  @ApiOperation({
    summary: '复制商品',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiAnyResponse('New Product ID (number)')
  @ApiFailedExceptionResponse({ description: '复制商品失败' })
  @ApiNotFoundExceptionResponse({ description: '商品不存在' })
  @HttpCode(200)
  @Post('copy')
  async copy(@Body() data: GetProductPostRequest) {
    return this.service.copyToDraft(data.id)
  }

  @ApiOperation({
    summary: '批量更新商品属性',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiDoneResponse('更新成功')
  @ApiFailedExceptionResponse({ description: '批量更新商品属性失败' })
  @Put('batch/update')
  async batchUpdate(
    @Body() data: BatchUpdateProductPropertiesPayload,
  ) {
    return this.service.batchUpdateProperties(
      data.ids,
      data.data,
    )
  }

  @ApiOperation({
    summary: '批量更新商品状态',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiDoneResponse('更新成功')
  @ApiFailedExceptionResponse({ description: '批量更新商品状态失败' })
  @Put('status/batch/update')
  async batchUpdateStatus(
    @Body() data: BatchUpdateProductStatusPayload,
  ) {
    return this.service.batchUpdateStatus(
      data.ids,
      data.status,
    )
  }

  @ApiOperation({
    summary: '删除商品(软删除)',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiDoneResponse('删除成功')
  @ApiFailedExceptionResponse({ description: '批量删除商品失败' })
  @Delete('delete/soft')
  async softDelete(
    @Body() data: GetProductsPostRequest,
  ) {
    return this.service.softDelete(data.ids)
  }

  @ApiOperation({
    summary: '恢复商品(软删除)',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiDoneResponse('恢复成功')
  @ApiFailedExceptionResponse({ description: '批量恢复商品失败' })
  @Put('restore')
  async restore(
    @Body() data: GetProductsPostRequest,
  ) {
    return this.service.restore(data.ids)
  }

  @ApiOperation({
    summary: '删除商品',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiDoneResponse('删除成功')
  @ApiFailedExceptionResponse({ description: '批量删除商品失败' })
  @Delete('delete')
  async delete(
    @Body() data: GetProductsPostRequest,
  ) {
    return this.service.delete(data.ids)
  }

  @ApiOperation({
    summary: '清空回收站',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiDoneResponse('清空成功')
  @ApiFailedExceptionResponse({ description: '清空回收站失败' })
  @Delete('trash/clean')
  async clean() {
    return this.service.emptyTrash()
  }
}
