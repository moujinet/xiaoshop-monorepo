import { truncateTable, useRequest } from '~~/tests/utils'

describe('Product Module - Addition', () => {
  beforeAll(async () => {
    await truncateTable([
      'shop_product_addition',
    ])
  })

  it('Create Product Addition', async () => {
    await useRequest('post', '/product/addition/create')
      .send({
        name: 'test',
      })
      .expect(200)
      .then(({ body }) => {
        expect(body.code).toEqual(0)
      })
  })

  it('Update Product Addition', async () => {
    await useRequest('put', '/product/addition/update')
      .query({ id: 1 })
      .send({
        name: 'test update',
      })
      .expect(200)
      .then(({ body }) => {
        expect(body.code).toEqual(0)
      })
  })

  it('Fetch Product Addition Detail', async () => {
    const { body } = await useRequest('get', '/product/addition/detail')
      .query({ id: 1 })
      .expect(200)

    expect(body.data.name).toEqual('test update')
  })

  it('Fetch Product Addition Dict List', async () => {
    const { body } = await useRequest('get', '/product/addition/dict/list')
      .expect(200)

    expect(body.data.length).toEqual(1)
  })

  it('Fetch Product Addition Pages', async () => {
    const { body } = await useRequest('get', '/product/addition/pages')
      .expect(200)

    expect(body.data.total).toEqual(1)
  })
})
