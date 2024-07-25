import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import * as clack from '@clack/prompts'
import type { IArea, IAreaNested } from '@xiaoshop/schema'
import color from 'picocolors'
import { updateLocker, useLocker } from './locker'
import { cancel, deepCopy, resolvePath } from './utils'
import { fetch } from './fetcher'

export async function checkUpdate(): Promise<boolean> {
  const { updated, total } = useLocker()

  if (updated > 0) {
    clack.note(`Updated : ${new Date(updated).toLocaleString()}\nTotal   : ${total}`)

    const update = await clack.confirm({
      message: '最近已经更新过数据, 是否重新更新?',
    })

    if (clack.isCancel(update))
      cancel()

    return update === true
  }

  return true
}

export interface IUpdateReturns {
  all: IAreaNested[]
  provinces: IArea[]
  cities: IArea[]
  areas: IArea[]
  streets: IArea[]
}

export async function update(): Promise<IUpdateReturns> {
  const useCache = await clack.confirm({
    message: '是否使用缓存数据?',
  })

  if (clack.isCancel(useCache))
    cancel()

  const now = Date.now()
  const spinner = clack.spinner()

  spinner.start('从「国家统计局」获取 PCA 地区数据')

  let all: IAreaNested[] = useCache ? readCache<IAreaNested>('all') : []
  let provinces: IArea[] = useCache ? readCache('provinces') : []
  let cities: IArea[] = useCache ? readCache('cities') : []
  let areas: IArea[] = useCache ? readCache('areas') : []
  let streets: IArea[] = useCache ? readCache('streets') : []

  if (provinces.length > 0 && cities.length > 0 && areas.length > 0 && streets.length > 0) {
    spinner.stop(`获取 PCA 地区数据 ${color.gray('(cached)')}`)
    return { all, provinces, cities, areas, streets }
  }

  all = [...await fetch({ code: '', type: 'province' }, useCache === true)]
  provinces = []
  cities = []
  areas = []
  streets = []

  if (all.length > 0) {
    provinces.push(...deepCopy(all))

    for (const province of all) {
      spinner.message(`获取「${province.name}」数据 ${color.gray(`(${province.code})`)}`)

      const provinceCities = await fetch({ code: province.code, type: 'city' }, useCache === true)

      if (provinceCities.length > 0) {
        cities.push(...deepCopy(provinceCities))
        province.children = [...provinceCities]

        for (const city of province.children) {
          spinner.message(`获取「${province.name}/${city.name}」数据 ${color.gray(`(${city.code})`)}`)

          const cityAreas = await fetch({ code: city.code, type: 'area' }, useCache === true)

          if (cityAreas.length > 0) {
            areas.push(...deepCopy(cityAreas))
            city.children = [...cityAreas]

            for (const area of city.children) {
              spinner.message(`获取「${province.name}/${city.name}/${area.name}」数据 ${color.gray(`(${area.code})`)}`)

              const areaStreets = await fetch({ code: area.code, type: 'street' }, useCache === true)

              if (areaStreets.length > 0) {
                streets.push(...deepCopy(areaStreets))
                area.children = [...areaStreets]
              }
            }
          }
        }
      }
    }
  }

  spinner.stop('获取 PCA 地区数据')

  updateLocker(
    now,
    provinces.length + cities.length + areas.length + streets.length,
  )

  const updatedString = `Updated   : ${new Date(now).toLocaleString()}`
  const notes = [
    `Provinces : ${provinces.length}`,
    `Cities    : ${cities.length}`,
    `Areas     : ${areas.length}`,
    `Streets   : ${streets.length}`,
    '─'.repeat(updatedString.length),
    `Total     : ${provinces.length + cities.length + areas.length + streets.length}`,
    updatedString,
  ]

  clack.note(notes.join('\n'))

  if (useCache) {
    writeCache('all', all)
    writeCache('provinces', provinces)
    writeCache('cities', cities)
    writeCache('areas', areas)
    writeCache('streets', streets)
  }

  return { all, provinces, cities, areas, streets }
}

function readCache<T extends IArea | IAreaNested>(key: string): T[] {
  const cacheFile = resolvePath(key, 'json', '.json')

  const cache = existsSync(cacheFile)
    ? JSON.parse(readFileSync(cacheFile, 'utf-8')) as T[]
    : []

  return cache || []
}

function writeCache(key: string, data: IArea[] | IAreaNested[]): void {
  const cacheFile = resolvePath(key, 'json', '.json')

  writeFileSync(cacheFile, JSON.stringify(data), 'utf-8')
}
