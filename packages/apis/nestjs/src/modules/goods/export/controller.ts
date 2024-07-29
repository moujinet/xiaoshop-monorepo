import { ApiOperation, ApiTags } from '@nestjs/swagger'
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

@ApiTags('商品导出')
@Controller('goods/export')
export class GoodsExportRecordController {
  constructor(
    private readonly service: GoodsExportRecordService,
  ) {}

  @ApiOperation({
    summary: '获取「商品导出」记录分页列表',
  })
  @ApiPaginatedResponse(GoodsExportResponse)
  @ApiExceptionResponse({ code: EXCEPTION_FAILED, message: '请求失败' })
  @Get('pages')
  async pages(@Query() query: GetGoodsExportRecordPagesRequest) {
    return this.service.findPages(query)
  }

  @ApiOperation({
    summary: '创建「商品导出」记录',
  })
  @ApiDoneResponse('创建成功')
  @ApiExceptionResponse({ code: EXCEPTION_FAILED, message: '创建失败' })
  @Post('create')
  @HttpCode(200)
  async create(@Body() data: GoodsExportPayload) {
    return this.service.create(data)
  }

  @ApiOperation({
    summary: '删除「商品导出」记录',
  })
  @ApiDoneResponse('删除成功')
  @ApiExceptionResponse({ code: EXCEPTION_FAILED, message: '删除失败' })
  @Delete('delete')
  async delete(@Body() data: DeleteGoodsExportRecordRequest) {
    return this.service.delete(data.id)
  }
}
