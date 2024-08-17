import type {
  IApiPaginationData,
  IMemberLogout,
  IMemberLogoutStatus,
} from '@xiaoshop/schema'
import type { IUseRequestReturn } from '~/utils/request'

/**
 * 获取会员注销申请分页列表
 *
 * @api get /admin/member/logout/pages
 * @param params Record<string, any>
 * @returns IUseRequestReturn<IApiPaginationData<IMemberLogout>>
 */
export function fetchMemberLogoutPages(
  params?: Record<string, any>,
): IUseRequestReturn<IApiPaginationData<IMemberLogout>> {
  return useRequest<IApiPaginationData<IMemberLogout>>({
    method: 'get',
    url: '/admin/member/logout/pages',
    params,
  })
}

/**
 * 更新会员注销申请状态
 *
 * @api put /admin/member/logout/status/update
 * @param id number
 * @param status IMemberLogoutStatus
 * @returns Promise<void>
 */
export function updateMemberLogoutStatus(id: number, status: IMemberLogoutStatus) {
  return usePromiseRequest({
    method: 'put',
    url: '/admin/member/logout/status/update',
    params: {
      id,
    },
    data: {
      status,
    },
  })
}
