import type {
  ILogisticsFreightTemplate,
  ILogisticsFreightTemplateDict,
  ILogisticsFreightTemplateListItem,
} from '@xiaoshop/schema'
import type { IUseRequestReturn } from '~/utils/request'

/**
 * 获取物流运费模板列表
 *
 * @api get /admin/logistics/freight-template/list
 * @returns IUseRequestReturn<ILogisticsFreightTemplateListItem[]>
 */
export function fetchFreightTemplateList(): IUseRequestReturn<ILogisticsFreightTemplateListItem[]> {
  return useRequest<ILogisticsFreightTemplateListItem[]>({
    method: 'get',
    url: '/admin/logistics/freight-template/list',
  })
}

/**
 * 获取物流运费模板字典列表
 *
 * @api get /admin/logistics/freight-template/dict/list
 * @returns IUseRequestReturn<ILogisticsFreightTemplateDict[]>
 */
export function fetchFreightTemplateDictList(): IUseRequestReturn<ILogisticsFreightTemplateDict[]> {
  return useRequest<ILogisticsFreightTemplateDict[]>({
    method: 'get',
    url: '/admin/logistics/freight-template/dict/list',
  })
}

/**
 * 获取物流运费模板详情
 *
 * @api get /admin/logistics/freight-template/detail
 * @param id number
 * @returns IUseRequestReturn<ILogisticsFreightTemplate>
 */
export function fetchFreightTemplateDetail(id: number): IUseRequestReturn<ILogisticsFreightTemplate> {
  return useRequest<ILogisticsFreightTemplate>({
    method: 'get',
    url: '/admin/logistics/freight-template/detail',
    params: {
      id,
    },
  })
}

/**
 * 创建物流运费模板
 *
 * @api post /admin/logistics/freight-template/create
 * @param data IFormData<ILogisticsFreightTemplate>
 * @returns Promise<any>
 */
export function createFreightTemplate(
  data: IFormData<ILogisticsFreightTemplate>,
): Promise<any> {
  return usePromiseRequest({
    method: 'post',
    url: '/admin/logistics/freight-template/create',
    data,
  })
}

/**
 * 更新物流运费模板
 *
 * @api put /admin/logistics/freight-template/update
 * @param id ILogisticsFreightTemplate['id']
 * @param data IFormData<ILogisticsFreightTemplate>
 * @returns Promise<any>
 */
export function updateFreightTemplate(
  id: ILogisticsFreightTemplate['id'],
  data: IFormData<ILogisticsFreightTemplate>,
): Promise<any> {
  return usePromiseRequest({
    method: 'put',
    url: '/admin/logistics/freight-template/update',
    data,
    params: {
      id,
    },
  })
}

/**
 * 删除物流运费模板
 *
 * @api delete /admin/logistics/freight-template/delete
 * @param id ILogisticsFreightTemplate['id']
 * @returns Promise<any>
 */
export function deleteFreightTemplate(id: ILogisticsFreightTemplate['id']): Promise<any> {
  return usePromiseRequest({
    method: 'delete',
    url: '/admin/logistics/freight-template/delete',
    data: {
      id,
    },
  })
}
