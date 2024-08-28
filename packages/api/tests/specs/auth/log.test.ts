import { useRequest } from '~~/tests/utils'

describe('Auth Module - Log', () => {
  it('Fetch Log Pages', async () => {
    const { body } = await useRequest('get', '/auth/log/pages')
      .expect(200)

    expect(body.data.total).toBeDefined()
  }, 15000)
})
