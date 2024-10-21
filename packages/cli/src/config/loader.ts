import defu from 'defu'

import { Console } from '@/utils/console'
import { readAnyOf, readFile } from '@/utils/file'

import { ConfigPath } from './path'
import { defaultConfig, supportedConfigFileNames } from './defaults'

const cached = new Map<string, IConfig>()

export class ConfigLoader {
  load(name?: string): IConfig {
    const cacheKey = name || 'default'

    if (cached.has(cacheKey))
      return cached.get(cacheKey)!

    let loaded: IConfig | undefined

    const contentOrError = name
      ? readFile(name)
      : readAnyOf(supportedConfigFileNames)

    if (contentOrError) {
      const isError = !contentOrError || contentOrError.startsWith('ERROR:')

      if (isError) {
        Console.warn(contentOrError || 'Read Config Failed.')
      }
      else {
        const config = JSON.parse(contentOrError)

        loaded = ConfigPath.resolveConfig(defu(config, defaultConfig))
      }
    }
    else {
      loaded = ConfigPath.resolveConfig(defaultConfig)
    }

    if (loaded)
      cached.set(cacheKey, loaded)

    return loaded!
  }
}
