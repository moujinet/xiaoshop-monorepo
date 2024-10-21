import * as Prompt from '@clack/prompts'
import { pascalCase, snakeCase } from 'es-toolkit/string'

import { toPath } from '@/utils'
import { loadModules } from '@/utils/loader'
import { AbstractSchematic } from '@/common/schematic'

export class ModelSchematic extends AbstractSchematic {
  constructor() {
    super('Generate a Model')
  }

  async prompts() {
    return {
      module: async () => Prompt.select({
        message: 'Pick a Module',
        options: await loadModules(),
      }),
      modelName: () => Prompt.text({
        message: 'What is the model name?',
        placeholder: 'Input `default` to generate root model',
        initialValue: 'default',
        validate: (value: string) => {
          if (value.length === 0) {
            return 'Model name is required'
          }
          if (value.search(/^[a-z]/gi) === -1) {
            return 'Invalid Model name, must be start with a letter.'
          }
        },
      }),
      tableComment: () => Prompt.text({
        message: 'What is the comment of the table?',
        validate: (value: string) => {
          if (value.length === 0) {
            return 'Table comment is required'
          }
        },
      }),
    }
  }

  async actions() {
    return [
      {
        type: 'add',
        template: 'model/entity.ts.hbs',
        dest: '{{ modulePath }}/model/{{ modelPath }}entity.ts',
      },
      {
        type: 'add',
        template: 'model/interface.ts.hbs',
        dest: '{{ modulePath }}/model/{{ modelPath }}interface.ts',
      },
      {
        type: 'add',
        template: 'model/provider.ts.hbs',
        dest: '{{ modulePath }}/model/{{ modelPath }}provider.ts',
      },
      {
        type: 'add',
        template: 'model/repository.ts.hbs',
        dest: '{{ modulePath }}/model/{{ modelPath }}repository.ts',
      },
    ]
  }

  async dataTransform(data: Record<string, any>) {
    if (data.modelName === 'default') {
      data.model = data.moduleName
      data.modelPath = ''
      data.modelName = data.moduleName
      data.tableName = snakeCase(data.modelName)
    }
    else {
      data.model = data.modelName.toLowerCase()
      data.modelPath = `${toPath(data.modelName)}/`
      data.modelName = data.moduleName + pascalCase(data.modelName)
      data.tableName = snakeCase(data.modelName)
    }

    return data
  }
}
