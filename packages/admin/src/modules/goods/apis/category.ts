import type { IGoodsCategory } from '@/goods/types'
import type { IUseRequestReturn } from '~/utils/request'

/**
 * 获取商品分类列表
 *
 * @api get /goods/category/list
 * @param parentId number
 * @returns IUseRequestReturn<IGoodsCategory[]>
 */
export function fetchGoodsCategoryList(parentId?: IGoodsCategory['id']): IUseRequestReturn<IGoodsCategory[]> {
  return useRequest<IGoodsCategory[]>({
    method: 'get',
    url: '/goods/category/list',
    params: {
      parentId,
    },
  })
}

/**
 * 获取商品分类详情
 *
 * @api get /goods/category/detail
 * @param id number
 * @returns IUseRequestReturn<IGoodsCategory>
 */
export function fetchGoodsCategoryDetail(id: number): IUseRequestReturn<IGoodsCategory> {
  return useRequest<IGoodsCategory>({
    method: 'get',
    url: '/goods/category/detail',
    params: {
      id,
    },
  })
}

/**
 * 创建商品分类
 *
 * @api post /goods/category/create
 * @param data IFormData<IGoodsCategory>
 * @returns Promise<any>
 */
export function createGoodsCategory(data: IFormData<IGoodsCategory>): Promise<any> {
  return usePromiseRequest({
    method: 'post',
    url: '/goods/category/create',
    data,
  })
}

/**
 * 更新商品分类
 *
 * @api put /goods/category/update
 * @param id IGoodsCategory['id']
 * @param data IFormData<IGoodsCategory>
 * @returns Promise<any>
 */
export function updateGoodsCategory(
  id: IGoodsCategory['id'],
  data: IFormData<IGoodsCategory>,
): Promise<any> {
  return usePromiseRequest({
    method: 'put',
    url: '/goods/category/update',
    data,
    params: {
      id,
    },
  })
}

/**
 * 删除商品分类
 *
 * @api delete /goods/category/delete
 * @param id number
 * @returns Promise<any>
 */
export function deleteGoodsCategory(id: number): Promise<any> {
  return usePromiseRequest({
    method: 'delete',
    url: '/goods/category/delete',
    params: {
      id,
    },
  })
}
