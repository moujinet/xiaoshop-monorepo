import type { IGoodsGuarantee } from '@/goods/types'
import type { IUseRequestReturn } from '~/utils/request'

/**
 * 获取商品服务保障列表
 *
 * @api get /goods/guarantee/list
 * @returns IUseRequestReturn<IGoodsGuarantee[]>
 */
export function fetchGoodsGuaranteeList(): IUseRequestReturn<IGoodsGuarantee[]> {
  return useRequest<IGoodsGuarantee[]>({
    method: 'get',
    url: '/goods/guarantee/list',
  })
}

/**
 * 获取商品服务保障详情
 *
 * @api get /goods/guarantee/detail
 * @param id number
 * @returns IUseRequestReturn<IGoodsGuarantee>
 */
export function fetchGoodsGuaranteeDetail(id: number): IUseRequestReturn<IGoodsGuarantee> {
  return useRequest<IGoodsGuarantee>({
    method: 'get',
    url: '/goods/guarantee/detail',
    params: {
      id,
    },
  })
}

/**
 * 创建商品服务保障
 *
 * @api post /goods/guarantee/create
 * @param data IFormData<IGoodsGuarantee>
 * @returns Promise<any>
 */
export function createGoodsGuarantee(
  data: IFormData<IGoodsGuarantee>,
): Promise<any> {
  return usePromiseRequest({
    method: 'post',
    url: '/goods/guarantee/create',
    data,
  })
}

/**
 * 更新商品服务保障
 *
 * @api put /goods/guarantee/update
 * @param id IGoodsGuarantee['id']
 * @param data IFormData<IGoodsGuarantee>
 * @returns Promise<any>
 */
export function updateGoodsGuarantee(
  id: IGoodsGuarantee['id'],
  data: IFormData<IGoodsGuarantee>,
): Promise<any> {
  return usePromiseRequest({
    method: 'put',
    url: '/goods/guarantee/update',
    data,
    params: {
      id,
    },
  })
}

/**
 * 删除商品服务保障
 *
 * @api delete /goods/guarantee/delete
 * @param id number`
 * @returns Promise<any>
 */
export function deleteGoodsGuarantee(id: number): Promise<any> {
  return usePromiseRequest({
    method: 'delete',
    url: '/goods/guarantee/delete',
    data: {
      id,
    },
  })
}
