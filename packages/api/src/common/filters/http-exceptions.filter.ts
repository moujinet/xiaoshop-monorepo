import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common'
import { ApiErrorResponse } from '~/common'

@Catch(HttpException)
export class HttpExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse()
    const status = exception.getStatus()
    const exceptionResponse = exception.getResponse()

    response
      .status(200)
      .json(
        new ApiErrorResponse(
          exceptionResponse?.message
            ? Array.isArray(exceptionResponse.message) ? exceptionResponse.message[0] : exceptionResponse.message
            : exception.message || '未知错误',
          status,
          exception.options?.description,
        ),
      )
  }
}
