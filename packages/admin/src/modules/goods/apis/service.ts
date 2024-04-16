import type { IGoodsService } from '@/goods/types'
import type { IUseRequestReturn } from '~/utils/request'

/**
 * 获取商品服务列表
 *
 * @api get /goods/service/list
 * @returns IUseRequestReturn<IGoodsService[]>
 */
export function fetchGoodsServiceList(): IUseRequestReturn<IGoodsService[]> {
  return useRequest<IGoodsService[]>({
    method: 'get',
    url: '/goods/service/list',
  })
}

/**
 * 获取商品服务详情
 *
 * @api get /goods/service/detail
 * @param id number
 * @returns IUseRequestReturn<IGoodsService>
 */
export function fetchGoodsServiceDetail(id: number): IUseRequestReturn<IGoodsService> {
  return useRequest<IGoodsService>({
    method: 'get',
    url: '/goods/service/detail',
    params: {
      id,
    },
  })
}

/**
 * 创建商品服务
 *
 * @api post /goods/service/create
 * @param data IFormData<IGoodsService>
 * @returns Promise<any>
 */
export function createGoodsService(
  data: IFormData<IGoodsService>,
): Promise<any> {
  return usePromiseRequest({
    method: 'post',
    url: '/goods/service/create',
    data,
  })
}

/**
 * 更新商品服务
 *
 * @api put /goods/service/update
 * @param id IGoodsService['id']
 * @param data IFormData<IGoodsService>
 * @returns Promise<any>
 */
export function updateGoodsService(
  id: IGoodsService['id'],
  data: IFormData<IGoodsService>,
): Promise<any> {
  return usePromiseRequest({
    method: 'put',
    url: '/goods/service/update',
    data,
    params: {
      id,
    },
  })
}

/**
 * 删除商品服务
 *
 * @api delete /goods/service/delete
 * @param id number
 * @returns Promise<any>
 */
export function deleteGoodsService(id: number): Promise<any> {
  return usePromiseRequest({
    method: 'delete',
    url: '/goods/service/delete',
    data: {
      id,
    },
  })
}
