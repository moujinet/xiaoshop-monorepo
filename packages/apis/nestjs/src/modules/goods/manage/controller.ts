import { EventEmitter2 } from '@nestjs/event-emitter'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { Body, Controller, Delete, Get, HttpCode, Post, Put, Query } from '@nestjs/common'
import {
  BatchUpdateGoodsPayload,
  CloneGoodsRequest,
  CreateGoodsResponse,
  DeleteBatchGoodsRequest,
  DeleteGoodsRequest,
  GetGoodsRequest,
  GoodsBasicInfoPayload,
  GoodsBasicInfoResponse,
  GoodsDetailInfoResponse,
  GoodsDetailPayload,
  GoodsResponse,
  GoodsStockInfoPayload,
  GoodsStockInfoResponse,
} from '@/goods/manage/dto'
import {
  ApiAnyResponse,
  ApiDoneResponse,
  ApiExceptionResponse,
  ApiObjectResponse,
} from '~/common/response/decorators'
import {
  EXCEPTION_BAD_REQUEST,
  EXCEPTION_EXISTS,
  EXCEPTION_NOT_FOUND,
  NotFoundException,
} from '~/common/exception'
import { GoodsService } from '@/goods/manage/service'
import { GoodsCloneEvent } from '@/goods/goods.events'

