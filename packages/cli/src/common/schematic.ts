import { mkdirp } from 'mkdirp'
import { dirname } from 'node:path'
import { group } from '@clack/prompts'
import { pascalCase } from 'es-toolkit/string'
import { existsSync, writeFileSync } from 'node:fs'

import { loadConfig } from '@/config'
import { readFile } from '@/utils/file'
import { Console } from '@/utils/console'
import { renderString, renderTemplate } from '@/utils/template/render'

export abstract class AbstractSchematic implements ISchematic {
  constructor(readonly name: string) {
    Console.info(name)
  }

  async handle() {
    try {
      const prompts = await this.handlePrompts()
      const actions = await this.handleActions(prompts)

      Console.onDebug(() => {
        Console.note(JSON.stringify(actions, null, 2), 'Templates')
        Console.note(JSON.stringify(prompts, null, 2), 'Data')
      })

      await this.generate(actions, prompts)
    }
    catch (e) {
      Console.error(e)
    }
  }

  async generate(actions: ISchematicAction[], data: Record<string, any>) {
    const cwd = process.cwd()
    const { moduleRoot } = loadConfig()

    Console.onDebug(() => {
      Console.note(
        JSON.stringify(
          actions.map(action => `${moduleRoot}/${action.dest}`.replace(cwd, '.')),
          null,
          2,
        ),
        'Destinations',
      )
    })

    for (const action of actions) {
      if (('isActive' in action) && action.isActive!(data) !== true)
        continue

      const dest = `${moduleRoot}/${action.dest}`
      const destDir = dest.includes('.ts') ? dirname(dest) : dest

      Console.step.start(
        '%s %s ...',
        action.type === 'add' ? 'Generate' : 'Modify',
        action.dest,
      )

      if (action.type === 'add' && existsSync(dest)) {
        Console.step.skip(
          `${pascalCase(action.dest.replace('.ts', ''))} %s is already exists.`,
          dest.replace(cwd, '.'),
        )

        continue
      }

      if (!existsSync(destDir))
        await mkdirp(destDir)

      if (action.template) {
        if (action.type === 'add') {
          const content = renderTemplate(action.template, {
            ...data,
            isNew: true,
          })

          if (!content) {
            Console.step.fail(
              'Template %s not found.',
              action.template.replace(cwd, '.'),
            )

            continue
          }

          writeFileSync(dest, content, 'utf-8')
        }

        if (action.type === 'update') {
          let content = renderTemplate(action.template, {
            ...data,
            isNew: !existsSync(dest),
          })

          if (!content) {
            Console.step.fail(
              'Template %s not found.',
              action.template.replace(cwd, '.'),
            )

            continue
          }

          if (existsSync(dest)) {
            const oldContent = readFile(dest, false) || ''
            content = `${oldContent}\n${content}`
          }

          writeFileSync(dest, content, 'utf-8')
        }
      }

      Console.step.success(
        'Generated %s done.',
        dest.replace(cwd, '.'),
      )
    }
  }

  async dataTransform(
    data: Record<string, any>,
  ): Promise<Record<string, any>> {
    return data
  }

  private async handlePrompts(): Promise<Record<string, any>> {
    const prompts = await group(
      await this.prompts(),
      {
        onCancel: () => {
          Console.cancel('Operation Cancelled.')
          process.exit(0)
        },
      },
    )

    const data: Record<string, any> = {
      ...prompts,
    }

    if (data.module) {
      const module = (data.module as string).trim()

      if (module.includes('/')) {
        data.topModulePath = module.split('/')[0]?.trim()
        data.topModuleAlias = `@/${data.topModulePath}`
        data.topModuleName = pascalCase(data.topModulePath)
      }
      else {
        data.topModulePath = module
        data.topModuleAlias = `@/${module}`
        data.topModuleName = pascalCase(module)
      }

      data.moduleAlias = `@/${module}`
      data.modulePath = module
      data.moduleName = pascalCase(module)
    }

    return this.dataTransform(data)
      .then((data) => {
        const sorted: Record<string, any> = {}
        const blacklist = ['module']

        Object.keys(data)
          .filter(key => blacklist.includes(key) === false)
          .sort()
          .forEach((key) => {
            sorted[key] = data[key]
          })

        return sorted
      })
  }

  private async handleActions(prompts: Record<string, any>): Promise<ISchematicAction[]> {
    return this.actions().then(
      (actions) => {
        return actions.map((action) => {
          return {
            ...action,
            dest: renderString(action.dest, prompts),
          }
        })
      },
    )
  }

  abstract prompts(): Promise<Record<string, any>>

  abstract actions(): Promise<ISchematicAction[]>
}
