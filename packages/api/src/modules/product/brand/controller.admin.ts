import { Body, Controller, Delete, Get, HttpCode, Post, Put, Query } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { ProductBrandService } from '@/product/brand/service'
import {
  DeleteProductBrandRequest,
  GetProductBrandPagesRequest,
  GetProductBrandRequest,
  ProductBrandDictResponse,
  ProductBrandListResponse,
  ProductBrandPayload,
  ProductBrandResponse,
} from '@/product/brand/dto'
import {
  ApiDoneResponse,
  ApiExistsExceptionResponse,
  ApiFailedExceptionResponse,
  ApiListedResponse,
  ApiNotFoundExceptionResponse,
  ApiObjectResponse,
  ApiPaginatedResponse,
} from '~/common/decorators'
import { Admin } from '@/auth/decorators'

@ApiTags('管理/商品/品牌')
@Controller('admin/product/brand')
export class ProductBrandAdminController {
  constructor(
    private readonly service: ProductBrandService,
  ) {}

  @ApiOperation({
    summary: '获取商品品牌分页列表',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiPaginatedResponse(ProductBrandListResponse)
  @ApiFailedExceptionResponse({ description: '获取商品品牌列表分页失败' })
  @Get('pages')
  async pages(@Query() query: GetProductBrandPagesRequest) {
    return this.service.findPages(query)
  }

  @ApiOperation({
    summary: '获取商品品牌字典列表',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiListedResponse(ProductBrandDictResponse)
  @ApiFailedExceptionResponse({ description: '获取商品品牌字典列表失败' })
  @Get('dict/list')
  async listDict() {
    return this.service.findDictList()
  }

  @ApiOperation({
    summary: '获取商品品牌详情',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiObjectResponse(ProductBrandResponse)
  @ApiFailedExceptionResponse({ description: '获取商品品牌详情失败' })
  @ApiNotFoundExceptionResponse({ description: '商品品牌不存在' })
  @Get('detail')
  async detail(@Query() query: GetProductBrandRequest) {
    return this.service.findById(+query.id)
  }

  @ApiOperation({
    summary: '创建商品品牌',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiDoneResponse('创建成功')
  @ApiFailedExceptionResponse({ description: '创建商品品牌失败' })
  @ApiExistsExceptionResponse({ description: '商品品牌已存在' })
  @ApiNotFoundExceptionResponse({ description: '商品品牌不存在' })
  @Post('create')
  @HttpCode(200)
  async create(@Body() data: ProductBrandPayload) {
    return this.service.create(data)
  }

  @ApiOperation({
    summary: '更新商品品牌',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiDoneResponse('更新成功')
  @ApiFailedExceptionResponse({ description: '更新商品品牌失败' })
  @ApiNotFoundExceptionResponse({ description: '商品品牌不存在' })
  @ApiExistsExceptionResponse({ description: '商品品牌已存在' })
  @Put('update')
  async update(
    @Query() query: GetProductBrandRequest,
    @Body() data: ProductBrandPayload,
  ) {
    return this.service.update(+query.id, data)
  }

  @ApiOperation({
    summary: '删除商品品牌',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiDoneResponse('删除成功')
  @ApiFailedExceptionResponse({ description: '删除商品品牌失败' })
  @Delete('delete')
  async delete(@Body() data: DeleteProductBrandRequest) {
    return this.service.delete(data.id)
  }
}
