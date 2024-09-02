import { truncateTable, useRequest } from '~~/tests/utils'

describe('Product Module - Category', () => {
  beforeAll(async () => {
    await truncateTable([
      'shop_product_category',
    ])
  })

  it('Create Product Category', async () => {
    await useRequest('post', '/product/category/create')
      .send({
        parentId: 0,
        name: 'test',
      })
      .expect(200)
      .then(({ body }) => {
        expect(body.code).toEqual(0)
      })
  })

  it('Update Product Category', async () => {
    await useRequest('put', '/product/category/update')
      .query({ id: 1 })
      .send({
        parentId: 0,
        name: 'test update',
      })
      .expect(200)
      .then(({ body }) => {
        expect(body.code).toEqual(0)
      })
  })

  it('Fetch Product Category Detail', async () => {
    const { body } = await useRequest('get', '/product/category/detail')
      .query({ id: 1 })
      .expect(200)

    expect(body.data.name).toEqual('test update')
  })

  it('Fetch Product Category List', async () => {
    const { body } = await useRequest('get', '/product/category/dict/list')
      .query({ parentId: 0 })
      .expect(200)

    expect(body.data.length).toEqual(1)
  })

  it('Fetch Product Category Dict List', async () => {
    const { body } = await useRequest('get', '/product/category/dict/list')
      .expect(200)

    expect(body.data.length).toEqual(1)
  })

  it('Fetch Product Category Root List', async () => {
    const { body } = await useRequest('get', '/product/category/root/list')
      .expect(200)

    expect(body.data.length).toEqual(1)
  })
})
