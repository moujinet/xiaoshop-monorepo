import type { IAsset } from '@/assets/types'
import type { IUseRequestReturn } from '~/utils/request'

/**
 * 获取素材分页列表
 *
 * @api get /asset/pages
 * @param params Record<string, any>
 * @returns IUseRequestReturn<IApiPaginationResult<IAsset>>
 */
export function fetchAssetPages(params?: Record<string, any>): IUseRequestReturn<IApiPaginationResult<IAsset>> {
  return useRequest<IApiPaginationResult<IAsset>>({
    method: 'get',
    url: '/asset/pages',
    params,
  })
}

/**
 * 获取素材详情
 *
 * @api get /asset/detail
 * @param id IAsset['id']
 * @returns IUseRequestReturn<IAsset>
 */
export function fetchAssetDetail(id: IAsset['id']): IUseRequestReturn<IAsset> {
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
 * @param data IFormData<IAsset>
 * @returns Promise<any>
 */
export function createAsset(data: IFormData<IAsset>): Promise<any> {
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
 * @param id IAsset['id']
 * @param data IFormData<IAsset>
 * @returns Promise<any>
 */
export function updateAsset(id: IAsset['id'], data: IFormData<IAsset>): Promise<any> {
  return usePromiseRequest({
    method: 'put',
    url: '/asset/update',
    params: { id },
    data,
  })
}

/**
 * 删除素材
 *
 * @api delete /asset/delete
 * @param id IAsset['id']
 * @returns Promise<any>
 */
export function deleteAsset(id: IAsset['id']): Promise<any> {
  return usePromiseRequest({
    method: 'delete',
    url: '/asset/delete',
    data: {
      id,
    },
  })
}
