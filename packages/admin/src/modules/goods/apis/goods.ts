import type { IUseRequestReturn } from '~/utils/request'
import type { IGoods, IGoodsFormData, IGoodsPageListItem } from '@/goods/types'
import { GOODS_STATUS_IN_STOCK, GOODS_STATUS_SOLD_OUT } from '@/goods/constants'

/**
 * 获取商品分页列表
 *
 * @api get /goods/pages
 * @param params Record<string, any>
 * @returns IUseRequestReturn<IApiPaginationResult<IGoodsPageListItem>>
 */
export function fetchGoodsPages(params?: Record<string, any>): IUseRequestReturn<IApiPaginationResult<IGoodsPageListItem>> {
  return useRequest<IApiPaginationResult<IGoodsPageListItem>>({
    method: 'get',
    url: '/goods/pages',
    params,
  })
}

/**
 * 商品上架
 *
 * @api put /goods/update-status
 * @param id IGoods['id']
 * @returns Promise<any>
 */
export function setGoodsInStock(id: IGoods['id']): Promise<any> {
  return usePromiseRequest({
    method: 'put',
    url: '/goods/update-status',
    params: {
      id,
    },
    data: {
      status: GOODS_STATUS_IN_STOCK,
    },
  })
}

/**
 * 商品下架
 *
 * @api put /goods/update-status
 * @param id IGoods['id']
 * @returns Promise<any>
 */
export function setGoodsStockOut(id: IGoods['id']): Promise<any> {
  return usePromiseRequest({
    method: 'put',
    url: '/goods/update-status',
    params: {
      id,
    },
    data: {
      status: GOODS_STATUS_SOLD_OUT,
    },
  })
}

/**
 * 复制商品至草稿
 *
 * @api post /goods/copy
 * @param id IGoods['id']
 * @returns Promise<any>
 */
export function copyGoodsToDraft(id: IGoods['id']): Promise<any> {
  return usePromiseRequest({
    method: 'post',
    url: '/goods/copy',
    data: {
      id,
    },
  })
}

/**
 * 创建商品
 *
 * @api post /goods/create
 * @param data IGoodsFormData
 * @returns Promise<any>
 */
export function createGoods(data: IGoodsFormData): Promise<any> {
  return usePromiseRequest({
    method: 'post',
    url: '/goods/create',
    data,
  })
}

/**
 * 更新商品
 *
 * @param id IGoods['id']
 * @param data IGoodsFormData
 * @returns Promise<any>
 */
export function updateGoods(id: IGoods['id'], data: IGoodsFormData): Promise<any> {
  return usePromiseRequest({
    method: 'put',
    url: '/goods/update',
    data,
    params: {
      id,
    },
  })
}

/**
 * 删除商品
 *
 * @api delete /goods/delete
 * @param id IGoods['id']
 * @returns Promise<any>
 */
export function deleteGoods(id: IGoods['id']): Promise<any> {
  return usePromiseRequest({
    method: 'delete',
    url: '/goods/delete',
    data: {
      id,
    },
  })
}
