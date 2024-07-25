import type { IGoodsTag, IGoodsTagDict } from '@xiaoshop/schema'
import type { IUseRequestReturn } from '~/utils/request'

/**
 * 获取商品标签列表
 *
 * @api get /goods/tag/list
 * @returns IUseRequestReturn<IGoodsTag[]>
 */
export function fetchGoodsTagList(): IUseRequestReturn<IGoodsTag[]> {
  return useRequest<IGoodsTag[]>({
    method: 'get',
    url: '/goods/tag/list',
  })
}

/**
 * 获取商品标签字典列表
 *
 * @api get /goods/tag/dict/list
 * @returns IUseRequestReturn<IGoodsTagDict[]>
 */
export function fetchGoodsTagDictList(): IUseRequestReturn<IGoodsTagDict[]> {
  return useRequest<IGoodsTagDict[]>({
    method: 'get',
    url: '/goods/tag/dict/list',
  })
}

/**
 * 获取商品标签详情
 *
 * @api get /goods/tag/detail
 * @param id IGoodsTag['id']
 * @returns IUseRequestReturn<IGoodsTag>
 */
export function fetchGoodsTagDetail(id: IGoodsTag['id']): IUseRequestReturn<IGoodsTag> {
  return useRequest<IGoodsTag>({
    method: 'get',
    url: '/goods/tag/detail',
    params: {
      id,
    },
  })
}

/**
 * 创建商品标签
 *
 * @api post /goods/tag/create
 * @param data IFormData<IGoodsTag>
 * @returns Promise<any>
 */
export function createGoodsTag(data: IFormData<IGoodsTag>): Promise<any> {
  return usePromiseRequest({
    method: 'post',
    url: '/goods/tag/create',
    data,
  })
}

/**
 * 更新商品标签
 *
 * @api put /goods/tag/update
 * @param id IGoodsTag['id']
 * @param data IFormData<IGoodsTag>
 * @returns Promise<any>
 */
export function updateGoodsTag(
  id: IGoodsTag['id'],
  data: IFormData<IGoodsTag>,
): Promise<any> {
  return usePromiseRequest({
    method: 'put',
    url: '/goods/tag/update',
    data,
    params: {
      id,
    },
  })
}

/**
 * 删除商品标签
 *
 * @api delete /goods/tag/delete
 * @param id IGoodsTag['id']
 * @returns Promise<any>
 */
export function deleteGoodsTag(id: IGoodsTag['id']): Promise<any> {
  return usePromiseRequest({
    method: 'delete',
    url: '/goods/tag/delete',
    data: {
      id,
    },
  })
}
