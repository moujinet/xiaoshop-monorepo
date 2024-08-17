import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { Body, Controller, Delete, Get, HttpCode, Post, Put, Query } from '@nestjs/common'
import {
  DeleteGoodsBrandRequest,
  GetGoodsBrandRequest,
  GoodsBrandDictResponse,
  GoodsBrandListResponse,
  GoodsBrandPayload,
  GoodsBrandResponse,
} from '@/goods/brand/dto'
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
import { GoodsBrandService } from '@/goods/brand/service'
import { Admin } from '@/auth/decorators'

@ApiTags('管理/商品/品牌')
@Controller('admin/goods/brand')
export class GoodsBrandAdminController {
  constructor(
    private readonly service: GoodsBrandService,
  ) {}

  @ApiOperation({
    summary: '获取「品牌」列表',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiListedResponse(GoodsBrandListResponse)
  @ApiExceptionResponse({ code: EXCEPTION_FAILED, message: '获取「品牌」列表失败' })
  @Get('list')
  async list() {
    return this.service.findList()
  }

  @ApiOperation({
    summary: '获取「品牌」字典列表',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiListedResponse(GoodsBrandDictResponse)
  @ApiExceptionResponse({ code: EXCEPTION_FAILED, message: '获取「品牌」字典列表失败' })
  @Get('dict/list')
  async dictList() {
    return this.service.findDictList()
  }

  @ApiOperation({
    summary: '获取「品牌」详情',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiObjectResponse(GoodsBrandResponse)
  @ApiExceptionResponse({ code: EXCEPTION_NOT_FOUND, message: '「品牌」不存在' })
  @Get('detail')
  async detail(@Query() query: GetGoodsBrandRequest) {
    return this.service.findDetail(+query.id)
  }

  @ApiOperation({
    summary: '创建「品牌」',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiDoneResponse('创建「品牌」成功')
  @ApiExceptionResponse({ code: EXCEPTION_EXISTS, message: '「品牌」已存在' })
  @ApiExceptionResponse({ code: EXCEPTION_BAD_REQUEST, message: '请求参数错误' })
  @Post('create')
  @HttpCode(200)
  async create(@Body() data: GoodsBrandPayload) {
    return this.service.create(data)
  }

  @ApiOperation({
    summary: '更新「品牌」',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiDoneResponse('更新「品牌」成功')
  @ApiExceptionResponse({ code: EXCEPTION_NOT_FOUND, message: '「品牌」不存在' })
  @ApiExceptionResponse({ code: EXCEPTION_EXISTS, message: '「品牌」已存在' })
  @ApiExceptionResponse({ code: EXCEPTION_BAD_REQUEST, message: '请求参数错误' })
  @Put('update')
  async update(
    @Query() query: GetGoodsBrandRequest,
    @Body() data: GoodsBrandPayload,
  ) {
    return this.service.update(+query.id, data)
  }

  @ApiOperation({
    summary: '删除「品牌」',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiDoneResponse('删除「品牌」成功')
  @ApiExceptionResponse({ code: EXCEPTION_FAILED, message: '删除「品牌」失败' })
  @Delete('delete')
  async delete(@Body() data: DeleteGoodsBrandRequest) {
    return this.service.delete(data.id)
  }
}
