import { Body, Controller, Put } from '@nestjs/common'

import { Admin } from '~/common/decorators'
import { AssignMemberCardPayload } from '@/member/card/dto/payload'
import { MemberBindService } from '@/member/card/domain/bind/service'

@Controller('admin/member/card')
export class MemberCardBindAdminController {
  constructor(
    private readonly service: MemberBindService,
  ) {}

  /**
   * Assign Member Card / Level to Members
   */
  @Put('assign')
  @Admin()
  async assign(@Body() payload: AssignMemberCardPayload) {
    return this.service.assignTo(
      payload.memberIds,
      payload.cardId,
      payload.cardPlanId,
      payload.reason,
    )
  }
}
