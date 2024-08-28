import {
  truncateTable,
  useRequest,
} from '~~/tests/utils'

describe('Member Module - Tags', () => {
  beforeAll(async () => {
    await truncateTable([
      'shop_member_tag',
    ])
  })

  it('Create Member Tag', async () => {
    await useRequest('post', '/member/tag/create')
      .send({
        name: 'test',
        color: 'red',
      })
      .expect(200)
      .then(({ body }) => {
        expect(body.code).toEqual(0)
      })
  })

  it('Update Member Tag', async () => {
    await useRequest('put', '/member/tag/update')
      .query({ id: 1 })
      .send({
        name: 'test update',
        color: 'arcoblue',
      })
      .expect(200)
      .then(({ body }) => {
        expect(body.code).toEqual(0)
      })
  })

  it('Fetch Member Tag Detail', async () => {
    const { body } = await useRequest('get', '/member/tag/detail')
      .query({ id: 1 })
      .expect(200)

    expect(body.data.color).toEqual('arcoblue')
  })

  it('Fetch Member Tag List', async () => {
    const { body } = await useRequest('get', '/member/tag/dict/list')
      .expect(200)

    expect(body.data[0].name).toEqual('test update')
  })

  it('Fetch Member Tag Pages', async () => {
    const { body } = await useRequest('get', '/member/tag/pages')
      .expect(200)

    expect(body.data.result[0].color).toEqual('arcoblue')
  })
})
