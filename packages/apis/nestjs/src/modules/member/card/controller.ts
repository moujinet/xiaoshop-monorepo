import type { IEnabled } from '@xiaoshop/schema'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { Body, Controller, Delete, Get, HttpCode, Post, Put, Query } from '@nestjs/common'
import {
  ApiDoneResponse,
  ApiExceptionResponse,
  ApiListedResponse,
  ApiObjectResponse,
} from '~/common/response/decorators'
import {
  EXCEPTION_BAD_REQUEST,
  EXCEPTION_EXISTS,
  EXCEPTION_FAILED,
  EXCEPTION_NOT_FOUND,
} from '~/common/exception'
import {
  DeleteMemberCardRequest,
  GetMemberCardRequest,
  MemberCardDictResponse,
  MemberCardListResponse,
  MemberCardPayload,
  MemberCardResponse,
} from '@/member/card/dto'
import { MemberCardService } from '@/member/card/service'

@ApiTags('会员/会员卡')
@Controller('member/card')
export class MemberCardController {
  constructor(
    private readonly service: MemberCardService,
  ) {}

  @ApiOperation({
    summary: '获取「会员卡」等级列表',
  })
  @ApiListedResponse(MemberCardListResponse)
  @ApiExceptionResponse({ code: EXCEPTION_FAILED, message: '获取会员等级列表失败' })
  @Get('level/list')
  async levelList() {
    return this.service.findLevelList()
  }

  @ApiOperation({
    summary: '获取自定义「会员卡」列表',
  })
  @ApiListedResponse(MemberCardListResponse)
  @ApiExceptionResponse({ code: EXCEPTION_FAILED, message: '获取自定义会员卡列表失败' })
  @Get('custom/list')
  async customList() {
    return this.service.findCustomList()
  }

  @ApiOperation({
    summary: '获取「会员卡」字典列表',
  })
  @ApiListedResponse(MemberCardDictResponse)
  @ApiExceptionResponse({ code: EXCEPTION_FAILED, message: '获取会员卡字典失败' })
  @Get('dict/list')
  async dictList() {
    return this.service.findDictList()
  }

  @ApiOperation({
    summary: '获取「会员卡」详情',
  })
  @ApiObjectResponse(MemberCardResponse)
  @ApiExceptionResponse({ code: EXCEPTION_FAILED, message: '获取会员卡详情失败' })
  @ApiExceptionResponse({ code: EXCEPTION_BAD_REQUEST, message: '请求参数错误' })
  @Get('detail')
  async detail(@Query() query: GetMemberCardRequest) {
    return this.service.findDetail(+query.id)
  }

  @ApiOperation({
    summary: '创建自定义「会员卡」',
  })
  @ApiDoneResponse('创建成功')
  @ApiExceptionResponse({ code: EXCEPTION_EXISTS, message: '「会员卡」已存在' })
  @ApiExceptionResponse({ code: EXCEPTION_BAD_REQUEST, message: '请求参数错误' })
  @Post('create')
  @HttpCode(200)
  async create(@Body() data: MemberCardPayload) {
    return this.service.create(data)
  }

  @ApiOperation({
    summary: '更新「会员卡」',
  })
  @ApiDoneResponse('更新成功')
  @ApiExceptionResponse({ code: EXCEPTION_NOT_FOUND, message: '「会员卡」不存在' })
  @ApiExceptionResponse({ code: EXCEPTION_EXISTS, message: '「会员卡」已存在' })
  @ApiExceptionResponse({ code: EXCEPTION_BAD_REQUEST, message: '请求参数错误' })
  @Put('update')
  async update(
    @Query() query: GetMemberCardRequest,
    @Body() data: MemberCardPayload,
  ) {
    return this.service.update(+query.id, data)
  }

  @ApiOperation({
    summary: '更新「会员卡」启用状态',
  })
  @ApiDoneResponse('更新成功')
  @ApiExceptionResponse({ code: EXCEPTION_NOT_FOUND, message: '「会员卡」不存在' })
  @ApiExceptionResponse({ code: EXCEPTION_EXISTS, message: '「会员卡」已存在' })
  @ApiExceptionResponse({ code: EXCEPTION_BAD_REQUEST, message: '请求参数错误' })
  @Put('status/update')
  async updateStatus(
    @Query() query: GetMemberCardRequest,
    @Body() status: IEnabled,
  ) {
    return this.service.updateStatus(+query.id, status)
  }

  @ApiOperation({
    summary: '删除自定义「会员卡」',
  })
  @ApiDoneResponse('删除成功')
  @ApiExceptionResponse({ code: EXCEPTION_FAILED, message: '删除失败' })
  @Delete('delete')
  async delete(@Body() data: DeleteMemberCardRequest) {
    return this.service.delete(data.id)
  }
}
