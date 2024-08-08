import type { IMemberStatus } from '@xiaoshop/schema'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { Body, Controller, Get, HttpCode, Post, Put, Query } from '@nestjs/common'
import {
  ApiDoneResponse,
  ApiExceptionResponse,
  ApiObjectResponse,
  ApiPaginatedResponse,
} from '~/common/response/decorators'
import {
  EXCEPTION_BAD_REQUEST,
  EXCEPTION_EXISTS,
  EXCEPTION_FAILED,
  EXCEPTION_NOT_FOUND,
} from '~/common/exception'
import {
  BatchUpdateMemberAccountPayload,
  BatchUpdateMemberPayload,
  GetMemberPagesRequest,
  GetMemberRequest,
  MemberAccountListResponse,
  MemberListResponse,
  MemberPayload,
  MemberProfileResponse,
  ResetMemberPasswordPayload,
  UpdateMemberAccountPayload,
  UpdateMemberPasswordPayload,
  UpdateMemberPayload,
} from '@/member/account/dto'
import { MemberService } from '@/member/account/service'

@ApiTags('会员')
@Controller('member')
export class MemberController {
  constructor(
    private readonly service: MemberService,
  ) {}

  @ApiOperation({
    summary: '获取「会员」列表',
  })
  @ApiPaginatedResponse(MemberListResponse)
  @ApiExceptionResponse({ code: EXCEPTION_FAILED, message: '获取会员分页列表失败' })
  @ApiExceptionResponse({ code: EXCEPTION_BAD_REQUEST, message: '请求参数错误' })
  @Get('pages')
  async pages(@Query() query: GetMemberPagesRequest) {
    return this.service.findPages(query)
  }

  @ApiOperation({
    summary: '获取「会员」资料',
  })
  @ApiObjectResponse(MemberProfileResponse)
  @ApiExceptionResponse({ code: EXCEPTION_FAILED, message: '获取会员资料失败' })
  @ApiExceptionResponse({ code: EXCEPTION_NOT_FOUND, message: '未找到会员' })
  @ApiExceptionResponse({ code: EXCEPTION_BAD_REQUEST, message: '请求参数错误' })
  @Get('profile')
  async profile(@Query() query: GetMemberRequest) {
    return this.service.findProfile(+query.id)
  }

  @ApiOperation({
    summary: '获取「会员」账户',
  })
  @ApiObjectResponse(MemberAccountListResponse)
  @ApiExceptionResponse({ code: EXCEPTION_FAILED, message: '获取会员账户失败' })
  @ApiExceptionResponse({ code: EXCEPTION_NOT_FOUND, message: '未找到会员' })
  @ApiExceptionResponse({ code: EXCEPTION_BAD_REQUEST, message: '请求参数错误' })
  @Get('account')
  async account(@Query() query: GetMemberRequest) {
    return this.service.findAccount(+query.id)
  }

  @ApiOperation({
    summary: '创建「会员」资料',
  })
  @ApiDoneResponse()
  @ApiExceptionResponse({ code: EXCEPTION_FAILED, message: '创建会员资料失败' })
  @ApiExceptionResponse({ code: EXCEPTION_EXISTS, message: '会员已存在' })
  @ApiExceptionResponse({ code: EXCEPTION_BAD_REQUEST, message: '会员密码强度不够' })
  @Post('create')
  @HttpCode(200)
  async create(@Body() data: MemberPayload) {
    return this.service.create(data)
  }

  @ApiOperation({
    summary: '更新「会员」资料',
  })
  @ApiDoneResponse()
  @ApiExceptionResponse({ code: EXCEPTION_FAILED, message: '更新会员资料失败' })
  @ApiExceptionResponse({ code: EXCEPTION_NOT_FOUND, message: '未找到会员资料' })
  @Put('update')
  async update(
    @Query() query: GetMemberRequest,
    @Body() data: UpdateMemberPayload,
  ) {
    return this.service.updateProfile(+query.id, data)
  }

  @ApiOperation({
    summary: '批量更新「会员」资料',
  })
  @ApiDoneResponse()
  @ApiExceptionResponse({ code: EXCEPTION_FAILED, message: '批量更新会员资料失败' })
  @Put('batch/update')
  async batchUpdate(
    @Body() data: BatchUpdateMemberPayload,
  ) {
    return this.service.batchUpdateProfile(data.ids, data.profile)
  }

  @ApiOperation({
    summary: '更新「会员」账户',
  })
  @ApiDoneResponse()
  @ApiExceptionResponse({ code: EXCEPTION_FAILED, message: '更新会员账户失败' })
  @ApiExceptionResponse({ code: EXCEPTION_NOT_FOUND, message: '未找到会员' })
  @ApiExceptionResponse({ code: EXCEPTION_NOT_FOUND, message: '未找到会员账户' })
  @ApiExceptionResponse({ code: EXCEPTION_BAD_REQUEST, message: '更新内容为空' })
  @Put('account/update')
  async updateAccount(
    @Query() query: GetMemberRequest,
    @Body() data: UpdateMemberAccountPayload,
  ) {
    return this.service.updateAccount(+query.id, data)
  }

  @ApiOperation({
    summary: '批量更新「会员」账户',
  })
  @ApiDoneResponse()
  @ApiExceptionResponse({ code: EXCEPTION_FAILED, message: '批量更新会员账户失败' })
  @ApiExceptionResponse({ code: EXCEPTION_BAD_REQUEST, message: '更新内容为空' })
  @Put('batch/account/update')
  async batchUpdateAccount(
    @Body() data: BatchUpdateMemberAccountPayload,
  ) {
    return this.service.batchUpdateAccount(data.ids, data.account)
  }

  @ApiOperation({
    summary: '更新「会员」密码',
  })
  @ApiDoneResponse()
  @ApiExceptionResponse({ code: EXCEPTION_NOT_FOUND, message: '未找到会员' })
  @ApiExceptionResponse({ code: EXCEPTION_FAILED, message: '更新会员密码失败' })
  @ApiExceptionResponse({ code: EXCEPTION_BAD_REQUEST, message: '新密码强度不够' })
  @Put('password/update')
  async updatePassword(
    @Query() query: GetMemberRequest,
    @Body() data: UpdateMemberPasswordPayload,
  ) {
    return this.service.updatePassword(query.id, data.password, data.newPassword)
  }

  @ApiOperation({
    summary: '更新「会员」状态',
  })
  @ApiDoneResponse('更新成功')
  @ApiExceptionResponse({ code: EXCEPTION_NOT_FOUND, message: '「会员」不存在' })
  @ApiExceptionResponse({ code: EXCEPTION_BAD_REQUEST, message: '请求参数错误' })
  @Put('status/update')
  async updateStatus(
    @Query() query: GetMemberRequest,
    @Body('status') status: IMemberStatus,
  ) {
    return this.service.updateStatus(+query.id, status)
  }

  @ApiOperation({
    summary: '重置「会员」密码',
  })
  @ApiDoneResponse()
  @ApiExceptionResponse({ code: EXCEPTION_NOT_FOUND, message: '未找到会员' })
  @ApiExceptionResponse({ code: EXCEPTION_FAILED, message: '重置会员密码失败' })
  @Put('password/reset')
  async resetPassword(
    @Query() query: GetMemberRequest,
    @Body() data: ResetMemberPasswordPayload,
  ) {
    return this.service.resetPassword(query.id, data.newPassword)
  }
}
