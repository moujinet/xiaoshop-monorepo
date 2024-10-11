import { HttpException, HttpStatus } from '@nestjs/common'

/**
 * 禁止访问错误 - 1004
 *
 * @see {@link https://docs.nestjs.com/exception-filters#built-in-http-exceptions}
 */
export class ForbiddenException extends HttpException {
  constructor(
    public readonly message: string,
    public readonly error?: string,
    public readonly code: number = 1004,
  ) {
    super(message, HttpStatus.FORBIDDEN, { description: error })
  }
}
