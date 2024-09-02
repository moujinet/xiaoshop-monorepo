import { truncateTable, useRequest } from '~~/tests/utils'

describe('Product Module - Tag', () => {
  beforeAll(async () => {
    await truncateTable([
      'shop_product_tag',
    ])
  })

  it('Create Product Tag', async () => {
    await useRequest('post', '/product/tag/create')
      .send({
        name: 'test',
        color: 'red',
      })
      .expect(200)
      .then(({ body }) => {
        expect(body.code).toEqual(0)
      })
  })

  it('Update Product Tag', async () => {
    await useRequest('put', '/product/tag/update')
      .query({ id: 1 })
      .send({
        name: 'test update',
        color: 'blue',
      })
      .expect(200)
      .then(({ body }) => {
        expect(body.code).toEqual(0)
      })
  })

  it('Fetch Product Tag Detail', async () => {
    const { body } = await useRequest('get', '/product/tag/detail')
      .query({ id: 1 })
      .expect(200)

    expect(body.data.name).toEqual('test update')
    expect(body.data.color).toEqual('blue')
  })

  it('Fetch Product Tag Dict List', async () => {
    const { body } = await useRequest('get', '/product/tag/dict/list')
      .expect(200)

    expect(body.data.length).toEqual(1)
  })

  it('Fetch Product Tag Pages', async () => {
    const { body } = await useRequest('get', '/product/tag/pages')
      .expect(200)

    expect(body.data.total).toEqual(1)
  })
})
