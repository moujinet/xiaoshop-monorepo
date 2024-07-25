import type { IApiResponse } from '@xiaoshop/schema'
import { ApiProperty } from '@nestjs/swagger'

/**
 * API 响应
 */
export class ApiResponse<T> implements IApiResponse {
  /**
   * 响应数据
   */
  @ApiProperty({ description: '响应数据' })
  data?: T

  /**
   * 响应消息
   */
  @ApiProperty({ description: '响应消息', default: 'ok' })
  message: string

  /**
   * 响应码
   */
  @ApiProperty({ description: '响应码', default: 0 })
  code: number

  constructor(
    data: T,
    message: string = 'ok',
    code: number = 0,
  ) {
    this.data = data
    this.message = message
    this.code = code
  }
}

/**
 * API 错误
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
  @ApiProperty({ description: '响应消息', example: 'error' })
  message: string

  /**
   * 响应码
   */
  @ApiProperty({ description: '响应码', example: 0 })
  code: number

  /**
   * 错误信息
   */
  @ApiProperty({ description: '错误信息', example: '' })
  error?: string
}

/**
 * API 成功
 */
export class ApiDoneResponse implements IApiResponse {
  /**
   * 响应消息
   */
  @ApiProperty({ description: '响应消息', example: 'ok' })
  message: string

  /**
   * 响应码
   */
  @ApiProperty({ description: '响应码', example: 0 })
  code: number
}
