import { useRequest } from '#/__utils/request'

describe('System Dict Module', () => {
  describe('Public', () => {
    it('Fetch Dict List', async () => {
      await useRequest('get', '/system/dict/system_user_statuses')
        .expect(200)
        .then(({ body }) => {
          expect(body.data.length).toEqual(4)
        })
    })
  })
})
