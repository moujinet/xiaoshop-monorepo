import {
  type UseTimeAgoMessages,
  type UseTimeAgoUnit,
  formatTimeAgo as vueuseFormatTimeAgo,
} from '@vueuse/core'
import dayjs from 'dayjs'

type UseTimeAgoUnitNames = '秒' | '分' | '时' | '天' | '周' | '月' | '年'

const UNITS: UseTimeAgoUnit<UseTimeAgoUnitNames>[] = [
  { max: 60000, value: 1000, name: '秒' },
  { max: 2760000, value: 60000, name: '分' },
  { max: 72000000, value: 3600000, name: '时' },
  { max: 518400000, value: 86400000, name: '天' },
  { max: 2419200000, value: 604800000, name: '周' },
  { max: 28512000000, value: 2592000000, name: '月' },
  { max: Number.POSITIVE_INFINITY, value: 31536000000, name: '年' },
]

const MESSAGES: UseTimeAgoMessages<UseTimeAgoUnitNames> = {
  justNow: '刚刚',
  past: n => n.match(/\d/) ? `${n}之前` : n,
  future: n => n.match(/\d/) ? `于 ${n}` : n,
  月: (n, past) => n === 1
    ? past
      ? '上个月'
      : '下个月'
    : `${n} 个月前`,
  年: (n, past) => n === 1
    ? past
      ? '去年'
      : '明年'
    : `${n} year${n > 1 ? 's' : ''}`,
  天: (n, past) => n === 1
    ? past
      ? '昨天'
      : '明天'
    : `${n} 天`,
  周: (n, past) => n === 1
    ? past
      ? '上周'
      : '下周'
    : `${n} 周`,
  时: n => `${n} 小时`,
  分: n => `${n} 分钟`,
  秒: n => `${n} 秒`,
  invalid: '',
}

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

export function formatTimeAgo(time: MaybeRefOrGetter<Date | number | string>) {
  return vueuseFormatTimeAgo<UseTimeAgoUnitNames>(new Date(toValue(time)), {
    messages: MESSAGES,
    units: UNITS,
  })
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
