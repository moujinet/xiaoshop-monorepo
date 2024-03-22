import axios from 'axios'
import {
  handleConfigureAuthHeaders,
  handleConfigureBaseUrl,
  handleNetworkError,
  handleUnknownError,
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

      handleUnknownError(response.data.code, response.data.message)

      // 调试信息
      handleRequestDebugInfo(response)

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
