import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger'
import { Body, Controller, Get, ParseArrayPipe, Put, Query } from '@nestjs/common'
import { EXCEPTION_FAILED, exceptionFactory } from '~/common/exception'
import { GoodsSpecService } from '@/goods/spec/service'
import {
  GetGoodsSpecByGoodsRequest,
  GoodsSpecPayload,
  GoodsSpecResponse,
} from '@/goods/spec/dto'
import {
  ApiExceptionResponse,
  ApiListedResponse,
} from '~/common/response/decorators'

@ApiTags('商品多规格')
@Controller('goods/spec')
export class GoodsSpecController {
  constructor(
    private readonly spec: GoodsSpecService,
  ) {}

  @ApiOperation({
    summary: '获取「商品多规格」设置',
  })
  @ApiListedResponse(GoodsSpecResponse)
  @ApiExceptionResponse({ code: EXCEPTION_FAILED, message: '获取「商品多规格」设置列表失败' })
  @Get('list')
  async list(@Query() query: GetGoodsSpecByGoodsRequest) {
    return this.spec.findList(query.id)
  }

  @ApiOperation({
    summary: '更新「商品多规格」设置',
  })
  @ApiListedResponse(GoodsSpecResponse)
  @ApiExceptionResponse({ code: EXCEPTION_FAILED, message: '获取「商品多规格」设置失败' })
  @ApiBody({ type: [GoodsSpecPayload] })
  @Put('update')
  async update(
    @Query() query: GetGoodsSpecByGoodsRequest,
    @Body(new ParseArrayPipe({ items: GoodsSpecPayload, exceptionFactory })) data: GoodsSpecPayload[],
  ) {
    return this.spec.update(query.id, data)
  }
}
