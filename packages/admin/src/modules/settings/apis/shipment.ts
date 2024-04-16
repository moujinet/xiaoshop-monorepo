export interface IApiShipmentExpressCompany {
  id: number
  name: string
  url: string
  sort: number
}

/**
 * 获取快递公司列表
 *
 * @param conditions Record<string, any> | undefined
 * @returns IUseRequestReturn<IApiShipmentExpressCompany[]>
 */
export function fetchShipmentCompanyList(conditions?: Record<string, any>) {
  return useRequest<IApiShipmentExpressCompany[]>({
    method: 'get',
    url: '/shipment/company/list',
    params: conditions,
  })
}

/**
 * 获取快递公司详情
 *
 * @param conditions Record<string, any> | undefined
 * @returns IUseRequestReturn<IApiShipmentExpressCompany>
 */
export function fetchShipmentCompanyDetail(conditions?: Record<string, any>) {
  return useRequest<IApiShipmentExpressCompany>({
    method: 'get',
    url: '/shipment/company/detail',
    params: conditions,
  })
}

/**
 * 创建快递公司
 *
 * @param data Record<string, any>
 * @returns IUseRequestReturn<any>
 */
export function doCreateShipmentCompany(data: Record<string, any>) {
  return useRequest<any>({
    method: 'post',
    url: '/shipment/company/create',
    data,
  })
}

/**
 * 更新快递公司
 *
 * @param data Record<string, any>
 * @returns IUseRequestReturn<any>
 */
export function doUpdateShipmentCompany(data: Record<string, any>) {
  return useRequest<any>({
    method: 'put',
    url: '/shipment/company/update',
    data,
  })
}

/**
 * 删除快递公司
 *
 * @param conditions Record<string, any>
 * @returns IUseRequestReturn<any>
 */
export function doDeleteShipmentCompany(conditions: Record<string, any>) {
  return useRequest<any>({
    method: 'delete',
    url: '/shipment/company/delete',
    params: conditions,
  })
}
