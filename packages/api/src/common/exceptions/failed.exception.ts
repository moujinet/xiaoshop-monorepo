import { HttpException } from '@nestjs/common'

export const EXCEPTION_FAILED = 1004
export const EXCEPTION_FAILED_MESSAGE = '#NAME#失败'

/**
 * 操作失败
 *
 * @see {@link https://docs.nestjs.com/exception-filters#custom-exceptions}
 */
export class FailedException extends HttpException {
  constructor(
    name: string = '操作',
    error?: string,
    code: number = EXCEPTION_FAILED,
  ) {
    super(
      EXCEPTION_FAILED_MESSAGE.replaceAll('#NAME#', name),
      code,
      { description: error },
    )
  }
}
