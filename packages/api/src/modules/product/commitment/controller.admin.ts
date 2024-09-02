import { Body, Controller, Delete, Get, HttpCode, Post, Put, Query } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { ProductCommitmentService } from '@/product/commitment/service'
import {
  DeleteProductCommitmentRequest,
  GetProductCommitmentPagesRequest,
  GetProductCommitmentRequest,
  ProductCommitmentDictResponse,
  ProductCommitmentListResponse,
  ProductCommitmentPayload,
  ProductCommitmentResponse,
} from '@/product/commitment/dto'
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

@ApiTags('管理/商品/服务承诺')
@Controller('admin/product/commitment')
export class ProductCommitmentAdminController {
  constructor(
    private readonly service: ProductCommitmentService,
  ) {}

  @ApiOperation({
    summary: '获取商品服务承诺分页列表',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiPaginatedResponse(ProductCommitmentListResponse)
  @ApiFailedExceptionResponse({ description: '获取商品服务承诺列表分页失败' })
  @Get('pages')
  async pages(@Query() query: GetProductCommitmentPagesRequest) {
    return this.service.findPages(query)
  }

  @ApiOperation({
    summary: '获取商品服务承诺字典列表',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiListedResponse(ProductCommitmentDictResponse)
  @ApiFailedExceptionResponse({ description: '获取商品服务承诺字典列表失败' })
  @Get('dict/list')
  async listDict() {
    return this.service.findDictList()
  }

  @ApiOperation({
    summary: '获取商品服务承诺详情',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiObjectResponse(ProductCommitmentResponse)
  @ApiFailedExceptionResponse({ description: '获取商品服务承诺详情失败' })
  @ApiNotFoundExceptionResponse({ description: '商品服务承诺不存在' })
  @Get('detail')
  async detail(@Query() query: GetProductCommitmentRequest) {
    return this.service.findById(+query.id)
  }

  @ApiOperation({
    summary: '创建商品服务承诺',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiDoneResponse('创建成功')
  @ApiFailedExceptionResponse({ description: '创建商品服务承诺失败' })
  @ApiExistsExceptionResponse({ description: '商品服务承诺已存在' })
  @ApiNotFoundExceptionResponse({ description: '商品服务承诺不存在' })
  @Post('create')
  @HttpCode(200)
  async create(@Body() data: ProductCommitmentPayload) {
    return this.service.create(data)
  }

  @ApiOperation({
    summary: '更新商品服务承诺',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiDoneResponse('更新成功')
  @ApiFailedExceptionResponse({ description: '更新商品服务承诺失败' })
  @ApiNotFoundExceptionResponse({ description: '商品服务承诺不存在' })
  @ApiExistsExceptionResponse({ description: '商品服务承诺已存在' })
  @Put('update')
  async update(
    @Query() query: GetProductCommitmentRequest,
    @Body() data: ProductCommitmentPayload,
  ) {
    return this.service.update(+query.id, data)
  }

  @ApiOperation({
    summary: '删除商品服务承诺',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiDoneResponse('删除成功')
  @ApiFailedExceptionResponse({ description: '删除商品服务承诺失败' })
  @Delete('delete')
  async delete(@Body() data: DeleteProductCommitmentRequest) {
    return this.service.delete(data.id)
  }
}
