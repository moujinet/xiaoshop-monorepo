import { useRequest } from '#/__utils/request'

describe('System Log Module', () => {
  describe('Admin', () => {
    it('Fetch Log Pages', async () => {
      await useRequest('get', '/admin/system/log/pages')
        .expect(200)
        .then(({ body }) => {
          expect(body.data.total).toBeDefined()
        })
    }, 15000)
  })
})
