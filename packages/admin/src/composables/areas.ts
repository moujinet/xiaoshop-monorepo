import type { IAreaNested } from '@xiaoshop/schema'
import axios from 'axios'

type IUseAreasType = 'all' | 'province' | 'city' | 'area'

type ILoadCacheReturns = [
  IAreaNested[],
  (value: IAreaNested[]) => void,
]

interface IUseAreasReturn {
  init: () => Promise<void>
  loadTree: (type: IUseAreasType, banded?: string[]) => Promise<IAreaNested[]>
  getNames: (codeString: string) => string
}

const deepClone = (data: any) => JSON.parse(JSON.stringify(data))

export function useAreas(): IUseAreasReturn {
  const loadCache = (type: string): ILoadCacheReturns => {
    const key = `areas.${type}`
    const cache = JSON.parse(localStorage.getItem(key) || '[]')

    return [
      deepClone(cache) as IAreaNested[],
      (data: IAreaNested[]) => localStorage.setItem(key, JSON.stringify(data)),
    ]
  }

  const loadData = async (type: IUseAreasType = 'all'): Promise<IAreaNested[]> => {
    const [
      cache,
      refresh,
    ] = loadCache(type)

    if (cache && cache.length > 0) {
      return cache
    }

    const {
      data,
    } = await axios.create().get<IAreaNested[]>(`/js/pca/${type}.json`)

    if (data.length > 0) {
      refresh(data)
    }

    return deepClone(data)
  }

  const init = async () => {
    Promise.race([
      loadData(),
      loadData('province'),
      loadData('city'),
      loadData('area'),
    ])
  }

  const splitCode = (code: string): string[] => {
    if (code.includes(','))
      return code.split(',')

    const codes: string[] = []

    // 省级
    if (code.length === 2) {
      codes.push(code)
    }

    // 地级
    if (code.length === 4) {
      codes.push(code.slice(0, 2))
      codes.push(code)
    }

    // 县级
    if (code.length === 6) {
      codes.push(code.slice(0, 2))
      codes.push(code.slice(0, 4))
      codes.push(code)
    }

    // 乡级
    if (code.length === 9) {
      codes.push(code.slice(0, 2))
      codes.push(code.slice(0, 4))
      codes.push(code.slice(0, 6))
      codes.push(code)
    }

    return codes
  }

  const withoutBanded = (data: IAreaNested[], banded?: string[]): IAreaNested[] => {
    return banded && banded.length
      ? data.filter(item => !banded.includes(item.code))
      : data
  }

  const loadTree = async (
    type: IUseAreasType = 'all',
    banded?: string[],
  ): Promise<IAreaNested[]> => {
    if (type === 'all') {
      return await loadData(type)
    }

    const flatten: string[] = []

    if (banded && banded.length) {
      banded.forEach((code) => {
        const codes = splitCode(code)

        if (codes.length > 1)
          codes.shift()

        flatten.push(...codes)
      })
    }

    const provinces = await loadData('province')

    if (type === 'province') {
      return withoutBanded(provinces, flatten)
    }

    const cities = await loadData('city')

    if (type === 'city') {
      return withoutBanded(provinces, flatten)
        .map((p) => {
          p.children = withoutBanded(cities, flatten).filter(c => c.code.startsWith(p.code))
          return p
        })
    }

    const areas = await loadData('area')

    return withoutBanded(provinces, flatten)
      .map((p) => {
        p.children = withoutBanded(cities, flatten).filter(c => c.code.startsWith(p.code)).map((c) => {
          c.children = withoutBanded(areas, flatten).filter(a => a.code.startsWith(c.code))
          return c
        })
        return p
      })
  }

  const getNames = (codeString: string, separator = '/'): string => {
    const names: string[] = []
    const codes: string[] = splitCode(codeString)

    if (codes.length > 0) {
      const [tree] = loadCache('all')

      const getArea = (data: IAreaNested[], code: string): IAreaNested | undefined => {
        return data.find(item => item.code === code)
      }

      if (codes.length >= 1)
        names.push(getArea(tree, codes[0])?.name || '')

      if (codes.length >= 2)
        names.push(getArea(getArea(tree, codes[0])?.children || [], codes[1])?.name || '')

      if (codes.length >= 3)
        names.push(getArea(getArea(getArea(tree, codes[0])?.children || [], codes[1])?.children || [], codes[2])?.name || '')

      if (codes.length === 4)
        names.push(getArea(getArea(getArea(getArea(tree, codes[0])?.children || [], codes[1])?.children || [], codes[2])?.children || [], codes[3])?.name || '')
    }

    return names.filter(name => name).join(separator)
  }

  return {
    init,
    loadTree,
    getNames,
  }
}
