import { HttpException, HttpStatus } from '@nestjs/common'

/**
 * 未找到错误 - 1000
 *
 * @see {@link https://docs.nestjs.com/exception-filters#built-in-http-exceptions}
 */
export class NotFoundException extends HttpException {
  constructor(
    public readonly message: string,
    public readonly error?: string,
    public readonly code: number = 1000,
  ) {
    super(message, HttpStatus.OK, { description: error })
  }
}
