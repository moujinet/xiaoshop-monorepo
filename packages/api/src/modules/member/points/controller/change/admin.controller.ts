import { Controller, Get, Logger, Query } from '@nestjs/common'

import { Admin } from '~/common/decorators'
import { OnEvent } from '~/services/event-bus'
import { GetMemberPointsChangePagesRequest } from '@/member/points/dto/request'
import { MemberPointsChangeService } from '@/member/points/domain/change/service'
import { MemberPointsChangeEvent, MemberPointsSetupEvent } from '@/member/points/domain/change/events'

@Controller('admin/member/points/change')
export class MemberPointsChangeAdminController {
  private readonly logger = new Logger(MemberPointsChangeAdminController.name)

  constructor(
    private readonly service: MemberPointsChangeService,
  ) {}

  /**
   * Get Member Points Change Pages
   */
  @Get('pages')
  @Admin()
  async pages(@Query() query: GetMemberPointsChangePagesRequest) {
    return this.service.findPages(query)
  }

  /**
   * 手动设置(赠送)会员积分
   */
  @OnEvent(MemberPointsSetupEvent)
  async handleMemberPointsSetup(payload: MemberPointsSetupEvent) {
    try {
      await this.service.create(
        payload.memberId,
        payload.points,
        payload.reason,
      )
    }
    catch (e) {
      this.logger.error(e.message, e.stack)
    }
  }

  /**
   * 会员积分变动
   */
  @OnEvent(MemberPointsChangeEvent)
  async handleMemberPointsChange(payload: MemberPointsChangeEvent) {
    try {
      await this.service.create(
        payload.memberId,
        payload.points,
        payload.reason,
      )
    }
    catch (e) {
      this.logger.error(e.message, e.stack)
    }
  }
}
