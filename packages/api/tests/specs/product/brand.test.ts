import { truncateTable, useRequest } from '~~/tests/utils'

describe('Product Module - Brand', () => {
  beforeAll(async () => {
    await truncateTable([
      'shop_product_brand',
    ])
  })

  it('Create Product Brand', async () => {
    await useRequest('post', '/product/brand/create')
      .send({
        name: 'test',
      })
      .expect(200)
      .then(({ body }) => {
        expect(body.code).toEqual(0)
      })
  })

  it('Update Product Brand', async () => {
    await useRequest('put', '/product/brand/update')
      .query({ id: 1 })
      .send({
        name: 'test update',
      })
      .expect(200)
      .then(({ body }) => {
        expect(body.code).toEqual(0)
      })
  })

  it('Fetch Product Brand Detail', async () => {
    const { body } = await useRequest('get', '/product/brand/detail')
      .query({ id: 1 })
      .expect(200)

    expect(body.data.name).toEqual('test update')
  })

  it('Fetch Product Brand Dict List', async () => {
    const { body } = await useRequest('get', '/product/brand/dict/list')
      .expect(200)

    expect(body.data.length).toEqual(1)
  })

  it('Fetch Product Brand Pages', async () => {
    const { body } = await useRequest('get', '/product/brand/pages')
      .expect(200)

    expect(body.data.total).toEqual(1)
  })
})