@ApiTags('商品信息')
@Controller('goods')
export class GoodsController {
  constructor(
    private readonly service: GoodsService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  @ApiOperation({
    summary: '获取「商品」详情',
  })
  @ApiObjectResponse(GoodsResponse)
  @ApiExceptionResponse({ code: EXCEPTION_NOT_FOUND, message: '「商品信息」不存在' })
  @ApiExceptionResponse({ code: EXCEPTION_BAD_REQUEST, message: '请求参数错误' })
  @Get('detail')
  async detail(@Query() query: GetGoodsRequest) {
    return this.service.findDetail(query.id)
  }

  @ApiOperation({
    summary: '获取「商品」基本信息',
  })
  @ApiObjectResponse(GoodsBasicInfoResponse)
  @ApiExceptionResponse({ code: EXCEPTION_NOT_FOUND, message: '「商品信息」不存在' })
  @ApiExceptionResponse({ code: EXCEPTION_BAD_REQUEST, message: '请求参数错误' })
  @Get('detail/basic')
  async basicInfo(@Query() query: GetGoodsRequest) {
    return this.service.findBasicInfo(query.id)
  }

  @ApiOperation({
    summary: '获取「商品」价格库存信息',
  })
  @ApiObjectResponse(GoodsStockInfoResponse)
  @ApiExceptionResponse({ code: EXCEPTION_NOT_FOUND, message: '「商品信息」不存在' })
  @ApiExceptionResponse({ code: EXCEPTION_BAD_REQUEST, message: '请求参数错误' })
  @Get('detail/stock')
  async stockInfo(@Query() query: GetGoodsRequest) {
    return this.service.findStockInfo(query.id)
  }

  @ApiOperation({
    summary: '获取「商品」详情信息',
  })
  @ApiObjectResponse(GoodsDetailInfoResponse)
  @ApiExceptionResponse({ code: EXCEPTION_NOT_FOUND, message: '「商品信息」不存在' })
  @ApiExceptionResponse({ code: EXCEPTION_BAD_REQUEST, message: '请求参数错误' })
  @Get('detail/content')
  async detailContent(@Query() query: GetGoodsRequest) {
    return this.service.findDetailContent(query.id)
  }

  @ApiOperation({
    summary: '统计「商品」预警数量',
  })
  @ApiAnyResponse<number>(1)
  @ApiExceptionResponse({ code: EXCEPTION_BAD_REQUEST, message: '请求参数错误' })
  @Get('warning/count')
  async countWarning() {
    return this.service.countWarningGoods()
  }

  @ApiOperation({
    summary: '创建「商品」基本信息',
  })
  @ApiObjectResponse(CreateGoodsResponse)
  @ApiExceptionResponse({ code: EXCEPTION_EXISTS, message: '「商品」信息已存在' })
  @ApiExceptionResponse({ code: EXCEPTION_BAD_REQUEST, message: '请求参数错误' })
  @Post('basic/create')
  @HttpCode(200)
  async createBasicInfo(@Body() data: GoodsBasicInfoPayload) {
    return this.service.createBasicInfo(data)
  }

  @ApiOperation({
    summary: '更新「商品」基本信息',
  })
  @ApiDoneResponse()
  @ApiExceptionResponse({ code: EXCEPTION_EXISTS, message: '「商品」信息已存在' })
  @ApiExceptionResponse({ code: EXCEPTION_NOT_FOUND, message: '「商品」信息不存在' })
  @ApiExceptionResponse({ code: EXCEPTION_BAD_REQUEST, message: '请求参数错误' })
  @Put('basic/update')
  async updateBasicInfo(
    @Query() query: GetGoodsRequest,
    @Body() data: GoodsBasicInfoPayload,
  ) {
    return this.service.updateBasicInfo(query.id, data)
  }

  @ApiOperation({
    summary: '更新「商品」价格库存信息',
  })
  @ApiDoneResponse()
  @ApiExceptionResponse({ code: EXCEPTION_EXISTS, message: '「商品」信息已存在' })
  @ApiExceptionResponse({ code: EXCEPTION_NOT_FOUND, message: '「商品」信息不存在' })
  @ApiExceptionResponse({ code: EXCEPTION_BAD_REQUEST, message: '请求参数错误' })
  @Put('stock/update')
  async updateStockInfo(
    @Query() query: GetGoodsRequest,
    @Body() data: GoodsStockInfoPayload,
  ) {
    return this.service.updateStockInfo(query.id, data)
  }

  @ApiOperation({
    summary: '更新「商品」详情',
  })
  @ApiDoneResponse()
  @ApiExceptionResponse({ code: EXCEPTION_NOT_FOUND, message: '「商品」信息不存在' })
  @ApiExceptionResponse({ code: EXCEPTION_BAD_REQUEST, message: '请求参数错误' })
  @Put('detail/update')
  async updateDetailContent(
    @Query() query: GetGoodsRequest,
    @Body() data: GoodsDetailPayload,
  ) {
    return this.service.updateDetail(query.id, data)
  }

  @ApiOperation({
    summary: '复制「商品」至草稿',
  })
  @ApiDoneResponse()
  @ApiExceptionResponse({ code: EXCEPTION_BAD_REQUEST, message: '请求参数错误' })
  @Post('copy')
  @HttpCode(200)
  async copyToDraft(@Body() data: CloneGoodsRequest) {
    if (!this.service.isExists(data.id))
      throw new NotFoundException(`商品 [${data.id}] `)

    this.eventEmitter.emit(
      GoodsCloneEvent.eventName,
      new GoodsCloneEvent(data.id),
    )
  }

  @ApiOperation({
    summary: '增加「商品」浏览量',
  })
  @ApiDoneResponse()
  @ApiExceptionResponse({ code: EXCEPTION_BAD_REQUEST, message: '请求参数错误' })
  @Put('visit/update')
  async visitUpdate(@Query() query: GetGoodsRequest) {
    return this.service.updateVisit(query.id)
  }

  @ApiOperation({
    summary: '逻辑删除「商品」',
  })
  @ApiDoneResponse()
  @ApiExceptionResponse({ code: EXCEPTION_BAD_REQUEST, message: '请求参数错误' })
  @Delete('delete/soft')
  async softDelete(@Body() data: DeleteGoodsRequest) {
    return this.service.softDelete(data.id)
  }

  @ApiOperation({
    summary: '恢复已删除「商品」',
  })
  @ApiDoneResponse()
  @ApiExceptionResponse({ code: EXCEPTION_BAD_REQUEST, message: '请求参数错误' })
  @Put('delete/restore')
  async restore(@Body() data: DeleteGoodsRequest) {
    return this.service.restore(data.id)
  }

  @ApiOperation({
    summary: '批量更新「商品」属性',
  })
  @ApiDoneResponse()
  @ApiExceptionResponse({ code: EXCEPTION_NOT_FOUND, message: '「商品」信息不存在' })
  @ApiExceptionResponse({ code: EXCEPTION_BAD_REQUEST, message: '请求参数错误' })
  @Put('batch/update')
  async batchUpdate(
    @Body() data: BatchUpdateGoodsPayload,
  ) {
    return this.service.batchUpdate(data.ids, data.data)
  }

  @ApiOperation({
    summary: '批量逻辑删除「商品」',
  })
  @ApiDoneResponse()
  @ApiExceptionResponse({ code: EXCEPTION_BAD_REQUEST, message: '请求参数错误' })
  @Delete('batch/delete/soft')
  async batchSoftDelete(@Body() data: DeleteBatchGoodsRequest) {
    return this.service.batchDelete(data.ids)
  }

  @ApiOperation({
    summary: '批量恢复已删除「商品」',
  })
  @ApiDoneResponse()
  @ApiExceptionResponse({ code: EXCEPTION_BAD_REQUEST, message: '请求参数错误' })
  @Put('batch/delete/restore')
  async batchRestore(@Body() data: DeleteBatchGoodsRequest) {
    return this.service.batchRestore(data.ids)
  }
}