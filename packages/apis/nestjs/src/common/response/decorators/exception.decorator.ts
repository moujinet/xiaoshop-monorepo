import { applyDecorators } from '@nestjs/common'
import { ApiResponse, getSchemaPath } from '@nestjs/swagger'
import { ApiErrorResponse } from '~/common/response'

interface IApiExceptionResponseOptions {
  code: number
  message: string
  description?: string
}

export function ApiExceptionResponse(options: IApiExceptionResponseOptions) {
  const properties: any = {
    code: {
      type: 'number',
      example: options.code,
    },
    message: {
      type: 'string',
      example: options.message,
    },
  }

  return applyDecorators(
    ApiResponse({
      status: options.code,
      description: options.description || options.message,
      schema: {
        allOf: [
          { $ref: getSchemaPath(ApiErrorResponse) },
          {
            properties,
          },
        ],
      },
    }),
  )
}
