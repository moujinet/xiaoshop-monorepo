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
 * 获取回收站商品分页列表
 *
 * @api get /goods/recycle/pages
 * @param params Record<string, any>
 * @returns IUseRequestReturn<IApiPaginationResult<IGoodsPageListItem>>
 */
export function fetchGoodsRecyclePages(params?: Record<string, any>): IUseRequestReturn<IApiPaginationResult<IGoodsPageListItem>> {
  return useRequest<IApiPaginationResult<IGoodsPageListItem>>({
    method: 'get',
    url: '/goods/recycle/pages',
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
 * 获取指定商品详情
 *
 * @api get /goods/detail
 * @param id IGoods['id']
 * @returns IUseRequestReturn<IGoods>
 */
export function fetchGoodsDetail(id: IGoods['id']): IUseRequestReturn<IGoods> {
  return useRequest<IGoods>({
    method: 'get',
    url: '/goods/detail',
    params: {
      id,
    },
  })
}

/**
 * 统计商品预警
 *
 * @api post /goods/count/alarms
 * @returns Promise<number>
 */
export function countGoodsAlarms(): Promise<number> {
  return usePromiseRequest({
    method: 'post',
    url: '/goods/count/alarms',
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
 * 更新指定商品 SKU 列表
 *
 * @param id IGoods['id']
 * @param skus IGoodsSku[]
 * @returns Promise<any>
 */
export function updateGoodsSkus(id: IGoods['id'], skus: Partial<IGoodsSku>[]): Promise<any> {
  return usePromiseRequest({
    method: 'put',
    url: '/goods/update/sku',
    params: {
      id,
    },
    data: {
      skus,
    },
  })
}
/**
 * 更新商品排序
 *
 * @api put /goods/update/sort
 * @param id IGoods['id']
 * @param sort IGoods['sort']
 * @returns Promise<any>
 */
export function updateGoodsSort(id: IGoods['id'], sort: IGoods['sort']): Promise<any> {
  return usePromiseRequest({
    method: 'put',
    url: '/goods/update/sort',
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
 * @api put /goods/update/status
 * @param ids IGoods['id'][]
 * @returns Promise<any>
 */
export function setGoodsInStock(ids: IGoods['id'][]): Promise<any> {
  return usePromiseRequest({
    method: 'put',
    url: '/goods/update/status',
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
 * @api put /goods/update/status
 * @param ids IGoods['id'][]
 * @returns Promise<any>
 */
export function setGoodsSoldOut(ids: IGoods['id'][]): Promise<any> {
  return usePromiseRequest({
    method: 'put',
    url: '/goods/update/status',
    params: {
      ids,
    },
    data: {
      status: GOODS_STATUS_SOLD_OUT,
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
 * 批量删除商品
 *
 * @api delete /goods/batch/delete
 * @param ids IGoods['id'][]
 * @returns Promise<any>
 */
export function batchDeleteGoods(ids: IGoods['id'][]): Promise<any> {
  return usePromiseRequest({
    method: 'delete',
    url: '/goods/delete/batch',
    data: {
      ids,
    },
  })
}

/**
 * 彻底删除商品
 *
 * @api delete /goods/delete
 * @param id IGoods['id']
 * @returns Promise<any>
 */
export function shiftDeleteGoods(id: IGoods['id']): Promise<any> {
  return usePromiseRequest({
    method: 'delete',
    url: '/goods/delete',
    data: {
      id,
    },
  })
}

/**
 * 恢复删除的商品
 *
 * @api put /goods/undeleted
 * @param id IGoods['id']
 * @returns Promise<any>
 */
export function undeletedGoods(id: IGoods['id']): Promise<any> {
  return usePromiseRequest({
    method: 'put',
    url: '/goods/undeleted',
    params: {
      id,
    },
  })
}

/**
 * 清空已删除的商品
 *
 * @api delete /goods/cleanup/deleted
 * @returns Promise<any>
 */
export function cleanupDeletedGoods(): Promise<any> {
  return usePromiseRequest({
    method: 'delete',
    url: '/goods/cleanup/deleted',
  })
}
