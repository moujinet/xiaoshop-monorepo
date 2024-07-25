import type { ISettingsOption } from '@xiaoshop/schema'
import type { ValidatedError } from '@arco-design/web-vue'
import { getSettings, updateSettings } from '@/settings/apis'

interface IUseSettingsUpdateOptionsReturn {
  /**
   * 是否正在加载
   */
  loading: Ref<boolean>
  /**
   * 执行更新，通常绑定在提交按钮或表单的 Submit 事件
   *
   * @returns void
   */
  onUpdate: (data: { values: Record<string, any>, errors: Record<string, ValidatedError> | undefined }) => void
}

export function useSettings() {
  /**
   * 所有设置
   */
  const [options, _updateOptions] = useCache<IKeyValue<string>>(
    'options',
    {},
    { storage: sessionStorage, expire: 1500, refreshFn: () => new Promise(() => refresh(true)) },
  )

  /**
   * 返回指定配置
   *
   * @param key string
   * @param defaultVal any
   * @returns unknown
   */
  function getOption(key: string, defaultVal: any = undefined) {
    if (!key)
      return defaultVal

    if (!Object.keys(options.value!).includes(key))
      refresh(true)

    return Object.keys(options.value!).includes(key) ? options.value![key] : defaultVal
  }

  /**
   * 返回指定前缀配置
   *
   * @param group string
   * @param defaultVal any
   * @param pickKeys string[]
   * @returns any
   */
  function getOptions(group: string, defaultVal: any = undefined, pickKeys: string[] = []) {
    if (!group)
      return defaultVal

    if (Object.keys(options.value!).some(key => key.startsWith(group))) {
      const opts = Object.keys(options.value!).reduce((item, key) => {
        if (key.startsWith(group))
          item[key.replace(new RegExp(`^${group}\.`), '')] = options.value![key]
        return item
      }, {} as IKeyValue)

      return pickKeys.length > 0 ? pick(opts, pickKeys) : opts
    }

    return defaultVal
  }

  /**
   * 更新配置项
   *
   * @param group string
   * @param options IKeyValue
   * @returns IUseSettingsUpdateOptionsReturn
   */
  function updateOptions(group: string, options: IKeyValue): IUseSettingsUpdateOptionsReturn {
    const loading = ref(false)

    const onUpdate = (data: { values: Record<string, any>, errors: Record<string, ValidatedError> | undefined }) => {
      const { errors } = data

      if (errors)
        return

      loading.value = true

      const res = updateSettings(_transformOptions(group, options))
        .then(() => {
          useMessage({
            onClose: () => {
              refresh(true)
            },
          }).success('配置已更新')
        })
        .finally(() => {
          loading.value = false
        })

      return res
    }

    return {
      loading,
      onUpdate,
    }
  }

  /**
   * 刷新配置项
   */
  function refresh(force: boolean = false) {
    if (force || Object.keys(options.value!).length === 0) {
      getSettings()
        .then((_) => {
          _updateOptions(_.reduce((item, option) => {
            item[option.key] = _transformValueType(option.key, option.value)
            return item
          }, {} as IKeyValue))
        })
    }
  }

  /**
   * 转换选项类型用于提交
   *
   * @param group string
   * @param options IKeyValue
   * @returns ISettingsOption
   */
  function _transformOptions(group: string, options: IKeyValue): ISettingsOption[] {
    const data = Object.keys(options).reduce((item, key) => {
      item.push({
        key: `${group}.${key}`,
        value: key.startsWith('enable')
          ? options[key] === true ? '1' : '0'
          : Array.isArray(options[key]) || JSON.stringify(options[key]).startsWith('{')
            ? JSON.stringify(options[key])
            : options[key].toString(),
      })

      return item
    }, [] as ISettingsOption[])

    return data
  }

  /**
   * 转换值类型
   *
   * @param key string
   * @param val string
   */
  function _transformValueType(key: string, val: string) {
    const keys = key.split('.')

    // Boolean
    if (keys[keys.length - 1].startsWith('enable'))
      return val === '1'

    // Number
    if (Number.isInteger(val))
      return val

    // JSON
    if ((val.startsWith('[') && val.endsWith(']')) || (val.startsWith('{') && val.endsWith('}')))
      return JSON.parse(val)

    return val
  }

  return {
  /**
   * 刷新配置
   */
    refresh,
    /**
     * 返回指定配置
     */
    getOption,
    /**
     * 返回指定前缀配置
     */
    getOptions,
    /**
     * 更新配置
     */
    updateOptions,
  }
}
