import { truncateTable, useRequest } from '~~/tests/utils'

describe('Product Module - Commitment', () => {
  beforeAll(async () => {
    await truncateTable([
      'shop_product_commitment',
    ])
  })

  it('Create Product Commitment', async () => {
    await useRequest('post', '/product/commitment/create')
      .send({
        name: 'test',
      })
      .expect(200)
      .then(({ body }) => {
        expect(body.code).toEqual(0)
      })
  })

  it('Update Product Commitment', async () => {
    await useRequest('put', '/product/commitment/update')
      .query({ id: 1 })
      .send({
        name: 'test update',
      })
      .expect(200)
      .then(({ body }) => {
        expect(body.code).toEqual(0)
      })
  })

  it('Fetch Product Commitment Detail', async () => {
    const { body } = await useRequest('get', '/product/commitment/detail')
      .query({ id: 1 })
      .expect(200)

    expect(body.data.name).toEqual('test update')
  })

  it('Fetch Product Commitment Dict List', async () => {
    const { body } = await useRequest('get', '/product/commitment/dict/list')
      .expect(200)

    expect(body.data.length).toEqual(1)
  })

  it('Fetch Product Commitment Pages', async () => {
    const { body } = await useRequest('get', '/product/commitment/pages')
      .expect(200)

    expect(body.data.total).toEqual(1)
  })
})
