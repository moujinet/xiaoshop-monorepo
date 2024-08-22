import { cleanDirs, useRequest } from '~~/tests/utils'

const basePath = 'tests/__fixtures__'

describe('Upload Module - Video', () => {
  beforeAll(async () => {
    await cleanDirs([`${basePath}/upload/**/*`])
  })

  it('Upload Video', async () => {
    await useRequest('post', '/upload/video', false)
      .attach('file', `${basePath}/tmp/video/pass/1.mp4`)
      .expect(200)
      .then(({ body }) => {
        expect(body.data).toBeDefined()
      })
  })
})
