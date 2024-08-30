import { HttpException } from '@nestjs/common'

export const EXCEPTION_UNAUTHORIZED = 1005
export const EXCEPTION_UNAUTHORIZED_MESSAGE = '请求未授权'

/**
 * 请求未授权 - 1005
 *
 * @see {@link https://docs.nestjs.com/exception-filters#custom-exceptions}
 */
export class UnauthorizedException extends HttpException {
  constructor(
    error?: string,
  ) {
    super(
      EXCEPTION_UNAUTHORIZED_MESSAGE,
      EXCEPTION_UNAUTHORIZED,
      { description: error },
    )
  }
}
