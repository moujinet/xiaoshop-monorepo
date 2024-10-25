import { BadRequestException } from './bad-request.exception'

/**
 * 请求失败 - 1002
 *
 * @see {@link https://docs.nestjs.com/exception-filters#built-in-http-exceptions}
 */
export class FailedException extends BadRequestException {
  constructor(
    public readonly name: string,
    public readonly error?: string,
    public readonly code: number = 1002,
  ) {
    super(`${name}失败`, error, code)
  }
}
