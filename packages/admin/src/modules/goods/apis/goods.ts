import type { IUseRequestReturn } from '~/utils/request'
import type { IGoods, IGoodsFormData, IGoodsPageListItem, IGoodsSku } from '@/goods/types'
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
 * 获取指定商品 SKU 列表
 *
 * @api get /goods/sku/list
 * @param id IGoods['id']
 * @returns IUseRequestReturn<IGoodsSku[]>
 */
export function fetchGoodsSkuList(id: IGoods['id']): IUseRequestReturn<IGoodsSku[]> {
  return useRequest<IGoodsSku[]>({
    method: 'get',
    url: '/goods/sku/list',
    params: {
      id,
    },
  })
}

/**
 * 更新指定商品 SKU 列表
 *
 * @param id IGoods['id']
 * @param skus IGoodsSku[]
 * @returns Promise<any>
 */
export function updateGoodsSkus(id: IGoods['id'], skus: Partial<IGoodsSku>[]): Promise<any> {
  return usePromiseRequest({
    method: 'put',
    url: '/goods/sku/update',
    params: {
      id,
    },
    data: {
      skus,
    },
  })
}

/**
 * 统计商品预警
 *
 * @api post /goods/alarms/count
 * @returns Promise<number>
 */
export function countGoodsAlarms(): Promise<number> {
  return usePromiseRequest({
    method: 'post',
    url: '/goods/alarms/count',
  })
}

/**
 * 更新商品排序
 *
 * @api put /goods/sort/update
 * @param id IGoods['id']
 * @param sort IGoods['sort']
 * @returns Promise<any>
 */
export function updateGoodsSort(id: IGoods['id'], sort: IGoods['sort']): Promise<any> {
  return usePromiseRequest({
    method: 'put',
    url: '/goods/sort/update',
    params: {
      id,
    },
    data: {
      sort,
    },
  })
}

/**
 * 商品上架
 *
 * @api put /goods/status/update
 * @param ids IGoods['id'][]
 * @returns Promise<any>
 */
export function setGoodsInStock(ids: IGoods['id'][]): Promise<any> {
  return usePromiseRequest({
    method: 'put',
    url: '/goods/status/update',
    params: {
      ids,
    },
    data: {
      status: GOODS_STATUS_IN_STOCK,
    },
  })
}

/**
 * 商品下架
 *
 * @api put /goods/status/update
 * @param ids IGoods['id'][]
 * @returns Promise<any>
 */
export function setGoodsSoldOut(ids: IGoods['id'][]): Promise<any> {
  return usePromiseRequest({
    method: 'put',
    url: '/goods/status/update',
    params: {
      ids,
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
 * 批量设置商品属性
 *
 * @api put /goods/update/batch
 * @param ids IGoods['id'][]
 * @param data Partial<IGoodsFormData>
 * @returns Promise<any>
 */
export function batchSetupGoods(ids: IGoods['id'][], data: Partial<IGoodsFormData>): Promise<any> {
  return usePromiseRequest({
    method: 'put',
    url: '/goods/update/batch',
    params: {
      ids,
    },
    data,
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
 * @param ids IGoods['id'][]
 * @returns Promise<any>
 */
export function deleteGoods(ids: IGoods['id'][]): Promise<any> {
  return usePromiseRequest({
    method: 'delete',
    url: '/goods/delete',
    data: {
      ids,
    },
  })
}
