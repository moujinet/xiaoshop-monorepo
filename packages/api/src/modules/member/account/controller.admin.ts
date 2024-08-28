import { Body, Controller, Get, HttpCode, Post, Put, Query } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { MemberAccountChangeType } from '@xiaoshop/shared'
import { MemberAccountService } from '@/member/account/service'
import {
  ApiDoneResponse,
  ApiExistsExceptionResponse,
  ApiFailedExceptionResponse,
  ApiNotFoundExceptionResponse,
  ApiObjectResponse,
  ApiPaginatedResponse,
} from '~/common/decorators'
import {
  BatchUpdateMemberTagsPayload,
  GetMemberAccountPagesRequest,
  GetMemberAccountRequest,
  MemberAccountListResponse,
  MemberAccountPayload,
  MemberProfileResponse,
  ResetMemberPasswordPayload,
  UpdateMemberAccountPayload,
  UpdateMemberStatusPayload,
  UpdateMemberTagsPayload,
} from '@/member/account/dto'
import { Admin } from '@/auth/decorators'

@ApiTags('管理/会员/账户')
@Controller('admin/member/account')
export class MemberAccountAdminController {
  constructor(
    private readonly service: MemberAccountService,
  ) {}

  @ApiOperation({
    summary: '获取会员分页列表',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiPaginatedResponse(MemberAccountListResponse)
  @ApiFailedExceptionResponse({ description: '获取会员分页列表失败' })
  @Get('pages')
  async pages(@Query() query: GetMemberAccountPagesRequest) {
    return this.service.findPages(query)
  }

  @ApiOperation({
    summary: '获取会员资料',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiObjectResponse(MemberProfileResponse)
  @ApiNotFoundExceptionResponse({ description: '未找到会员' })
  @ApiFailedExceptionResponse({ description: '获取会员资料失败' })
  @Get('detail')
  async detail(@Query() query: GetMemberAccountRequest) {
    return this.service.findById(+query.id)
  }

  @ApiOperation({
    summary: '创建会员',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiDoneResponse()
  @ApiExistsExceptionResponse({ description: '会员已存在' })
  @ApiFailedExceptionResponse({ description: '创建会员失败' })
  @ApiFailedExceptionResponse({ description: '密码强度不够' })
  @HttpCode(200)
  @Post('create')
  async create(@Body() data: MemberAccountPayload) {
    return this.service.createMember(data)
  }

  @ApiOperation({
    summary: '更新会员状态',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiDoneResponse()
  @ApiNotFoundExceptionResponse({ description: '会员不存在' })
  @ApiFailedExceptionResponse({ description: '更新会员状态失败' })
  @Put('status/update')
  async updateStatus(
    @Query() query: GetMemberAccountRequest,
    @Body() data: UpdateMemberStatusPayload,
  ) {
    return this.service.updateMemberStatus(+query.id, data.status)
  }

  @ApiOperation({
    summary: '更新会员标签',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiDoneResponse()
  @ApiNotFoundExceptionResponse({ description: '会员不存在' })
  @ApiFailedExceptionResponse({ description: '更新会员标签失败' })
  @Put('tags/update')
  async updateTags(
    @Query() query: GetMemberAccountRequest,
    @Body() data: UpdateMemberTagsPayload,
  ) {
    return this.service.updateMemberTags(+query.id, data.tagIds)
  }

  @ApiOperation({
    summary: '批量更新会员标签',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiDoneResponse()
  @ApiNotFoundExceptionResponse({ description: '会员不存在' })
  @ApiFailedExceptionResponse({ description: '批量更新会员标签失败' })
  @Put('tags/batch/update')
  async batchUpdateTags(
    @Body() data: BatchUpdateMemberTagsPayload,
  ) {
    return this.service.batchUpdateMemberTags(data.memberIds, data.tagIds)
  }

  @ApiOperation({
    summary: '批量更新会员账户',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiDoneResponse()
  @ApiNotFoundExceptionResponse({ description: '会员不存在' })
  @ApiFailedExceptionResponse({ description: '批量更新会员账户失败' })
  @Put('batch/update')
  async batchUpdate(
    @Body() data: UpdateMemberAccountPayload,
  ) {
    if (data.type === MemberAccountChangeType.ADD) {
      return this.service.incrementMemberAccountByKey(
        data.memberIds,
        data.key,
        data.value,
        data.reason,
      )
    }
    else if (data.type === MemberAccountChangeType.SUB) {
      return this.service.decrementMemberAccountByKey(
        data.memberIds,
        data.key,
        data.value,
        data.reason,
      )
    }
    else if (data.type === MemberAccountChangeType.SET) {
      return this.service.updateMemberAccountByKey(
        data.memberIds,
        data.key,
        data.value,
        data.reason,
      )
    }
  }

  @ApiOperation({
    summary: '重置会员密码',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiDoneResponse()
  @ApiNotFoundExceptionResponse({ description: '会员不存在' })
  @ApiFailedExceptionResponse({ description: '重置会员密码失败' })
  @Put('password/reset')
  async resetPassword(
    @Query() query: GetMemberAccountRequest,
    @Body() data: ResetMemberPasswordPayload,
  ) {
    return this.service.resetMemberPassword(+query.id, data.newPassword)
  }
}
