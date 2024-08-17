import type {
  IApiPaginationData,
  IEnabled,
  IPointsChangeLogListItem,
  IPointsChangeType,
  IPointsRule,
  IPointsRuleKey,
  IPointsRuleListItem,
  IPointsRuleOptions,
} from '@xiaoshop/schema'
import type { IUseRequestReturn } from '~/utils/request'

/**
 * 获取会员积分规则列表
 *
 * @api get /admin/points/rule/list
 * @returns IUseRequestReturn<IPointsRuleListItem[]>
 */
export function fetchPointsRuleList(): IUseRequestReturn<IPointsRuleListItem[]> {
  return useRequest<IPointsRuleListItem[]>({
    method: 'get',
    url: '/admin/points/rule/list',
  })
}

/**
 * 获取会员积分规则
 *
 * @api get /admin/points/rule/detail
 * @param key IPointsRuleKey
 * @returns IUseRequestReturn<IPointsRule>
 */
export function fetchPointsRule(key: IPointsRuleKey): IUseRequestReturn<IPointsRule> {
  return useRequest<IPointsRule>({
    method: 'get',
    url: '/admin/points/rule/detail',
    params: {
      key,
    },
  })
}

/**
 * 更新会员积分规则设置
 *
 * @api put /admin/points/rule/options/update
 * @param key IPointsRuleKey
 * @param options IPointsRuleOptions
 * @returns Promise<void>
 */
export function updatePointsRuleOptions(
  key: IPointsRuleKey,
  options: IPointsRuleOptions,
) {
  return usePromiseRequest({
    method: 'put',
    url: '/admin/points/rule/options/update',
    data: {
      key,
      options,
    },
  })
}

/**
 * 更新会员积分规则启用状态
 *
 * @api put /admin/points/rule/status/update
 * @param key IPointsRuleKey
 * @param enable IEnable
 * @returns Promise<void>
 */
export function updatePointsRuleStatus(
  key: IPointsRuleKey,
  enable: IEnabled,
) {
  return usePromiseRequest({
    method: 'put',
    url: '/admin/points/rule/status/update',
    data: {
      key,
      enable,
    },
  })
}

/**
 * 获取会员积分变动记录分页列表
 *
 * @api get /admin/points/change/log/pages
 * @param params Record<string, any>
 * @returns IUseRequestReturn<IApiPaginationData<IPointsChangeLogListItem>>
 */
export function fetchPointsChangeLogPages(
  params?: Record<string, any>,
): IUseRequestReturn<IApiPaginationData<IPointsChangeLogListItem>> {
  return useRequest<IApiPaginationData<IPointsChangeLogListItem>>({
    method: 'get',
    url: '/admin/points/change/log/pages',
    params,
  })
}

/**
 * 修改会员积分
 *
 * @api put /admin/points/change
 * @param memberId number
 * @param type IPointsChangeType
 * @param change number
 * @param reason string
 * @returns Promise<void>
 */
export function changeMemberPoints(
  memberId: number,
  type: IPointsChangeType,
  change: number,
  reason: string,
) {
  return usePromiseRequest({
    method: 'put',
    url: '/admin/points/change',
    data: {
      memberId,
      type,
      change,
      reason,
    },
  })
}
