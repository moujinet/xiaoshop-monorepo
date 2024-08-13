import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { Body, Controller, Delete, Get, HttpCode, Post, Put, Query } from '@nestjs/common'
import {
  DeleteGoodsAttributeTemplateRequest,
  GetGoodsAttributeTemplateRequest,
  GoodsAttributeTemplateDictResponse,
  GoodsAttributeTemplateListResponse,
  GoodsAttributeTemplatePayload,
  GoodsAttributeTemplateResponse,
} from '@/goods/attribute-template/dto'
import {
  EXCEPTION_BAD_REQUEST,
  EXCEPTION_EXISTS,
  EXCEPTION_FAILED,
  EXCEPTION_NOT_FOUND,
} from '~/common/exception'
import {
  ApiDoneResponse,
  ApiExceptionResponse,
  ApiListedResponse,
  ApiObjectResponse,
} from '~/common/response/decorators'
import { GoodsAttributeTemplateService } from '@/goods/attribute-template/service'
import { Admin } from '@/auth/decorators'

@ApiTags('管理/商品/参数模板')
@Controller('admin/goods/attribute-template')
export class GoodsAttributeTemplateAdminController {
  constructor(
    private readonly service: GoodsAttributeTemplateService,
  ) {}

  @ApiOperation({
    summary: '获取「参数模板」列表',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiListedResponse(GoodsAttributeTemplateListResponse)
  @ApiExceptionResponse({ code: EXCEPTION_FAILED, message: '获取「参数模板」列表失败' })
  @Get('list')
  async list() {
    return this.service.findList()
  }

  @ApiOperation({
    summary: '获取「参数模板」字典列表',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiListedResponse(GoodsAttributeTemplateDictResponse)
  @ApiExceptionResponse({ code: EXCEPTION_FAILED, message: '获取「参数模板」字典列表失败' })
  @Get('dict/list')
  async dictList() {
    return this.service.findDictList()
  }

  @ApiOperation({
    summary: '获取「参数模板」详情',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiObjectResponse(GoodsAttributeTemplateResponse)
  @ApiExceptionResponse({ code: EXCEPTION_NOT_FOUND, message: '「参数模板」不存在' })
  @Get('detail')
  async detail(@Query() query: GetGoodsAttributeTemplateRequest) {
    return this.service.findDetail(+query.id)
  }

  @ApiOperation({
    summary: '创建「参数模板」信息',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiDoneResponse('创建「参数模板」信息成功')
  @ApiExceptionResponse({ code: EXCEPTION_EXISTS, message: '「参数模板」已存在' })
  @ApiExceptionResponse({ code: EXCEPTION_BAD_REQUEST, message: '请求参数错误' })
  @Post('create')
  @HttpCode(200)
  async create(@Body() data: GoodsAttributeTemplatePayload) {
    return this.service.create(data)
  }

  @ApiOperation({
    summary: '更新「参数模板」信息',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiDoneResponse('更新「参数模板」信息成功')
  @ApiExceptionResponse({ code: EXCEPTION_NOT_FOUND, message: '「参数模板」不存在' })
  @ApiExceptionResponse({ code: EXCEPTION_EXISTS, message: '「参数模板」已存在' })
  @ApiExceptionResponse({ code: EXCEPTION_BAD_REQUEST, message: '请求参数错误' })
  @Put('update')
  async update(
    @Query() query: GetGoodsAttributeTemplateRequest,
    @Body() data: GoodsAttributeTemplatePayload,
  ) {
    return this.service.update(+query.id, data)
  }

  @ApiOperation({
    summary: '删除「参数模板」',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiDoneResponse('删除「参数模板」成功')
  @ApiExceptionResponse({ code: EXCEPTION_FAILED, message: '删除「参数模板」失败' })
  @Delete('delete')
  async delete(@Body() data: DeleteGoodsAttributeTemplateRequest) {
    return this.service.delete(data.id)
  }
}
