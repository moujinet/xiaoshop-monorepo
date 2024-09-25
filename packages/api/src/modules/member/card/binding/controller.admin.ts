import { Body, Controller, Put } from '@nestjs/common'

import { Admin } from '@/system/auth/decorators'

import { MemberCardBindingPayload } from './dto'
import { MemberCardBindingService } from './service'

@Controller('admin/member/card')
export class MemberCardBindingAdminController {
  constructor(
    private readonly service: MemberCardBindingService,
  ) {}

  @Put('binding')
  @Admin()
  async binding(@Body() data: MemberCardBindingPayload) {
    return this.service.bindMany(
      data.memberIds,
      data.cardId,
      data.planId,
      data.reason,
    )
  }
}
