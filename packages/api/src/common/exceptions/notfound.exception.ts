import { HttpException } from '@nestjs/common'

export const EXCEPTION_NOT_FOUND = 1002
export const EXCEPTION_NOT_FOUND_MESSAGE = '#NAME#不存在'

/**
 * 数据不存在
 *
 * @see {@link https://docs.nestjs.com/exception-filters#custom-exceptions}
 */
export class NotFoundException extends HttpException {
  constructor(
    name: string = '数据',
    error?: string,
    code: number = EXCEPTION_NOT_FOUND,
  ) {
    super(
      EXCEPTION_NOT_FOUND_MESSAGE.replaceAll('#NAME#', name),
      code,
      { description: error },
    )
  }
}
