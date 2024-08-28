import { OnEvent } from '@nestjs/event-emitter'
import { Inject, Injectable, Logger } from '@nestjs/common'
import { MemberAccountChangeLogService } from '@/member/change-log/service'
import { MemberAccountChangedEvent } from '@/member/events'
import { toEventName } from '~/utils/transformers'

@Injectable()
export class MemberListener {
  private readonly logger = new Logger(MemberListener.name)

  constructor(
    @Inject(MemberAccountChangeLogService)
    private readonly changelog: MemberAccountChangeLogService,
  ) {}

  /**
   * 会员账户变更
   *
   * @param payload MemberAccountChangedEvent
   */
  @OnEvent(toEventName(MemberAccountChangedEvent.name), { async: true })
  async handleMemberAccountChanged(payload: MemberAccountChangedEvent) {
    try {
      const { memberId, changeType, key, value, reason } = payload

      await this.changelog.create(
        memberId,
        key,
        changeType,
        value,
        reason,
      )
    }
    catch (e) {
      this.logger.error(e)
    }
  }
}
