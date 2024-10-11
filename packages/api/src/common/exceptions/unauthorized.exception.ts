import { HttpException, HttpStatus } from '@nestjs/common'

/**
 * 未授权错误 - 1005
 *
 * @see {@link https://docs.nestjs.com/exception-filters#built-in-http-exceptions}
 */
export class UnauthorizedException extends HttpException {
  constructor(
    public readonly message: string,
    public readonly error?: string,
    public readonly code: number = 1005,
  ) {
    super(message, HttpStatus.UNAUTHORIZED, { description: error })
  }
}
