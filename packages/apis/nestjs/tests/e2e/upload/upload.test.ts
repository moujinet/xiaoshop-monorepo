import { cleanDirs, getRequest } from '~~/tests/utils'
import { EXCEPTION_BAD_REQUEST } from '~/common/exception'

describe('Upload Module', () => {
  beforeAll(async () => {
    await cleanDirs([
      'upload-test/**/*',
    ])
  })

  it('Upload Image', async () => {
    const { body } = await getRequest('post', '/upload/image', true)
      .attach('file', 'tests/e2e/upload/__fixtures__/image/pass/1.jpg')
      .expect(200)

    expect(body.code).toEqual(0)
  })

  it('Upload Image Throw BadRequestException (deny mimetype)', async () => {
    const { body } = await getRequest('post', '/upload/image', true)
      .attach('file', 'tests/e2e/upload/__fixtures__/image/failed/bad-mimetype.avif')
      .expect(200)

    expect(body.code).toEqual(EXCEPTION_BAD_REQUEST)
  })

  it('Upload Image Throw BadRequestException (max filesize)', async () => {
    const { body } = await getRequest('post', '/upload/image', true)
      .attach('file', 'tests/e2e/upload/__fixtures__/image/failed/file-size-limit.jpg')
      .expect(200)

    expect(body.code).toEqual(EXCEPTION_BAD_REQUEST)
    expect(body.error).toEqual('文件大小超过限制')
  })

  it('Upload Video', async () => {
    const { body } = await getRequest('post', '/upload/video', true)
      .attach('file', 'tests/e2e/upload/__fixtures__/video/pass/1.mp4')
      .expect(200)

    expect(body.code).toEqual(0)
  })

  it('Upload Video Throw BadRequestException', async () => {
    const { body } = await getRequest('post', '/upload/video', true)
      .attach('file', 'tests/e2e/upload/__fixtures__/image/failed/bad-mimetype.avif')
      .expect(200)

    expect(body.code).toEqual(EXCEPTION_BAD_REQUEST)
    expect(body.error).toEqual('Validation failed (expected type is /(mp4)$/)')
  })
})
