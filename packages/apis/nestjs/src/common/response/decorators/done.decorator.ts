import { applyDecorators } from '@nestjs/common'
import { ApiResponse, getSchemaPath } from '@nestjs/swagger'
import { ApiDoneResponse as ApiDoneResponseSchema } from '~/common/response'

export function ApiDoneResponse(description: string = '请求成功') {
  return applyDecorators(
    ApiResponse({
      status: 0,
      description,
      schema: {
        allOf: [
          { $ref: getSchemaPath(ApiDoneResponseSchema) },
        ],
      },
    }),
  )
}
