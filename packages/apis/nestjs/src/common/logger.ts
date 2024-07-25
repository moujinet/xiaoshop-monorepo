import { createLogger, format, transports } from 'winston'
import { utilities } from 'nest-winston'

const options = {
  file: {
    filename: './logs/error.log',
    level: 'error',
    handleExceptions: true,
  },
  console: {
    level: 'silly',
  },
}

const devLogger = {
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
  transports: [
    new transports.Console(options.console),
  ],
}

const prodLogger = {
  format: format.combine(
    format.timestamp(),
    format.ms(),
    format.splat(),
    utilities.format.nestLike('XiaoShop', {
      colors: false,
      prettyPrint: false,
      processId: true,
      appName: true,
    }),
  ),
  transports: [
    new transports.File(options.file),
    new transports.File({
      filename: './logs/combine.log',
      level: 'info',
    }),
  ],
}

export const logger = createLogger(process.env.NODE_ENV === 'production' ? prodLogger : devLogger)
