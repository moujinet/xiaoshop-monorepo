import type { IGoodsCategory, IGoodsCategoryListItem, IGoodsCategoryTreeItem } from '@xiaoshop/schema'
import type { IUseRequestReturn } from '~/utils/request'

/**
 * 获取商品分类列表
 *
 * @api get /goods/category/list
 * @param parentId IGoodsCategory['id']
 * @returns IUseRequestReturn<IGoodsCategoryListItem[]>
 */
export function fetchGoodsCategoryList(
  parentId?: IGoodsCategory['id'],
): IUseRequestReturn<IGoodsCategoryListItem[]> {
  return useRequest<IGoodsCategoryListItem[]>({
    method: 'get',
    url: '/goods/category/list',
    params: {
      parentId,
    },
  })
}

/**
 * 获取商品分类树
 *
 * @api get /goods/category/nested/list
 * @returns IUseRequestReturn<IGoodsCategoryTreeItem[]>
 */
export function fetchGoodsCategoryTree(): IUseRequestReturn<IGoodsCategoryTreeItem[]> {
  const {
    data,
    loading,
    error,
    refreshData,
  } = useRequest<IGoodsCategoryTreeItem[]>({
    method: 'get',
    url: '/goods/category/nested/list',
  })

  return {
    data: computed(() => toNestedList(data.value || [], 'id', 'parentId')),
    loading,
    error,
    refreshData,
  }
}

/**
 * 获取商品分类详情
 *
 * @api get /goods/category/detail
 * @param id IGoodsCategory['id']
 * @returns IUseRequestReturn<IGoodsCategory>
 */
export function fetchGoodsCategoryDetail(
  id: IGoodsCategory['id'],
): IUseRequestReturn<IGoodsCategory> {
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
 * @param id IGoodsCategory['id']
 * @returns Promise<any>
 */
export function deleteGoodsCategory(id: IGoodsCategory['id']): Promise<any> {
  return usePromiseRequest({
    method: 'delete',
    url: '/goods/category/delete',
    data: {
      id,
    },
  })
}
