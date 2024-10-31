import { glob } from 'glob'
import { join } from 'node:path'
import * as color from 'picocolors'
import { pascalCase } from 'es-toolkit/string'

import { loadConfig } from '@/config'

interface ISelectOptions {
  value: string
  label: string
  hint?: string
}

export async function loadModules(): Promise<ISelectOptions[]> {
  const config = loadConfig()
  const modules = await glob('**/module.ts', {
    cwd: config.moduleRoot,
  }).then(
    (files) => {
      const skips = ['system/dict']

      return files
        .filter(
          file => skips.every(
            skip => !file.startsWith(skip),
          ),
        )
        .map(
          (file) => {
            const value = file.replace(/\/module\.ts$/, '')
            const label = pascalCase(file.replace(/\.ts$/, ''))
            const hint = value.includes('/')
              ? `${color.cyan(`${pascalCase(value.split('/').shift() || '')}Module`)} ⇢ ${color.cyan(label)}`
              : undefined

            return {
              value,
              label,
              hint,
            }
          },
        )
        .sort(
          (a, b) => a.value.localeCompare(b.value),
        )
    },
  )

  return modules
}

export async function loadTopModules(): Promise<ISelectOptions[]> {
  return loadModules().then(
    modules => modules.filter(
      module => module.hint === undefined,
    ),
  )
}

export async function loadModels(module: string): Promise<ISelectOptions[]> {
  const config = loadConfig()
  const providers = await glob('**/provider.ts', {
    cwd: join(config.moduleRoot, module),
  }).then(
    (files) => {
      return files.map(
        (file) => {
          const isDefault = file.endsWith('model/provider.ts')
          const value = isDefault
            ? module.includes('/') ? module.split('/').pop() as string : module
            : file.replace(/(model\/)|(\/provider\.ts)/g, '')
          const label = isDefault ? pascalCase(module) : `${pascalCase(module) + pascalCase(value)}`

          return {
            value,
            label,
            hint: value,
          }
        },
      ).sort(
        (a, b) => a.value.localeCompare(b.value),
      )
    },
  )

  return providers
}
