import { cleanDirs, useRequest } from '~~/tests/utils'

const basePath = 'tests/__fixtures__'

describe('Resource Module - Upload', () => {
  beforeAll(async () => {
    await cleanDirs([`${basePath}/upload/**/*`])
  })

  describe('Admin', () => {
    it('Upload Excel File', async () => {
      await useRequest('post', '/resource/upload/file')
        .attach('file', `${basePath}/tmp/excel/1.xlsx`)
        .expect(200)
        .then(({ body }) => {
          expect(body.data).toBeDefined()
        })
    })
  })
})
