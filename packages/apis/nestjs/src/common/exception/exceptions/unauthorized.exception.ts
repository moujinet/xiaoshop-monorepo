import { UnauthorizedException as NestUnauthorizedException } from '@nestjs/common'

export const EXCEPTION_UNAUTHORIZED = 1005
export const EXCEPTION_UNAUTHORIZED_MESSAGE = '请求未授权'

/**
 * 请求未授权
 *
 * @see {@link https://docs.nestjs.com/exception-filters#custom-exceptions}
 */
export class UnauthorizedException extends NestUnauthorizedException {
  constructor(
    error?: string,
  ) {
    super(EXCEPTION_UNAUTHORIZED_MESSAGE, { description: error })
  }
}
