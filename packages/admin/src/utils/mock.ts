import Mock from 'mockjs'
import qs from 'query-string'
import { IS_DEBUG_MODE } from '~/constants/env'
import type { IApiResponse, IMockDefinition, IMockSetup } from '~/types'

/**
 * 定义 Mock 封装
 *
 * @example
 * ```
 * defineMocks({
 *   '/path/to/api': () => {},
 *   '/path/to/other-api': ({ url, body, query }) => {},
 * })
 * ```
 *
 * @param definitions IMockDefinition
 * @returns IMockSetup
 */
export function defineMocks(definitions: IMockDefinition): IMockSetup {
  return () => {
    Object.entries(definitions).forEach(([requestUrl, fn]) => {
      // eslint-disable-next-line no-console
      console.log('🚦', `"${requestUrl}"`, 'api mocked')

      Mock.mock(new RegExp(requestUrl), ({ url, body }) => fn({
        url,
        body: JSON.parse(body || '{}'),
        query: qs.parseUrl(url).query,
      }))
    })
  }
}

/**
 * 加载全部 Mock
 */
export function loadMocks() {
  if (!IS_DEBUG_MODE)
    return

  Object.values(import.meta.glob<IMockSetup>('~/modules/**/apis/_mocks/*.mock.ts', {
    eager: true,
    import: 'default',
  }),
  ).forEach(
    setup => setup(),
  )
}

/**
 * 封装 Mock 响应
 *
 * @param data unknown
 * @param message string
 * @param code number
 * @returns IApiResponse
 */
export function responseMock(data?: unknown, message = 'ok', code = 0): IApiResponse {
  return {
    code,
    data,
    message,
  }
}
