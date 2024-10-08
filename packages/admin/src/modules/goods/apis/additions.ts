import type {
  IGoodsAddition,
  IGoodsAdditionDict,
  IGoodsAdditionListItem,
} from '@xiaoshop/schema'
import type { IUseRequestReturn } from '~/utils/request'

/**
 * 获取商品附加服务列表
 *
 * @api get /admin/goods/addition/list
 * @returns IUseRequestReturn<IGoodsAdditionListItem[]>
 */
export function fetchGoodsAdditionList(): IUseRequestReturn<IGoodsAdditionListItem[]> {
  return useRequest<IGoodsAdditionListItem[]>({
    method: 'get',
    url: '/admin/goods/addition/list',
  })
}

/**
 * 获取商品附加服务字典列表
 *
 * @api get /admin/goods/addition/dict/list
 * @returns IUseRequestReturn<IGoodsAdditionDict[]>
 */
export function fetchGoodsAdditionDictList(): IUseRequestReturn<IGoodsAdditionDict[]> {
  return useRequest<IGoodsAdditionDict[]>({
    method: 'get',
    url: '/admin/goods/addition/dict/list',
  })
}

/**
 * 获取商品附加服务详情
 *
 * @api get /admin/goods/addition/detail
 * @param id IGoodsAddition['id']
 * @returns IUseRequestReturn<IGoodsAddition>
 */
export function fetchGoodsAdditionDetail(id: IGoodsAddition['id']): IUseRequestReturn<IGoodsAddition> {
  return useRequest<IGoodsAddition>({
    method: 'get',
    url: '/admin/goods/addition/detail',
    params: {
      id,
    },
  })
}

/**
 * 创建商品附加服务
 *
 * @api post /admin/goods/addition/create
 * @param data IFormData<IGoodsAddition>
 * @returns Promise<any>
 */
export function createGoodsAddition(
  data: IFormData<IGoodsAddition>,
): Promise<any> {
  return usePromiseRequest({
    method: 'post',
    url: '/admin/goods/addition/create',
    data,
  })
}

/**
 * 更新商品附加服务
 *
 * @api put /admin/goods/addition/update
 * @param id IGoodsAddition['id']
 * @param data IFormData<IGoodsAddition>
 * @returns Promise<any>
 */
export function updateGoodsAddition(
  id: IGoodsAddition['id'],
  data: IFormData<IGoodsAddition>,
): Promise<any> {
  return usePromiseRequest({
    method: 'put',
    url: '/admin/goods/addition/update',
    data,
    params: {
      id,
    },
  })
}

/**
 * 删除商品附加服务
 *
 * @api delete /admin/goods/addition/delete
 * @param id IGoodsAddition['id']
 * @returns Promise<any>
 */
export function deleteGoodsAddition(id: IGoodsAddition['id']): Promise<any> {
  return usePromiseRequest({
    method: 'delete',
    url: '/admin/goods/addition/delete',
    data: {
      id,
    },
  })
}
