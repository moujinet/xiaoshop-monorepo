/**
 * 获取当前时间
 *
 * @returns {string} 当前时间 IOS 日期格式
 */
export const nowStr = (): string => (new Date()).toISOString()
