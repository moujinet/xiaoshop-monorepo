import {
  type IMemberPointsRuleKey,
  type IMemberPointsRuleOptions,
  type IYesOrNo,
  MEMBER_POINTS_RULE_KEYS,
} from '@xiaoshop/shared'
import { BaseEvent } from '~/common/events'

/**
 * 会员积分规则更新事件
 */
export class MemberPointsRuleUpdatedEvent extends BaseEvent {
  constructor(
    public readonly key: IMemberPointsRuleKey,
    public readonly rule: IMemberPointsRuleOptions,
  ) {
    super('会员积分')
  }

  getAuthLogs() {
    const ruleName = MEMBER_POINTS_RULE_KEYS.find(
      ({ value }) => value === this.key,
    )?.label

    return `更新会员积分规则 ${ruleName} 选项 - ${JSON.stringify(this.rule)}`
  }
}

/**
 * 会员积分规则状态更新事件
 */
export class MemberPointsRuleStatusUpdatedEvent extends BaseEvent {
  constructor(
    public readonly key: IMemberPointsRuleKey,
    public readonly enable: IYesOrNo,
  ) {
    super('会员积分')
  }

  getAuthLogs() {
    const ruleName = MEMBER_POINTS_RULE_KEYS.find(
      ({ value }) => value === this.key,
    )?.label

    return `更新会员积分规则 ${ruleName} 状态 - ${this.enable === 'Y' ? '启用' : '禁用'}`
  }
}
