import type { IGoodsAttributeTemplate, IGoodsAttributeTemplateDict, IGoodsAttributeTemplateListItem } from '@xiaoshop/schema'
import type { IUseRequestReturn } from '~/utils/request'

/**
 * 获取商品属性模板列表
 *
 * @api get /admin/goods/attribute-template/list
 * @returns IUseRequestReturn<IGoodsAttributeTemplateListItem[]>
 */
export function fetchGoodsAttributeTemplateList(): IUseRequestReturn<IGoodsAttributeTemplateListItem[]> {
  return useRequest<IGoodsAttributeTemplateListItem[]>({
    method: 'get',
    url: '/admin/goods/attribute-template/list',
  })
}

/**
 * 获取商品属性模板字典列表
 *
 * @api get /admin/goods/attribute-template/dict/list
 * @returns IUseRequestReturn<IGoodsAttributeTemplateDict[]>
 */
export function fetchGoodsAttributeTemplateDictList(): IUseRequestReturn<IGoodsAttributeTemplateDict[]> {
  return useRequest<IGoodsAttributeTemplateDict[]>({
    method: 'get',
    url: '/admin/goods/attribute-template/dict/list',
  })
}

/**
 * 获取商品属性模板详情
 *
 * @api get /admin/goods/attribute-template/detail
 * @param id IGoodsAttributeTemplate['id']
 * @returns IUseRequestReturn<IGoodsAttributeTemplate>
 */
export function fetchGoodsAttributeTemplateDetail(
  id: IGoodsAttributeTemplate['id'],
): IUseRequestReturn<IGoodsAttributeTemplate> {
  return useRequest<IGoodsAttributeTemplate>({
    method: 'get',
    url: '/admin/goods/attribute-template/detail',
    params: {
      id,
    },
  })
}

/**
 * 创建商品属性模板
 *
 * @api post /admin/goods/attribute-template/create
 * @param data IFormData<IGoodsAttributeTemplate>
 * @returns Promise<any>
 */
export function createGoodsAttributeTemplate(
  data: IFormData<IGoodsAttributeTemplate>,
): Promise<any> {
  return usePromiseRequest({
    method: 'post',
    url: '/admin/goods/attribute-template/create',
    data,
  })
}

/**
 * 更新商品属性模板
 *
 * @api put /admin/goods/attribute-template/update
 * @param id IGoodsAttributeTemplate['id']
 * @param data IFormData<IGoodsAttributeTemplate>
 * @returns Promise<any>
 */
export function updateGoodsAttributeTemplate(
  id: IGoodsAttributeTemplate['id'],
  data: IFormData<IGoodsAttributeTemplate>,
): Promise<any> {
  return usePromiseRequest({
    method: 'put',
    url: '/admin/goods/attribute-template/update',
    data,
    params: {
      id,
    },
  })
}

/**
 * 删除商品属性模板
 *
 * @api delete /admin/goods/attribute-template/delete
 * @param id IGoodsAttributeTemplate['id']
 * @returns Promise<any>
 */
export function deleteGoodsAttributeTemplate(id: IGoodsAttributeTemplate['id']): Promise<any> {
  return usePromiseRequest({
    method: 'delete',
    url: '/admin/goods/attribute-template/delete',
    data: {
      id,
    },
  })
}
