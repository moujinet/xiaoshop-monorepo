import type {
  IGoods,
  IGoodsBasicInfo,
  IGoodsBasicInfoFormData,
  IGoodsDetailInfo,
  IGoodsInventoryInfo,
  IGoodsListItem,
  IGoodsSku,
  IGoodsSpec,
} from '@xiaoshop/schema'
import type { IUseRequestReturn } from '~/utils/request'

/**
 * 获取商品分页列表
 *
 * @api get /goods/pages
 * @param params Record<string, any>
 * @returns IUseRequestReturn<IApiPaginationResult<IGoodsListItem>>
 */
export function fetchGoodsPages(
  params?: Record<string, any>,
): IUseRequestReturn<IApiPaginationResult<IGoodsListItem>> {
  return useRequest<IApiPaginationResult<IGoodsListItem>>({
    method: 'get',
    url: '/goods/pages',
    params,
  })
}

/**
 * 获取商品基本信息
 *
 * @api get /goods/detail/basic
 * @param id IGoods['id']
 * @returns IUseRequestReturn<IGoodsBasicInfo>
 */
export function fetchGoodsBasicInfo(
  id: IGoods['id'],
): IUseRequestReturn<IGoodsBasicInfo> {
  return useRequest<IGoodsBasicInfo>({
    method: 'get',
    url: '/goods/detail/basic',
    params: {
      id,
    },
  })
}

/**
 * 获取商品库存信息
 *
 * @api get /goods/detail/inventory
 * @param id IGoods['id']
 * @returns IUseRequestReturn<IGoodsInventoryInfo>
 */
export function fetchGoodsInventoryInfo(
  id: IGoods['id'],
): IUseRequestReturn<IGoodsInventoryInfo> {
  return useRequest<IGoodsInventoryInfo>({
    method: 'get',
    url: '/goods/detail/inventory',
    params: {
      id,
    },
  })
}

/**
 * 获取商品库存信息
 *
 * @api get /goods/detail/content
 * @param id IGoods['id']
 * @returns IUseRequestReturn<IGoodsDetailInfo>
 */
export function fetchGoodsContent(
  id: IGoods['id'],
): IUseRequestReturn<IGoodsDetailInfo> {
  return useRequest<IGoodsDetailInfo>({
    method: 'get',
    url: '/goods/detail/content',
    params: {
      id,
    },
  })
}

/**
 * 统计商品预警数量
 *
 * @api get /goods/warning/count
 * @returns Promise<number>
 */
export function countGoodsWarning(): Promise<number> {
  return usePromiseRequest<number>({
    method: 'get',
    url: '/goods/warning/count',
  })
}

/**
 * 创建商品基本信息
 *
 * @api post /goods/basic/create
 * @param data IGoodsBasicInfoFormData
 * @returns Promise<any>
 */
export function createBasicInfo(data: IGoodsBasicInfoFormData) {
  return usePromiseRequest<any>({
    method: 'post',
    url: '/goods/basic/create',
    data,
  })
}

/**
 * 更新商品基本信息
 *
 * @api put /goods/basic/update
 * @param id IGoods['id']
 * @param data IGoodsBasicInfoFormData
 * @returns Promise<any>
 */
export function updateBasicInfo(
  id: IGoods['id'],
  data: IGoodsBasicInfoFormData,
) {
  return usePromiseRequest<any>({
    method: 'put',
    url: '/goods/basic/update',
    data,
    params: {
      id,
    },
  })
}

/**
 * 更新商品库存信息
 *
 * @api put /goods/inventory/update
 * @param id IGoods['id']
 * @param data IFormData<IGoodsInventoryInfo>
 * @returns Promise<any>
 */
export function updateInventoryInfo(
  id: IGoods['id'],
  data: IFormData<IGoodsInventoryInfo>,
) {
  return usePromiseRequest<any>({
    method: 'put',
    url: '/goods/inventory/update',
    data,
    params: {
      id,
    },
  })
}

/**
 * 更新商品详情
 *
 * @api put /goods/detail/update
 * @param id IGoods['id']
 * @param data IFormData<IGoodsDetailInfo>
 * @returns Promise<any>
 */
