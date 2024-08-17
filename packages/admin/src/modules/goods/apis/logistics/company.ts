import type { ILogisticsCompany, ILogisticsCompanyListItem } from '@xiaoshop/schema'
import type { IUseRequestReturn } from '~/utils/request'

/**
 * 获取物流公司列表
 *
 * @api get /admin/logistics/company/list
 * @returns IUseRequestReturn<ILogisticsCompanyListItem[]>
 */
export function fetchLogisticsCompanyList(): IUseRequestReturn<ILogisticsCompanyListItem[]> {
  return useRequest<ILogisticsCompanyListItem[]>({
    method: 'get',
    url: '/admin/logistics/company/list',
  })
}

/**
 * 获取物流公司详情
 *
 * @api get /admin/logistics/company/detail
 * @param id number
 * @returns IUseRequestReturn<ILogisticsCompany>
 */
export function fetchLogisticsCompanyDetail(id: number): IUseRequestReturn<ILogisticsCompany> {
  return useRequest<ILogisticsCompany>({
    method: 'get',
    url: '/admin/logistics/company/detail',
    params: {
      id,
    },
  })
}

/**
 * 创建物流公司
 *
 * @api post /admin/logistics/company/create
 * @param data IFormData<ILogisticsCompany>
 * @returns Promise<any>
 */
export function createLogisticsCompany(
  data: IFormData<ILogisticsCompany>,
): Promise<any> {
  return usePromiseRequest({
    method: 'post',
    url: '/admin/logistics/company/create',
    data,
  })
}

/**
 * 更新物流公司
 *
 * @api put /admin/logistics/company/update
 * @param id ILogisticsCompany['id']
 * @param data IFormData<ILogisticsCompany>
 * @returns Promise<any>
 */
export function updateLogisticsCompany(
  id: ILogisticsCompany['id'],
  data: IFormData<ILogisticsCompany>,
): Promise<any> {
  return usePromiseRequest({
    method: 'put',
    url: '/admin/logistics/company/update',
    data,
    params: {
      id,
    },
  })
}

/**
 * 删除物流公司
 *
 * @api delete /admin/logistics/company/delete
 * @param id ILogisticsCompany['id']
 * @returns Promise<any>
 */
export function deleteLogisticsCompany(id: ILogisticsCompany['id']): Promise<any> {
  return usePromiseRequest({
    method: 'delete',
    url: '/admin/logistics/company/delete',
    data: {
      id,
    },
  })
}
