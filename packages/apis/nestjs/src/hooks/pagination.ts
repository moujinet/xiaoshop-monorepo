import type { IApiPaginationData } from '@xiaoshop/schema'
import { SelectQueryBuilder } from 'typeorm'

/**
 * 查询分页结果
 *
 * @param query SelectQueryBuilder
 * @param page number
 * @param pagesize number
 * @returns Promise<IApiPaginationData>
 */
export async function useQueryPagination<T = any>(
  query: SelectQueryBuilder<T>,
  page: number,
  pagesize: number,
): Promise<IApiPaginationData<T>> {
  // 计算分页
  query.skip(pagesize * (page - 1)).take(pagesize)

  const [result, total] = await query.getManyAndCount()

  return {
    result,
    total,
    page,
    pagesize,
  }
}
