import { type IApiPaginationData, type IStaffLog, StaffLogType } from '@xiaoshop/schema'
import type { IUseRequestReturn } from '~/utils/request'

/**
 * 获取员工日志分页列表
 *
 * @api get /staffs/log/pages
 * @param params Record<string, any>
 * @returns IUseRequestReturn<IApiPaginationData<IStaffLog>>
 */
export function fetchStaffLogPages(
  params?: Record<string, any>,
): IUseRequestReturn<IApiPaginationData<IStaffLog>> {
  return useRequest<IApiPaginationData<IStaffLog>>({
    method: 'get',
    url: '/staffs/log/pages',
    params: {
      ...params,
      type: StaffLogType.LOGIN,
    },
  })
}
