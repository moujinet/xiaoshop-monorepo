import { useStorage } from '@vueuse/core'

type ICacheReturns<T = any> = [
  /**
   * 获取缓存
   */
  ComputedRef<T | undefined>,
  /**
   * 设置缓存
   */
  (value: T) => void,
  /**
   * 刷新缓存
   */
  () => void,
  /**
   * 清除缓存
   */
  () => void,
]

interface ICacheOptions<T = any> {
  storage?: Storage
  expire?: number
  refreshFn?: () => Promise<T>
}

export function useCacheManager() {
  const namespace = useStorage<string>('xiaoshop', Date.now().toString(), sessionStorage)

  return {
    namespace: unref(namespace),
    refresh: () => {
      namespace.value = Date.now().toString()
    },
  }
}

export function useCache<T = any>(
  key: string,
  defaultVal?: T,
  useOptions?: ICacheOptions<T>,
): ICacheReturns<T> {
  const options = {
    storage: useOptions?.storage || localStorage,
    expire: useOptions?.expire || -1,
    refreshFn: useOptions?.refreshFn,
  }

  const { namespace } = useCacheManager()

  /**
   * 缓存容器
   */
  const _cache_ = useStorage<ICache<T | undefined>>(
    `${namespace}.${key}`,
    { cached: 0, data: defaultVal } as ICache<T | undefined>,
    options.storage,
  )

  /**
   * 获取缓存
   */
  const getValue = computed<T | undefined>(() => {
    return _isTimeout()
      ? defaultVal
      : _cache_.value.data
  })

  /**
   * 刷新缓存
   */
  function refreshValue() {
    if (options.refreshFn) {
      options.refreshFn()
        .then((data) => {
          _cache_.value = {
            cached: Date.now(),
            data,
          }
        })
    }
  }

  /**
   * 设置缓存
   *
   * @param value T
   */
  function setValue(value: T) {
    _cache_.value = {
      cached: Date.now(),
      data: value,
    }
  }

  /**
   * 清除缓存
   */
  function unsetValue() {
    _cache_.value = {
      cached: 0,
      data: defaultVal,
    }
  }

  /**
   * 判断是否过期
   *
   * @returns boolean
   */
  function _isTimeout() {
    return options.expire === -1
      ? false
      : options.expire === 0
      || _cache_.value.cached === 0
      || _cache_.value.cached + options.expire * 1000 < Date.now()
  }

  return [
    /**
     * 获取缓存
     */
    getValue,
    /**
     * 设置缓存
     */
    setValue,
    /**
     * 刷新缓存
     */
    refreshValue,
    /**
     * 清除缓存
     */
    unsetValue,
  ]
}
