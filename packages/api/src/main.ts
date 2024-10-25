import { mw } from 'request-ip'
import { NestFactory } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'
import { Logger, ValidationPipe } from '@nestjs/common'

import { Server } from './server'
import { ExceptionsFilter } from './common/filters'
import { exceptionFactory } from './common/exceptions'
import { ResponseInterceptor } from './common/interceptors'

async function bootstrap() {
  const server = await NestFactory.create(Server, {
    bufferLogs: true,
    cors: true,
  })

  const config = server.get(ConfigService)
  const prefix = config.get<string>('api.prefix')

  server.use(mw({ attributeName: 'ip' }))

  server.setGlobalPrefix(prefix)

  server.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    exceptionFactory,
  }))

  server.useGlobalFilters(new ExceptionsFilter())
  server.useGlobalInterceptors(new ResponseInterceptor())
  server.getHttpAdapter().getInstance().disable('x-powered-by')

  const port = config.get<number>('api.port')
  await server.listen(port)

  const logger = new Logger('Bootstrap')

  logger.log('服务启动成功，欢迎使用 XiaoShop')
  logger.log(`服务地址: http://localhost:${port}${prefix}/`)

  console.log('\n')
}

bootstrap()
