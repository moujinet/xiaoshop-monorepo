import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { Body, Controller, Get, HttpCode, Post, Put, Query } from '@nestjs/common'
import { MemberLogService } from '@/member/log/service'
import { MemberLogoutService } from '@/member/logout/service'
import { ApproveMemberLogoutRequest, GetMemberLogoutPagesRequest, GetMemberLogoutRequest, MemberLogoutPayload, MemberLogoutResponse } from '@/member/logout/dto'
import { EXCEPTION_BAD_REQUEST, EXCEPTION_EXISTS, EXCEPTION_FAILED, EXCEPTION_NOT_FOUND } from '~/common/exception'
import { ApiDoneResponse, ApiExceptionResponse, ApiObjectResponse, ApiPaginatedResponse } from '~/common/response/decorators'

@ApiTags('会员注销申请')
@Controller('member/logout')
export class MemberLogoutController {
  constructor(
    private readonly service: MemberLogoutService,
    private readonly memberLog: MemberLogService,
  ) {}

  @ApiOperation({
    summary: '获取会员注销申请分页列表',
  })
  @ApiPaginatedResponse(MemberLogoutResponse)
  @ApiExceptionResponse({ code: EXCEPTION_FAILED, message: '请求失败' })
  @Get('pages')
  async pages(@Query() query: GetMemberLogoutPagesRequest) {
    return this.service.findPages(query)
  }

  @ApiOperation({
    summary: '获取会员注销申请详情',
  })
  @ApiObjectResponse(MemberLogoutResponse)
  @ApiExceptionResponse({ code: EXCEPTION_NOT_FOUND, message: '会员注销申请不存在' })
  @Get('detail')
  async detail(@Query() query: GetMemberLogoutRequest) {
    return this.service.findDetail(+query.id)
  }

  @ApiOperation({
    summary: '创建会员注销申请',
  })
  @ApiDoneResponse('创建成功')
  @ApiExceptionResponse({ code: EXCEPTION_EXISTS, message: '会员注销申请已存在' })
  @ApiExceptionResponse({ code: EXCEPTION_BAD_REQUEST, message: '请求参数错误' })
  @Post('create')
  @HttpCode(200)
  async create(@Body() data: MemberLogoutPayload) {
    return this.service.create(data)
  }

  @ApiOperation({
    summary: '审批会员注销申请',
  })
  @ApiDoneResponse('审批成功')
  @ApiExceptionResponse({ code: EXCEPTION_FAILED, message: '审批失败' })
  @Put('approve')
  async approve(@Body() data: ApproveMemberLogoutRequest) {
    return this.service.approve(+data.id)
  }
}
