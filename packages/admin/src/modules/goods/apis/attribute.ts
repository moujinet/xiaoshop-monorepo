import type { IGoodsAttributeTemplate, IGoodsAttributeTemplateAttribute } from '@/goods/types'
import type { IUseRequestReturn } from '~/utils/request'

/**
 * 获取商品属性模板列表
 *
 * @api get /goods/attribute/template/list
 * @returns IUseRequestReturn<IGoodsAttributeTemplate[]>
 */
export function fetchGoodsAttributeTemplateList(): IUseRequestReturn<IGoodsAttributeTemplate[]> {
  return useRequest<IGoodsAttributeTemplate[]>({
    method: 'get',
    url: '/goods/attribute/template/list',
  })
}

/**
 * 获取商品属性模板详情
 *
 * @api get /goods/attribute/template/detail
 * @param id number
 * @returns IUseRequestReturn<IGoodsAttributeTemplate>
 */
export function fetchGoodsAttributeTemplateDetail(
  id: number,
): IUseRequestReturn<IGoodsAttributeTemplate> {
  return useRequest<IGoodsAttributeTemplate>({
    method: 'get',
    url: '/goods/attribute/template/detail',
    params: {
      id,
    },
  })
}

/**
 * 创建商品属性模板
 *
 * @api post /goods/attribute/template/create
 * @param data IFormData<IGoodsAttributeTemplate>
 * @returns Promise<any>
 */
export function createGoodsAttributeTemplate(
  data: IFormData<IGoodsAttributeTemplate>,
): Promise<any> {
  return usePromiseRequest({
    method: 'post',
    url: '/goods/attribute/template/create',
    data,
  })
}

/**
 * 更新商品属性模板
 *
 * @api put /goods/attribute/template/update
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
    url: '/goods/attribute/template/update',
    data,
    params: {
      id,
    },
  })
}

/**
 * 删除商品属性模板
 *
 * @api delete /goods/attribute/template/delete
 * @param id number
 * @returns Promise<any>
 */
export function deleteGoodsAttributeTemplate(id: number): Promise<any> {
  return usePromiseRequest({
    method: 'delete',
    url: '/goods/attribute/template/delete',
    params: {
      id,
    },
  })
}

/**
 * 获取商品属性模板属性列表
 *
 * @api get /goods/attribute/list
 * @param templateId number
 * @returns IUseRequestReturn<IGoodsAttributeTemplateAttribute[]>
 */
export function fetchGoodsAttributeList(
  templateId: number,
): IUseRequestReturn<IGoodsAttributeTemplateAttribute[]> {
  return useRequest<IGoodsAttributeTemplateAttribute[]>({
    method: 'get',
    url: '/goods/attribute/list',
    params: {
      templateId,
    },
  })
}

/**
 * 获取商品属性模板属性详情
 *
 * @api get /goods/attribute/detail
 * @param id number
 * @returns IUseRequestReturn<IGoodsAttributeTemplateAttribute>
 */
export function fetchGoodsAttributeDetail(
  id: number,
): IUseRequestReturn<IGoodsAttributeTemplateAttribute> {
  return useRequest<IGoodsAttributeTemplateAttribute>({
    method: 'get',
    url: '/goods/attribute/detail',
    params: {
      id,
    },
  })
}

/**
 * 创建商品属性模板属性
 *
 * @api post /goods/attribute/create
 * @param data IFormData<IGoodsAttributeTemplateAttribute>
 * @returns Promise<any>
 */
export function createGoodsAttribute(
  data: IFormData<IGoodsAttributeTemplateAttribute>,
): Promise<any> {
  return usePromiseRequest({
    method: 'post',
    url: '/goods/attribute/create',
    data,
  })
}

/**
 * 更新商品属性模板属性
 *
 * @api put /goods/attribute/update
 * @param id IGoodsAttributeTemplateAttribute['id']
 * @param data IFormData<IGoodsAttributeTemplateAttribute>
 * @returns Promise<any>
 */
export function updateGoodsAttribute(
  id: IGoodsAttributeTemplateAttribute['id'],
  data: IFormData<IGoodsAttributeTemplateAttribute>,
): Promise<any> {
  return usePromiseRequest({
    method: 'put',
    url: '/goods/attribute/update',
    data,
    params: {
      id,
    },
  })
}

/**
 * 删除商品属性模板属性
 *
 * @api delete /goods/attribute/delete
 * @param id number
 * @returns Promise<any>
 */
export function deleteGoodsAttribute(id: number): Promise<any> {
  return usePromiseRequest({
    method: 'delete',
    url: '/goods/attribute/delete',
    params: {
      id,
    },
  })
}
