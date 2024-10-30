import { Controller, Get, Query } from '@nestjs/common'

import { Admin } from '~/common/decorators'
import { GetByMemberRequest } from '@/member/card/dto/request'
import { MemberLevelUpService } from '@/member/card/domain/levelup/service'

@Controller('admin/member/card/levelup')
export class MemberCardLevelUpAdminController {
  constructor(
    private readonly service: MemberLevelUpService,
  ) {}

  /**
   * Get Member Card Level Up info List
   */
  @Get('list')
  @Admin()
  async list(@Query() query: GetByMemberRequest) {
    return this.service.findList(+query.memberId)
  }
}
