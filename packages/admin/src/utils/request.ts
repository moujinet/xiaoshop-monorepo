import axios, { type AxiosRequestConfig } from 'axios'
import type { IApiResponse } from '~/types'

interface IUseRequest<T> {
  loading: Ref<boolean>
  data: Ref<T | undefined>
  error: Ref<string | undefined>
}

/**
 * 发起 API 请求 (Promise)
 *
 * @param config AxiosRequestConfig
 * @returns Promise
 */
export function useRequestPromise<T = any>(config: AxiosRequestConfig): Promise<T> {
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

/**
 * 发起 API 请求
 *
 * @param config AxiosRequestConfig
 * @returns IUseRequest
 */
export function useRequest<T = any>(config: AxiosRequestConfig): IUseRequest<T> {
  const loading = ref(true)
  const data = ref<T>()
  const error = ref<string>()

  useRequestPromise<T>(config)
    .then((res) => {
      data.value = res
    })
    .catch((e) => {
      error.value = e
    })
    .finally(() => {
      loading.value = false
    })

  return {
    loading,
    data,
    error,
  }
}
