import type {
  ILocationCode,
  ILocationNested,
  ILocationPath,
} from '@xiaoshop/schema'
import axios from 'axios'

type IUseLocationKeys = 'all' | 'province' | 'city' | 'area'

type IUseLocationCacheReturns = [
  /**
   * 地区信息
   */
  ILocationNested[],
  /**
   * 更新地区信息
   *
   * @param data ILocationNested[]
   */
  (data: ILocationNested[]) => void,
]

interface IUseLocationLoaderReturns {
  /**
   * 初始化
   */
  init: () => void
  /**
   * 加载数据
   *
   * @param type IUseLocationKeys
   * @returns Promise<ILocationNested[]>
   */
  load: (type: IUseLocationKeys) => Promise<ILocationNested[]>
}

interface IUseLocationReturns {
  /**
   * 加载地区树
   *
   * @param key IUseLocationKeys
   * @param banded ILocationCode[]
   * @returns Promise<ILocationNested[]>
   */
  loadTree: (key: IUseLocationKeys, banded?: ILocationCode[]) => Promise<ILocationNested[]>
  /**
   * 将地区编码转换为地区路径字典
   *
   * @param code ILocationCode | ILocationCode[] | ILocationPath
   * @returns ILocationPath
   */
  toPath: (code: ILocationCode | ILocationCode[] | ILocationPath) => ILocationPath
  /**
   * 将地区编码转换为地区路径名称
   *
   * @param code ILocationCode | ILocationCode[] | ILocationPath
   * @param separator string
   * @returns string
   */
  toName: (code: ILocationCode | ILocationCode[] | ILocationPath, separator?: string) => string
}

/**
 * 从缓存加载地区信息
 *
 * @param key IUseLocationKeys
 * @returns IUseLocationCacheReturns
 */
export function useLocationCache(key: IUseLocationKeys): IUseLocationCacheReturns {
  const fullKey = `location.${key}`
  const cache = JSON.parse(localStorage.getItem(fullKey) || '[]')

  return [
    cache as ILocationNested[],
    (data: ILocationNested[]) => localStorage.setItem(fullKey, JSON.stringify(data)),
  ]
}

/**
 * 加载地区信息
 *
 * @returns IUseLocationLoaderReturns
 */
export function useLocationLoader(): IUseLocationLoaderReturns {
  const load = async (type: IUseLocationKeys): Promise<ILocationNested[]> => {
    const [cache, setCache] = useLocationCache(type)

    if (cache && cache.length > 0)
      return cloneDeep(cache)

    const { data } = await axios.create().get<ILocationNested[]>(`/js/pca/${type}.json`)

    if (data.length > 0)
      setCache(data)

    return cloneDeep(data)
  }

  const init = async () => {
    Promise.race([
      load('all'),
      load('province'),
      load('city'),
      load('area'),
    ])
  }

  return {
    init,
    load,
  }
}

/**
 * 地区信息
 */
export function useLocation(): IUseLocationReturns {
  /**
   * 分割地区编码
   *
   * @param code ILocationCode
   * @returns ILocationCode[]
   */
  const splitCode = (code: ILocationCode): ILocationCode[] => {
    if (code.includes(','))
      return code.split(',')

    const codes: ILocationCode[] = []
    // 省级
    if (code.length > 0)
      codes.push(code.substring(0, 2))
    // 地级
    if (code.length > 0)
      codes.push(code.substring(0, 4))
    // 县级
    if (code.length > 0) {
      // 县级市处理: 广东省中山市(4420), 广东省东莞市(4419), 海南省儋州市(4604)
      codes.push(code.substring(
        0,
        (code.startsWith('4420') || code.startsWith('4419') || code.startsWith('4604'))
          ? 9
          : 6,
      ))
    }
    // 乡级
    if (code.length > 0)
      codes.push(code)

    return codes
  }

  /**
   * 去除禁用的地区
   *
   * @param data ILocationNested[]
   * @param banded ILocationCode[]
   * @returns ILocationNested[]
   */
  const withoutBanded = (
    data: ILocationNested[],
    banded?: ILocationCode[],
  ): ILocationNested[] => {
    return banded && banded.length
      ? data.filter(item => !banded.includes(item.code))
      : data
  }

  async function loadTree(key: IUseLocationKeys = 'all', banded?: ILocationCode[]): Promise<ILocationNested[]> {
    const { load } = useLocationLoader()

    if (key === 'all')
      return await load(key)

    const flatten: ILocationCode[] = []

    if (banded && banded.length) {
      banded.forEach((code) => {
        const codes = splitCode(code)

        if (codes.length > 1)
          codes.shift()

        flatten.push(...codes)
      })
    }

    const provinces = await load('province')

    if (key === 'province') {
      return withoutBanded(provinces, flatten)
    }

    const cities = await load('city')

    if (key === 'city') {
      return withoutBanded(provinces, flatten)
        .map((p) => {
          p.children = withoutBanded(cities, flatten).filter(c => c.code.startsWith(p.code))
          return p
        })
    }

    const areas = await load('area')

    return withoutBanded(provinces, flatten)
      .map((p) => {
        p.children = withoutBanded(cities, flatten).filter(c => c.code.startsWith(p.code))
          .map((c) => {
            c.children = withoutBanded(areas, flatten).filter(a => a.code.startsWith(c.code))
            return c
          })
        return p
      })
  }

  // '442000118016' => ['44', '4420', '442000118', '442000118016']
  function toPath(code: ILocationCode | ILocationCode[] | ILocationPath): ILocationPath {
    const userCode = cloneDeep(code)
    const [tree] = useLocationCache('all')
    const path: ILocationPath = []
    const codes = Array.isArray(userCode)
      ? (typeof userCode[0] === 'string' ? userCode : (userCode as ILocationPath).map(c => c.code)) as ILocationCode[]
      : splitCode(userCode)

    const findLocation = (nested: ILocationNested[], codes: ILocationCode[]) => {
      if (codes.length > 0) {
        const code = codes.shift()

        nested.forEach((item) => {
          if (item.code === code) {
            path.push({ code, name: item.name })

            if (codes.length > 0 && item.children && item.children.length > 0) {
              findLocation(item.children, codes)
            }
          }
        })
      }

      return path
    }

    return findLocation(tree, codes)
  }

  function toName(code: ILocationCode | ILocationCode[] | ILocationPath, separator?: string): string {
    const userCode = cloneDeep(code)
    const path = Array.isArray(userCode)
      ? typeof userCode[0] === 'string' ? toPath(userCode) : userCode as ILocationPath
      : toPath(userCode)
    return path.map(p => p.name).join(separator || '/')
  }

  return {
    loadTree,
    toName,
    toPath,
  }
}
