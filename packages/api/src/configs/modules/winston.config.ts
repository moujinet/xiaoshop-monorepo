import type {
  WinstonModuleOptions,
  WinstonModuleOptionsFactory,
} from 'nest-winston'
import { ConfigService } from '@nestjs/config'
import { format, transports } from 'winston'
import { Injectable } from '@nestjs/common'
import { utilities } from 'nest-winston'
import 'winston-daily-rotate-file'

@Injectable()
export class WinstonModuleConfig implements WinstonModuleOptionsFactory {
  constructor(
    private readonly config: ConfigService,
  ) {}

  createWinstonModuleOptions(): WinstonModuleOptions {
    const dirname = this.config.get('logger.dest')

    return {
      transports: [
        // Console Logger
        new transports.Console({
          level: 'silly',
          format: format.combine(
            format.timestamp(),
            format.ms(),
            utilities.format.nestLike('XiaoShop', {
              colors: true,
              prettyPrint: true,
              processId: true,
              appName: true,
            }),
          ),
        }),

        // Error Logger -> <LOG_DIR>/application-<YYYY-MM-DD>.log
        new transports.DailyRotateFile({
          level: 'warn',
          dirname,
          filename: 'application-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          maxFiles: '14d',
          maxSize: '20m',
          zippedArchive: true,
          format: format.combine(
            format.timestamp(),
            format.ms(),
            utilities.format.nestLike('XiaoShop', {
              colors: false,
              prettyPrint: false,
              processId: true,
              appName: true,
            }),
          ),
        }),

        // Info Logger -> <LOG_DIR>/info-<YYYY-MM-DD>.log
        new transports.DailyRotateFile({
          level: 'info',
          dirname,
          filename: 'info-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          maxFiles: '14d',
          maxSize: '20m',
          zippedArchive: true,
          format: format.combine(
            format.timestamp(),
            format.ms(),
            utilities.format.nestLike('XiaoShop', {
              colors: false,
              prettyPrint: false,
              processId: true,
              appName: true,
            }),
          ),
        }),
      ],
    }
  }
}
