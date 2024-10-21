import { format } from 'node:util'
import * as color from 'picocolors'
import * as p from '@clack/prompts'

export const isDebug
  = process.argv.includes('-d')
  || process.argv.includes('--debug')
  || process.env.DEBUG !== undefined

const spinner = p.spinner()

export const Console = {
  print: (msg: string | any, ...args: any[]) => {
    console.log(msg, ...args)
  },

  info: (msg: string | any, ...args: any[]) => {
    p.log.info(format(msg, ...args.map(arg => color.cyan(arg))))
  },

  warn: (msg: string | any, ...args: any[]) => {
    p.log.warn(format(msg, ...args.map(arg => color.yellowBright(arg))))
  },

  error: (msg: string | any, ...args: any[]) => {
    if (msg instanceof Error) {
      p.log.error(color.red(msg.message))

      if (isDebug && msg.stack) {
        Console.note(msg.stack)
      }
    }
    else {
      p.log.error(format(msg, ...args.map(arg => color.red(arg))))
    }
  },

  step: {
    start: (msg: string, ...args: any[]) => {
      spinner.start(`${color.magenta(format(msg, ...args.map(arg => color.greenBright(arg))))} ...`)
    },
    done: (msg: string, ...args: any[]) => {
      spinner.stop(`${color.blueBright(format(msg, ...args.map(arg => color.greenBright(arg))))} Done.`)
    },
    success: (msg: string, ...args: any[]) => {
      spinner.stop(`${format(msg, ...args.map(arg => color.greenBright(arg)))}    ${color.green('✓')}`)
    },
    fail: (msg: string, ...args: any[]) => {
      spinner.stop(`${format(msg, ...args.map(arg => color.red(arg)))}    ${color.red('✕')}`)
    },
    skip: (msg: string, ...args: any[]) => {
      spinner.stop(`${format(msg, ...args.map(arg => color.cyan(arg)))}    ${color.yellow('☻')}`)
    },
  },

  success: (msg: string | any, ...args: any[]) => {
    p.log.success(format(msg, ...args.map(arg => color.blueBright(arg))))
  },

  fail: (msg: string | any, ...args: any[]) => {
    p.log.error(format(msg, ...args.map(arg => color.redBright(arg))))
  },

  cancel: (msg: string | any, ...args: any[]) => {
    p.cancel(format(msg, ...args.map(arg => color.yellowBright(arg))))
  },

  note: (message: string, title?: string) => {
    p.note(message, title)
  },

  onDebug: (fn: () => void) => {
    if (isDebug) {
      fn()
    }
  },
}
