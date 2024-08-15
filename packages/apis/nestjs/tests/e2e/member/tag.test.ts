import { getRequest, truncateTable } from '~~/tests/utils'

describe('Member Module - Tag', () => {
  beforeAll(async () => {
    await truncateTable([
      'shop_member_tag',
    ])
  })

  it('Create Member Tag', async () => {
    const { body } = await getRequest('post', '/member/tag/create')
      .send({
        name: 'test',
      })
      .expect(200)

    expect(body.code).toEqual(0)
  })

  it('Update Member Tag', async () => {
    const { body } = await getRequest('put', '/member/tag/update')
      .query({ id: 1 })
      .send({
        name: 'test (修改)',
      })
      .expect(200)

    expect(body.code).toEqual(0)
  })

  it('Fetch Member Tag Detail', async () => {
    const { body } = await getRequest('get', '/member/tag/detail')
      .query({ id: 1 })
      .expect(200)

    expect(body.data.name).toEqual('test (修改)')
  })

  it('Fetch Member Tag Pages', async () => {
    const { body } = await getRequest('get', '/member/tag/pages')
      .expect(200)

    expect(body.data.total).toEqual(1)
  })
})
