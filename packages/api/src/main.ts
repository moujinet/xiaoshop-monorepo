import { mw } from 'request-ip'
import { NestFactory } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'
import { Logger, ValidationPipe } from '@nestjs/common'
import { apiReference } from '@scalar/nestjs-api-reference'
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ExceptionsFilter, HttpExceptionsFilter } from '~/common/filters'
import { ResponseInterceptor } from '~/common/interceptors'
import { exceptionFactory } from '~/common/exceptions'
import { AppModule } from '~/app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  })

  const config = app.get(ConfigService)
  const prefix = config.get<string>('app.prefix')

  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER))

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