export function updateDetailContent(
  id: IGoods['id'],
  data: IFormData<IGoodsDetailInfo>,
) {
  return usePromiseRequest<any>({
    method: 'put',
    url: '/goods/detail/update',
    data,
    params: {
      id,
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
export function copyToDraft(id: IGoods['id']) {
  return usePromiseRequest<any>({
    method: 'post',
    url: '/goods/copy',
    data: {
      id,
    },
  })
}

/**
 * 软删除商品
 *
 * @api delete /goods/delete/soft
 * @param id IGoods['id']
 * @returns Promise<any>
 */
export function softDelete(id: IGoods['id']) {
  return usePromiseRequest<any>({
    method: 'delete',
    url: '/goods/delete/soft',
    data: {
      id,
    },
  })
}

/**
 * 恢复已删除商品
 *
 * @api put /goods/delete/restore
 * @param id IGoods['id']
 * @returns Promise<any>
 */
export function restore(id: IGoods['id']) {
  return usePromiseRequest<any>({
    method: 'put',
    url: '/goods/delete/restore',
    data: {
      id,
    },
  })
}

/**
 * 批量更新商品
 *
 * @api put /goods/batch/update
 * @param ids IGoods['id'][]
 * @param data Record<string, any>
 * @returns Promise<any>
 */
export function batchUpdate(
  ids: IGoods['id'][],
  data: Record<string, any>,
) {
  return usePromiseRequest<any>({
    method: 'put',
    url: '/goods/batch/update',
    data: {
      ids,
      data,
    },
  })
}

/**
 * 批量软删除商品
 *
 * @api delete /goods/batch/delete/soft
 * @param ids IGoods['id'][]
 * @returns Promise<any>
 */
export function batchSoftDelete(ids: IGoods['id'][]) {
  return usePromiseRequest<any>({
    method: 'delete',
    url: '/goods/batch/delete/soft',
    data: {
      ids,
    },
  })
}

/**
 * 批量恢复已删除商品
 *
 * @api put /goods/batch/delete/restore
 * @param ids IGoods['id'][]
 * @returns Promise<any>
 */
export function batchRestore(ids: IGoods['id'][]) {
  return usePromiseRequest<any>({
    method: 'put',
    url: '/goods/batch/delete/restore',
    data: {
      ids,
    },
  })
}

/**
 * 获取商品规格设置
 *
 * @api get /goods/spec/list
 * @param id IGoods['id']
 * @returns IUseRequestReturn<IGoodsSpec[]>
 */
export function fetchGoodsSpecList(id: IGoods['id']): IUseRequestReturn<IGoodsSpec[]> {
  return useRequest<IGoodsSpec[]>({
    method: 'get',
    url: '/goods/spec/list',
    params: {
      id,
    },
  })
}

/**
 * 更新商品规格设置
 *
 * @api put /goods/spec/update
 * @param id IGoods['id']
 * @param data IFormData<IGoodsSpec>
 * @returns Promise<any>
 */
export function updateGoodsSpecs(
  id: IGoods['id'],
  data: IFormData<IGoodsSpec>[],
) {
  return usePromiseRequest<any>({
    method: 'put',
    url: '/goods/spec/update',
    data,
    params: {
      id,
    },
  })
}

/**
 * 获取商品多规格商品列表
 *
 * @api get /goods/skus/list
 * @param id IGoods['id']
 * @returns IUseRequestReturn<IGoodsSku[]>
 */
export function fetchGoodsSkuList(id: IGoods['id']): IUseRequestReturn<IGoodsSku[]> {
  return useRequest<IGoodsSku[]>({
    method: 'get',
    url: '/goods/skus/list',
    params: {
      id,
    },
  })
}

/**
 * 更新商品多规格商品列表
 *
 * @api put /goods/skus/update
 * @param id IGoods['id']
 * @param data IFormData<IGoodsSku>[]
 * @returns Promise<any>
 */
export function updateGoodsSkus(
  id: IGoods['id'],
  data: IFormData<IGoodsSku>[],
) {
  return usePromiseRequest<any>({
    method: 'put',
    url: '/goods/skus/update',
    data,
    params: {
      id,
    },
  })
}
