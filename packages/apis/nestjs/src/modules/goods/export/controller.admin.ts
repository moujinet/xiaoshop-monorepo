import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { Body, Controller, Delete, Get, HttpCode, Post, Query } from '@nestjs/common'
import { EXCEPTION_FAILED } from '~/common/exception'
import {
  ApiDoneResponse,
  ApiExceptionResponse,
  ApiPaginatedResponse,
} from '~/common/response/decorators'
import {
  DeleteGoodsExportRecordRequest,
  GetGoodsExportRecordPagesRequest,
  GoodsExportPayload,
  GoodsExportResponse,
} from '@/goods/export/dto'
import { GoodsExportRecordService } from '@/goods/export/service'
import { Admin } from '@/auth/decorators'

@ApiTags('管理/商品/导出')
@Controller('admin/goods/export')
export class GoodsExportRecordAdminController {
  constructor(
    private readonly service: GoodsExportRecordService,
  ) {}

  @ApiOperation({
    summary: '获取「导出」记录分页列表',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiPaginatedResponse(GoodsExportResponse)
  @ApiExceptionResponse({ code: EXCEPTION_FAILED, message: '获取「导出」记录分页列表失败' })
  @Get('pages')
  async pages(@Query() query: GetGoodsExportRecordPagesRequest) {
    return this.service.findPages(query)
  }

  @ApiOperation({
    summary: '创建「导出」记录',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiDoneResponse('创建「导出」记录成功')
  @ApiExceptionResponse({ code: EXCEPTION_FAILED, message: '创建「导出」记录失败' })
  @Post('create')
  @HttpCode(200)
  async create(@Body() data: GoodsExportPayload) {
    return this.service.create(data)
  }

  @ApiOperation({
    summary: '删除「导出」记录',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiDoneResponse('删除「导出」记录成功')
  @ApiExceptionResponse({ code: EXCEPTION_FAILED, message: '删除「导出」记录失败' })
  @Delete('delete')
  async delete(@Body() data: DeleteGoodsExportRecordRequest) {
    return this.service.delete(data.id)
  }
}
