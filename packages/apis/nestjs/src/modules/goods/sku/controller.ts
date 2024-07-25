import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { Body, Controller, Get, ParseArrayPipe, Put, Query } from '@nestjs/common'
import { EXCEPTION_FAILED, exceptionFactory } from '~/common/exception'
import { GoodsSkuService } from '@/goods/sku/service'
import {
  GetGoodsSkuByGoodsRequest,
  GoodsSkuPayload,
  GoodsSkuResponse,
} from '@/goods/sku/dto'
import {
  ApiDoneResponse,
  ApiExceptionResponse,
  ApiListedResponse,
} from '~/common/response/decorators'

@ApiTags('商品多规格')
@Controller('goods/skus')
export class GoodsSkuController {
  constructor(
    private readonly service: GoodsSkuService,
  ) {}

  @ApiOperation({
    summary: '获取「商品多规格」商品列表',
  })
  @ApiListedResponse(GoodsSkuResponse)
  @ApiExceptionResponse({ code: EXCEPTION_FAILED, message: '获取「商品多规格」商品列表失败' })
  @Get('list')
  async list(@Query() query: GetGoodsSkuByGoodsRequest) {
    return this.service.findList(query.id)
  }

  @ApiOperation({
    summary: '更新「商品多规格」商品价格库存',
  })
  @ApiDoneResponse()
  @ApiExceptionResponse({ code: EXCEPTION_FAILED, message: '更新「商品多规格」商品价格库存失败' })
  @Put('update')
  async update(
    @Query() query: GetGoodsSkuByGoodsRequest,
    @Body(new ParseArrayPipe({ items: GoodsSkuPayload, exceptionFactory })) data: GoodsSkuPayload[],
  ) {
    return this.service.update(query.id, data)
  }
}
