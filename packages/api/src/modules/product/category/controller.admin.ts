import { Body, Controller, Delete, Get, HttpCode, Post, Put, Query } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { ProductCategoryService } from '@/product/category/service'
import {
  DeleteProductCategoryRequest,
  GetProductCategoryListRequest,
  GetProductCategoryRequest,
  ProductCategoryDictResponse,
  ProductCategoryListResponse,
  ProductCategoryPayload,
  ProductCategoryResponse,
} from '@/product/category/dto'
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

@ApiTags('管理/商品/分类')
@Controller('admin/product/category')
export class ProductCategoryAdminController {
  constructor(
    private readonly service: ProductCategoryService,
  ) {}

  @ApiOperation({
    summary: '获取商品分类列表',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiPaginatedResponse(ProductCategoryListResponse)
  @ApiFailedExceptionResponse({ description: '获取商品分类列表分页失败' })
  @Get('list')
  async list(@Query() query: GetProductCategoryListRequest) {
    return this.service.findList(query.parentId ? +query.parentId : undefined)
  }

  @ApiOperation({
    summary: '获取商品分类根列表',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiListedResponse(ProductCategoryDictResponse)
  @ApiFailedExceptionResponse({ description: '获取商品分类根列表失败' })
  @Get('root/list')
  async listRoot() {
    return this.service.findDictList(0)
  }

  @ApiOperation({
    summary: '获取商品分类字典列表',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiListedResponse(ProductCategoryDictResponse)
  @ApiFailedExceptionResponse({ description: '获取商品分类字典列表失败' })
  @Get('dict/list')
  async listDict() {
    return this.service.findDictList()
  }

  @ApiOperation({
    summary: '获取商品分类详情',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiObjectResponse(ProductCategoryResponse)
  @ApiFailedExceptionResponse({ description: '获取商品分类详情失败' })
  @ApiNotFoundExceptionResponse({ description: '商品分类不存在' })
  @Get('detail')
  async detail(@Query() query: GetProductCategoryRequest) {
    return this.service.findById(+query.id)
  }

  @ApiOperation({
    summary: '创建商品分类',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiDoneResponse('创建成功')
  @ApiFailedExceptionResponse({ description: '创建商品分类失败' })
  @ApiExistsExceptionResponse({ description: '商品分类已存在' })
  @ApiNotFoundExceptionResponse({ description: '商品分类不存在' })
  @Post('create')
  @HttpCode(200)
  async create(@Body() data: ProductCategoryPayload) {
    return this.service.create(data)
  }

  @ApiOperation({
    summary: '更新商品分类',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiDoneResponse('更新成功')
  @ApiFailedExceptionResponse({ description: '更新商品分类失败' })
  @ApiNotFoundExceptionResponse({ description: '商品分类不存在' })
  @ApiExistsExceptionResponse({ description: '商品分类已存在' })
  @Put('update')
  async update(
    @Query() query: GetProductCategoryRequest,
    @Body() data: ProductCategoryPayload,
  ) {
    return this.service.update(+query.id, data)
  }

  @ApiOperation({
    summary: '删除商品分类',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiDoneResponse('删除成功')
  @ApiFailedExceptionResponse({ description: '删除商品分类失败' })
  @Delete('delete')
  async delete(@Body() data: DeleteProductCategoryRequest) {
    return this.service.delete(data.id)
  }
}
