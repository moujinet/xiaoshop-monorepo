import { MemberCardType, YesOrNo } from '@xiaoshop/shared'

import { LogBasedEvent } from '~/common/events'
import { MODULE_NAME } from '@/member/constants'

/**
 * 会员卡创建事件
 */
export class MemberCardCreateEvent extends LogBasedEvent {
  constructor(
    public readonly cardId: number,
    public readonly cardName: string,
  ) {
    super(MODULE_NAME)
  }

  getLogContent() {
    return `创建会员卡 ${this.cardName}`
  }
}

/**
 * 会员卡更新事件
 */
export class MemberCardUpdateEvent extends LogBasedEvent {
  constructor(
    public readonly cardId: number,
    public readonly cardType: MemberCardType,
    public readonly cardName: string,
  ) {
    super(MODULE_NAME)
  }

  getLogContent() {
    return `更新会员${this.cardType === MemberCardType.CUSTOM ? '卡' : '等级'} ${this.cardName}`
  }
}

/**
 * 会员卡启用状态更新事件
 */
export class MemberCardStatusUpdateEvent extends LogBasedEvent {
  constructor(
    public readonly cardId: number,
    public readonly cardType: MemberCardType,
    public readonly cardName: string,
    public readonly isEnabled: YesOrNo,
  ) {
    super(MODULE_NAME)
  }

  getLogContent() {
    const action = this.isEnabled === YesOrNo.NO ? '停用' : '启用'
    const type = this.cardType === MemberCardType.CUSTOM ? '卡' : '等级'

    return `${action}会员${type} ${this.cardName}`
  }
}

/**
 * 会员卡删除事件
 */
export class MemberCardDeleteEvent extends LogBasedEvent {
  constructor(
    public readonly cardId: number,
    public readonly cardType: MemberCardType,
    public readonly cardName: string,
  ) {
    super(MODULE_NAME)
  }

  getLogContent() {
    return `删除会员${this.cardType === MemberCardType.CUSTOM ? '卡' : '等级'} ${this.cardName}`
  }
}
