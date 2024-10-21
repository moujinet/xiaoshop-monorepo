import { join } from 'node:path'

import { renderString } from '@/utils/template/render'

export class ConfigPath {
  static paths: Record<IConfigPath, string> = {
    CWD: process.cwd(),
    CLI: join(process.cwd(), 'node_modules', '@xiaoshop', 'cli'),
    SRC: join(process.cwd(), 'src'),
  }

  static resolveConfig(config: IConfig): IConfig {
    ConfigPath.paths.SRC = join(process.cwd(), config.sourceRoot)
    config.sourceRoot = ConfigPath.paths.SRC
    config.moduleRoot = ConfigPath.resolve(config.moduleRoot)

    for (const key in config.typeorm) {
      config.typeorm[key] = ConfigPath.resolve(config.typeorm[key])
    }

    return config
  }

  static resolve(path: string): string {
    return renderString(path, ConfigPath.paths)
  }
}
