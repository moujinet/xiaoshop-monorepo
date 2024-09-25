import type { IMemberAccountKey, MemberAccountChangeMethod } from '@xiaoshop/shared'

import { toDict } from '~/utils/transformers'
import { LogBasedEvent } from '~/common/events'
import { MODULE_NAME } from '@/member/constants'
import { MEMBER_ACCOUNT_CHANGE_METHODS } from '~/common/dicts'

/**
 * 会员账户更新事件
 */
export class MemberAccountUpdateEvent extends LogBasedEvent {
  constructor(
    public readonly memberId: number,
    public readonly accountChangeMethod: MemberAccountChangeMethod,
    public readonly accountKey: IMemberAccountKey,
    public readonly accountValue: number,
    public readonly reason?: string,
  ) {
    super(MODULE_NAME)
  }

  getLogContent() {
    const method = toDict(this.accountChangeMethod, MEMBER_ACCOUNT_CHANGE_METHODS)

    return `会员账户 ${this.accountKey.toUpperCase()} ${method.value} ${this.accountValue} - ${this.reason}`
  }
}
