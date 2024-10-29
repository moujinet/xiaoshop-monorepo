import { BadRequestException } from './bad-request.exception'

/**
 * 已存在错误 - 1003
 *
 * @see {@link https://docs.nestjs.com/exception-filters#built-in-http-exceptions}
 */
export class ExistsException extends BadRequestException {
  constructor(
    public readonly message: string,
    public readonly error?: string,
    public readonly code: number = 1003,
  ) {
    message = `${message}已存在`

    super(message, error, code)
  }
}
