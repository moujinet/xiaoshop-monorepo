/**
 * API 响应结构
 */
export interface IApiResponse<T = any> {
  code: number
  message: string
  error?: string
  data?: T
}

/**
 * 分页数据响应结构
 */
export interface IApiPaginationData<T = any> {
  list: T[]
  total: number
  page: number
  pagesize: number
}

/**
 * 分页 API 响应结构
 */
export type IApiPaginationResponse<T = any> = IApiResponse<IApiPaginationData<T>>
