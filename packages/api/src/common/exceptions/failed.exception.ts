import { HttpException, HttpStatus } from '@nestjs/common'

/**
 * 请求失败 - 1002
 *
 * @see {@link https://docs.nestjs.com/exception-filters#built-in-http-exceptions}
 */
export class FailedException extends HttpException {
  constructor(
    public readonly message: string,
    public readonly error?: string,
    public readonly code: number = 1002,
  ) {
    message = `${message}失败`

    super(message, HttpStatus.OK, { description: error })
  }
}
