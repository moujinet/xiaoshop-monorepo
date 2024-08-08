import { OnEvent } from '@nestjs/event-emitter'
import { Injectable, Logger } from '@nestjs/common'
import { MemberLogoutEvent } from '@/member/member.events'

@Injectable()
export class MemberListener {
  private readonly logger = new Logger(MemberListener.name)

  // TODO: 会员购买商品后，计算会员积分\成长值\等级
  async handleMemberOrder() {
    // 1. 计算会员积分
    // 2. 计算会员成长值
    // 3. 计算会员等级
  }

  /**
   * 注销会员
   *
   * @param payload MemberLogoutEvent
   */
  @OnEvent(MemberLogoutEvent.name)
  async handleMemberLogout(payload: MemberLogoutEvent) {
    this.logger.debug('注销会员', payload.id)

    // 1. 删除账户
    // 2. 删除会员卡
    // 3. 删除收货地址
    // 4. 删除日志
  }
}
