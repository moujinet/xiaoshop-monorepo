import type {
  IEnabled,
  IPointsRuleOptions,
} from '@xiaoshop/schema'

/**
 * 积分规则状态变更事件
 */
export class PointsRuleStatusUpdateEvent {
  constructor(
    readonly key: string,
    readonly enable: IEnabled,
  ) {}
}

/**
 * 积分规则选项变更事件
 */
export class PointsRuleOptionsUpdateEvent {
  constructor(
    readonly key: string,
    readonly options: IPointsRuleOptions,
  ) {}
}
