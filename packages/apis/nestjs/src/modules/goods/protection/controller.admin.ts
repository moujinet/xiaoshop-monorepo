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
  DeleteGoodsProtectionRequest,
  GetGoodsProtectionRequest,
  GoodsProtectionDictResponse,
  GoodsProtectionListResponse,
  GoodsProtectionPayload,
  GoodsProtectionResponse,
} from '@/goods/protection/dto'
import { GoodsProtectionService } from '@/goods/protection/service'

@ApiTags('管理/商品/保障服务')
@Controller('admin/goods/protection')
export class GoodsProtectionAdminController {
  constructor(
    private readonly service: GoodsProtectionService,
  ) {}

  @ApiOperation({
    summary: '获取「保障服务」列表',
  })
  @ApiListedResponse(GoodsProtectionListResponse)
  @ApiExceptionResponse({ code: EXCEPTION_FAILED, message: '获取「保障服务」列表失败' })
  @Get('list')
  async list() {
    return this.service.findList()
  }

  @ApiOperation({
    summary: '获取「保障服务」字典列表',
  })
  @ApiListedResponse(GoodsProtectionDictResponse)
  @ApiExceptionResponse({ code: EXCEPTION_FAILED, message: '获取「保障服务」字典列表失败' })
  @Get('dict/list')
  async dictList() {
    return this.service.findDictList()
  }

  @ApiOperation({
    summary: '获取「保障服务」详情',
  })
  @ApiObjectResponse(GoodsProtectionResponse)
  @ApiExceptionResponse({ code: EXCEPTION_NOT_FOUND, message: '「保障服务」不存在' })
  @Get('detail')
  async detail(@Query() query: GetGoodsProtectionRequest) {
    return this.service.findDetail(+query.id)
  }

  @ApiOperation({
    summary: '创建「保障服务」',
  })
  @ApiDoneResponse('创建「保障服务」成功')
  @ApiExceptionResponse({ code: EXCEPTION_EXISTS, message: '「保障服务」已存在' })
  @ApiExceptionResponse({ code: EXCEPTION_BAD_REQUEST, message: '请求参数错误' })
  @Post('create')
  @HttpCode(200)
  async create(@Body() data: GoodsProtectionPayload) {
    return this.service.create(data)
  }

  @ApiOperation({
    summary: '更新「保障服务」',
  })
  @ApiDoneResponse('更新「保障服务」成功')
  @ApiExceptionResponse({ code: EXCEPTION_NOT_FOUND, message: '「保障服务」不存在' })
  @ApiExceptionResponse({ code: EXCEPTION_EXISTS, message: '「保障服务」已存在' })
  @ApiExceptionResponse({ code: EXCEPTION_BAD_REQUEST, message: '请求参数错误' })
  @Put('update')
  async update(
    @Query() query: GetGoodsProtectionRequest,
    @Body() data: GoodsProtectionPayload,
  ) {
    return this.service.update(+query.id, data)
  }

  @ApiOperation({
    summary: '删除「保障服务」',
  })
  @ApiDoneResponse('删除「保障服务」成功')
  @ApiExceptionResponse({ code: EXCEPTION_FAILED, message: '删除「保障服务」失败' })
  @Delete('delete')
  async delete(@Body() data: DeleteGoodsProtectionRequest) {
    return this.service.delete(
      data.id,
    )
  }
}
