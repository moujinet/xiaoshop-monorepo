import type {
  IApiPaginationData,
  IMemberAccountKeyValue,
  IMemberListItem,
  IMemberProfile,
  IMemberStatus,
} from '@xiaoshop/schema'
import type { IUseRequestReturn } from '~/utils/request'

/**
 * 获取会员分页列表
 *
 * @api get /admin/member/pages
 * @param params Record<string, any>
 * @returns IUseRequestReturn<IApiPaginationData<IMemberListItem>>
 */
export function fetchMemberPages(
  params?: Record<string, any>,
): IUseRequestReturn<IApiPaginationData<IMemberListItem>> {
  return useRequest<IApiPaginationData<IMemberListItem>>({
    method: 'get',
    url: '/admin/member/pages',
    params,
  })
}

/**
 * 获取会员资料
 *
 * @api get /admin/member/profile
 * @param id number
 * @returns IUseRequestReturn<IMemberProfile>
 */
export function fetchMemberProfile(id: number): IUseRequestReturn<IMemberProfile> {
  return useRequest<IMemberProfile>({
    method: 'get',
    url: '/admin/member/profile',
    params: {
      id,
    },
  })
}

/**
 * 创建会员资料
 *
 * @api post /admin/member/create
 * @param data Record<string, any>
 * @returns Promise<any>
 */
export function createMember(data: Record<string, any>) {
  return usePromiseRequest({
    method: 'post',
    url: '/admin/member/create',
    data,
  })
}

/**
 * 更新会员状态
 *
 * @api put /admin/member/status/update
 * @param id number
 * @param status IMemberStatus
 * @returns Promise<any>
 */
export function updateMemberStatus(id: number, status: IMemberStatus) {
  return usePromiseRequest({
    method: 'put',
    url: '/admin/member/status/update',
    params: {
      id,
    },
    data: {
      status,
    },
  })
}

/**
 * 更新会员标签
 *
 * @api put /admin/member/tags/update
 * @param id number
 * @param tagIds number[]
 * @returns Promise<any>
 */
export function updateMemberTags(id: number, tagIds: number[]) {
  return usePromiseRequest({
    method: 'put',
    url: '/admin/member/tags/update',
    params: {
      id,
    },
    data: {
      tagIds,
    },
  })
}

/**
 * 批量更新会员标签
 *
 * @api put /admin/member/tags/batch/update
 * @param memberIds number[]
 * @param tagIds number[]
 * @returns Promise<any>
 */
export function batchUpdateMemberTags(memberIds: number[], tagIds: number[]) {
  return usePromiseRequest({
    method: 'put',
    url: '/admin/member/tags/batch/update',
    data: {
      memberIds,
      tagIds,
    },
  })
}

/**
 * 重置会员密码
 *
 * @api put /admin/member/password/reset
 * @param id number
 * @param newPassword string
 * @returns Promise<any>
 */
export function resetMemberPassword(id: number, newPassword: string) {
  return usePromiseRequest({
    method: 'put',
    url: '/admin/member/password/reset',
    params: {
      id,
    },
    data: {
      newPassword,
    },
  })
}

/**
 * 绑定会员卡
 *
 * @api put /admin/member/card/bind
 * @param memberId number
 * @param cardId number
 * @param cardPlanId number
 * @returns Promise<any>
 */
export function bindMemberCard(memberId: number, cardId: number, cardPlanId?: number) {
  return usePromiseRequest({
    method: 'put',
    url: '/admin/member/card/bind',
    data: {
      memberId,
      cardId,
      cardPlanId,
    },
  })
}

/**
 * 批量绑定会员卡
 *
 * @api put /admin/member/card/batch/bind
 * @param memberIds number[]
 * @param cardId number
 * @param cardPlanId number
 * @returns Promise<any>
 */
export function batchBindMemberCard(memberIds: number[], cardId: number, cardPlanId?: number) {
  return usePromiseRequest({
    method: 'put',
    url: '/admin/member/card/batch/bind',
    data: {
      memberIds,
      cardId,
      cardPlanId,
    },
  })
}

/**
 * 获取会员账户
 *
 * @api get /admin/member/account
 * @param id number
 * @returns IUseRequestReturn<IMemberAccountKeyValue>
 */
export function fetchMemberAccount(id: number): IUseRequestReturn<IMemberAccountKeyValue> {
  return useRequest<IMemberAccountKeyValue>({
    method: 'get',
    url: '/admin/member/account',
    params: {
      id,
    },
  })
}
