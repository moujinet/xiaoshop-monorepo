import type { IGoodsBrand, IGoodsBrandDict } from '@xiaoshop/schema'
import type { IUseRequestReturn } from '~/utils/request'

/**
 * 获取商品品牌列表
 *
 * @api get /admin/goods/brand/list
 * @returns IUseRequestReturn<IGoodsBrand[]>
 */
export function fetchGoodsBrandList(): IUseRequestReturn<IGoodsBrand[]> {
  return useRequest<IGoodsBrand[]>({
    method: 'get',
    url: '/admin/goods/brand/list',
  })
}

/**
 * 获取商品品牌字典列表
 *
 * @api get /admin/goods/brand/dict/list
 * @returns IUseRequestReturn<IGoodsBrandDict[]>
 */
export function fetchGoodsBrandDictList(): IUseRequestReturn<IGoodsBrandDict[]> {
  return useRequest<IGoodsBrandDict[]>({
    method: 'get',
    url: '/admin/goods/brand/dict/list',
  })
}

/**
 * 获取商品品牌详情
 *
 * @api get /admin/goods/brand/detail
 * @param id IGoodsBrand['id']
 * @returns IUseRequestReturn<IGoodsBrand>
 */
export function fetchGoodsBrandDetail(id: IGoodsBrand['id']): IUseRequestReturn<IGoodsBrand> {
  return useRequest<IGoodsBrand>({
    method: 'get',
    url: '/admin/goods/brand/detail',
    params: {
      id,
    },
  })
}

/**
 * 创建商品品牌
 *
 * @api post /admin/goods/brand/create
 * @param data IFormData<IGoodsBrand>
 * @returns Promise<any>
 */
export function createGoodsBrand(data: IFormData<IGoodsBrand>): Promise<any> {
  return usePromiseRequest({
    method: 'post',
    url: '/admin/goods/brand/create',
    data,
  })
}

/**
 * 更新商品品牌
 *
 * @api put /admin/goods/brand/update
 * @param id IGoodsBrand['id']
 * @param data IFormData<IGoodsBrand>
 * @returns Promise<any>
 */
export function updateGoodsBrand(
  id: IGoodsBrand['id'],
  data: IFormData<IGoodsBrand>,
): Promise<any> {
  return usePromiseRequest({
    method: 'put',
    url: '/admin/goods/brand/update',
    data,
    params: {
      id,
    },
  })
}

/**
 * 删除商品品牌
 *
 * @api delete /admin/goods/brand/delete
 * @param id IGoodsBrand['id']
 * @returns Promise<any>
 */
export function deleteGoodsBrand(id: IGoodsBrand['id']): Promise<any> {
  return usePromiseRequest({
    method: 'delete',
    url: '/admin/goods/brand/delete',
    data: {
      id,
    },
  })
}
