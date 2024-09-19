import type { IApiResponse } from '@xiaoshop/shared'

import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'

import { ApiResponse } from '~/common'

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, IApiResponse<T>> {
  intercept(_: ExecutionContext, next: CallHandler<T>): Observable<IApiResponse<T>> {
    return next
      .handle()
      .pipe(
        map(data => (new ApiResponse<T>(data))),
      )
  }
}
