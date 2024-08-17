import { POINTS_CHANGE_TYPES } from '@xiaoshop/schema'
import { Inject, Injectable } from '@nestjs/common'
import { OnEvent } from '@nestjs/event-emitter'
import { StaffLogService } from '@/staff/log/service'
import { PointsChangeEvent } from '@/points/change/events'

@Injectable()
export class PointsChangeListener {
  constructor(
    @Inject(StaffLogService)
    private readonly log: StaffLogService,
  ) {}

  /**
   * 会员积分变更
   *
   * @param payload PointsChangeEvent
   */
  @OnEvent(PointsChangeEvent.name)
  async handlePointsChanged(payload: PointsChangeEvent) {
    const typeName = POINTS_CHANGE_TYPES.find(t => t.value === payload.type)?.label

    this.log.write(
      '会员积分',
      `会员「${payload.memberId}」${typeName}积分 ${payload.change}, 原因: ${payload.reason}`,
    )
  }
}
