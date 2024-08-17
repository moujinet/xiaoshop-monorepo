import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { Body, Controller, Get, HttpCode, Post, Put, Query } from '@nestjs/common'
import { MemberService } from '@/member/profile/service'
import {
  BatchUpdateMemberTagsPayload,
  GetMemberPagesRequest,
  GetMemberRequest,
  MemberListResponse,
  MemberPayload,
  MemberProfileResponse,
  ResetMemberPasswordPayload,
  UpdateMemberStatusPayload,
  UpdateMemberTagsPayload,
} from '@/member/profile/dto'
import {
  EXCEPTION_BAD_REQUEST,
  EXCEPTION_EXISTS,
  EXCEPTION_FAILED,
  EXCEPTION_NOT_FOUND,
} from '~/common/exception'
import {
  ApiDoneResponse,
  ApiExceptionResponse,
  ApiObjectResponse,
  ApiPaginatedResponse,
} from '~/common/response/decorators'
import { Admin } from '@/auth/decorators'

@ApiTags('管理/会员')
@Controller('admin/member')
export class MemberAdminController {
  constructor(
    private readonly service: MemberService,
  ) {}

  @ApiOperation({
    summary: '获取「会员」列表',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiPaginatedResponse(MemberListResponse)
  @ApiExceptionResponse({ code: EXCEPTION_FAILED, message: '获取会员分页列表失败' })
  @Get('pages')
  async pages(@Query() query: GetMemberPagesRequest) {
    return this.service.findPages(query)
  }

  @ApiOperation({
    summary: '获取「会员」资料',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiObjectResponse(MemberProfileResponse)
  @ApiExceptionResponse({ code: EXCEPTION_NOT_FOUND, message: '未找到会员' })
  @ApiExceptionResponse({ code: EXCEPTION_FAILED, message: '获取会员资料失败' })
  @Get('profile')
  async profile(@Query() query: GetMemberRequest) {
    return this.service.findProfile(+query.id)
  }

  @ApiOperation({
    summary: '创建「会员」资料',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiDoneResponse()
  @ApiExceptionResponse({ code: EXCEPTION_BAD_REQUEST, message: '会员密码强度不够' })
  @ApiExceptionResponse({ code: EXCEPTION_EXISTS, message: '会员已存在' })
  @ApiExceptionResponse({ code: EXCEPTION_FAILED, message: '创建会员资料失败' })
  @Post('create')
  @HttpCode(200)
  async create(@Body() data: MemberPayload) {
    return this.service.createMember(data)
  }

  @ApiOperation({
    summary: '更新「会员」状态',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiDoneResponse()
  @ApiExceptionResponse({ code: EXCEPTION_NOT_FOUND, message: '会员不存在' })
  @ApiExceptionResponse({ code: EXCEPTION_FAILED, message: '更新会员状态失败' })
  @Put('status/update')
  async updateStatus(
    @Query() query: GetMemberRequest,
    @Body() data: UpdateMemberStatusPayload,
  ) {
    return this.service.updateMemberStatus(+query.id, data.status)
  }

  @ApiOperation({
    summary: '更新「会员」标签',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiDoneResponse()
  @ApiExceptionResponse({ code: EXCEPTION_NOT_FOUND, message: '会员不存在' })
  @ApiExceptionResponse({ code: EXCEPTION_FAILED, message: '更新会员状态失败' })
  @Put('tags/update')
  async updateTags(
    @Query() query: GetMemberRequest,
    @Body() data: UpdateMemberTagsPayload,
  ) {
    return this.service.updateMemberTags(+query.id, data.tagIds)
  }

  @ApiOperation({
    summary: '批量更新「会员」标签',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiDoneResponse()
  @ApiExceptionResponse({ code: EXCEPTION_NOT_FOUND, message: '会员不存在' })
  @ApiExceptionResponse({ code: EXCEPTION_FAILED, message: '更新会员状态失败' })
  @Put('tags/batch/update')
  async batchUpdateTags(
    @Body() data: BatchUpdateMemberTagsPayload,
  ) {
    return this.service.batchUpdateMemberTags(data.memberIds, data.tagIds)
  }

  @ApiOperation({
    summary: '重置「会员」密码',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiDoneResponse()
  @ApiExceptionResponse({ code: EXCEPTION_NOT_FOUND, message: '未找到会员' })
  @ApiExceptionResponse({ code: EXCEPTION_FAILED, message: '重置会员密码失败' })
  @Put('password/reset')
  async resetPassword(
    @Query() query: GetMemberRequest,
    @Body() data: ResetMemberPasswordPayload,
  ) {
    return this.service.resetMemberPassword(query.id, data.newPassword)
  }
}
