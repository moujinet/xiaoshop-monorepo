import { OnEvent } from '@nestjs/event-emitter'
import { MemberCardUpgradeMethod } from '@xiaoshop/shared'
import { Inject, Injectable, Logger } from '@nestjs/common'

import { toEventName } from '~/utils/transformers'

import { MemberCardBindEvent } from './card/binding/events'
import { MemberCardBindingService } from './card/binding/service'
import { MemberCardUpgradeService } from './card/upgrade/service'

@Injectable()
export class MemberListener {
  private readonly logger = new Logger(MemberListener.name)

  constructor(
    @Inject(MemberCardBindingService)
    private readonly binding: MemberCardBindingService,

    @Inject(MemberCardUpgradeService)
    private readonly upgrade: MemberCardUpgradeService,
  ) {}

  /**
   * 会员卡绑定
   *
   * @param payload MemberCardBindEvent
   */
  @OnEvent(toEventName(MemberCardBindEvent.name), { async: true })
  async handleMemberCardBinding(payload: MemberCardBindEvent) {
    try {
      const binding = await this.binding.findByMemberId(payload.memberId)

      if (!binding)
        return

      await this.upgrade.record({
        memberId: binding.memberId,
        cardId: binding.cardId,
        cardPlanId: binding.cardPlanId,
        key: binding.key,
        type: binding.type,
        name: binding.name,
        badgeStyle: binding.badgeStyle,
        method: MemberCardUpgradeMethod.BINDING,
        reason: payload.reason || '',
      })
    }
    catch (e) {
      this.logger.error(`会员卡绑定 - ${e.message}`)
    }
  }
}
