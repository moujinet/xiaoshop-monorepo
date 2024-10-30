import { Controller, Get, Query } from '@nestjs/common'

import { Admin } from '~/common/decorators'
import { GetByMemberRequest } from '@/member/card/dto/request'
import { MemberUpgradeService } from '@/member/card/domain/upgrade/service'

@Controller('admin/member/card/upgrade')
export class MemberCardUpgradeAdminController {
  constructor(
    private readonly service: MemberUpgradeService,
  ) {}

  /**
   * Get Member Card Upgrade List
   */
  @Get('list')
  @Admin()
  async list(@Query() query: GetByMemberRequest) {
    return this.service.findList(+query.memberId)
  }
}
