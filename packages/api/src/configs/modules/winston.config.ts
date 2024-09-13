import type {
  WinstonModuleOptions,
  WinstonModuleOptionsFactory,
} from 'nest-winston'

import 'winston-daily-rotate-file'
import { utilities } from 'nest-winston'
import { Injectable } from '@nestjs/common'
import { format, transports } from 'winston'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class WinstonModuleConfig implements WinstonModuleOptionsFactory {
  constructor(
    private readonly config: ConfigService,
  ) {}

  createWinstonModuleOptions(): WinstonModuleOptions {
    const dirname = this.config.get('logger.dest')

    const useConsole = this.config.get<boolean>('logger.console')
    const useDebug = this.config.get<boolean>('logger.debug')

    const transportsOptions: WinstonModuleOptions['transports'] = []

    const fileLoggerOptions = {
      dirname,
      datePattern: 'YYYY-MM-DD',
      maxFiles: '14d',
      maxSize: '20m',
      zippedArchive: true,
      format: format.combine(
        format.timestamp({
          format: 'YYYY/MM/DD HH:mm:ss',
        }),
        format.ms(),
        utilities.format.nestLike('XiaoShop', {
          colors: false,
          prettyPrint: true,
          processId: true,
          appName: false,
        }),
      ),
    }

    if (useConsole) {
      transportsOptions.push(new transports.Console({
        level: 'silly',
        format: format.combine(
          format.timestamp({
            format: 'YYYY/MM/DD HH:mm:ss',
          }),
          format.ms(),
          utilities.format.nestLike('XiaoShop', {
            colors: true,
            prettyPrint: true,
            processId: true,
            appName: true,
          }),
        ),
      }))
    }

    if (useDebug) {
      transportsOptions.push(
        new transports.DailyRotateFile({
          level: 'debug',
          filename: 'debug-%DATE%.log',
          ...fileLoggerOptions,
        }),
      )
    }

    return {
      transports: [
        ...transportsOptions,

        // Error Logger -> <LOG_DIR>/errors-<YYYY-MM-DD>.log
        new transports.DailyRotateFile({
          level: 'warn',
          filename: 'errors-%DATE%.log',
          ...fileLoggerOptions,
        }),
      ],
    }
  }
}
