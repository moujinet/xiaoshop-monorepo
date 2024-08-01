import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { Body, Controller, Get, Put, Query } from '@nestjs/common'
import { EXCEPTION_FAILED } from '~/common/exception'
import { GoodsSkuService } from '@/goods/sku/service'
import {
  GetGoodsSkuByGoodsRequest,
  GoodsSkuResponse,
  UpdateGoodsSkusPayload,
} from '@/goods/sku/dto'
import {
  ApiDoneResponse,
  ApiExceptionResponse,
  ApiListedResponse,
} from '~/common/response/decorators'

@ApiTags('商品/多规格商品')
@Controller('goods/skus')
export class GoodsSkuController {
  constructor(
    private readonly service: GoodsSkuService,
  ) {}

  @ApiOperation({
    summary: '获取「多规格商品」列表',
  })
  @ApiListedResponse(GoodsSkuResponse)
  @ApiExceptionResponse({ code: EXCEPTION_FAILED, message: '获取「多规格商品」列表失败' })
  @Get('list')
  async list(@Query() query: GetGoodsSkuByGoodsRequest) {
    return this.service.findList(query.id)
  }

  @ApiOperation({
    summary: '更新「多规格商品」价格',
  })
  @ApiDoneResponse()
  @ApiExceptionResponse({ code: EXCEPTION_FAILED, message: '更新「多规格商品」价格失败' })
  @Put('update')
  async update(
    @Query() query: GetGoodsSkuByGoodsRequest,
    @Body() data: UpdateGoodsSkusPayload,
  ) {
    return this.service.update(query.id, data.skus, data.skuCode)
  }
}
