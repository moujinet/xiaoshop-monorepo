import type { IApiPaginationData, IStaffAccountProfile } from '@xiaoshop/schema'
import type { IUseRequestReturn } from '~/utils/request'

/**
 * 获取员工账号分页列表
 *
 * @api get /admin/staffs/account/pages
 * @param params Record<string, any>
 * @returns IUseRequestReturn<IApiPaginationData<IStaffAccountProfile>>
 */
export function fetchAccountPages(
  params?: Record<string, any>,
): IUseRequestReturn<IApiPaginationData<IStaffAccountProfile>> {
  return useRequest<IApiPaginationData<IStaffAccountProfile>>({
    method: 'get',
    url: '/admin/staffs/account/pages',
    params,
  })
}

/**
 * 获取员工账号详情
 *
 * @api get /admin/staffs/account/detail
 * @param id IStaffAccountProfile['id']
 * @returns IUseRequestReturn<IStaffAccountProfile>
 */
export function fetchAccountDetail(
  id: IStaffAccountProfile['id'],
): IUseRequestReturn<IStaffAccountProfile> {
  return useRequest<IStaffAccountProfile>({
    method: 'get',
    url: '/admin/staffs/account/detail',
    params: {
      id,
    },
  })
}

/**
 * 创建员工账号
 *
 * @api post /admin/staffs/account/create
 * @param data Record<string, any>
 * @returns Promise<any>
 */
export function createAccount(data: Record<string, any>): Promise<any> {
  return usePromiseRequest({
    method: 'post',
    url: '/admin/staffs/account/create',
    data,
  })
}

/**
 * 更新员工账号
 *
 * @api put /admin/staffs/account/update
 * @param id IStaffAccountProfile['id']
 * @param data Record<string, any>
 * @returns Promise<any>
 */
export function updateAccount(
  id: IStaffAccountProfile['id'],
  data: Record<string, any>,
): Promise<any> {
  return usePromiseRequest({
    method: 'put',
    url: '/admin/staffs/account/update',
    params: { id },
    data,
  })
}

/**
 * 删除员工账号
 *
 * @api delete /admin/staffs/account/delete
 * @param id IStaffAccountProfile['id']
 * @returns Promise<any>
 */
export function deleteAccount(id: IStaffAccountProfile['id']): Promise<any> {
  return usePromiseRequest({
    method: 'delete',
    url: '/admin/staffs/account/delete',
    data: {
      id,
    },
  })
}
