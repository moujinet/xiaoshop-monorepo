import * as Prompt from '@clack/prompts'
import { capitalize } from 'es-toolkit/string'

import { loadModules } from '@/utils/loader'
import { AbstractSchematic } from '@/common/schematic'

export class ModuleSchematic extends AbstractSchematic {
  constructor() {
    super('Generate a Module')
  }

  async prompts() {
    return {
      module: () => Prompt.text({
        message: 'What is the name of the module?',
        validate: (value: string) => {
          if (value.length === 0) {
            return 'Module name is required'
          }
          if (value.search(/^[a-z]/gi) === -1) {
            return 'Invalid Module name, must be start with a letter.'
          }
        },
      }),
      isSubModule: () => Prompt.confirm({
        message: 'Is it a children module?',
        initialValue: false,
      }),
      parentModule: async ({ results }: { results: { isSubModule: boolean } }) => {
        if (results.isSubModule) {
          return Prompt.select({
            message: 'Pick a parent module',
            options: await loadModules(),
          })
        }
      },
      MODULE_NAME: () => Prompt.text({
        message: 'What is the name of the module(MODULE_NAME)?',
        initialValue: '',
      }),
    }
  }

  async actions() {
    return [
      {
        type: 'add',
        template: 'module/constants.ts.hbs',
        dest: '{{ modulePath }}/constants.ts',
      },
      {
        type: 'add',
        template: 'setting/settings.ts.hbs',
        dest: '{{ modulePath }}/settings.ts',
      },
      {
        type: 'add',
        template: 'module/module.ts.hbs',
        dest: '{{ modulePath }}/module.ts',
      },
      {
        type: 'add',
        dest: '{{ modulePath }}/controller',
      },
      {
        type: 'add',
        dest: '{{ modulePath }}/domain',
      },
      {
        type: 'add',
        dest: '{{ modulePath }}/dto',
      },
      {
        type: 'add',
        dest: '{{ modulePath }}/model',
      },
    ]
  }

  async dataTransform(data: Record<string, any>) {
    if (data.isSubModule) {
      data.moduleName = capitalize(data.parentModule) + capitalize(data.module)
      data.modulePath = `${data.parentModule}/${data.module}`
    }
    else {
      data.moduleName = capitalize(data.module)
      data.modulePath = data.module
    }

    data.MODULE_NAME = data.MODULE_NAME || data.moduleName

    return data
  }
}
