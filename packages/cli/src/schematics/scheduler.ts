import * as Prompt from '@clack/prompts'

import { loadModules } from '@/utils/loader'
import { AbstractSchematic } from '@/common/schematic'

export class SchedulerSchematic extends AbstractSchematic {
  constructor() {
    super('Generate a Module Scheduler Service')
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
        template: 'scheduler/scheduler.ts.hbs',
        dest: '{{ modulePath }}/scheduler.ts',
      },
    ]
  }
}
