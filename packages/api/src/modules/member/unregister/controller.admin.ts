import { Controller, Get, Query } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { MemberUnregisterService } from '@/member/unregister/service'
import {
  GetMemberUnregisterPagesRequest,
  MemberUnIMemberUnregisterResponse,
} from '@/member/unregister/dto'
import {
  ApiFailedExceptionResponse,
  ApiPaginatedResponse,
} from '~/common/decorators'
import { Admin } from '@/auth/decorators'

@ApiTags('管理/会员/注销申请')
@Controller('admin/member/unregister')
export class MemberUnregisterAdminController {
  constructor(
    private readonly service: MemberUnregisterService,
  ) {}

  @ApiOperation({
    summary: '获取注销申请分页列表',
  })
  @Admin()
  @ApiBearerAuth()
  @ApiPaginatedResponse(MemberUnIMemberUnregisterResponse)
  @ApiFailedExceptionResponse({ description: '获取会员注销申请分页列表失败' })
  @Get('pages')
  async pages(@Query() query: GetMemberUnregisterPagesRequest) {
    return this.service.findPages(query)
  }
}
