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
export function exceptionFactory(errors: string | ValidationError[]) {
  const error = Array.isArray(errors) ? extractErrorMessages(errors) : errors

  const message = error instanceof Object
    ? error.pop()
    : error

  return new BadRequestException('请求参数错误', message)
}

function extractErrorMessages(errors: ValidationError[]): string[] {
  const messages: string[] = []

  errors.forEach((error) => {
    if (error.constraints) {
      messages.push(...Object.values(error.constraints))
    }
    if (error.children && error.children.length > 0) {
      messages.push(...extractErrorMessages(error.children))
    }
  })

  return messages
}
