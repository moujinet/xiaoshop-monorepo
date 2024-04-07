import type { IAsset } from '@/assets/types'
import type { IUseRequestReturn } from '~/utils/request'

/**
 * 获取素材列表
 *
 * @api get /asset/list
 * @param params Record<string, any>
 * @returns IUseRequestReturn<IApiPaginationResult<IAsset>>
 */
export function fetchAssetList(params?: Record<string, any>): IUseRequestReturn<IApiPaginationResult<IAsset>> {
  return useRequest<IApiPaginationResult<IAsset>>({
    method: 'get',
    url: '/asset/list',
    params,
  })
}

/**
 * 获取素材详情
 *
 * @api get /asset/detail
 * @param id number
 * @returns IUseRequestReturn<IAsset>
 */
export function fetchAssetDetail(id: number): IUseRequestReturn<IAsset> {
  return useRequest<IAsset>({
    method: 'get',
    url: '/asset/detail',
    params: {
      id,
    },
  })
}

/**
 * 创建素材
 *
 * @api post /asset/create
 * @param data Omit<IAsset, 'id' | 'createdTime'>
 * @returns Promise<any>
 */
export function createAsset(data: Omit<IAsset, 'id' | 'createdTime'>): Promise<any> {
  return usePromiseRequest({
    method: 'post',
    url: '/asset/create',
    data,
  })
}

/**
 * 更新素材
 *
 * @api put /asset/update
 * @param data Omit<IAsset, 'createdTime'>
 * @returns Promise<any>
 */
export function updateAsset(data: Omit<IAsset, 'createdTime'>): Promise<any> {
  return usePromiseRequest({
    method: 'put',
    url: '/asset/update',
    data,
  })
}

/**
 * 删除素材
 *
 * @api delete /asset/delete
 * @param id number
 * @returns Promise<any>
 */
export function deleteAsset(id: number): Promise<any> {
  return usePromiseRequest({
    method: 'delete',
    url: '/asset/delete',
    params: {
      id,
    },
  })
}
