import type { IGoodsGroup, IGoodsGroupDict } from '@xiaoshop/schema'
import type { IUseRequestReturn } from '~/utils/request'

/**
 * 获取商品分组列表
 *
 * @api get /goods/group/list
 * @returns IUseRequestReturn<IGoodsGroup[]>
 */
export function fetchGoodsGroupList(): IUseRequestReturn<IGoodsGroup[]> {
  return useRequest<IGoodsGroup[]>({
    method: 'get',
    url: '/goods/group/list',
  })
}

/**
 * 获取商品分组字典列表
 *
 * @api get /goods/group/dict/list
 * @returns IUseRequestReturn<IGoodsGroupDict[]>
 */
export function fetchGoodsGroupDictList(): IUseRequestReturn<IGoodsGroupDict[]> {
  return useRequest<IGoodsGroupDict[]>({
    method: 'get',
    url: '/goods/group/dict/list',
  })
}

/**
 * 获取商品分组详情
 *
 * @api get /goods/group/detail
 * @param id IGoodsGroup['id']
 * @returns IUseRequestReturn<IGoodsGroup>
 */
export function fetchGoodsGroupDetail(id: IGoodsGroup['id']): IUseRequestReturn<IGoodsGroup> {
  return useRequest<IGoodsGroup>({
    method: 'get',
    url: '/goods/group/detail',
    params: {
      id,
    },
  })
}

/**
 * 创建商品分组
 *
 * @api post /goods/group/create
 * @param data IFormData<IGoodsGroup>
 * @returns Promise<any>
 */
export function createGoodsGroup(data: IFormData<IGoodsGroup>): Promise<any> {
  return usePromiseRequest({
    method: 'post',
    url: '/goods/group/create',
    data,
  })
}

/**
 * 更新商品分组
 *
 * @api put /goods/group/update
 * @param id IGoodsGroup['id']
 * @param data IFormData<IGoodsGroup>
 * @returns Promise<any>
 */
export function updateGoodsGroup(
  id: IGoodsGroup['id'],
  data: IFormData<IGoodsGroup>,
): Promise<any> {
  return usePromiseRequest({
    method: 'put',
    url: '/goods/group/update',
    data,
    params: {
      id,
    },
  })
}

/**
 * 删除商品分组
 *
 * @api delete /goods/group/delete
 * @param id IGoodsGroup['id']
 * @returns Promise<any>
 */
export function deleteGoodsGroup(id: IGoodsGroup['id']): Promise<any> {
  return usePromiseRequest({
    method: 'delete',
    url: '/goods/group/delete',
    data: {
      id,
    },
  })
}
