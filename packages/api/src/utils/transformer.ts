import type { IDict } from '@xiaoshop/shared'

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

/**
 * 对象数组转换为键值映射
 *
 * @param arr 对象数组
 * @param key 对象键名
 * @returns 对象映射
 */
export function toKeyValueMapping(arr: any[], key: string = 'key', value: string = 'value') {
  return arr.reduce((obj, item) => {
    obj[item[key]] = item[value]
    return obj
  }, {})
}

/**
 * 对象转换为键值映射
 *
 * @param obj 对象
 * @param keyName 对象键名
 * @param key 查询键名
 * @param value 查询键值
 * @returns 对象
 */
export function objectToKeyValueMapping(obj: any, keyName: string, key: string = 'key', value: string = 'value') {
  if (keyName in obj) {
    obj[keyName] = toKeyValueMapping(obj[keyName], key, value)
  }
  else if (keyName.includes('.')) {
    const keys = keyName.split('.')

    let o = obj

    keys.forEach((key, index) => {
      if (key in o && index < keys.length - 1)
        o = o[key]

      if (index === keys.length - 1)
        o[key] = toKeyValueMapping(o[key], key, value)
    })
  }

  return obj
}
