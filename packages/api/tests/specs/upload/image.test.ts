import { cleanDirs, useRequest } from '~~/tests/utils'

const basePath = 'tests/__fixtures__'

describe('Upload Module - Image', () => {
  beforeAll(async () => {
    await cleanDirs([`${basePath}/upload/**/*`])
  })

  it('Upload Image', async () => {
    await useRequest('post', '/upload/image', false)
      .attach('file', `${basePath}/tmp/image/pass/1.jpg`)
      .expect(200)
      .then(({ body }) => {
        expect(body.data).toBeDefined()
      })
  })
})
