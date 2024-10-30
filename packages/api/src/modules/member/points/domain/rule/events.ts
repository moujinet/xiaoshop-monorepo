import type { IMemberPointsRuleOptions } from '@xiaoshop/shared'

import { AdminEvent } from '~/common/events'
import { MODULE_NAME } from '@/member/constants'

/**
 * Update Member Points Rule Event
 */
export class MemberPointsRuleUpdateEvent extends AdminEvent {
  constructor(
    public readonly ruleKey: string,
    public readonly ruleName: string,
    public readonly ruleOptions: IMemberPointsRuleOptions,
  ) {
    super(MODULE_NAME)
  }

  get logContent() {
    return `更新会员积分规则 - ${this.ruleName} - ${JSON.stringify(this.ruleOptions)}`
  }
}
