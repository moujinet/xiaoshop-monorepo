import type {
  IStaffDepartment,
  IStaffDepartmentDict,
  IStaffDepartmentTreeItem,
} from '@xiaoshop/schema'
import type { IUseRequestReturn } from '~/utils/request'

/**
 * 获取组织部门树
 *
 * @api get /admin/staff/department/list
 * @returns IUseRequestReturn<IStaffDepartmentTreeItem[]>
 */
export function fetchDepartmentTree(): IUseRequestReturn<IStaffDepartmentTreeItem[]> {
  const {
    data,
    loading,
    error,
    refreshData,
  } = useRequest<IStaffDepartmentTreeItem[]>({
    method: 'get',
    url: '/admin/staff/department/list',
  })

  return {
    data: computed(() => toNestedList(data.value || [], 'id', 'parentId')),
    loading,
    error,
    refreshData,
  }
}

/**
 * 获取组织部门根节点
 *
 * @api get /admin/staff/department/root/list
 * @returns IUseRequestReturn<IStaffDepartmentDict[]>
 */
export function fetchDepartmentRootList(): IUseRequestReturn<IStaffDepartmentDict[]> {
  return useRequest<IStaffDepartmentDict[]>({
    method: 'get',
    url: '/admin/staff/department/root/list',
  })
}

/**
 * 获取组织部门详情
 *
 * @api get /admin/staff/department/detail
 * @param id IStaffDepartment['id']
 * @returns IUseRequestReturn<IStaffDepartment>
 */
export function fetchDepartmentDetail(id: IStaffDepartment['id']): IUseRequestReturn<IStaffDepartment> {
  return useRequest<IStaffDepartment>({
    method: 'get',
    url: '/admin/staff/department/detail',
    params: {
      id,
    },
  })
}

/**
 * 创建组织部门
 *
 * @api post /admin/staff/department/create
 * @param data IFormData<IStaffDepartment>
 * @returns Promise<any>
 */
export function createDepartment(data: IFormData<IStaffDepartment>): Promise<any> {
  return usePromiseRequest({
    method: 'post',
    url: '/admin/staff/department/create',
    data,
  })
}

/**
 * 更新组织部门
 *
 * @api put /admin/staff/department/update
 * @param id IStaffDepartment['id']
 * @param data IFormData<IStaffDepartment>
 * @returns Promise<any>
 */
export function updateDepartment(id: IStaffDepartment['id'], data: IFormData<IStaffDepartment>): Promise<any> {
  return usePromiseRequest({
    method: 'put',
    url: '/admin/staff/department/update',
    params: { id },
    data,
  })
}

/**
 * 删除组织部门
 *
 * @api delete /admin/staff/department/delete
 * @param id IStaffDepartment['id']
 * @returns Promise<any>
 */
export function deleteDepartment(id: IStaffDepartment['id']): Promise<any> {
  return usePromiseRequest({
    method: 'delete',
    url: '/admin/staff/department/delete',
    data: {
      id,
    },
  })
}
