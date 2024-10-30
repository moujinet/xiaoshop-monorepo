import { MEMBER_CARD_TYPES } from '~/dicts'
import { AdminEvent } from '~/common/events'
import { MODULE_NAME } from '@/member/constants'

/**
 * Create Member Card Event
 */
export class MemberCardCreateEvent extends AdminEvent {
  constructor(
    public readonly cardId: number,
    public readonly cardName: string,
  ) {
    super(MODULE_NAME)
  }

  get logContent() {
    return `创建会员卡 - ${this.cardName}`
  }
}

/**
 * Update Member Card Event
 */
export class MemberCardUpdateEvent extends AdminEvent {
  constructor(
    public readonly cardId: number,
    public readonly cardType: number,
    public readonly cardName: string,
  ) {
    super(MODULE_NAME)
  }

  get logContent() {
    const cardType = MEMBER_CARD_TYPES.find(t => t.key === this.cardType)?.value || '会员等级'

    return `更新${cardType} - ${this.cardName}`
  }
}

/**
 * Delete Member Card Event
 */
export class MemberCardDeleteEvent extends AdminEvent {
  constructor(
    public readonly cardId: number,
    public readonly cardName: string,
  ) {
    super(MODULE_NAME)
  }

  get logContent() {
    return `删除会员卡 - ${this.cardName}`
  }
}
