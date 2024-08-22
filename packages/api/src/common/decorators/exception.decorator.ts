import { applyDecorators } from '@nestjs/common'
import { ApiResponse, getSchemaPath } from '@nestjs/swagger'
import { ApiErrorResponse } from '~/common'
import {
  EXCEPTION_BAD_REQUEST,
  EXCEPTION_BAD_REQUEST_MESSAGE,
  EXCEPTION_EXISTS,
  EXCEPTION_EXISTS_MESSAGE,
  EXCEPTION_FAILED,
  EXCEPTION_FAILED_MESSAGE,
  EXCEPTION_NOT_FOUND,
  EXCEPTION_NOT_FOUND_MESSAGE,
  EXCEPTION_UNAUTHORIZED,
  EXCEPTION_UNAUTHORIZED_MESSAGE,
} from '~/common/exceptions'

interface IApiExceptionResponseOptions {
  description?: string
}

/**
 * EXCEPTION_EXISTS
 */
export function ApiExistsExceptionResponse(options: IApiExceptionResponseOptions) {
  const properties: any = {
    code: {
      type: 'number',
      example: EXCEPTION_EXISTS,
    },
    message: {
      type: 'string',
      example: options.description || EXCEPTION_EXISTS_MESSAGE,
    },
  }

  return applyDecorators(
    ApiResponse({
      status: EXCEPTION_EXISTS,
      description: options.description || EXCEPTION_EXISTS_MESSAGE,
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

/**
 * EXCEPTION_FAILED
 */
export function ApiFailedExceptionResponse(options: IApiExceptionResponseOptions) {
  const properties: any = {
    code: {
      type: 'number',
      example: EXCEPTION_FAILED,
    },
    message: {
      type: 'string',
      example: options.description || EXCEPTION_FAILED_MESSAGE,
    },
  }

  return applyDecorators(
    ApiResponse({
      status: EXCEPTION_FAILED,
      description: options.description || EXCEPTION_FAILED_MESSAGE,
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

/**
 * EXCEPTION_NOT_FOUND
 */
export function ApiNotFoundExceptionResponse(options: IApiExceptionResponseOptions) {
  const properties: any = {
    code: {
      type: 'number',
      example: EXCEPTION_NOT_FOUND,
    },
    message: {
      type: 'string',
      example: options.description || EXCEPTION_NOT_FOUND_MESSAGE,
    },
  }

  return applyDecorators(
    ApiResponse({
      status: EXCEPTION_NOT_FOUND,
      description: options.description || EXCEPTION_NOT_FOUND_MESSAGE,
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

/**
 * EXCEPTION_BAD_REQUEST
 */
export function ApiBadRequestExceptionResponse(options: IApiExceptionResponseOptions) {
  const properties: any = {
    code: {
      type: 'number',
      example: EXCEPTION_BAD_REQUEST,
    },
    message: {
      type: 'string',
      example: options.description || EXCEPTION_BAD_REQUEST_MESSAGE,
    },
  }

  return applyDecorators(
    ApiResponse({
      status: EXCEPTION_BAD_REQUEST,
      description: options.description || EXCEPTION_BAD_REQUEST_MESSAGE,
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

/**
 * EXCEPTION_UNAUTHORIZED
 */
export function ApiUnauthorizedExceptionResponse(options: IApiExceptionResponseOptions) {
  const properties: any = {
    code: {
      type: 'number',
      example: EXCEPTION_UNAUTHORIZED,
    },
    message: {
      type: 'string',
      example: options.description || EXCEPTION_UNAUTHORIZED_MESSAGE,
    },
  }

  return applyDecorators(
    ApiResponse({
      status: EXCEPTION_UNAUTHORIZED,
      description: options.description || EXCEPTION_UNAUTHORIZED_MESSAGE,
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
