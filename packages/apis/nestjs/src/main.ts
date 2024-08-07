import { mw } from 'request-ip'
import { NestFactory } from '@nestjs/core'
import { WinstonModule } from 'nest-winston'
import { ConfigService } from '@nestjs/config'
import { Logger, ValidationPipe } from '@nestjs/common'
import { apiReference } from '@scalar/nestjs-api-reference'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ExceptionsFilter, HttpExceptionsFilter, exceptionFactory } from '~/common/exception'
import { ResponseInterceptor } from '~/common/response/interceptors'
import { logger as winstonLogger } from '~/common/logger'
import { AppModule } from '~/app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      instance: winstonLogger,
    }),
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

  // Swagger
  if (config.get<boolean>('app.swagger')) {
    const swaggerOptions = new DocumentBuilder()
      .setTitle('XiaoShop API')
      .setDescription('The XiaoShop API Documentation')
      .setVersion('1.0.0')
      .addBearerAuth()
      .build()

    const document = SwaggerModule.createDocument(app, swaggerOptions)

    app.use(
      `${prefix}/reference`,
      apiReference({
        theme: 'saturn',
        hideDownloadButton: true,
        hideModels: true,
        cdn: 'https://cdn.jsdelivr.net/npm/@scalar/api-reference',
        metaData: {
          title: 'XiaoShop API',
        },
        spec: {
          content: document,
        },
      }),
    )
  }

  const port = config.get<number>('app.port')
  await app.listen(port)

  const logger = new Logger('Bootstrap')

  logger.log('服务启动成功，欢迎使用 XiaoShop')
  logger.log(`服务地址: http://localhost:${port}${prefix}/`)

  if (config.get<boolean>('app.swagger'))
    logger.log(`API Docs: http://localhost:${port}${prefix}/reference/`)

  console.log('\n')
}

bootstrap()
