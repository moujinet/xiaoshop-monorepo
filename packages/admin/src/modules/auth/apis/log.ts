import { type IStaffLog, StaffLogTypeEnum } from '@xiaoshop/schema'
import type { IUseRequestReturn } from '~/utils/request'

/**
 * 获取员工日志分页列表
 *
 * @api get /staffs/log/pages
 * @param params Record<string, any>
 * @returns IUseRequestReturn<IApiPaginationResult<IStaffLog>>
 */
export function fetchStaffLogPages(
  params?: Record<string, any>,
): IUseRequestReturn<IApiPaginationResult<IStaffLog>> {
  return useRequest<IApiPaginationResult<IStaffLog>>({
    method: 'get',
    url: '/staffs/log/pages',
    params: {
      ...params,
      type: StaffLogTypeEnum.LOGIN,
    },
  })
}
