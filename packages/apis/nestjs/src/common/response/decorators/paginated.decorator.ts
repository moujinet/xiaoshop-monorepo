import { Type, applyDecorators } from '@nestjs/common'
import { ApiExtraModels, ApiResponse, getSchemaPath } from '@nestjs/swagger'
import { ApiResponse as ApiResponseData } from '~/common/response'

export function ApiPaginatedResponse<TModel extends Type<any>>(model: TModel) {
  return applyDecorators(
    ApiExtraModels(ApiResponseData, model),
    ApiResponse({
      status: 0,
      description: '请求成功',
      schema: {
        allOf: [
          { $ref: getSchemaPath(ApiResponseData) },
          {
            properties: {
              data: {
                properties: {
                  page: {
                    type: 'number',
                    example: 1,
                  },
                  pagesize: {
                    type: 'number',
                    example: 10,
                  },
                  total: {
                    type: 'number',
                    example: 10,
                  },
                  result: {
                    type: 'array',
                    items: { $ref: getSchemaPath(model) },
                  },
                },
              },
            },
          },
        ],
      },
    }),
  )
}
