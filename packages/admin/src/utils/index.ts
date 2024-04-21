import { IS_DEBUG_MODE } from '~/constants/env'

/**
 * 返回指定单位的大小
 *
 * @param bytes number
 * @param decimals number
 * @returns string
 */
export function formatBytes(bytes: number, decimals = 2): string {
  if (bytes === 0)
    return '0 字节'

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['字节', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return `${Number.parseFloat((bytes / k ** i).toFixed(dm))} ${sizes[i]}`
}

/**
 * 输出调试信息
 *
 * @param type
 * @param message
 * @param context
 */
export function debug(type: string, message: string, context: any = null) {
  IS_DEBUG_MODE
  // eslint-disable-next-line no-console
  && console.log(
    '[XIAOSHOP]',
    type.toUpperCase(),
    message,
    context,
    formatDateTime(new Date().getTime(), 'YY-MM-DD hh:mm:ss.SSS'),
  )
}

/**
 * 对象去除某些属性
 *
 * @param obj T
 * @param keys K
 * @returns Omit<T, K | K2>
 */
export function omit<
  T extends Record<string, any>,
  K extends string,
  K2 extends keyof T,
>(obj: T, keys: (K | K2)[]) {
  const result = { ...obj }

  keys.forEach((key) => {
    delete result[key]
  })

  return result as Omit<T, K2>
}

/**
 * 对象选取某些属性
 *
 * @param obj
 * @param keys
 * @returns Pick<T, K | K2>
 */
export function pick<
T extends Record<string, any>,
K extends string,
K2 extends keyof T,
>(obj: T, keys: (K | K2)[]): Pick<T, K2> {
  return keys.reduce((pre, cur) => {
    if (cur in obj)
      pre[cur] = obj[cur]
    return pre
  }, {} as Pick<T, K | K2>)
}

/**
 * 转换为嵌套数组
 *
 * @param list T[]
 * @param idKey string
 * @param pidKey string
 * @returns T[]
 */
export function toNestedList<T extends Record<string, any>>(
  list: T[],
  idKey: keyof T = 'id',
  pidKey: keyof T = 'parent',
) {
  const nestable = (parent: number) => {
    const result: T[] = []

    list
      .filter(item => item[pidKey] === parent)
      .forEach((item) => {
        const children = nestable(item[idKey])
        const child: T = {
          ...item,
        }

        result.push(
          children.length > 0
            ? {
                ...child,
                children,
              }
            : child,
        )
      })

    return result
  }

  return nestable(0)
}

/**
 * 删除对象中空的属性
 *
 * @param obj Record<string, any>
 * @param isStrict boolean
 * @param specials string[]
 * @returns Record<string, any>
 */
export function removeEmpty(
  obj: Record<string, any>,
  isStrict?: boolean,
  specials?: string[],
) {
  Object.keys(obj).forEach((key) => {
    if (obj[key] === null || obj[key] === undefined || obj[key] === '')
      delete obj[key]

    if (isStrict && (obj[key] === 0 || obj[key] === false))
      delete obj[key]

    if (specials && specials.length > 0 && specials.includes(obj[key]))
      delete obj[key]
  })

  return obj
}
