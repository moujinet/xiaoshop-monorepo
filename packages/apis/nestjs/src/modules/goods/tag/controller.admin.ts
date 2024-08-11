import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { Body, Controller, Delete, Get, HttpCode, Post, Put, Query } from '@nestjs/common'
import {
  DeleteGoodsTagRequest,
  GetGoodsTagRequest,
  GoodsTagDictResponse,
  GoodsTagListResponse,
  GoodsTagPayload,
  GoodsTagResponse,
} from '@/goods/tag/dto'
import {
  EXCEPTION_BAD_REQUEST,
  EXCEPTION_EXISTS,
  EXCEPTION_FAILED,
  EXCEPTION_NOT_FOUND,
} from '~/common/exception'
import {
  ApiDoneResponse,
  ApiExceptionResponse,
  ApiListedResponse,
  ApiObjectResponse,
} from '~/common/response/decorators'
import { GoodsTagService } from '@/goods/tag/service'

@ApiTags('管理/商品/标签')
@Controller('admin/goods/tag')
export class GoodsTagAdminController {
  constructor(
    private readonly service: GoodsTagService,
  ) {}

  @ApiOperation({
    summary: '获取「标签」列表',
  })
  @ApiListedResponse(GoodsTagListResponse)
  @ApiExceptionResponse({ code: EXCEPTION_FAILED, message: '获取「标签」列表失败' })
  @Get('list')
  async list() {
    return this.service.findList()
  }

  @ApiOperation({
    summary: '获取「标签」字典列表',
  })
  @ApiListedResponse(GoodsTagDictResponse)
  @ApiExceptionResponse({ code: EXCEPTION_FAILED, message: '获取「标签」字典列表失败' })
  @Get('dict/list')
  async dictList() {
    return this.service.findDictList()
  }

  @ApiOperation({
    summary: '获取「标签」详情',
  })
  @ApiObjectResponse(GoodsTagResponse)
  @ApiExceptionResponse({ code: EXCEPTION_NOT_FOUND, message: '「标签」不存在' })
  @Get('detail')
  async detail(@Query() query: GetGoodsTagRequest) {
    return this.service.findDetail(+query.id)
  }

  @ApiOperation({
    summary: '创建「标签」',
  })
  @ApiDoneResponse('创建标签成功')
  @ApiExceptionResponse({ code: EXCEPTION_EXISTS, message: '「标签」已存在' })
  @ApiExceptionResponse({ code: EXCEPTION_BAD_REQUEST, message: '请求参数错误' })
  @Post('create')
  @HttpCode(200)
  async create(@Body() data: GoodsTagPayload) {
    return this.service.create(data)
  }

  @ApiOperation({
    summary: '更新「标签」',
  })
  @ApiDoneResponse('更新标签成功')
  @ApiExceptionResponse({ code: EXCEPTION_NOT_FOUND, message: '「标签」不存在' })
  @ApiExceptionResponse({ code: EXCEPTION_EXISTS, message: '「标签」已存在' })
  @ApiExceptionResponse({ code: EXCEPTION_BAD_REQUEST, message: '请求参数错误' })
  @Put('update')
  async update(
    @Query() query: GetGoodsTagRequest,
     @Body() data: GoodsTagPayload,
  ) {
    return this.service.update(+query.id, data)
  }

  @ApiOperation({
    summary: '删除「标签」',
  })
  @ApiDoneResponse('标签删除成功')
  @ApiExceptionResponse({ code: EXCEPTION_FAILED, message: '标签删除失败' })
  @Delete('delete')
  async delete(@Body() data: DeleteGoodsTagRequest) {
    return this.service.delete(data.id)
  }
}
