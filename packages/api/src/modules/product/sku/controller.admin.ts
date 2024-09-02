import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { Controller, Get, Query } from '@nestjs/common'
import { ProductSkuService } from '@/product/sku/service'
import {
  GetProductSkuListRequest,
  ProductSkuInfoResponse,
} from '@/product/sku/dto'
import {
  ApiFailedExceptionResponse,
  ApiListedResponse,
} from '~/common/decorators'
import { Admin } from '@/auth/decorators'

@ApiTags('管理/商品/SKU')
@Controller('admin/product/sku')
export class ProductSkuAdminController {
  constructor(
    private readonly service: ProductSkuService,
  ) {}

  @ApiOperation({
    summary: '获取商品 SKU 列表',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiListedResponse(ProductSkuInfoResponse)
  @ApiFailedExceptionResponse({ description: '获取商品 SKU 列表失败' })
  @Get('list')
  async list(@Query() query: GetProductSkuListRequest) {
    return this.service.findListByProduct(+query.productId)
  }
}
