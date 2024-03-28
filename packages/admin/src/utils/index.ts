import dayjs from 'dayjs'
import { IS_DEBUG_MODE } from '~/constants/env'

/**
 * 问候语
 *
 * @returns string
 */
export function getGreeting() {
  const hour = new Date().getHours()

  return hour < 9
    ? '早上好'
    : hour <= 11
      ? '上午好'
      : hour <= 13
        ? '中午好'
        : hour < 20
          ? '下午好'
          : '晚上好'
}

/**
 * 返回指定格式日期
 *
 * @param date Dayjs | number | string | undefined
 * @param format string
 * @returns string
 */
export function formatDateTime(
  date: dayjs.Dayjs | number | string | undefined = undefined,
  format = 'YYYY-MM-DD HH:mm:ss',
): string {
  return dayjs(date).format(format)
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
