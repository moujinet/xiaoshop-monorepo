import { applyDecorators, Type } from '@nestjs/common'
import { ApiExtraModels, ApiResponse, getSchemaPath } from '@nestjs/swagger'

import { ApiResponse as ApiResponseData } from '~/common'

export function ApiObjectResponse<TModel extends Type<any>>(model: TModel) {
  return applyDecorators(
    ApiExtraModels(ApiResponseData, model),
    ApiResponse({
      status: 200,
      description: '请求成功',
      schema: {
        allOf: [
          { $ref: getSchemaPath(ApiResponseData) },
          {
            properties: {
              data: {
                type: 'object',
                $ref: getSchemaPath(model),
              },
            },
          },
        ],
      },
    }),
  )
}
