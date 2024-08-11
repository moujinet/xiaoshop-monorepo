import type {
  IApiPaginationData,
  IStaffPosition,
  IStaffPositionDict,
} from '@xiaoshop/schema'
import type { IUseRequestReturn } from '~/utils/request'

/**
 * 获取组织职位分页列表
 *
 * @api get /admin/staffs/position/pages
 * @param params Record<string, any>
 * @returns IUseRequestReturn<IApiPaginationData<IStaffPosition>>
 */
export function fetchPositionPages(
  params?: Record<string, any>,
): IUseRequestReturn<IApiPaginationData<IStaffPosition>> {
  return useRequest<IApiPaginationData<IStaffPosition>>({
    method: 'get',
    url: '/admin/staffs/position/pages',
    params,
  })
}

/**
 * 获取组织职位列表
 *
 * @api get /admin/staffs/position/list
 * @returns IUseRequestReturn<IStaffPositionDict[]>
 */
export function fetchPositionList(
  departmentId: number,
): IUseRequestReturn<IStaffPositionDict[]> {
  return useRequest<IStaffPositionDict[]>({
    method: 'get',
    url: '/admin/staffs/position/list',
    params: {
      departmentId,
    },
  })
}

/**
 * 获取组织职位详情
 *
 * @api get /admin/staffs/position/detail
 * @param id IStaffPosition['id']
 * @returns IUseRequestReturn<IStaffPosition>
 */
export function fetchPositionDetail(
  id: IStaffPosition['id'],
): IUseRequestReturn<IStaffPosition> {
  return useRequest<IStaffPosition>({
    method: 'get',
    url: '/admin/staffs/position/detail',
    params: {
      id,
    },
  })
}

/**
 * 创建组织职位
 *
 * @api post /admin/staffs/position/create
 * @param data Record<string, any>
 * @returns Promise<any>
 */
export function createPosition(data: Record<string, any>): Promise<any> {
  return usePromiseRequest({
    method: 'post',
    url: '/admin/staffs/position/create',
    data,
  })
}

/**
 * 更新组织职位
 *
 * @api put /admin/staffs/position/update
 * @param id IStaffPosition['id']
 * @param data Record<string, any>
 * @returns Promise<any>
 */
export function updatePosition(id: IStaffPosition['id'], data: Record<string, any>): Promise<any> {
  return usePromiseRequest({
    method: 'put',
    url: '/admin/staffs/position/update',
    params: { id },
    data,
  })
}

/**
 * 删除组织职位
 *
 * @api delete /admin/staffs/position/delete
 * @param id IStaffPosition['id']
 * @returns Promise<any>
 */
export function deletePosition(id: IStaffPosition['id']): Promise<any> {
  return usePromiseRequest({
    method: 'delete',
    url: '/admin/staffs/position/delete',
    data: {
      id,
    },
  })
}
