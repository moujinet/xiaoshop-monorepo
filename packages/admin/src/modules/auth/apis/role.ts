import type {
  IApiPaginationData,
  IStaffRole,
  IStaffRoleDict,
} from '@xiaoshop/schema'
import type { IUseRequestReturn } from '~/utils/request'

/**
 * 获取员工角色分页列表
 *
 * @api get /admin/staff/role/pages
 * @param params IFormData<IStaffRole>
 * @returns IUseRequestReturn<IApiPaginationData<IStaffRole>>
 */
export function fetchRolePages(params?: IFormData<IStaffRole>): IUseRequestReturn<IApiPaginationData<IStaffRole>> {
  return useRequest<IApiPaginationData<IStaffRole>>({
    method: 'get',
    url: '/admin/staff/role/pages',
    params,
  })
}

/**
 * 获取员工角色列表
 *
 * @api get /admin/staff/role/list
 * @returns IUseRequestReturn<IStaffRoleDict[]>
 */
export function fetchRoleList(): IUseRequestReturn<IStaffRoleDict[]> {
  return useRequest<IStaffRoleDict[]>({
    method: 'get',
    url: '/admin/staff/role/list',
  })
}

/**
 * 获取员工角色详情
 *
 * @api get /admin/staff/role/detail
 * @param id IStaffRole['id']
 * @returns IUseRequestReturn<IStaffRole>
 */
export function fetchRoleDetail(id: IStaffRole['id']): IUseRequestReturn<IStaffRole> {
  return useRequest<IStaffRole>({
    method: 'get',
    url: '/admin/staff/role/detail',
    params: {
      id,
    },
  })
}

/**
 * 创建员工角色
 *
 * @api post /admin/staff/role/create
 * @param data IFormData<IStaffRole>
 * @returns Promise<any>
 */
export function createRole(data: IFormData<IStaffRole>): Promise<any> {
  return usePromiseRequest({
    method: 'post',
    url: '/admin/staff/role/create',
    data,
  })
}

/**
 * 更新员工角色
 *
 * @api put /admin/staff/role/update
 * @param id IStaffRole['id']
 * @param data IFormData<IStaffRole>
 * @returns Promise<any>
 */
export function updateRole(id: IStaffRole['id'], data: IFormData<IStaffRole>): Promise<any> {
  return usePromiseRequest({
    method: 'put',
    url: '/admin/staff/role/update',
    params: { id },
    data,
  })
}

/**
 * 删除员工角色
 *
 * @api delete /admin/staff/role/delete
 * @param id IStaffRole['id']
 * @returns Promise<any>
 */
export function deleteRole(id: IStaffRole['id']): Promise<any> {
  return usePromiseRequest({
    method: 'delete',
    url: '/admin/staff/role/delete',
    data: {
      id,
    },
  })
}
