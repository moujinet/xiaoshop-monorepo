import { applyDecorators } from '@nestjs/common'
import { ApiResponse, getSchemaPath } from '@nestjs/swagger'

import { ApiResponse as CommonApiResponse } from '~/common'

export function ApiAnyResponse<T>(data: T) {
  return applyDecorators(
    ApiResponse({
      status: 200,
      description: '请求成功',
      schema: {
        allOf: [
          { $ref: getSchemaPath(CommonApiResponse) },
          {
            properties: {
              data: {
                type: typeof data,
                example: data,
              },
            },
          },
        ],
      },
    }),
  )
}
