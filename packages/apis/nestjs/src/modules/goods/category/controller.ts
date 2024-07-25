import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { Body, Controller, Delete, Get, HttpCode, Post, Put, Query } from '@nestjs/common'
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
import {
  DeleteGoodsCategoryRequest,
  GetGoodsCategoryListRequest,
  GetGoodsCategoryRequest,
  GoodsCategoryDictResponse,
  GoodsCategoryNestedDictResponse,
  GoodsCategoryPayload,
  GoodsCategoryResponse,
} from '@/goods/category/dto'
import { GoodsCategoryService } from '@/goods/category/service'

@ApiTags('商品分类')
@Controller('goods/category')
export class GoodsCategoryController {
  constructor(
    private readonly service: GoodsCategoryService,
  ) {}

  @ApiOperation({
    summary: '获取「商品分类」列表',
  })
  @ApiListedResponse(GoodsCategoryResponse)
  @ApiExceptionResponse({ code: EXCEPTION_FAILED, message: '请求失败' })
  @Get('list')
  async list(@Query() query: GetGoodsCategoryListRequest) {
    return this.service.findList(query)
  }

  @ApiOperation({
    summary: '获取「商品分类」根列表',
  })
  @ApiListedResponse(GoodsCategoryDictResponse)
  @ApiExceptionResponse({ code: EXCEPTION_FAILED, message: '请求失败' })
  @Get('root/list')
  async rootList() {
    return this.service.findRootList()
  }

  @ApiOperation({
    summary: '获取「商品分类」层级列表',
  })
  @ApiListedResponse(GoodsCategoryNestedDictResponse)
  @ApiExceptionResponse({ code: EXCEPTION_FAILED, message: '请求失败' })
  @Get('nested/list')
  async nestedList() {
    return this.service.findNestedList()
  }

  @ApiOperation({
    summary: '获取「商品分类」详情',
  })
  @ApiObjectResponse(GoodsCategoryResponse)
  @ApiExceptionResponse({ code: EXCEPTION_NOT_FOUND, message: '「商品分类」不存在' })
  @Get('detail')
  async detail(@Query() query: GetGoodsCategoryRequest) {
    return this.service.findDetail(+query.id)
  }

  @ApiOperation({
    summary: '创建「商品分类」',
  })
  @ApiDoneResponse('创建成功')
  @ApiExceptionResponse({ code: EXCEPTION_EXISTS, message: '「商品分类」已存在' })
  @ApiExceptionResponse({ code: EXCEPTION_BAD_REQUEST, message: '请求参数错误' })
  @Post('create')
  @HttpCode(200)
  async create(@Body() data: GoodsCategoryPayload) {
    return this.service.create(data)
  }

  @ApiOperation({
    summary: '更新「商品分类」',
  })
  @ApiDoneResponse('更新成功')
  @ApiExceptionResponse({ code: EXCEPTION_NOT_FOUND, message: '「商品分类」不存在' })
  @ApiExceptionResponse({ code: EXCEPTION_EXISTS, message: '「商品分类」已存在' })
  @ApiExceptionResponse({ code: EXCEPTION_BAD_REQUEST, message: '请求参数错误' })
  @Put('update')
  async update(
    @Query() query: GetGoodsCategoryRequest,
    @Body() data: GoodsCategoryPayload,
  ) {
    return this.service.update(+query.id, data)
  }

  @ApiOperation({
    summary: '删除「商品分类」',
  })
  @ApiDoneResponse('删除成功')
  @ApiExceptionResponse({ code: EXCEPTION_FAILED, message: '删除失败' })
  @Delete('delete')
  async delete(@Body() data: DeleteGoodsCategoryRequest) {
    return this.service.delete(data.id)
  }
}
