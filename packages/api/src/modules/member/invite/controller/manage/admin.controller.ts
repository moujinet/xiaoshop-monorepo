import { Controller, Get, Query } from '@nestjs/common'

import { Admin } from '~/common/decorators'
import { GetMemberInvitePagesRequest } from '@/member/invite/dto/request'
import { MemberInviteQueryService } from '@/member/invite/domain/query/service'

@Controller('admin/member/invite')
export class MemberInviteAdminController {
  constructor(
    private readonly service: MemberInviteQueryService,
  ) {}

  /**
   * Get Member Invite Pages
   */
  @Get('pages')
  @Admin()
  async pages(@Query() query: GetMemberInvitePagesRequest) {
    return this.service.findPages(query)
  }
}
