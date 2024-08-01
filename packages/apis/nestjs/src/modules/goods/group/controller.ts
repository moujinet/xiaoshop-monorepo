import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { Body, Controller, Delete, Get, HttpCode, Post, Put, Query } from '@nestjs/common'
import {
  DeleteGoodsGroupRequest,
  GetGoodsGroupRequest,
  GoodsGroupDictResponse,
  GoodsGroupPayload,
  GoodsGroupResponse,
} from '@/goods/group/dto'
import {
  ApiDoneResponse,
  ApiExceptionResponse,
  ApiListedResponse,
  ApiObjectResponse,
} from '~/common/response/decorators'
import {
  EXCEPTION_BAD_REQUEST,
  EXCEPTION_EXISTS,
  EXCEPTION_FAILED,
  EXCEPTION_NOT_FOUND,
} from '~/common/exception'
import { GoodsGroupService } from '@/goods/group/service'

@ApiTags('商品/分组')
@Controller('goods/group')
export class GoodsGroupController {
  constructor(
    private readonly service: GoodsGroupService,
  ) {}

  @ApiOperation({
    summary: '获取「分组」列表',
  })
  @ApiListedResponse(GoodsGroupResponse)
  @ApiExceptionResponse({ code: EXCEPTION_FAILED, message: '获取「分组」列表失败' })
  @Get('list')
  async list() {
    return this.service.findList()
  }

  @ApiOperation({
    summary: '获取「分组」字典列表',
  })
  @ApiListedResponse(GoodsGroupDictResponse)
  @ApiExceptionResponse({ code: EXCEPTION_FAILED, message: '获取「分组」字典列表失败' })
  @Get('dict/list')
  async dictList() {
    return this.service.findDictList()
  }

  @ApiOperation({
    summary: '获取「分组」详情',
  })
  @ApiObjectResponse(GoodsGroupResponse)
  @ApiExceptionResponse({ code: EXCEPTION_NOT_FOUND, message: '「分组」不存在' })
  @Get('detail')
  async detail(@Query() query: GetGoodsGroupRequest) {
    return this.service.findDetail(+query.id)
  }

  @ApiOperation({
    summary: '创建「分组」',
  })
  @ApiDoneResponse('创建「分组」成功')
  @ApiExceptionResponse({ code: EXCEPTION_EXISTS, message: '「分组」已存在' })
  @ApiExceptionResponse({ code: EXCEPTION_BAD_REQUEST, message: '请求参数错误' })
  @Post('create')
  @HttpCode(200)
  async create(@Body() data: GoodsGroupPayload) {
    return this.service.create(data)
  }

  @ApiOperation({
    summary: '更新「分组」',
  })
  @ApiDoneResponse('更新「分组」成功')
  @ApiExceptionResponse({ code: EXCEPTION_NOT_FOUND, message: '「分组」不存在' })
  @ApiExceptionResponse({ code: EXCEPTION_EXISTS, message: '「分组」已存在' })
  @ApiExceptionResponse({ code: EXCEPTION_BAD_REQUEST, message: '请求参数错误' })
  @Put('update')
  async update(
    @Query() query: GetGoodsGroupRequest,
    @Body() data: GoodsGroupPayload,
  ) {
    return this.service.update(+query.id, data)
  }

  @ApiOperation({
    summary: '删除「分组」',
  })
  @ApiDoneResponse('删除「分组」成功')
  @ApiExceptionResponse({ code: EXCEPTION_FAILED, message: '删除「分组」失败' })
  @Delete('delete')
  async delete(@Body() data: DeleteGoodsGroupRequest) {
    return this.service.delete(data.id)
  }
}
