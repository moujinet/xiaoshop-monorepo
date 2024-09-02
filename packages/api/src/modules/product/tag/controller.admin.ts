import { Body, Controller, Delete, Get, HttpCode, Post, Put, Query } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { ProductTagService } from '@/product/tag/service'
import {
  DeleteProductTagRequest,
  GetProductTagPagesRequest,
  GetProductTagRequest,
  ProductTagDictResponse,
  ProductTagListResponse,
  ProductTagPayload,
  ProductTagResponse,
} from '@/product/tag/dto'
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

@ApiTags('管理/商品/标签')
@Controller('admin/product/tag')
export class ProductTagAdminController {
  constructor(
    private readonly service: ProductTagService,
  ) {}

  @ApiOperation({
    summary: '获取商品标签分页列表',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiPaginatedResponse(ProductTagListResponse)
  @ApiFailedExceptionResponse({ description: '获取商品标签列表分页失败' })
  @Get('pages')
  async pages(@Query() query: GetProductTagPagesRequest) {
    return this.service.findPages(query)
  }

  @ApiOperation({
    summary: '获取商品标签字典列表',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiListedResponse(ProductTagDictResponse)
  @ApiFailedExceptionResponse({ description: '获取商品标签字典列表失败' })
  @Get('dict/list')
  async listDict() {
    return this.service.findDictList()
  }

  @ApiOperation({
    summary: '获取商品标签详情',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiObjectResponse(ProductTagResponse)
  @ApiFailedExceptionResponse({ description: '获取商品标签详情失败' })
  @ApiNotFoundExceptionResponse({ description: '商品标签不存在' })
  @Get('detail')
  async detail(@Query() query: GetProductTagRequest) {
    return this.service.findById(+query.id)
  }

  @ApiOperation({
    summary: '创建商品标签',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiDoneResponse('创建成功')
  @ApiFailedExceptionResponse({ description: '创建商品标签失败' })
  @ApiExistsExceptionResponse({ description: '商品标签已存在' })
  @Post('create')
  @HttpCode(200)
  async create(@Body() data: ProductTagPayload) {
    return this.service.create(data)
  }

  @ApiOperation({
    summary: '更新商品标签',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiDoneResponse('更新成功')
  @ApiFailedExceptionResponse({ description: '更新商品标签失败' })
  @ApiNotFoundExceptionResponse({ description: '商品标签不存在' })
  @ApiExistsExceptionResponse({ description: '商品标签已存在' })
  @Put('update')
  async update(
    @Query() query: GetProductTagRequest,
    @Body() data: ProductTagPayload,
  ) {
    return this.service.update(+query.id, data)
  }

  @ApiOperation({
    summary: '删除商品标签',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiDoneResponse('删除成功')
  @ApiFailedExceptionResponse({ description: '删除商品标签失败' })
  @Delete('delete')
  async delete(@Body() data: DeleteProductTagRequest) {
    return this.service.delete(data.id)
  }
}
