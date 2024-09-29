import type { IDict } from '@xiaoshop/shared'

import { kebabCase } from 'es-toolkit/string'

/**
 * 转换事件类名为事件名称
 *
 * @param className 事件类名
 * @returns 事件名称 (event.name)
 */
export function toEventName(className: string) {
  return kebabCase(className).replace(/-/g, '.').replace(/\.event$/, '')
}

/**
 * 转换字典
 *
 * @param key 字典键
 * @param dictArray 字典数组
 * @returns 字典对象
 */
export function toDict(key: number, dictArray: IDict[]): IDict {
  return dictArray.find(dict => dict.key === key) || {
    key,
    value: '未知',
  }
}

/**
 * 转换对象中的指定键到字典
 *
 * @example
 * ```ts
 * const obj = { status: 1, type: 1, level: 1 }
 *
 * objectToDict(obj, 'status', [
 *   { key: 1, value: '正常' },
 *   { key: 2, value: '禁用' },
 * ])
 *
 * console.log(obj)
 *
 * {
 *   status: { key: 1, value: '正常' },
 *   type: 1,
 *   level: 1,
 * }
 * ```
 *
 * @param obj 对象
 * @param keyName 对象键名
 * @param dictArray 字典数组
 */
export function objectToDict(
  obj: Record<string, any>,
  keyName: string,
  dictArray: IDict[],
): typeof obj {
  if (keyName in obj) {
    obj[keyName] = toDict(obj[keyName] as number, dictArray)
  }
  else if (keyName.includes('.')) {
    const keys = keyName.split('.')

    let o = obj

    keys.forEach((key, index) => {
      if (key in o && index < keys.length - 1)
        o = o[key]

      if (index === keys.length - 1)
        o[key] = toDict(o[key], dictArray)
    })
  }

  return obj
}

/**
 * 批量转换字典
 *
 * @example
 * ```ts
 * const rows = [
 *   { status: 1, type: 1, level: 1 },
 *   { status: 2, type: 2, level: 2 },
 * ]
 *
 * const rowsDict = pipeDict(
 *   rows,
 *   [
 *     row => row.status = toDict(row.status, DICT_STATUSES),
 *     row => row.type = toDict(row.type, DICT_TYPES),
 *     row => row.level = toDict(row.level, DICT_LEVELS),
 *   ],
 * )
 *
 * console.log(rowsDict)
 *
 * [
 *   {
 *     status: { key: 1, value: '正常' },
 *     type: { key: 1, value: '普通' },
 *     level: { key: 1, value: '低' },
 *   },
 *   {
 *     status: { key: 2, value: '禁用' },
 *     type: { key: 2, value: '异常' },
 *     level: { key: 2, value: '中' },
 *   },
 * ]
 * ```
 *
 * @param rows 字典数组
 * @param fns 管理函数
 */
export function pipeDict<T>(rows: any[], fns: ((row: any) => any)[]): T[] {
  return rows.map(row => fns.reduce((row, fn) => fn(row), row))
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
  pidKey: keyof T = 'parentId',
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
