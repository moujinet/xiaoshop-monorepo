import * as p from '@clack/prompts'
import * as color from 'picocolors'
import { CommandRunner } from 'nest-commander'

export abstract class BaseCommandRunner extends CommandRunner {
  /**
   * 执行步骤
   *
   * @param step 步骤名
   * @param executer 执行器
   * @returns 执行结果
   */
  async execute(step: string, executer: () => Promise<any>) {
    const spinner = p.spinner()

    spinner.start(color.cyan(`开始${step}...`))

    const result = await executer()

    spinner.stop(`${color.cyan(`${step}完成`)}   ${color.green('✓')}`)

    return result
  }
}
