import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import type { IArea, IAreaNested } from '@xiaoshop/schema'
import * as clack from '@clack/prompts'
import color from 'picocolors'
import type { IUpdateReturns } from './updater'
import config from './config'

export function exportAll(data: IUpdateReturns) {
  const {
    all,
    provinces,
    cities,
    areas,
    streets,
  } = data

  clack.log.step('开始导出数据')

  exportData('全部地区(树状)', 'all', all)
  exportData('省份', 'province', provinces)
  exportData('城市', 'city', cities)
  exportData('区县', 'area', areas)
  exportData('街道', 'street', streets)
}

function exportData(label: string, name: string, data: IArea[] | IAreaNested[]) {
  if (!existsSync(config.dest.path)) {
    mkdirSync(config.dest.path, { recursive: true })
  }

  const filePath = join(config.dest.path, `${name}.json`)
  writeFileSync(filePath, JSON.stringify(data), 'utf-8')

  clack.log.success(`导出 ${color.cyan(label)} 文件完成 ${color.cyan(`(${filePath})`)}`)
}
