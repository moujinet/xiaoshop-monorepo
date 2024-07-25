import type { InternalAxiosRequestConfig } from 'axios'
import { API_BASE_URL, API_REQUEST_TIMEOUT } from '~/constants/env'

/**
 * 配置请求 URL
 *
 * @param config InternalAxiosRequestConfig
 * @returns InternalAxiosRequestConfig
 */
export function handleConfigureBaseUrl(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
  config.baseURL = API_BASE_URL
  config.timeout = API_REQUEST_TIMEOUT
  config.headers.Accept = 'application/json'

  return config
}

/**
 * 配置 Authorization 请求头
 *
 * @param config InternalAxiosRequestConfig
 * @returns InternalAxiosRequestConfig
 */
export function handleConfigureAuthHeaders(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
  const { token } = useToken()

  config.headers = Object.assign(config.headers || {}, {
    Authorization: token.value,
  })

  return config
}

/**
 * 拦截 API 响应错误
 *
 * @param code number
 * @param message string
 * @returns boolean
 */
export function handleApiErrorResponse(code: number, message: string): boolean {
  if (code !== 0) {
    useMessage().error(message)
    return false
  }

  return true
}

/**
 * 拦截网络错误
 *
 * @param httpStatus number
 * @returns boolean
 */
export function handleNetworkError(httpStatus?: number): boolean {
  const networkErrors: Record<string, string> = {
    400: '错误的请求 (400)',
    401: '未授权，请重新登录 (401)',
    403: '拒绝访问 (403)',
    404: '请求错误，未找到该资源 (404)',
    405: '请求方法未允许 (405)',
    408: '请求超时 (408)',
    500: '服务器端出错 (500)',
    501: '网络未实现 (501)',
    502: '网络错误 (502)',
    503: '服务不可用 (503)',
    504: '网络超时 (504)',
  }

  if (httpStatus && networkErrors[httpStatus]) {
    useNotification().error({
      title: '网络错误',
      content: networkErrors[httpStatus],
    })

    return false
  }

  return true
}
