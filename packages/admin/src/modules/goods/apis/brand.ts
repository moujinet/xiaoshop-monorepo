import type { IGoodsBrand, IGoodsBrandDict } from '@xiaoshop/schema'
import type { IUseRequestReturn } from '~/utils/request'

/**
 * 获取商品品牌列表
 *
 * @api get /goods/brand/list
 * @returns IUseRequestReturn<IGoodsBrand[]>
 */
export function fetchGoodsBrandList(): IUseRequestReturn<IGoodsBrand[]> {
  return useRequest<IGoodsBrand[]>({
    method: 'get',
    url: '/goods/brand/list',
  })
}

/**
 * 获取商品品牌字典列表
 *
 * @api get /goods/brand/dict/list
 * @returns IUseRequestReturn<IGoodsBrandDict[]>
 */
export function fetchGoodsBrandDictList(): IUseRequestReturn<IGoodsBrandDict[]> {
  return useRequest<IGoodsBrandDict[]>({
    method: 'get',
    url: '/goods/brand/dict/list',
  })
}

/**
 * 获取商品品牌详情
 *
 * @api get /goods/brand/detail
 * @param id IGoodsBrand['id']
 * @returns IUseRequestReturn<IGoodsBrand>
 */
export function fetchGoodsBrandDetail(id: IGoodsBrand['id']): IUseRequestReturn<IGoodsBrand> {
  return useRequest<IGoodsBrand>({
    method: 'get',
    url: '/goods/brand/detail',
    params: {
      id,
    },
  })
}

/**
 * 创建商品品牌
 *
 * @api post /goods/brand/create
 * @param data IFormData<IGoodsBrand>
 * @returns Promise<any>
 */
export function createGoodsBrand(data: IFormData<IGoodsBrand>): Promise<any> {
  return usePromiseRequest({
    method: 'post',
    url: '/goods/brand/create',
    data,
  })
}

/**
 * 更新商品品牌
 *
 * @api put /goods/brand/update
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
    url: '/goods/brand/update',
    data,
    params: {
      id,
    },
  })
}

/**
 * 删除商品品牌
 *
 * @api delete /goods/brand/delete
 * @param id IGoodsBrand['id']
 * @returns Promise<any>
 */
export function deleteGoodsBrand(id: IGoodsBrand['id']): Promise<any> {
  return usePromiseRequest({
    method: 'delete',
    url: '/goods/brand/delete',
    data: {
      id,
    },
  })
}
