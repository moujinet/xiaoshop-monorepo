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

@ApiTags('商品保障服务')
@Controller('goods/protection')
export class GoodsProtectionController {
  constructor(
    private readonly service: GoodsProtectionService,
  ) {}

  @ApiOperation({
    summary: '获取商品保障服务列表',
  })
  @ApiListedResponse(GoodsProtectionListResponse)
  @ApiExceptionResponse({ code: EXCEPTION_FAILED, message: '请求失败' })
  @Get('list')
  async list() {
    return this.service.findList()
  }

  @ApiOperation({
    summary: '获取「商品保障服务」字典列表',
  })
  @ApiListedResponse(GoodsProtectionDictResponse)
  @ApiExceptionResponse({ code: EXCEPTION_FAILED, message: '请求失败' })
  @Get('dict/list')
  async dictList() {
    return this.service.findDictList()
  }

  @ApiOperation({
    summary: '获取商品保障服务详情',
  })
  @ApiObjectResponse(GoodsProtectionResponse)
  @ApiExceptionResponse({ code: EXCEPTION_NOT_FOUND, message: '商品保障服务不存在' })
  @Get('detail')
  async detail(@Query() query: GetGoodsProtectionRequest) {
    return this.service.findDetail(+query.id)
  }

  @ApiOperation({
    summary: '创建商品保障服务',
  })
  @ApiDoneResponse('创建成功')
  @ApiExceptionResponse({ code: EXCEPTION_EXISTS, message: '商品保障服务已存在' })
  @ApiExceptionResponse({ code: EXCEPTION_BAD_REQUEST, message: '请求参数错误' })
  @Post('create')
  @HttpCode(200)
  async create(@Body() data: GoodsProtectionPayload) {
    return this.service.create(data)
  }

  @ApiOperation({
    summary: '更新商品保障服务',
  })
  @ApiDoneResponse('更新成功')
  @ApiExceptionResponse({ code: EXCEPTION_NOT_FOUND, message: '商品保障服务不存在' })
  @ApiExceptionResponse({ code: EXCEPTION_EXISTS, message: '商品保障服务已存在' })
  @ApiExceptionResponse({ code: EXCEPTION_BAD_REQUEST, message: '请求参数错误' })
  @Put('update')
  async update(
    @Query() query: GetGoodsProtectionRequest,
    @Body() data: GoodsProtectionPayload,
  ) {
    return this.service.update(+query.id, data)
  }

  @ApiOperation({
    summary: '删除商品保障服务',
  })
  @ApiDoneResponse('删除成功')
  @ApiExceptionResponse({ code: EXCEPTION_FAILED, message: '删除失败' })
  @Delete('delete')
  async delete(@Body() data: DeleteGoodsProtectionRequest) {
    return this.service.delete(
      data.id,
    )
  }
}
