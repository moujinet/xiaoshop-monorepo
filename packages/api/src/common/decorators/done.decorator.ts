import { applyDecorators } from '@nestjs/common'
import { ApiResponse, getSchemaPath } from '@nestjs/swagger'

import { ApiDoneResponse as ApiDoneResponseSchema } from '~/common'

export function ApiDoneResponse(description: string = '请求成功') {
  return applyDecorators(
    ApiResponse({
      status: 200,
      description,
      schema: {
        allOf: [
          { $ref: getSchemaPath(ApiDoneResponseSchema) },
        ],
      },
    }),
  )
}
