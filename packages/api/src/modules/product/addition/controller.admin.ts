import { Body, Controller, Delete, Get, HttpCode, Post, Put, Query } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { ProductAdditionService } from '@/product/addition/service'
import {
  DeleteProductAdditionRequest,
  GetProductAdditionPagesRequest,
  GetProductAdditionRequest,
  ProductAdditionDictResponse,
  ProductAdditionListResponse,
  ProductAdditionPayload,
  ProductAdditionResponse,
} from '@/product/addition/dto'
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

@ApiTags('管理/商品/附加服务')
@Controller('admin/product/addition')
export class ProductAdditionAdminController {
  constructor(
    private readonly service: ProductAdditionService,
  ) {}

  @ApiOperation({
    summary: '获取商品附加服务分页列表',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiPaginatedResponse(ProductAdditionListResponse)
  @ApiFailedExceptionResponse({ description: '获取商品附加服务列表分页失败' })
  @Get('pages')
  async pages(@Query() query: GetProductAdditionPagesRequest) {
    return this.service.findPages(query)
  }

  @ApiOperation({
    summary: '获取商品附加服务字典列表',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiListedResponse(ProductAdditionDictResponse)
  @ApiFailedExceptionResponse({ description: '获取商品附加服务字典列表失败' })
  @Get('dict/list')
  async listDict() {
    return this.service.findDictList()
  }

  @ApiOperation({
    summary: '获取商品附加服务详情',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiObjectResponse(ProductAdditionResponse)
  @ApiFailedExceptionResponse({ description: '获取商品附加服务详情失败' })
  @ApiNotFoundExceptionResponse({ description: '商品附加服务不存在' })
  @Get('detail')
  async detail(@Query() query: GetProductAdditionRequest) {
    return this.service.findById(+query.id)
  }

  @ApiOperation({
    summary: '创建商品附加服务',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiDoneResponse('创建成功')
  @ApiFailedExceptionResponse({ description: '创建商品附加服务失败' })
  @ApiExistsExceptionResponse({ description: '商品附加服务已存在' })
  @ApiNotFoundExceptionResponse({ description: '商品附加服务不存在' })
  @Post('create')
  @HttpCode(200)
  async create(@Body() data: ProductAdditionPayload) {
    return this.service.create(data)
  }

  @ApiOperation({
    summary: '更新商品附加服务',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiDoneResponse('更新成功')
  @ApiFailedExceptionResponse({ description: '更新商品附加服务失败' })
  @ApiNotFoundExceptionResponse({ description: '商品附加服务不存在' })
  @ApiExistsExceptionResponse({ description: '商品附加服务已存在' })
  @Put('update')
  async update(
    @Query() query: GetProductAdditionRequest,
    @Body() data: ProductAdditionPayload,
  ) {
    return this.service.update(+query.id, data)
  }

  @ApiOperation({
    summary: '删除商品附加服务',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiDoneResponse('删除成功')
  @ApiFailedExceptionResponse({ description: '删除商品附加服务失败' })
  @Delete('delete')
  async delete(@Body() data: DeleteProductAdditionRequest) {
    return this.service.delete(data.id)
  }
}
