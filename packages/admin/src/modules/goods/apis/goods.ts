import type {
  IApiPaginationData,
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
 * @api get /admin/goods/pages
 * @param params Record<string, any>
 * @returns IUseRequestReturn<IApiPaginationData<IGoodsListItem>>
 */
export function fetchGoodsPages(
  params?: Record<string, any>,
): IUseRequestReturn<IApiPaginationData<IGoodsListItem>> {
  return useRequest<IApiPaginationData<IGoodsListItem>>({
    method: 'get',
    url: '/admin/goods/pages',
    params,
  })
}

/**
 * 获取商品基本信息
 *
 * @api get /admin/goods/detail/basic
 * @param id IGoods['id']
 * @returns IUseRequestReturn<IGoodsBasicInfo>
 */
export function fetchGoodsBasicInfo(
  id: IGoods['id'],
): IUseRequestReturn<IGoodsBasicInfo> {
  return useRequest<IGoodsBasicInfo>({
    method: 'get',
    url: '/admin/goods/detail/basic',
    params: {
      id,
    },
  })
}

/**
 * 获取商品库存信息
 *
 * @api get /admin/goods/detail/inventory
 * @param id IGoods['id']
 * @returns IUseRequestReturn<IGoodsInventoryInfo>
 */
export function fetchGoodsInventoryInfo(
  id: IGoods['id'],
): IUseRequestReturn<IGoodsInventoryInfo> {
  return useRequest<IGoodsInventoryInfo>({
    method: 'get',
    url: '/admin/goods/detail/inventory',
    params: {
      id,
    },
  })
}

/**
 * 获取商品库存信息
 *
 * @api get /admin/goods/detail/content
 * @param id IGoods['id']
 * @returns IUseRequestReturn<IGoodsDetailInfo>
 */
export function fetchGoodsContent(
  id: IGoods['id'],
): IUseRequestReturn<IGoodsDetailInfo> {
  return useRequest<IGoodsDetailInfo>({
    method: 'get',
    url: '/admin/goods/detail/content',
    params: {
      id,
    },
  })
}

/**
 * 统计商品预警数量
 *
 * @api get /admin/goods/warning/count
 * @returns Promise<number>
 */
export function countGoodsWarning(): Promise<number> {
  return usePromiseRequest<number>({
    method: 'get',
    url: '/admin/goods/warning/count',
  })
}

/**
 * 创建商品基本信息
 *
 * @api post /admin/goods/basic/create
 * @param data IGoodsBasicInfoFormData
 * @returns Promise<any>
 */
export function createBasicInfo(data: IGoodsBasicInfoFormData) {
  return usePromiseRequest<any>({
    method: 'post',
    url: '/admin/goods/basic/create',
    data,
  })
}

/**
 * 更新商品基本信息
 *
 * @api put /admin/goods/basic/update
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
    url: '/admin/goods/basic/update',
    data,
    params: {
      id,
    },
  })
}

/**
 * 更新商品库存信息
 *
 * @api put /admin/goods/inventory/update
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
    url: '/admin/goods/inventory/update',
    data,
    params: {
      id,
    },
  })
}

/**
 * 更新商品详情
 *
 * @api put /admin/goods/detail/update
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
    url: '/admin/goods/detail/update',
    data,
    params: {
      id,
    },
  })
}

/**
 * 复制商品至草稿
 *
 * @api post /admin/goods/copy
 * @param id IGoods['id']
 * @returns Promise<any>
 */
export function copyToDraft(id: IGoods['id']) {
  return usePromiseRequest<any>({
    method: 'post',
    url: '/admin/goods/copy',
    data: {
      id,
    },
  })
}

/**
 * 恢复已删除商品
 *
 * @api put /admin/goods/delete/restore
 * @param id IGoods['id']
 * @returns Promise<any>
 */
export function restoreGoods(id: IGoods['id']) {
  return usePromiseRequest<any>({
    method: 'put',
    url: '/admin/goods/delete/restore',
    data: {
      id,
    },
  })
}

/**
 * 批量更新商品
 *
 * @api put /admin/goods/batch/update
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
    url: '/admin/goods/batch/update',
    data: {
      ids,
      data,
    },
  })
}

/**
 * 批量软删除商品
 *
 * @api delete /admin/goods/batch/delete/soft
 * @param ids IGoods['id'][]
 * @returns Promise<any>
 */
export function batchSoftDelete(ids: IGoods['id'][]) {
  return usePromiseRequest<any>({
    method: 'delete',
    url: '/admin/goods/batch/delete/soft',
    data: {
      ids,
    },
  })
}

/**
 * 获取商品规格设置
 *
 * @api get /admin/goods/spec/list
 * @param id IGoods['id']
 * @returns IUseRequestReturn<IGoodsSpec[]>
 */
export function fetchGoodsSpecList(id: IGoods['id']): IUseRequestReturn<IGoodsSpec[]> {
  return useRequest<IGoodsSpec[]>({
    method: 'get',
    url: '/admin/goods/spec/list',
    params: {
      id,
    },
  })
}

/**
 * 更新商品规格设置
 *
 * @api put /admin/goods/spec/update
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
    url: '/admin/goods/spec/update',
    data,
    params: {
      id,
    },
  })
}

/**
 * 获取商品多规格商品列表
 *
 * @api get /admin/goods/skus/list
 * @param id IGoods['id']
 * @returns IUseRequestReturn<IGoodsSku[]>
 */
export function fetchGoodsSkuList(id: IGoods['id']): IUseRequestReturn<IGoodsSku[]> {
  return useRequest<IGoodsSku[]>({
    method: 'get',
    url: '/admin/goods/skus/list',
    params: {
      id,
    },
  })
}

/**
 * 更新商品多规格商品列表
 *
 * @api put /admin/goods/skus/update
 * @param id IGoods['id']
 * @param data IFormData<IGoodsSku>[]
 * @param skuCode IGoodsSku['skuCode']
 * @returns Promise<any>
 */
export function updateGoodsSkus(
  id: IGoods['id'],
  data: IFormData<IGoodsSku>[],
  skuCode?: IGoodsSku['skuCode'],
) {
  return usePromiseRequest<any>({
    method: 'put',
    url: '/admin/goods/skus/update',
    data: {
      skuCode,
      skus: data,
    },
    params: {
      id,
    },
  })
}
