import { isArray } from 'es-toolkit/compat'
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common'

@Injectable()
@Catch()
export class ExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse()

    let code: number = exception.code || 0
    let error: string = exception.error
    let message: string = exception.message
    let status: number = HttpStatus.INTERNAL_SERVER_ERROR

    if (exception instanceof HttpException) {
      status = exception.getStatus()

      const exceptionResponse = exception.getResponse()

      if (isArray(exceptionResponse))
        message = exceptionResponse[0]
      else
        message = exception.message

      if (status === HttpStatus.NOT_FOUND) {
        code = 1000
        error = message
        message = '请求资源不存在'
      }
    }

    response
      .status(status)
      .json({
        message,
        error,
        code,
      })
  }
}
