import type { IApiResponse } from './response'

/**
 * 分页数据响应结构
 */
export interface IApiPaginationData<T = any> {
  result: T[]
  total: number
  page: number
  pagesize: number
}

/**
 * 分页 API 响应结构
 */
export type IApiPaginationResponse<T = any> = IApiResponse<IApiPaginationData<T>>
