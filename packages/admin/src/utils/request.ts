import axios, { type AxiosRequestConfig } from 'axios'

/**
 * 发起 API 请求 (Promise)
 *
 * @param config AxiosRequestConfig
 * @returns Promise
 */
export function usePromiseRequest<T = any>(config: AxiosRequestConfig): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    axios<IApiResponse<T>>(config)
      .then((response) => {
        resolve(response.data.data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export interface IUseRequestReturn<T = any> {
  /**
   * 数据加载中
   */
  loading: Ref<boolean>
  /**
   * 响应数据
   */
  data: Ref<T>
  /**
   * 错误信息
   */
  error: Ref<unknown>
  /**
   * 刷新请求
   */
  refreshData: (refreshParams?: AxiosRequestConfig['params']) => void
}

/**
 * 发起 API 请求
 *
 * @param config AxiosRequestConfig
 */
export function useRequest<T = any>(config: AxiosRequestConfig): IUseRequestReturn<T> {
  const loading = ref(false)
  const error = ref()
  const data = ref()

  function refreshData(refreshParams?: AxiosRequestConfig['params']) {
    loading.value = true

    usePromiseRequest<T>(
      refreshParams
        ? { ...config, params: refreshParams }
        : config,
    )
      .then((res) => {
        data.value = res
      })
      .catch((err) => {
        error.value = err
      })
      .finally(() => {
        loading.value = false
      })
  }

  return {
    loading,
    data,
    error,
    refreshData,
  }
}
