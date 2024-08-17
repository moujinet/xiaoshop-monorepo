/**
 * API 响应结构
 */
export interface IApiResponse<T = any> {
  code: number
  message: string
  error?: string
  data?: T
}
