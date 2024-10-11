import { DEFAULT_PAGESIZE, MAX_PAGESIZE } from '~/common/constants'

export interface IPaginationReturn {
  skip: number
  take: number
}

/**
 * 转换分页参数
 *
 * @param page 当前页码
 * @param pagesize 分页大小
 * @returns IPaginationReturn
 */
export function toPaginationParams(
  page: number,
  pagesize = DEFAULT_PAGESIZE,
): IPaginationReturn {
  pagesize = Math.min(pagesize, MAX_PAGESIZE)

  return {
    skip: (page - 1) * pagesize,
    take: pagesize,
  }
}
