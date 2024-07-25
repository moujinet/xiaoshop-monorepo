import type { IApiResponse } from '@xiaoshop/schema'
import axios, { type AxiosRequestConfig } from 'axios'

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
  refreshData: (refreshParams?: AxiosRequestConfig['params']) => Promise<T>
}

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
        resolve(response.data.data as T)
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
 */
export function useRequest<T = any>(config: AxiosRequestConfig): IUseRequestReturn<T> {
  const loading = ref(false)
  const error = ref()
  const data = ref()

  function refreshData(refreshParams?: AxiosRequestConfig['params']) {
    loading.value = true

    return new Promise<T>((resolve, reject) => {
      usePromiseRequest<T>(
        refreshParams
          ? { ...config, params: refreshParams }
          : config,
      )
        .then((res) => {
          data.value = res
          resolve(res)
        })
        .catch((err) => {
          error.value = err
          reject(err)
        })
        .finally(() => {
          loading.value = false
        })
    })
  }

  return {
    loading,
    data,
    error,
    refreshData,
  }
}

export interface IUseUploadRequestOptions<T = any> {
  /**
   * 上传地址
   */
  url: string
  /**
   * 上传文件
   */
  file: File
  /**
   * 上传参数
   */
  data?: T
  /**
   * 上传进度回调
   *
   * @param {number} percent
   * @param {ProgressEvent} event
   */
  onProgress: (percent: number, event?: ProgressEvent) => void
  /**
   * 上传成功回调
   *
   * @param {any} response
   */
  onSuccess: (response?: any) => void
  /**
   * 上传失败回调
   *
   * @param {any} response
   */
  onError: (response?: any) => void
}

/**
 * 发起文件上传请求
 *
 * @param {IUseUploadRequestOptions} options
 * @returns {AbortController['abort']} AbortController
 */
export function useUploadRequest<T = any>(
  options: IUseUploadRequestOptions<T>,
): AbortController['abort'] {
  const {
    url,
    file,
    data,
    onError,
    onProgress,
    onSuccess,
  } = options

  const form = new FormData()
  form.append('file', file)

  if (data) {
    for (const key in data)
      form.append(key, data[key] as any)
  }

  const controller = new AbortController()

  axios<IApiResponse<T>>({
    method: 'post',
    url,
    data: form,
    signal: controller.signal,
    onUploadProgress: (progress) => {
      let percent = 0

      if (progress.total)
        percent = Math.floor((progress.loaded * 100) / progress.total)

      onProgress(percent, progress.event)
    },
  }).then((res) => {
    if (res.data.code !== 0)
      onError(res.data.message || res.data.error || '未知错误')
    else
      onSuccess(res)
  }).catch((err) => {
    onError(err)
  })

  return controller.abort
}
