import { MemberPointsRuleKey } from '@xiaoshop/shared'
import { Body, Controller, Inject, Logger, Put, Query } from '@nestjs/common'

import { Admin } from '~/common/decorators'
import { OnEvent } from '~/services/event-bus'
import { GetMemberRequest } from '@/member/account/dto/request'
import { UpdateMemberPointsPayload } from '@/member/account/dto/payload'
import { MemberCreateEvent } from '@/member/account/domain/manage/events'
import { MemberPointsService } from '@/member/account/domain/points/service'
import { MemberPointsRuleService } from '@/member/points/domain/rule/service'

@Controller('admin/member/points')
export class MemberPointsAdminController {
  private readonly logger = new Logger(MemberPointsAdminController.name)

  constructor(
    private readonly service: MemberPointsService,

    @Inject(MemberPointsRuleService)
    private readonly rule: MemberPointsRuleService,
  ) {}

  /**
   * Update Member Points
   */
  @Put('update')
  @Admin()
  async update(
    @Query() query: GetMemberRequest,
    @Body() payload: UpdateMemberPointsPayload,
  ) {
    return this.service.update(
      +query.id,
      payload.points,
      payload.reason,
    )
  }

  /**
   * 创建会员(同注册会员)赠送积分
   */
  @OnEvent(MemberCreateEvent)
  async handleMemberCreate(event: MemberCreateEvent) {
    try {
      const options = await this.rule.findOptions(
        MemberPointsRuleKey.REGISTER,
      )

      if (!options)
        return

      await this.service.increment(
        event.memberId,
        options.points,
        '创建会员赠送积分',
      )
    }
    catch (e) {
      this.logger.error(e.message, e.stack)
    }
  }
}
