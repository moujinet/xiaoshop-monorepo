import type { Reactive } from 'vue'
import type { LocationQuery } from 'vue-router'

interface IUseSearchFormOptions {
  /**
   * 表单 Ref
   */
  form: Reactive<any>
  /**
   * 组合查询字段, 例如 `['keywordType', 'keyword']`
   * 处理时会将 `keywordType` 和 `keyword` 合并为 `keywordType:keyword`
   */
  combinedKeys?: string[]
  /**
   * 字符串字段
   */
  stringKeys?: string[]
  /**
   * 范围数字字段，以 `最小值,最大值` 形式的字符串
   * 拆分后得到 [min, max] 的数值数组，并在请求参数中再次将 [min, max] 拼接回 `min,max`
   */
  splitNumberKeys?: string[]
  /**
   * 范围字符串字段，以 `开始值,结束值` 形式的字符串
   */
  splitStringKeys?: string[]
  /**
   * 强制清空的字段，值为此字段的值，将被清空
   */
  trimKeys?: string[]
}

interface IUseSearchFormReturns {
  /**
   * 将 route.query 转换为 form 对应的类型
   *
   * @param query LocationQuery
   * @returns void
   */
  transformQuery: (query: LocationQuery) => void
  /**
   * URL 请求参数，用于 router.push 或 router.replace
   */
  query: ComputedRef<Record<string, string>>
  /**
   * 接口请求参数
   */
  params: ComputedRef<Record<string, string>>
}

/**
 * 面向路由的表单搜索
 *
 * - `form`  : 表单对象 `Ref`, 组件交互数据
 * - `query` : Router 查询参数对象
 * - `params`: 请求参数对象
 *
 * @example
 * ```
 * const form = reactive({
 *   name: '',
 *   limit: 0,
 *   age: [],
 *   createdTime: [],
 * })
 *
 * const { data, loading, refreshData } = fetchSomeApi()
 *
 * const { transformQuery, params, query } = useSearchForm({
 *   form,
 *   combinedKeys: ['keywordType', 'keyword'],
 *   stringKeys: ['name'],
 *   splitNumberKeys: ['age'],
 *   splitStringKeys: ['createdTime'],
 *   trimKeys: ['all'], // removeEmpty 第 3 个参数，用于清除空值
 * })
 *
 * const route = useRoute()
 * const router = useRouter()
 *
 * watch(
 *   () => route.query,
 *   () => {
 *     // 将 route.query 转换为 form 对应的类型，并更新 form 对象
 *     transformQuery(route.query)
 *
 *     loadData()
 *   },
 *   { immediate: true },
 * )
 *
 * // 请求数据
 * function loadData() {
 *   refreshData(params.value)
 * }
 *
 * // 替换路由
 * function handleSearch() {
 *   router.replace({ query: { ...query.value, page: 1 } })
 * }
 * ```
 *
 * @param options IUseSearchFormOptions
 */
export function useSearchForm(options: IUseSearchFormOptions): IUseSearchFormReturns {
  const {
    form,
    combinedKeys = [],
    stringKeys = [],
    splitNumberKeys = [],
    splitStringKeys = [],
    trimKeys = [],
  } = options

  const query = computed(() => {
    const result: Record<string, string> = {}

    Object.keys(form)
      .forEach((key) => {
        if (splitNumberKeys.includes(key) || splitStringKeys.includes(key))
          result[key] = (form[key] as []).join(',')
        else
          result[key] = form[key] as string
      })

    return { ...removeEmpty(result, true, trimKeys) }
  })

  const params = computed(() => {
    const result: Record<string, string> = {}

    if (combinedKeys.length > 0) {
      const [combinedKey, combinedValue] = combinedKeys
      result[form[combinedKey]] = form[combinedValue] as string
    }

    Object.keys(form)
      .filter(key => !combinedKeys.includes(key))
      .forEach((key) => {
        if (splitNumberKeys.includes(key) || splitStringKeys.includes(key))
          result[key] = (form[key] as []).join(',')
        else
          result[key] = form[key] as string
      })

    return { ...removeEmpty(result, true, trimKeys) }
  })

  function transformQuery(query: LocationQuery) {
    Object.keys(query)
      .forEach((key) => {
        if (stringKeys.includes(key) || combinedKeys.includes(key))
          form[key] = query[key] as string
        else if (splitNumberKeys.includes(key))
          form[key] = (query[key] as string).split(',').map(Number)
        else if (splitStringKeys.includes(key))
          form[key] = (query[key] as string).split(',')
        else
          form[key] = Number(query[key])
      })
  }

  return {
    query,
    params,
    transformQuery,
  }
}
