import { getRequest, truncateTable } from '~~/tests/utils'

describe('Goods Module - Protection', () => {
  beforeAll(async () => {
    await truncateTable([
      'shop_goods_protection',
    ])
  })

  it('Create Goods Protection Service', async () => {
    const { body } = await getRequest('post', '/goods/protection/create')
      .send({
        name: '服务',
        desc: '介绍',
        sort: 1,
        icon: 'http://xiao.shop/icon.png',
      })
      .expect(200)

    expect(body.code).toEqual(0)
  })

  it('Update Goods Protection Service', async () => {
    const { body } = await getRequest('put', '/goods/protection/update')
      .query({ id: 1 })
      .send({
        name: '服务 (修改)',
        desc: '介绍',
        sort: 1,
        icon: 'http://xiao.shop/icon.png',
      })
      .expect(200)

    expect(body.code).toEqual(0)
  })

  it('Fetch Goods Protection Service Detail', async () => {
    const { body } = await getRequest('get', '/goods/protection/detail')
      .query({ id: 1 })
      .expect(200)

    expect(body.data.name).toEqual('服务 (修改)')
  })

  it('Fetch Goods Protection Service List', async () => {
    const { body } = await getRequest('get', '/goods/protection/list')
      .expect(200)

    expect(body.data.length).toEqual(1)
  })

  it('Fetch Goods Protection Service Dict List', async () => {
    const { body } = await getRequest('get', '/goods/protection/dict/list')
      .expect(200)

    expect(body.data.length).toEqual(1)
    expect(Object.keys(body.data[0]).length).toEqual(3)
  })

  it('Delete Goods Protection Service', async () => {
    const { body } = await getRequest('delete', '/goods/protection/delete')
      .send({ id: 1 })
      .expect(200)

    expect(body.code).toEqual(0)
  })

  it('Create Goods Protection Service Without Icon', async () => {
    const { body } = await getRequest('post', '/goods/protection/create')
      .send({
        name: '服务 (无图)',
        desc: '介绍',
        sort: 1,
      })
      .expect(200)

    expect(body.code).toEqual(0)
  })

  it('Create Goods Protection Service With Icon Is Empty', async () => {
    const { body } = await getRequest('post', '/goods/protection/create')
      .send({
        name: '服务 (无图) 1',
        desc: '介绍',
        sort: 1,
        icon: '',
      })
      .expect(200)

    expect(body.code).toEqual(0)
  })
})
