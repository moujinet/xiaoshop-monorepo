import type { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { UploadModule } from '@/upload/upload.module'
import { cleanDirs, createNestApplication } from '~~/tests/application'
import { EXCEPTION_BAD_REQUEST } from '~/common/exception'

describe('Upload Module', () => {
  let app: INestApplication

  beforeAll(async () => {
    await cleanDirs([
      'upload-test/**/*',
    ])

    app = await createNestApplication([
      UploadModule,
    ])
    await app.init()
  })

  afterAll(async () => {
    await app.close()
  })

  describe('Image', () => {
    it('Upload Image', async () => {
      return await request(app.getHttpServer())
        .post('/upload/image')
        .attach('file', 'tests/upload/fixtures/image/pass/1.jpg')
        .expect(200)
        .then(({ body }) => {
          expect(body.code).toEqual(0)
        })
    })

    it('Upload Image Throw BadRequestException (deny mimetype)', async () => {
      return await request(app.getHttpServer())
        .post('/upload/image')
        .attach('file', 'tests/upload/fixtures/image/failed/bad-mimetype.avif')
        .expect(200)
        .then(({ body }) => {
          expect(body.code).toEqual(EXCEPTION_BAD_REQUEST)
          expect(body).toMatchInlineSnapshot(`
{
  "code": 1001,
  "error": "Validation failed (expected type is /(jpg|jpeg|png|gif)$/)",
  "message": "请求参数错误",
}
`)
        })
    })

    it('Upload Image Throw BadRequestException (max filesize)', async () => {
      return await request(app.getHttpServer())
        .post('/upload/image')
        .attach('file', 'tests/upload/fixtures/image/failed/file-size-limit.jpg')
        .expect(200)
        .then(({ body }) => {
          expect(body).toMatchInlineSnapshot(`
{
  "code": 1001,
  "error": "文件大小超过限制",
  "message": "文件上传失败",
}
`)
          expect(body.code).toEqual(EXCEPTION_BAD_REQUEST)
        })
    })
  })

  describe('Video', () => {
    it('Upload Video', async () => {
      return await request(app.getHttpServer())
        .post('/upload/video')
        .attach('file', 'tests/upload/fixtures/video/pass/1.mp4')
        .expect(200)
        .then(({ body }) => {
          expect(body.code).toEqual(0)
        })
    })

    it('Upload Video Throw BadRequestException', async () => {
      return await request(app.getHttpServer())
        .post('/upload/video')
        .attach('file', 'tests/upload/fixtures/image/failed/bad-mimetype.avif')
        .expect(200)
        .then(({ body }) => {
          expect(body.code).toEqual(EXCEPTION_BAD_REQUEST)
          expect(body).toMatchInlineSnapshot(`
{
  "code": 1001,
  "error": "Validation failed (expected type is /(mp4)$/)",
  "message": "请求参数错误",
}
`)
        })
    })
  })
})
