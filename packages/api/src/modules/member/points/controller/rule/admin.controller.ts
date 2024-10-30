import { Body, Controller, Get, Put, Query } from '@nestjs/common'

import { Admin } from '~/common/decorators'
import { GetMemberPointsRuleRequest } from '@/member/points/dto/request'
import { UpdateMemberPointsRulePayload } from '@/member/points/dto/payload'
import { MemberPointsRuleService } from '@/member/points/domain/rule/service'

@Controller('admin/member/points/rule')
export class MemberPointsRuleAdminController {
  constructor(
    private readonly service: MemberPointsRuleService,
  ) {}

  /**
   * Get Member Points Rule List
   */
  @Get('list')
  @Admin()
  async list() {
    return this.service.findList()
  }

  /**
   * Update Member Points Rule
   */
  @Put('update')
  @Admin()
  async update(
    @Query() query: GetMemberPointsRuleRequest,
    @Body() payload: UpdateMemberPointsRulePayload,
  ) {
    return this.service.update(query.key, payload)
  }
}
