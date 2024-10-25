import * as Prompt from '@clack/prompts'
import { capitalize, pascalCase } from 'es-toolkit/string'

import { toPath } from '@/utils'
import { loadModules } from '@/utils/loader'
import { AbstractSchematic } from '@/common/schematic'

export class ControllerSchematic extends AbstractSchematic {
  constructor() {
    super('Generate a Controller')
  }

  async prompts() {
    return {
      module: async () => Prompt.select({
        message: 'Pick a Module',
        options: await loadModules(),
      }),
      controllerName: () => Prompt.text({
        message: 'What is the controller name?',
        placeholder: 'i.e. user.admin => UserAdminController',
        validate: (value: string) => {
          if (value.length === 0) {
            return 'Controller name is required'
          }
          if (value.search(/^[a-z]/gi) === -1) {
            return 'Invalid Controller name, must be start with a letter.'
          }
        },
      }),
      isAdmin: () => Prompt.confirm({
        message: 'Is it an admin controller?',
        initialValue: true,
      }),
    }
  }

  async actions() {
    return [
      {
        type: 'add',
        template: 'controller/controller.ts.hbs',
        dest: '{{ modulePath }}/controller/{{ controllerPath }}.controller.ts',
      },
    ]
  }

  async dataTransform(data: Record<string, any>) {
    if (data.isAdmin) {
      data.apiPrefix = 'admin/'
    }

    if (data.controllerName.includes('.')) {
      const [domain] = data.controllerName
        .split('.')
        .map(
          (seg: string) => seg.trim(),
        )

      data.domainName = capitalize(domain)
      data.domainPath = domain.toLowerCase()
    }

    data.controllerPath = toPath(data.controllerName)
    data.controllerName = pascalCase(data.controllerName)

    return data
  }
}
