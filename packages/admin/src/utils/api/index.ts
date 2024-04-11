import axios from 'axios'
import {
  handleApiErrorResponse,
  handleConfigureAuthHeaders,
  handleConfigureBaseUrl,
  handleNetworkError,
} from './interceptors'
import { handleRequestDebugInfo } from './debug'

/**
 * 配置 axios 拦截器
 */
export function setupApi() {
  // 请求拦截器
  axios.interceptors.request.use(
    (config) => {
      config = handleConfigureBaseUrl(config)
      config = handleConfigureAuthHeaders(config)

      return config
    },
    (error) => {
      return Promise.reject(error)
    },
  )

  // 响应拦截器
  axios.interceptors.response.use(
    (response) => {
      if (response.status !== 200)
        return Promise.reject(response.data)

      // 调试信息
      handleRequestDebugInfo(response)

      // 错误处理
      if (!handleApiErrorResponse(response.data.code, response.data.message))
        return Promise.reject(response.data)

      return response
    },
    (error) => {
      if (axios.isCancel(error))
        return Promise.reject(error)

      if (handleNetworkError(error.response?.status))
        return Promise.reject(error.message)
    },
  )
}
