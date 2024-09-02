import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { Body, Controller, Delete, Get, HttpCode, Post, Put, Query } from '@nestjs/common'
import { ProductAttributeTemplateService } from '@/product/attribute-template/service'
import {
  DeleteProductAttributeTemplateRequest,
  GetProductAttributeTemplatePagesRequest,
  GetProductAttributeTemplateRequest,
  ProductAttributeTemplateDictResponse,
  ProductAttributeTemplateListResponse,
  ProductAttributeTemplatePayload,
  ProductAttributeTemplateResponse,
} from '@/product/attribute-template/dto'
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

@ApiTags('管理/商品/参数模板')
@Controller('admin/product/attribute-template')
export class ProductAttributeTemplateAdminController {
  constructor(
    private readonly service: ProductAttributeTemplateService,
  ) {}

  @ApiOperation({
    summary: '获取商品参数模板分页列表',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiPaginatedResponse(ProductAttributeTemplateListResponse)
  @ApiFailedExceptionResponse({ description: '获取商品参数模板列表分页失败' })
  @Get('pages')
  async pages(@Query() query: GetProductAttributeTemplatePagesRequest) {
    return this.service.findPages(query)
  }

  @ApiOperation({
    summary: '获取商品参数模板字典列表',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiListedResponse(ProductAttributeTemplateDictResponse)
  @ApiFailedExceptionResponse({ description: '获取商品参数模板字典列表失败' })
  @Get('dict/list')
  async listDict() {
    return this.service.findDictList()
  }

  @ApiOperation({
    summary: '获取商品参数模板详情',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiObjectResponse(ProductAttributeTemplateResponse)
  @ApiFailedExceptionResponse({ description: '获取商品参数模板详情失败' })
  @ApiNotFoundExceptionResponse({ description: '商品参数模板不存在' })
  @Get('detail')
  async detail(@Query() query: GetProductAttributeTemplateRequest) {
    return this.service.findById(+query.id)
  }

  @ApiOperation({
    summary: '创建商品参数模板',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiDoneResponse('创建成功')
  @ApiFailedExceptionResponse({ description: '创建商品参数模板失败' })
  @ApiExistsExceptionResponse({ description: '商品参数模板已存在' })
  @ApiNotFoundExceptionResponse({ description: '商品参数模板不存在' })
  @Post('create')
  @HttpCode(200)
  async create(@Body() data: ProductAttributeTemplatePayload) {
    return this.service.create(data)
  }

  @ApiOperation({
    summary: '更新商品参数模板',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiDoneResponse('更新成功')
  @ApiFailedExceptionResponse({ description: '更新商品参数模板失败' })
  @ApiNotFoundExceptionResponse({ description: '商品参数模板不存在' })
  @ApiExistsExceptionResponse({ description: '商品参数模板已存在' })
  @Put('update')
  async update(
    @Query() query: GetProductAttributeTemplateRequest,
    @Body() data: ProductAttributeTemplatePayload,
  ) {
    return this.service.update(+query.id, data)
  }

  @ApiOperation({
    summary: '删除商品参数模板',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiDoneResponse('删除成功')
  @ApiFailedExceptionResponse({ description: '删除商品参数模板失败' })
  @Delete('delete')
  async delete(@Body() data: DeleteProductAttributeTemplateRequest) {
    return this.service.delete(data.id)
  }
}
