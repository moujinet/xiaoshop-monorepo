import helmet from 'helmet'
import { mw } from 'request-ip'
import { NestFactory } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'
import { Logger, ValidationPipe } from '@nestjs/common'

import { AppModule } from '~/app.module'
import { exceptionFactory } from '~/common/exceptions'
import { ResponseInterceptor } from '~/common/interceptors'
import { ExceptionsFilter, HttpExceptionsFilter } from '~/common/filters'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
    cors: true,
  })

  const config = app.get(ConfigService)
  const prefix = config.get<string>('app.prefix')

  app.setGlobalPrefix(prefix)

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
    exceptionFactory,
  }))

  app.useGlobalFilters(new ExceptionsFilter())
  app.useGlobalFilters(new HttpExceptionsFilter())
  app.useGlobalInterceptors(new ResponseInterceptor())

  // Request IP
  app.use(mw({ attributeName: 'ip' }))

  // Helmet
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        'script-src': ['\'self\'', 'cdn.jsdelivr.net'],
      },
    },
  }))

  const port = config.get<number>('app.port')
  await app.listen(port)

  const logger = new Logger('Bootstrap')

  logger.log('服务启动成功，欢迎使用 XiaoShop')
  logger.log(`服务地址: http://localhost:${port}${prefix}/`)

  console.log('\n')
}

bootstrap()
