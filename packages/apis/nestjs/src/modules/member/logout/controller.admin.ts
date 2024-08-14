import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { Body, Controller, Get, Put, Query } from '@nestjs/common'
import { IMemberLogoutStatus } from '@xiaoshop/schema'
import {
  ApiDoneResponse,
  ApiExceptionResponse,
  ApiPaginatedResponse,
} from '~/common/response/decorators'
import {
  EXCEPTION_BAD_REQUEST,
  EXCEPTION_FAILED,
  EXCEPTION_NOT_FOUND,
} from '~/common/exception'
import {
  GetMemberLogoutPagesRequest,
  GetMemberLogoutRequest,
  MemberLogoutResponse,
} from '@/member/logout/dto'
import { MemberLogoutService } from '@/member/logout/service'
import { Admin } from '@/auth/decorators'

@ApiTags('管理/会员/注销申请')
@Controller('admin/member/logout')
export class MemberLogoutAdminController {
  constructor(
    private readonly service: MemberLogoutService,
  ) {}

  @ApiOperation({
    summary: '获取「注销申请」分页列表',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiPaginatedResponse(MemberLogoutResponse)
  @ApiExceptionResponse({ code: EXCEPTION_FAILED, message: '获取会员注销申请分页列表' })
  @ApiExceptionResponse({ code: EXCEPTION_BAD_REQUEST, message: '请求参数错误' })
  @Get('pages')
  async pages(@Query() query: GetMemberLogoutPagesRequest) {
    return this.service.findPages(query)
  }

  @ApiOperation({
    summary: '更新「注销申请」申请状态',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiDoneResponse('更新成功')
  @ApiExceptionResponse({ code: EXCEPTION_NOT_FOUND, message: '「会员注销申请」不存在' })
  @ApiExceptionResponse({ code: EXCEPTION_BAD_REQUEST, message: '请求参数错误' })
  @Put('status/update')
  async updateStatus(
    @Query() query: GetMemberLogoutRequest,
    @Body('status') status: IMemberLogoutStatus,
  ) {
    return this.service.updateStatus(+query.id, status)
  }
}
