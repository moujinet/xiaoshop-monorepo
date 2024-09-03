import { truncateTable, useRequest } from '~~/tests/utils'

describe('Product Module - Attribute Template', () => {
  beforeAll(async () => {
    await truncateTable([
      'shop_product_attribute_template',
    ])
  })

  it('Create Product Attribute Template', async () => {
    await useRequest('post', '/product/attribute-template/create')
      .send({
        name: 'test',
        options: [
          { name: 'test', type: 1, options: [], defaultValue: [''] },
        ],
      })
      .expect(200)
      .then(({ body }) => {
        expect(body.code).toEqual(0)
      })
  })

  it('Update Product Attribute Template', async () => {
    await useRequest('put', '/product/attribute-template/update')
      .query({ id: 1 })
      .send({
        name: 'test update',
        options: [
          { name: 'test', type: 1, options: [], defaultValue: [''] },
        ],
      })
      .expect(200)
      .then(({ body }) => {
        expect(body.code).toEqual(0)
      })
  })

  it('Fetch Product Attribute Template Detail', async () => {
    const { body } = await useRequest('get', '/product/attribute-template/detail')
      .query({ id: 1 })
      .expect(200)

    expect(body.data.name).toEqual('test update')
  })

  it('Fetch Product Attribute Template Dict List', async () => {
    const { body } = await useRequest('get', '/product/attribute-template/dict/list')
      .expect(200)

    expect(body.data.length).toEqual(1)
  })

  it('Fetch Product Attribute Template Pages', async () => {
    const { body } = await useRequest('get', '/product/attribute-template/pages')
      .expect(200)

    expect(body.data.total).toEqual(1)
  })
})
