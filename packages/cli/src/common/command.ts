import { Command } from 'commander'

export abstract class AbstractCommand {
  /**
   * Load Command
   *
   * @param program Command
   */
  abstract load(program: Command): void
}
