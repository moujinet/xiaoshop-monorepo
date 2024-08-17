import { getRequest, truncateTable } from '~~/tests/utils'

describe('Goods Module - Tag', () => {
  beforeAll(async () => {
    await truncateTable([
      'shop_goods_tag',
    ])
  })

  it('Create Goods Tag', async () => {
    const { body } = await getRequest('post', '/goods/tag/create')
      .send({
        name: 'test 1',
        sort: 1,
      })
      .expect(200)

    expect(body.code).toEqual(0)
  })

  it('Update Goods Tag', async () => {
    const { body } = await getRequest('put', '/goods/tag/update')
      .query({ id: 1 })
      .send({
        name: 'test change',
        sort: 1,
      })
      .expect(200)

    expect(body.code).toEqual(0)
  })

  it('Fetch Goods Tag Detail', async () => {
    const { body } = await getRequest('get', '/goods/tag/detail')
      .query({ id: 1 })
      .expect(200)

    expect(body.data.name).toEqual('test change')
  })

  it('Fetch Goods Tag List', async () => {
    const { body } = await getRequest('get', '/goods/tag/list')
      .expect(200)

    expect(body.data.length).toEqual(1)
  })

  it('Fetch Goods Tag Dict List', async () => {
    const { body } = await getRequest('get', '/goods/tag/dict/list')
      .expect(200)

    expect(body.data.length).toEqual(1)
    expect(Object.keys(body.data[0]).length).toEqual(2)
  })

  it('Delete Goods Tag', async () => {
    const { body } = await getRequest('delete', '/goods/tag/delete')
      .send({ id: 1 })
      .expect(200)

    expect(body.code).toEqual(0)
  })
})
