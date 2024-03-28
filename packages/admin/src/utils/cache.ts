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
  autoRefresh?: boolean
  refreshFn?: () => Promise<T>
}

export function useCache<T = any>(
  key: string,
  defaultVal?: T,
  useOptions?: ICacheOptions<T>,
): ICacheReturns {
  const options = {
    storage: useOptions?.storage || localStorage,
    expire: useOptions?.expire || 3600,
    autoRefresh: useOptions?.autoRefresh || false,
    refreshFn: useOptions?.refreshFn,
  }

  /**
   * 缓存容器
   */
  const _cache_ = useStorage<ICache<T | undefined>>(
    `xiaoshop.${key}`,
    { cached: 0, data: defaultVal } as ICache<T | undefined>,
    options.storage,
  )

  /**
   * 获取缓存
   */
  const getValue = computed(() => {
    if (_isTimeout())
      refreshValue()

    return _isTimeout()
      ? defaultVal
      : _cache_.value.data
  })

  /**
   * 刷新缓存
   */
  function refreshValue() {
    if (options.autoRefresh && options.refreshFn) {
      options.refreshFn().then((data) => {
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
    return options.expire === 0
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
