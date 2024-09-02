import { Body, Controller, Delete, Get, HttpCode, Post, Put, Query } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { ProductGroupService } from '@/product/group/service'
import {
  DeleteProductGroupRequest,
  GetProductGroupPagesRequest,
  GetProductGroupRequest,
  ProductGroupDictResponse,
  ProductGroupListResponse,
  ProductGroupPayload,
  ProductGroupResponse,
} from '@/product/group/dto'
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

@ApiTags('管理/商品/分组')
@Controller('admin/product/group')
export class ProductGroupAdminController {
  constructor(
    private readonly service: ProductGroupService,
  ) {}

  @ApiOperation({
    summary: '获取商品分组分页列表',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiPaginatedResponse(ProductGroupListResponse)
  @ApiFailedExceptionResponse({ description: '获取商品分组列表分页失败' })
  @Get('pages')
  async pages(@Query() query: GetProductGroupPagesRequest) {
    return this.service.findPages(query)
  }

  @ApiOperation({
    summary: '获取商品分组字典列表',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiListedResponse(ProductGroupDictResponse)
  @ApiFailedExceptionResponse({ description: '获取商品分组字典列表失败' })
  @Get('dict/list')
  async listDict() {
    return this.service.findDictList()
  }

  @ApiOperation({
    summary: '获取商品分组详情',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiObjectResponse(ProductGroupResponse)
  @ApiFailedExceptionResponse({ description: '获取商品分组详情失败' })
  @ApiNotFoundExceptionResponse({ description: '商品分组不存在' })
  @Get('detail')
  async detail(@Query() query: GetProductGroupRequest) {
    return this.service.findById(+query.id)
  }

  @ApiOperation({
    summary: '创建商品分组',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiDoneResponse('创建成功')
  @ApiFailedExceptionResponse({ description: '创建商品分组失败' })
  @ApiExistsExceptionResponse({ description: '商品分组已存在' })
  @ApiNotFoundExceptionResponse({ description: '商品分组不存在' })
  @Post('create')
  @HttpCode(200)
  async create(@Body() data: ProductGroupPayload) {
    return this.service.create(data)
  }

  @ApiOperation({
    summary: '更新商品分组',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiDoneResponse('更新成功')
  @ApiFailedExceptionResponse({ description: '更新商品分组失败' })
  @ApiNotFoundExceptionResponse({ description: '商品分组不存在' })
  @ApiExistsExceptionResponse({ description: '商品分组已存在' })
  @Put('update')
  async update(
    @Query() query: GetProductGroupRequest,
    @Body() data: ProductGroupPayload,
  ) {
    return this.service.update(+query.id, data)
  }

  @ApiOperation({
    summary: '删除商品分组',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiDoneResponse('删除成功')
  @ApiFailedExceptionResponse({ description: '删除商品分组失败' })
  @Delete('delete')
  async delete(@Body() data: DeleteProductGroupRequest) {
    return this.service.delete(data.id)
  }
}
