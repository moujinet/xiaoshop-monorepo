import type {
  IGoodsProtection,
  IGoodsProtectionDict,
  IGoodsProtectionListItem,
} from '@xiaoshop/schema'
import type { IUseRequestReturn } from '~/utils/request'

/**
 * 获取商品服务保障列表
 *
 * @api get /goods/protection/list
 * @returns IUseRequestReturn<IGoodsProtectionListItem[]>
 */
export function fetchGoodsProtectionList(): IUseRequestReturn<IGoodsProtectionListItem[]> {
  return useRequest<IGoodsProtectionListItem[]>({
    method: 'get',
    url: '/goods/protection/list',
  })
}

/**
 * 获取商品服务保障字典列表
 *
 * @api get /goods/protection/dict/list
 * @returns IUseRequestReturn<IGoodsProtectionDict[]>
 */
export function fetchGoodsProtectionDictList(): IUseRequestReturn<IGoodsProtectionDict[]> {
  return useRequest<IGoodsProtectionDict[]>({
    method: 'get',
    url: '/goods/protection/dict/list',
  })
}

/**
 * 获取商品服务保障详情
 *
 * @api get /goods/protection/detail
 * @param id IGoodsProtection['id']
 * @returns IUseRequestReturn<IGoodsProtection>
 */
export function fetchGoodsProtectionDetail(
  id: IGoodsProtection['id'],
): IUseRequestReturn<IGoodsProtection> {
  return useRequest<IGoodsProtection>({
    method: 'get',
    url: '/goods/protection/detail',
    params: {
      id,
    },
  })
}

/**
 * 创建商品服务保障
 *
 * @api post /goods/protection/create
 * @param data IFormData<IGoodsProtection>
 * @returns Promise<any>
 */
export function createGoodsProtection(
  data: IFormData<IGoodsProtection>,
): Promise<any> {
  return usePromiseRequest({
    method: 'post',
    url: '/goods/protection/create',
    data,
  })
}

/**
 * 更新商品服务保障
 *
 * @api put /goods/protection/update
 * @param id IGoodsProtection['id']
 * @param data IFormData<IGoodsProtection>
 * @returns Promise<any>
 */
export function updateGoodsProtection(
  id: IGoodsProtection['id'],
  data: IFormData<IGoodsProtection>,
): Promise<any> {
  return usePromiseRequest({
    method: 'put',
    url: '/goods/protection/update',
    data,
    params: {
      id,
    },
  })
}

/**
 * 删除商品服务保障
 *
 * @api delete /goods/protection/delete
 * @param id IGoodsProtection['id']
 * @returns Promise<any>
 */
export function deleteGoodsProtection(
  id: IGoodsProtection['id'],
): Promise<any> {
  return usePromiseRequest({
    method: 'delete',
    url: '/goods/protection/delete',
    data: {
      id,
    },
  })
}
