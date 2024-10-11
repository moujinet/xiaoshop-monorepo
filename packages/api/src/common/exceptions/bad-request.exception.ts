import { ValidationError } from 'class-validator'
import { HttpException, HttpStatus } from '@nestjs/common'

/**
 * 请求参数错误 - 1001
 *
 * @see {@link https://docs.nestjs.com/exception-filters#built-in-http-exceptions}
 */
export class BadRequestException extends HttpException {
  constructor(
    public readonly message: string,
    public readonly error?: string,
    public readonly code: number = 1001,
  ) {
    super(message, HttpStatus.BAD_REQUEST, { description: error })
  }
}

/**
 * 数据校验错误
 *
 * @param errors 错误栈
 * @returns BadRequestException
 */
export function exceptionFactory(errors: ValidationError[]) {
  const error = errors.shift()
  const message = error.constraints[Object.keys(error.constraints)[0]]

  return new BadRequestException('请求参数错误', message)
}