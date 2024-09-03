import {
  MemberCardType,
} from '@xiaoshop/shared'
import { BaseEvent } from '~/common/events'

/**
 * 会员卡绑定事件
 */
export class MemberBindingCardEvent extends BaseEvent {
  constructor(
    public readonly memberId: number,
    public readonly cardId: number,
    public readonly cardName: string,
    public readonly cardType: MemberCardType,
  ) {
    super('会员管理')
  }

  getAuthLogs() {
    const action = this.cardType === MemberCardType.LEVEL
      ? '升级为'
      : '绑定会员卡'

    return `会员 (@${this.memberId}) ${action} - ${this.cardName}(#${this.cardId})`
  }
}
