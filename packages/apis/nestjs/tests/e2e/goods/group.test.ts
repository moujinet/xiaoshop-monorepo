import { getRequest, truncateTable } from '~~/tests/utils'

describe('Goods Module - Group', () => {
  beforeAll(async () => {
    await truncateTable([
      'shop_goods_group',
    ])
  })

  it('Create Goods Group', async () => {
    const { body } = await getRequest('post', '/goods/group/create')
      .send({
        name: 'test 1',
        sort: 1,
      })
      .expect(200)

    expect(body.code).toEqual(0)
  })

  it('Update Goods Group', async () => {
    const { body } = await getRequest('put', '/goods/group/update')
      .query({ id: 1 })
      .send({
        name: 'test change',
        sort: 1,
      })
      .expect(200)

    expect(body.code).toEqual(0)
  })

  it('Fetch Goods Group Detail', async () => {
    const { body } = await getRequest('get', '/goods/group/detail')
      .query({ id: 1 })
      .expect(200)

    expect(body.data.name).toEqual('test change')
  })

  it('Fetch Goods Group List', async () => {
    const { body } = await getRequest('get', '/goods/group/list')
      .expect(200)

    expect(body.data.length).toEqual(1)
  })

  it('Fetch Goods Group Dict List', async () => {
    const { body } = await getRequest('get', '/goods/group/dict/list')
      .expect(200)

    expect(body.data.length).toEqual(1)
    expect(Object.keys(body.data[0]).length).toEqual(2)
  })

  it('Delete Goods Group', async () => {
    const { body } = await getRequest('delete', '/goods/group/delete')
      .send({ id: 1 })
      .expect(200)

    expect(body.code).toEqual(0)
  })
})
