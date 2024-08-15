import { getRequest, truncateTable } from '~~/tests/utils'

describe('Goods Module - Attributes Template', () => {
  beforeAll(async () => {
    await truncateTable([
      'shop_goods_attribute_template',
    ])
  })

  it('Create Goods Attribute Template', async () => {
    const { body } = await getRequest('post', '/goods/attribute-template/create')
      .send({
        name: '家具参数模板',
        desc: '家具参数模板介绍',
        options: [
          {
            name: '树种',
            type: 'checkbox',
            options: ['黑胡桃', '橡木', '榆木'],
            defaultValue: ['黑胡桃'],
          },
        ],
      })
      .expect(200)

    expect(body.code).toEqual(0)
  })

  it('Update Goods Attribute Template', async () => {
    const { body } = await getRequest('put', '/goods/attribute-template/update')
      .query({ id: 1 })
      .send({
        name: '家具参数模板 (修改)',
        desc: '家具参数模板介绍',
        options: [
          {
            name: '树种',
            type: 'checkbox',
            options: ['黑胡桃', '橡木', '榆木'],
            defaultValue: ['黑胡桃'],
          },
        ],
      })
      .expect(200)

    expect(body.code).toEqual(0)
  })

  it('Fetch Goods Attribute Template Detail', async () => {
    const { body } = await getRequest('get', '/goods/attribute-template/detail')
      .query({ id: 1 })
      .expect(200)

    expect(body.data.name).toEqual('家具参数模板 (修改)')
  })

  it('Fetch Goods Attribute Template List', async () => {
    const { body } = await getRequest('get', '/goods/attribute-template/list')
      .expect(200)

    expect(body.data.length).toEqual(1)
  })

  it('Fetch Goods Attribute Template Dict List', async () => {
    const { body } = await getRequest('get', '/goods/attribute-template/dict/list')
      .expect(200)

    expect(body.data.length).toEqual(1)
    expect(Object.keys(body.data[0]).length).toEqual(2)
  })

  it('Delete Goods Attribute Template', async () => {
    const { body } = await getRequest('delete', '/goods/attribute-template/delete')
      .send({ id: 1 })
      .expect(200)

    expect(body.code).toEqual(0)
  })
})
