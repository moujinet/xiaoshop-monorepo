import type {
  IStaffPosition,
  IStaffPositionDict,
} from '@xiaoshop/schema'
import type { IUseRequestReturn } from '~/utils/request'

/**
 * 获取组织职位分页列表
 *
 * @api get /staffs/position/pages
 * @param params Record<string, any>
 * @returns IUseRequestReturn<IApiPaginationResult<IStaffPosition>>
 */
export function fetchPositionPages(params?: Record<string, any>): IUseRequestReturn<IApiPaginationResult<IStaffPosition>> {
  return useRequest<IApiPaginationResult<IStaffPosition>>({
    method: 'get',
    url: '/staffs/position/pages',
    params,
  })
}

/**
 * 获取组织职位列表
 *
 * @api get /staffs/position/list
 * @returns IUseRequestReturn<IStaffPositionDict[]>
 */
export function fetchPositionList(departmentId: number): IUseRequestReturn<IStaffPositionDict[]> {
  return useRequest<IStaffPositionDict[]>({
    method: 'get',
    url: '/staffs/position/list',
    params: {
      departmentId,
    },
  })
}

/**
 * 获取组织职位详情
 *
 * @api get /staffs/position/detail
 * @param id IStaffPosition['id']
 * @returns IUseRequestReturn<IStaffPosition>
 */
export function fetchPositionDetail(id: IStaffPosition['id']): IUseRequestReturn<IStaffPosition> {
  return useRequest<IStaffPosition>({
    method: 'get',
    url: '/staffs/position/detail',
    params: {
      id,
    },
  })
}

/**
 * 创建组织职位
 *
 * @api post /staffs/position/create
 * @param data Record<string, any>
 * @returns Promise<any>
 */
export function createPosition(data: Record<string, any>): Promise<any> {
  return usePromiseRequest({
    method: 'post',
    url: '/staffs/position/create',
    data,
  })
}

/**
 * 更新组织职位
 *
 * @api put /staffs/position/update
 * @param id IStaffPosition['id']
 * @param data Record<string, any>
 * @returns Promise<any>
 */
export function updatePosition(id: IStaffPosition['id'], data: Record<string, any>): Promise<any> {
  return usePromiseRequest({
    method: 'put',
    url: '/staffs/position/update',
    params: { id },
    data,
  })
}

/**
 * 删除组织职位
 *
 * @api delete /staffs/position/delete
 * @param id IStaffPosition['id']
 * @returns Promise<any>
 */
export function deletePosition(id: IStaffPosition['id']): Promise<any> {
  return usePromiseRequest({
    method: 'delete',
    url: '/staffs/position/delete',
    data: {
      id,
    },
  })
}
