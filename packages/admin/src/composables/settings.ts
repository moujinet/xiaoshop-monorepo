import { getSettings } from '@/settings/apis/settings'

export const useSettings = defineStore('option', () => {
  /**
   * 配置缓存
   */
  const [options, _, refresh] = useCache<IKeyValue>(
    'settings',
    {},
    {
      autoRefresh: true,
      refreshFn: () => _onRefresh(),
    },
  )

  /**
   * 获取配置项
   *
   * @param key string
   * @param defaultVal any
   * @returns any
   */
  function getOption(key: string, defaultVal?: any) {
    return options.value?.[key] || defaultVal
  }

  /**
   * 获取指定分组的配置项
   *
   * @param group string
   * @returns IKeyValue
   */
  function getOptions(group: string): IKeyValue {
    return options.value
      ? Object.keys(options.value).reduce(
        (obj: IKeyValue, key) => {
          if (key.startsWith(`${group}.`))
            obj[key.replace(`${group}.`, '')] = options.value?.[key]
          return obj
        },
        {},
      )
      : {}
  }

  /**
   * 自动刷新配置回调
   */
  function _onRefresh() {
    return new Promise<IKeyValue>(
      resolve => getSettings()
        .then((settings) => {
          resolve(settings.reduce((obj: IKeyValue, item) => {
            obj[`${item.group}.${item.key}`] = _transformValueType(item.key, item.value)
            return obj
          }, {}))
        }),
    )
  }

  /**
   * 转换值类型
   *
   * @param key string
   * @param val string
   */
  function _transformValueType(key: string, val: string) {
    // Boolean
    if (key.startsWith('enable'))
      return val === '1'

    // JSON
    if (val.startsWith('[') && val.endsWith(']'))
      return JSON.parse(val)

    return val
  }

  return {
    /**
     * 所有配置项
     */
    options,
    /**
     * 获取配置项
     */
    getOption,
    /**
     * 获取指定分组的配置项
     */
    getOptions,
    /**
     * 强制刷新
     */
    refresh,
  }
})
