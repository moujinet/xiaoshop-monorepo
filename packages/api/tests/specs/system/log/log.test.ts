import { useRequest } from '~~/tests/utils'

describe('System Log Module', () => {
  it('Fetch Log Pages', async () => {
    await useRequest('get', '/system/log/pages')
      .expect(200)
      .then(({ body }) => {
        expect(body.code).toEqual(0)
        expect(body.data.total).toBeDefined()
      })
  }, 15000)
})
