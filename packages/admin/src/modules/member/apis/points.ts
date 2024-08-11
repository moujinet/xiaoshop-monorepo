import type {
  IEnabled,
  IMemberPointsRule,
  IMemberPointsRuleKey,
  IMemberPointsRuleListItem,
  IMemberPointsRuleOptions,
} from '@xiaoshop/schema'
import type { IUseRequestReturn } from '~/utils/request'

/**
 * 获取会员积分规则列表
 *
 * @api get /admin/member/points/rule/list
 * @returns IUseRequestReturn<IMemberPointsRuleListItem[]>
 */
export function fetchMemberPointsRuleList(): IUseRequestReturn<IMemberPointsRuleListItem[]> {
  return useRequest<IMemberPointsRuleListItem[]>({
    method: 'get',
    url: '/admin/member/points/rule/list',
  })
}

/**
 * 获取会员积分规则
 *
 * @api get /admin/member/points/rule/detail
 * @param key IMemberPointsRuleKey
 * @returns IUseRequestReturn<IMemberPointsRule>
 */
export function fetchMemberPointsRule(key: IMemberPointsRuleKey): IUseRequestReturn<IMemberPointsRule> {
  return useRequest<IMemberPointsRule>({
    method: 'get',
    url: '/admin/member/points/rule/detail',
    params: {
      key,
    },
  })
}

/**
 * 更新会员积分规则设置
 *
 * @api put /admin/member/points/rule/options/update
 * @param key IMemberPointsRuleKey
 * @param options IMemberPointsRuleOptions
 * @returns Promise<void>
 */
export function updateMemberPointsRuleOptions(
  key: IMemberPointsRuleKey,
  options: IMemberPointsRuleOptions,
) {
  return usePromiseRequest({
    method: 'put',
    url: '/admin/member/points/rule/options/update',
    data: {
      key,
      options,
    },
  })
}

/**
 * 更新会员积分规则启用状态
 *
 * @api put /admin/member/points/rule/status/update
 * @param key IMemberPointsRuleKey
 * @param enable IEnable
 * @returns Promise<void>
 */
export function updateMemberPointsRuleStatus(
  key: IMemberPointsRuleKey,
  enable: IEnabled,
) {
  return usePromiseRequest({
    method: 'put',
    url: '/admin/member/points/rule/status/update',
    data: {
      key,
      enable,
    },
  })
}
