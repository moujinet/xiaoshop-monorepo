import * as Prompt from '@clack/prompts'
import { capitalize } from 'es-toolkit/string'

import { AbstractSchematic } from '@/common/schematic'
import { loadModels, loadModules } from '@/utils/loader'

export class DomainSchematic extends AbstractSchematic {
  constructor() {
    super('Generate a new Domain')
  }

  async prompts() {
    return {
      module: async () => Prompt.select({
        message: 'Pick a Module',
        options: await loadModules(),
      }),
      model: async ({ results }: { results: { module: string } }) => {
        return Prompt.select({
          message: 'Pick a Model',
          options: await loadModels(results.module),
        })
      },
      domainName: () => Prompt.text({
        message: 'What is the domain name?',
        validate: (value: string) => {
          if (value.length === 0) {
            return 'Domain name is required'
          }
          if (value.search(/^[a-z]/gi) === -1) {
            return 'Invalid Domain name, must be start with a letter.'
          }
        },
      }),
      needAdminController: () => Prompt.confirm({
        message: 'Need an admin controller?',
        initialValue: true,
      }),
    }
  }

  async actions() {
    return [
      {
        type: 'add',
        template: 'domain/controller.ts.hbs',
        dest: '{{ modulePath }}/controller/{{ domainPath }}/admin.controller.ts',
        isActive: (data: Record<string, any>) => !!data.needAdminController,
      },
      {
        type: 'add',
        template: 'domain/service.ts.hbs',
        dest: '{{ modulePath }}/domain/{{ domainPath }}/service.ts',
      },
      {
        type: 'add',
        template: 'domain/events.ts.hbs',
        dest: '{{ modulePath }}/domain/{{ domainPath }}/events.ts',
      },
      {
        type: 'update',
        template: 'domain/request.ts.hbs',
        dest: '{{ modulePath }}/dto/request.ts',
      },
      {
        type: 'update',
        template: 'domain/payload.ts.hbs',
        dest: '{{ modulePath }}/dto/payload.ts',
      },
    ]
  }

  async dataTransform(data: Record<string, any>) {
    data.domain = data.domainName.toLowerCase()
    data.domainName = data.topModuleName + capitalize(data.domainName)
    data.domainPath = data.domain

    if (data.needAdminController) {
      data.apiPrefix = 'admin/'
    }

    return data
  }
}
