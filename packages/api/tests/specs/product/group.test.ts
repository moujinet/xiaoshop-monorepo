import { truncateTable, useRequest } from '~~/tests/utils'

describe('Product Module - Group', () => {
  beforeAll(async () => {
    await truncateTable([
      'shop_product_group',
    ])
  })

  it('Create Product Group', async () => {
    await useRequest('post', '/product/group/create')
      .send({
        name: 'test',
      })
      .expect(200)
      .then(({ body }) => {
        expect(body.code).toEqual(0)
      })
  })

  it('Update Product Group', async () => {
    await useRequest('put', '/product/group/update')
      .query({ id: 1 })
      .send({
        name: 'test update',
      })
      .expect(200)
      .then(({ body }) => {
        expect(body.code).toEqual(0)
      })
  })

  it('Fetch Product Group Detail', async () => {
    const { body } = await useRequest('get', '/product/group/detail')
      .query({ id: 1 })
      .expect(200)

    expect(body.data.name).toEqual('test update')
  })

  it('Fetch Product Group Dict List', async () => {
    const { body } = await useRequest('get', '/product/group/dict/list')
      .expect(200)

    expect(body.data.length).toEqual(1)
  })

  it('Fetch Product Group Pages', async () => {
    const { body } = await useRequest('get', '/product/group/pages')
      .expect(200)

    expect(body.data.total).toEqual(1)
  })
})
