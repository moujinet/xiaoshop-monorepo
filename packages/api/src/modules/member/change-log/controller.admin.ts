import { Controller, Get, Query } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { MemberAccountChangeLogService } from '@/member/change-log/service'
import { ApiFailedExceptionResponse, ApiPaginatedResponse } from '~/common/decorators'
import {
  GetAllMemberAccountChangeLogPagesRequest,
  GetMemberAccountChangeLogPagesRequest,
  MemberAccountChangeLogListResponse,
  MemberAccountChangeLogMemberListResponse,
} from '@/member/change-log/dto'
import { Admin } from '@/auth/decorators'

@ApiTags('管理/会员/账户变更日志')
@Controller('admin/member/account/changelog')
export class MemberAccountChangeLogAdminController {
  constructor(
    private readonly service: MemberAccountChangeLogService,
  ) {}

  @ApiOperation({
    summary: '获取会员账户变更日志分页列表',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiPaginatedResponse(MemberAccountChangeLogListResponse)
  @ApiFailedExceptionResponse({ description: '获取会员账户变更日志分页列表失败' })
  @Get('pages')
  async pages(@Query() query: GetAllMemberAccountChangeLogPagesRequest) {
    return this.service.findPages(query)
  }

  @ApiOperation({
    summary: '获取会员账户变更日志分页列表(会员)',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiPaginatedResponse(MemberAccountChangeLogMemberListResponse)
  @ApiFailedExceptionResponse({ description: '获取会员账户变更日志分页列表失败' })
  @Get('member/pages')
  async memberPages(@Query() query: GetMemberAccountChangeLogPagesRequest) {
    return this.service.findMemberPages(query)
  }
}
