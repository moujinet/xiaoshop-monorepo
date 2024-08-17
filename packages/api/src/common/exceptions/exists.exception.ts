import { HttpException } from '@nestjs/common'

export const EXCEPTION_EXISTS = 1003
export const EXCEPTION_EXISTS_MESSAGE = '#NAME#已存在'

/**
 * 数据已存在
 *
 * @see {@link https://docs.nestjs.com/exception-filters#custom-exceptions}
 */
export class ExistsException extends HttpException {
  constructor(
    name: string = '数据',
    error?: string,
    code: number = EXCEPTION_EXISTS,
  ) {
    super(
      EXCEPTION_EXISTS_MESSAGE.replaceAll('#NAME#', name),
      code,
      { description: error },
    )
  }
}
