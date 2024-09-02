import { Body, Controller, Delete, Get, HttpCode, Post, Query } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { ProductExportService } from '@/product/export/service'
import {
  GetProductExportPagesRequest,
  GetProductExportPostRequest,
  ProductExportConditionsPayload,
  ProductExportResponse,
} from '@/product/export/dto'
import {
  ApiDoneResponse,
  ApiFailedExceptionResponse,
  ApiPaginatedResponse,
} from '~/common/decorators'
import { Admin } from '@/auth/decorators'

@ApiTags('管理/商品/导出')
@Controller('admin/product/export')
export class ProductExportAdminController {
  constructor(
    private readonly service: ProductExportService,
  ) {}

  @ApiOperation({
    summary: '获取商品导出记录分页列表',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiPaginatedResponse(ProductExportResponse)
  @ApiFailedExceptionResponse({ description: '获取商品导出记录分页列表失败' })
  @Get('pages')
  async pages(@Query() query: GetProductExportPagesRequest) {
    return this.service.findPages(query)
  }

  @ApiOperation({
    summary: '创建商品导出记录',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiDoneResponse('创建成功')
  @ApiFailedExceptionResponse({ description: '创建商品导出记录失败' })
  @Post('create')
  @HttpCode(200)
  async create(@Body() data: ProductExportConditionsPayload) {
    return this.service.create(data)
  }

  @ApiOperation({
    summary: '删除商品导出记录',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiDoneResponse('删除成功')
  @ApiFailedExceptionResponse({ description: '删除商品导出记录失败' })
  @Delete('delete')
  async delete(@Body() data: GetProductExportPostRequest) {
    return this.service.delete(data.id)
  }
}
