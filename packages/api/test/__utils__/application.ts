import { mw } from 'request-ip'
import { ValidationPipe } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'

import { Server } from '~/server'
import { ExceptionsFilter } from '~/common/filters'
import { exceptionFactory } from '~/common/exceptions'
import { ResponseInterceptor } from '~/common/interceptors'

import { useRequest } from './request'
import { getTableName, runSQL, sleep, truncateTable } from './tools'

export async function createTestingApplicationWithoutInit() {
  if (!globalThis.__APP__) {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        Server,
      ],
    }).compile()

    const app = module.createNestApplication()

    app.use(mw({ attributeName: 'ip' }))

    app.useGlobalPipes(new ValidationPipe({
      transform: true,
      whitelist: true,
      exceptionFactory,
    }))

    app.useGlobalFilters(new ExceptionsFilter())
    app.useGlobalInterceptors(new ResponseInterceptor())
    app.getHttpAdapter().getInstance().disable('x-powered-by')

    await app.init()

    globalThis.__APP__ = app
  }

  return globalThis.__APP__
}

export async function createTestingApplication() {
  const app = await createTestingApplicationWithoutInit()

  await truncateTable([
    'system_settings',
    'system_user',
    'system_log',
  ])

  await runSQL([
    // Settings
    `INSERT INTO \`${getTableName('system_settings')}\` (\`key\`, \`value\`) VALUES
    ('asset.customDomain', ''),
    ('asset.upload.maxFileSizeImage', '2500'),
    ('asset.upload.maxFileSizeVideo', '10000'),
    ('asset.upload.maxFileSizeFile', '20000'),
    ('asset.storage.aliyun.enable', '0'),
    ('asset.storage.aliyun.accessKeyID', ''),
    ('asset.storage.aliyun.accessKeySecret', ''),
    ('asset.storage.aliyun.bucket', ''),
    ('asset.storage.aliyun.endpoint', ''),
    ('asset.storage.aliyun.enableCustomDomain', '0'),
    ('asset.storage.aliyun.customDomain', ''),
    ('asset.image.enableCompress', '1'),
    ('asset.image.compressQuality', '90'),
    ('asset.image.enableThumbnail', '1'),
    ('asset.image.thumbnailLargeWidth', '800'),
    ('asset.image.thumbnailLargeHeight', '800'),
    ('asset.image.thumbnailMediumWidth', '400'),
    ('asset.image.thumbnailMediumHeight', '400'),
    ('asset.image.thumbnailSmallWidth', '100'),
    ('asset.image.thumbnailSmallHeight', '100'),
    ('asset.image.enableWatermark', '1'),
    ('asset.image.watermarkType', 'text'),
    ('asset.image.watermarkOpacity', '60'),
    ('asset.image.watermarkTextValue', 'XiaoShop'),
    ('asset.image.watermarkTextSize', '16'),
    ('asset.image.watermarkTextColor', '#000000'),
    ('asset.image.watermarkTextPosition', 'center'),
    ('asset.image.watermarkTextX', '10'),
    ('asset.image.watermarkTextY', '10'),
    ('asset.image.watermarkImageSrc', ''),
    ('asset.image.watermarkImagePosition', 'center'),
    ('asset.image.watermarkImageRatio', '20'),
    ('asset.image.watermarkImageX', '10'),
    ('asset.image.watermarkImageY', '10'),
    ('system.log.cleanup.enable', '1'),
    ('system.log.cleanup.period', '90'),
    ('system.auth.login.captchaLength', '4'),
    ('system.auth.login.captchaRetryTimes', '5'),
    ('system.auth.security.passwordLength', '6'),
    ('system.auth.security.passwordStrength', '["number", "lower"]'),
    ('system.auth.security.passwordRetryTimes', '5'),
    ('system.auth.security.unlockAdminAfter', '30')`,

    // Admin User
    `INSERT INTO \`${getTableName('system_user')}\` (\`is_admin\`, \`status\`, \`username\`, \`name\`, \`password\`, \`salt\`) VALUES (1, 1, 'admin', 'Admin', '$2b$10$6HjLrj5a0Jefr12T.76SRe/5AISF0uVaCaoL0grW.4mKBI/393zNO', '$2b$10$6HjLrj5a0Jefr12T.76SRe')`,
  ])

  await useRequest('post', '/admin/login')
    .send({
      username: 'admin',
      password: 'admin123',
    })
    .then(async ({ body }) => {
      globalThis.__TOKEN__ = body.data.token

      await sleep(10)
    })

  return app
}
