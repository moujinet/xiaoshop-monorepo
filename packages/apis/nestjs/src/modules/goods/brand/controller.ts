import { ApiOperation, ApiTags } from '@nestjs/swagger'
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

@ApiTags('商品品牌')
@Controller('goods/brand')
export class GoodsBrandController {
  constructor(
    private readonly service: GoodsBrandService,
  ) {}

  @ApiOperation({
    summary: '获取「商品品牌」列表',
  })
  @ApiListedResponse(GoodsBrandListResponse)
  @ApiExceptionResponse({ code: EXCEPTION_FAILED, message: '请求失败' })
  @Get('list')
  async list() {
    return this.service.findList()
  }

  @ApiOperation({
    summary: '获取「商品品牌」字典列表',
  })
  @ApiListedResponse(GoodsBrandDictResponse)
  @ApiExceptionResponse({ code: EXCEPTION_FAILED, message: '请求失败' })
  @Get('dict/list')
  async dictList() {
    return this.service.findDictList()
  }

  @ApiOperation({
    summary: '获取「商品品牌」详情',
  })
  @ApiObjectResponse(GoodsBrandResponse)
  @ApiExceptionResponse({ code: EXCEPTION_NOT_FOUND, message: '「商品品牌」不存在' })
  @Get('detail')
  async detail(@Query() query: GetGoodsBrandRequest) {
    return this.service.findDetail(+query.id)
  }

  @ApiOperation({
    summary: '创建「商品品牌」',
  })
  @ApiDoneResponse('创建成功')
  @ApiExceptionResponse({ code: EXCEPTION_EXISTS, message: '「商品品牌」已存在' })
  @ApiExceptionResponse({ code: EXCEPTION_BAD_REQUEST, message: '请求参数错误' })
  @Post('create')
  @HttpCode(200)
  async create(@Body() data: GoodsBrandPayload) {
    return this.service.create(data)
  }

  @ApiOperation({
    summary: '更新「商品品牌」',
  })
  @ApiDoneResponse('更新成功')
  @ApiExceptionResponse({ code: EXCEPTION_NOT_FOUND, message: '「商品品牌」不存在' })
  @ApiExceptionResponse({ code: EXCEPTION_EXISTS, message: '「商品品牌」已存在' })
  @ApiExceptionResponse({ code: EXCEPTION_BAD_REQUEST, message: '请求参数错误' })
  @Put('update')
  async update(
    @Query() query: GetGoodsBrandRequest,
    @Body() data: GoodsBrandPayload,
  ) {
    return this.service.update(+query.id, data)
  }

  @ApiOperation({
    summary: '删除「商品品牌」',
  })
  @ApiDoneResponse('删除成功')
  @ApiExceptionResponse({ code: EXCEPTION_FAILED, message: '删除失败' })
  @Delete('delete')
  async delete(@Body() data: DeleteGoodsBrandRequest) {
    return this.service.delete(data.id)
  }
}
