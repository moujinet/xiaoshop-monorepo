import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { Body, Controller, Delete, Get, HttpCode, Post, Put, Query } from '@nestjs/common'
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
import {
  DeleteGoodsAdditionRequest,
  GetGoodsAdditionRequest,
  GoodsAdditionDictResponse,
  GoodsAdditionListResponse,
  GoodsAdditionPayload,
  GoodsAdditionResponse,
} from '@/goods/addition/dto'
import { GoodsAdditionService } from '@/goods/addition/service'

@ApiTags('管理/商品/附加服务')
@Controller('admin/goods/addition')
export class GoodsAdditionAdminController {
  constructor(
    private readonly service: GoodsAdditionService,
  ) {}

  @ApiOperation({
    summary: '获取「附加服务」列表',
  })
  @ApiListedResponse(GoodsAdditionListResponse)
  @ApiExceptionResponse({ code: EXCEPTION_FAILED, message: '获取「附加服务」列表失败' })
  @Get('list')
  async list() {
    return this.service.findList()
  }

  @ApiOperation({
    summary: '获取「附加服务」字典列表',
  })
  @ApiListedResponse(GoodsAdditionDictResponse)
  @ApiExceptionResponse({ code: EXCEPTION_FAILED, message: '获取「附加服务」字典列表失败' })
  @Get('dict/list')
  async dictList() {
    return this.service.findDictList()
  }

  @ApiOperation({
    summary: '获取「附加服务」详情',
  })
  @ApiObjectResponse(GoodsAdditionResponse)
  @ApiExceptionResponse({ code: EXCEPTION_NOT_FOUND, message: '「附加服务」不存在' })
  @Get('detail')
  async detail(@Query() query: GetGoodsAdditionRequest) {
    return this.service.findDetail(+query.id)
  }

  @ApiOperation({
    summary: '创建「附加服务」',
  })
  @ApiDoneResponse('创建「附加服务」成功')
  @ApiExceptionResponse({ code: EXCEPTION_EXISTS, message: '「附加服务」已存在' })
  @ApiExceptionResponse({ code: EXCEPTION_BAD_REQUEST, message: '请求参数错误' })
  @Post('create')
  @HttpCode(200)
  async create(@Body() data: GoodsAdditionPayload) {
    return this.service.create(data)
  }

  @ApiOperation({
    summary: '更新「附加服务」',
  })
  @ApiDoneResponse('更新「附加服务」成功')
  @ApiExceptionResponse({ code: EXCEPTION_NOT_FOUND, message: '「附加服务」不存在' })
  @ApiExceptionResponse({ code: EXCEPTION_EXISTS, message: '「附加服务」已存在' })
  @ApiExceptionResponse({ code: EXCEPTION_BAD_REQUEST, message: '请求参数错误' })
  @Put('update')
  async update(
    @Query() query: GetGoodsAdditionRequest,
    @Body() data: GoodsAdditionPayload,
  ) {
    return this.service.update(+query.id, data)
  }

  @ApiOperation({
    summary: '删除「附加服务」',
  })
  @ApiDoneResponse('删除「附加服务」成功')
  @ApiExceptionResponse({ code: EXCEPTION_FAILED, message: '删除「附加服务」失败' })
  @Delete('delete')
  async delete(@Body() data: DeleteGoodsAdditionRequest) {
    return this.service.delete(
      data.id,
    )
  }
}
