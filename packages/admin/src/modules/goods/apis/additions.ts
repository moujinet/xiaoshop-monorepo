import type {
  IGoodsAdditional,
  IGoodsAdditionalDict,
  IGoodsAdditionalListItem,
} from '@xiaoshop/schema'
import type { IUseRequestReturn } from '~/utils/request'

/**
 * 获取商品附加服务列表
 *
 * @api get /goods/additional/list
 * @returns IUseRequestReturn<IGoodsAdditionalListItem[]>
 */
export function fetchGoodsAdditionalList(): IUseRequestReturn<IGoodsAdditionalListItem[]> {
  return useRequest<IGoodsAdditionalListItem[]>({
    method: 'get',
    url: '/goods/additional/list',
  })
}

/**
 * 获取商品附加服务字典列表
 *
 * @api get /goods/additional/dict/list
 * @returns IUseRequestReturn<IGoodsAdditionalDict[]>
 */
export function fetchGoodsAdditionalDictList(): IUseRequestReturn<IGoodsAdditionalDict[]> {
  return useRequest<IGoodsAdditionalDict[]>({
    method: 'get',
    url: '/goods/additional/dict/list',
  })
}

/**
 * 获取商品附加服务详情
 *
 * @api get /goods/additional/detail
 * @param id IGoodsAdditional['id']
 * @returns IUseRequestReturn<IGoodsAdditional>
 */
export function fetchGoodsAdditionalDetail(id: IGoodsAdditional['id']): IUseRequestReturn<IGoodsAdditional> {
  return useRequest<IGoodsAdditional>({
    method: 'get',
    url: '/goods/additional/detail',
    params: {
      id,
    },
  })
}

/**
 * 创建商品附加服务
 *
 * @api post /goods/additional/create
 * @param data IFormData<IGoodsAdditional>
 * @returns Promise<any>
 */
export function createGoodsAdditional(
  data: IFormData<IGoodsAdditional>,
): Promise<any> {
  return usePromiseRequest({
    method: 'post',
    url: '/goods/additional/create',
    data,
  })
}

/**
 * 更新商品附加服务
 *
 * @api put /goods/additional/update
 * @param id IGoodsAdditional['id']
 * @param data IFormData<IGoodsAdditional>
 * @returns Promise<any>
 */
export function updateGoodsAdditional(
  id: IGoodsAdditional['id'],
  data: IFormData<IGoodsAdditional>,
): Promise<any> {
  return usePromiseRequest({
    method: 'put',
    url: '/goods/additional/update',
    data,
    params: {
      id,
    },
  })
}

/**
 * 删除商品附加服务
 *
 * @api delete /goods/additional/delete
 * @param id IGoodsAdditional['id']
 * @returns Promise<any>
 */
export function deleteGoodsAdditional(id: IGoodsAdditional['id']): Promise<any> {
  return usePromiseRequest({
    method: 'delete',
    url: '/goods/additional/delete',
    data: {
      id,
    },
  })
}
