import type { IApiResponse } from '@xiaoshop/shared'

/**
 * API 响应
 */
export class ApiResponse<T> implements IApiResponse {
  constructor(
    data: T,
    message: string = 'ok',
    code: number = 0,
  ) {
    this.data = data
    this.message = message
    this.code = code
  }

  /**
   * 响应数据
   */
  readonly data?: T

  /**
   * 响应消息
   */
  readonly message: string

  /**
   * 响应码
   */
  readonly code: number
}

/**
 * API 错误响应
 */
export class ApiErrorResponse implements IApiResponse {
  constructor(
    message: string = 'error',
    code: number = 0,
    error?: string,
  ) {
    this.message = message
    this.code = code
    this.error = error
  }

  /**
   * 响应消息
   */
  readonly message: string

  /**
   * 响应码
   */
  readonly code: number

  /**
   * 错误信息
   */
  readonly error?: string
}

/**
 * API 成功响应
 */
export class ApiDoneResponse implements IApiResponse {
  /**
   * 响应消息
   */
  readonly message: string

  /**
   * 响应码
   */
  readonly code: number
}
