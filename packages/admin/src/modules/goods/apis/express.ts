import type { IExpressCompany, IExpressPostman, IExpressTemplate } from '@/goods/types/express'
import type { IUseRequestReturn } from '~/utils/request'

/**
 * 获取快递公司列表
 *
 * @api get /express/company/list
 * @returns IUseRequestReturn<IExpressCompany>
 */
export function fetchExpressCompanyList(): IUseRequestReturn<IExpressCompany[]> {
  return useRequest<IExpressCompany[]>({
    url: '/express/company/list',
    method: 'get',
  })
}

/**
 * 获取快递公司详情
 *
 * @api get /express/company/detail
 * @param id IExpressCompany['id']
 * @returns IUseRequestReturn<IExpressCompany>
 */
export function fetchExpressCompanyDetail(id: IExpressCompany['id']): IUseRequestReturn<IExpressCompany> {
  return useRequest<IExpressCompany>({
    url: '/express/company/detail',
    method: 'get',
    params: {
      id,
    },
  })
}

/**
 * 创建快递公司
 *
 * @api post /express/company/create
 * @param data IFormData<IExpressCompany>
 * @returns Promise<any>
 */
export function createExpressCompany(data: IFormData<IExpressCompany>): Promise<any> {
  return usePromiseRequest<IExpressCompany>({
    url: '/express/company/create',
    method: 'post',
    data,
  })
}

/**
 * 更新快递公司
 *
 * @api put /express/company/update
 * @param id IExpressCompany['id']
 * @param data IFormData<IExpressCompany>
 * @returns Promise<any>
 */
export function updateExpressCompany(
  id: IExpressCompany['id'],
  data: IFormData<IExpressCompany>,
): Promise<any> {
  return usePromiseRequest<IExpressCompany>({
    url: '/express/company/update',
    method: 'put',
    data,
    params: {
      id,
    },
  })
}

/**
 * 删除快递公司
 *
 * @api delete /express/company/delete
 * @param id IExpressCompany['id']
 * @returns Promise<any>
 */
export function deleteExpressCompany(id: IExpressCompany['id']): Promise<any> {
  return usePromiseRequest({
    method: 'delete',
    url: '/express/company/delete',
    data: {
      id,
    },
  })
}

/**
 * 获取运费模板列表
 *
 * @api get /express/template/list
 * @returns IUseRequestReturn<IExpressTemplate[]>
 */
export function fetchExpressTemplateList(): IUseRequestReturn<IExpressTemplate[]> {
  return useRequest<IExpressTemplate[]>({
    url: '/express/template/list',
    method: 'get',
  })
}

/**
 * 获取运费模板详情
 *
 * @api get /express/template/detail
 * @param id IExpressTemplate['id']
 * @returns IUseRequestReturn<IExpressTemplate>
 */
export function fetchExpressTemplateDetail(id: IExpressTemplate['id']): IUseRequestReturn<IExpressTemplate> {
  return useRequest<IExpressTemplate>({
    url: '/express/template/detail',
    method: 'get',
    params: {
      id,
    },
  })
}

/**
 * 创建运费模板
 *
 * @api post /express/template/create
 * @param data IFormData<IExpressTemplate>
 * @returns Promise<any>
 */
export function createExpressTemplate(data: IFormData<IExpressTemplate>): Promise<any> {
  return usePromiseRequest<IExpressTemplate>({
    url: '/express/template/create',
    method: 'post',
    data,
  })
}

/**
 * 更新运费模板
 *
 * @api put /express/template/update
 * @param id IExpressTemplate['id']
 * @param data IFormData<IExpressTemplate>
 * @returns Promise<any>
 */
export function updateExpressTemplate(
  id: IExpressTemplate['id'],
  data: IFormData<IExpressTemplate>,
): Promise<any> {
  return usePromiseRequest<IExpressTemplate>({
    url: '/express/template/update',
    method: 'put',
    data,
    params: {
      id,
    },
  })
}

/**
 * 删除运费模板
 *
 * @api delete /express/template/delete
 * @param id IExpressTemplate['id']
 * @returns Promise<any>
 */
export function deleteExpressTemplate(id: IExpressTemplate['id']): Promise<any> {
  return usePromiseRequest({
    method: 'delete',
    url: '/express/template/delete',
    data: {
      id,
    },
  })
}

/**
 * 获取配送员列表
 *
 * @api get /express/postman/list
 * @returns IUseRequestReturn<IExpressPostman[]>
 */
export function fetchExpressPostmanList(): IUseRequestReturn<IExpressPostman[]> {
  return useRequest<IExpressPostman[]>({
    url: '/express/postman/list',
    method: 'get',
  })
}

/**
 * 获取配送员详情
 *
 * @api get /express/postman/detail
 * @param id IExpressPostman['id']
 * @returns IUseRequestReturn<IExpressPostman>
 */
export function fetchExpressPostmanDetail(id: IExpressPostman['id']): IUseRequestReturn<IExpressPostman> {
  return useRequest<IExpressPostman>({
    url: '/express/postman/detail',
    method: 'get',
    params: {
      id,
    },
  })
}

/**
 * 创建配送员
 *
 * @api post /express/postman/create
 * @param data IFormData<IExpressPostman>
 * @returns Promise<any>
 */
export function createExpressPostman(data: IFormData<IExpressPostman>): Promise<any> {
  return usePromiseRequest<IExpressPostman>({
    url: '/express/postman/create',
    method: 'post',
    data,
  })
}

/**
 * 更新配送员
 *
 * @api put /express/postman/update
 * @param id IExpressPostman['id']
 * @param data IFormData<IExpressPostman>
 * @returns Promise<any>
 */
export function updateExpressPostman(
  id: IExpressPostman['id'],
  data: IFormData<IExpressPostman>,
): Promise<any> {
  return usePromiseRequest<IExpressPostman>({
    url: '/express/postman/update',
    method: 'put',
    data,
    params: {
      id,
    },
  })
}

/**
 * 删除配送员
 *
 * @api delete /express/postman/delete
 * @param id IExpressPostman['id']
 * @returns Promise<any>
 */
export function deleteExpressPostman(id: IExpressPostman['id']): Promise<any> {
  return usePromiseRequest({
    method: 'delete',
    url: '/express/postman/delete',
    data: {
      id,
    },
  })
}
