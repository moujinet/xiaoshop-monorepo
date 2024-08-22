import { cleanDirs, useRequest } from '~~/tests/utils'

const basePath = 'tests/__fixtures__'

describe('Upload Module - File', () => {
  beforeAll(async () => {
    await cleanDirs([`${basePath}/upload/**/*`])
  })

  it('Upload File', async () => {
    await useRequest('post', '/upload/file')
      .attach('file', `${basePath}/tmp/excel/1.xlsx`)
      .expect(200)
      .then(({ body }) => {
        expect(body.data).toBeDefined()
      })
  })
})
