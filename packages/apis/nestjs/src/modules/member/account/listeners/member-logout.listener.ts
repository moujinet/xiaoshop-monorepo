import { OnEvent } from '@nestjs/event-emitter'
import { Injectable, Logger } from '@nestjs/common'
import { MEMBER_EVENT_LOGOUT } from '@/member/constants'
import { MemberLogoutEvent } from '@/member/logout/events'

@Injectable()
export class MemberLogoutListener {
  private readonly logger = new Logger(MemberLogoutListener.name)

  @OnEvent(MEMBER_EVENT_LOGOUT)
  async handleMemberLogoutEvent(event: MemberLogoutEvent) {
    this.logger.debug(event)
  }
}
