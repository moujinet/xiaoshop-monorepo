import { OnEvent } from '@nestjs/event-emitter'
import { Inject, Injectable } from '@nestjs/common'
import { StaffLogService } from '@/staff/log/service'
import {
  PointsRuleOptionsUpdateEvent,
  PointsRuleStatusUpdateEvent,
} from '@/points/rule/events'

@Injectable()
export class PointsRuleListener {
  constructor(
    @Inject(StaffLogService)
    private readonly log: StaffLogService,
  ) {}

  /**
   * 积分规则启用状态更新
   *
   * @param payload PointsRuleStatusUpdateEvent
   */
  @OnEvent(PointsRuleStatusUpdateEvent.name)
  async handleStatusUpdated(payload: PointsRuleStatusUpdateEvent) {
    this.log.write('会员积分', `积分规则「${payload.key}」启用状态更新为 ${payload.enable}`)
  }

  /**
   * 积分规则选项更新
   *
   * @param payload PointsRuleOptionsUpdateEvent
   */
  @OnEvent(PointsRuleOptionsUpdateEvent.name)
  async handleOptionsUpdated(payload: PointsRuleOptionsUpdateEvent) {
    this.log.write('会员积分', `积分规则「${payload.key}」选项更新为 ${JSON.stringify(payload.options)}`)
  }
}
