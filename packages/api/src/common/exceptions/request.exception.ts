import { HttpException, ValidationError } from '@nestjs/common'

export const EXCEPTION_BAD_REQUEST = 1001
export const EXCEPTION_BAD_REQUEST_MESSAGE = '请求参数错误'

/**
 * 请求参数错误
 *
 * @see {@link https://docs.nestjs.com/exception-filters#custom-exceptions}
 */
export class BadRequestException extends HttpException {
  constructor(
    message: string = EXCEPTION_BAD_REQUEST_MESSAGE,
    error?: string,
    code: number = EXCEPTION_BAD_REQUEST,
  ) {
    super(message, code, { description: error })
  }
}

/**
 * ValidationPipe 自定义异常
 *
 * @param errors ValidationError[]
 * @returns BadRequestException
 */
export function exceptionFactory(errors: string | ValidationError[]) {
  const error = Array.isArray(errors)
    ? errors[0].toString()
    : errors

  return new BadRequestException(EXCEPTION_BAD_REQUEST_MESSAGE, error)
}
