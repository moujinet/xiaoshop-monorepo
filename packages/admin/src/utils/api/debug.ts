import type { AxiosResponse } from 'axios'

/**
 * 打印 API 请求调试信息
 *
 * @param response AxiosResponse
 */
export function handleRequestDebugInfo(response: AxiosResponse) {
  debug('API', 'REQUEST', {
    url: response.config.url,
    method: response.config.method,
    params: response.config.params,
    data: response.config.data,
    result: response.data,
  })
}
