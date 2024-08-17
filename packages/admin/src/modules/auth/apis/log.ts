import type { IApiPaginationData, IStaffLog } from '@xiaoshop/schema'
import type { IUseRequestReturn } from '~/utils/request'

/**
 * 获取员工日志分页列表
 *
 * @api get /admin/staff/log/pages
 * @param params Record<string, any>
 * @returns IUseRequestReturn<IApiPaginationData<IStaffLog>>
 */
export function fetchStaffLogPages(
  params?: Record<string, any>,
): IUseRequestReturn<IApiPaginationData<IStaffLog>> {
  return useRequest<IApiPaginationData<IStaffLog>>({
    method: 'get',
    url: '/admin/staff/log/pages',
    params: {
      ...params,
    },
  })
}
