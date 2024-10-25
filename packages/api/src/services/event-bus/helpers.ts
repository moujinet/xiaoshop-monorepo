import { kebabCase } from 'es-toolkit/string'

/**
 * 转换事件类名为事件名称
 *
 * @param className 事件类名
 * @returns 事件名称 (event.name)
 */
export function toEventName(className: string) {
  return kebabCase(className)
    .replace(/-/g, '.')
    .replace(/\.event$/, '')
}
