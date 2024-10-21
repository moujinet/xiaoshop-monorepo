import * as Prompt from '@clack/prompts'

import { loadModules } from '@/utils/loader'
import { AbstractSchematic } from '@/common/schematic'

export class SettingSchematic extends AbstractSchematic {
  constructor() {
    super('Generate a Module settings file')
  }

  async prompts() {
    return {
      module: async () => Prompt.select({
        message: 'Pick a Module',
        options: await loadModules(),
      }),
    }
  }

  async actions() {
    return [
      {
        type: 'add',
        template: 'setting/settings.ts.hbs',
        dest: '{{ modulePath }}/settings.ts',
      },
    ]
  }
}
