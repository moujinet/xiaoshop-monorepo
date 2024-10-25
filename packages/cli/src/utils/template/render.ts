import { join } from 'node:path'

import { ConfigPath } from '@/config/path'

import { readFile } from '../file'
import { Console } from '../console'
import { handlebars } from './handlebars'

/**
 * 渲染字符串
 *
 * @param str 渲染模板字符串
 * @param data 数据
 * @returns 渲染后的字符串
 */
export function renderString(str: string, data: ITemplateData): string {
  return handlebars.compile(str)(data)
}

/**
 * 渲染模板
 *
 * @param path 模板路径
 * @param data 模板数据
 * @returns 渲染后的字符串
 */
export function renderTemplate(path: string, data: Record<string, any>) {
  try {
    const template = readFile(
      path,
      join(ConfigPath.paths.CLI, 'templates'),
    )

    return renderString(template, data)
  }
  catch (e) {
    Console.error(e)
  }
}
