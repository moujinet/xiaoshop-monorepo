import type { IGoodsExportConditions, IGoodsExportListItem } from '@xiaoshop/schema'
import type { IUseRequestReturn } from '~/utils/request'

/**
 * 获取商品导出分页列表
 *
 * @api get /goods/export/pages
 * @returns IUseRequestReturn<IApiPaginationResult<IGoodsExportListItem>>
 */
export function fetchGoodsExportPages(): IUseRequestReturn<IApiPaginationResult<IGoodsExportListItem>> {
  return useRequest<IApiPaginationResult<IGoodsExportListItem>>({
    method: 'get',
    url: '/goods/export/pages',
  })
}

/**
 * 创建商品导出记录
 *
 * @api post /goods/export/create
 * @param data Partial<IGoodsExportConditions>
 * @returns Promise<any>
 */
export function createGoodsExport(
  data: Partial<IGoodsExportConditions>,
) {
  return usePromiseRequest<any>({
    method: 'post',
    url: '/goods/export/create',
    data,
  })
}

/**
 * 删除商品导出记录
 *
 * @api delete /goods/export/delete
 * @param id number
 * @returns Promise<any>
 */
export function deleteGoodsExport(id: number) {
  return usePromiseRequest<any>({
    method: 'delete',
    url: '/goods/export/delete',
    data: {
      id,
    },
  })
}
