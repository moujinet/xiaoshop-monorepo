import { getRequest, truncateTable } from '~~/tests/utils'

describe('Goods Module - Addition', () => {
  beforeAll(async () => {
    await truncateTable([
      'shop_goods_addition',
    ])
  })

  it('Create Goods Addition Service', async () => {
    const { body } = await getRequest('post', '/goods/addition/create')
      .send({
        name: '服务',
        desc: '介绍',
        sort: 1,
        price: 1,
        icon: 'http://xiao.shop/icon.png',
      })
      .expect(200)

    expect(body.code).toEqual(0)
  })

  it('Update Goods Addition Service', async () => {
    const { body } = await getRequest('put', '/goods/addition/update')
      .query({ id: 1 })
      .send({
        name: '服务 (修改)',
        desc: '介绍',
        sort: 1,
        price: 1,
        icon: 'http://xiao.shop/icon.png',
      })
      .expect(200)

    expect(body.code).toEqual(0)
  })

  it('Fetch Goods Addition Service Detail', async () => {
    const { body } = await getRequest('get', '/goods/addition/detail')
      .query({ id: 1 })
      .expect(200)

    expect(body.data.name).toEqual('服务 (修改)')
  })

  it('Fetch Goods Addition Service List', async () => {
    const { body } = await getRequest('get', '/goods/addition/list')
      .expect(200)

    expect(body.data.length).toEqual(1)
  })

  it('Fetch Goods Addition Service Dict List', async () => {
    const { body } = await getRequest('get', '/goods/addition/dict/list')
      .expect(200)

    expect(body.data.length).toEqual(1)
    expect(Object.keys(body.data[0]).length).toEqual(4)
  })

  it('Delete Goods Addition Service', async () => {
    const { body } = await getRequest('delete', '/goods/addition/delete')
      .send({ id: 1 })
      .expect(200)

    expect(body.code).toEqual(0)
  })

  it('Create Goods Addition Service Without Icon', async () => {
    const { body } = await getRequest('post', '/goods/addition/create')
      .send({
        name: '服务 (无图)',
        desc: '介绍',
        sort: 1,
        price: 1,
      })
      .expect(200)

    expect(body.code).toEqual(0)
  })

  it('Create Goods Addition Service With Icon Is Empty', async () => {
    const { body } = await getRequest('post', '/goods/addition/create')
      .send({
        name: '服务 (无图) 1',
        desc: '介绍',
        sort: 1,
        price: 1,
        icon: '',
      })
      .expect(200)

    expect(body.code).toEqual(0)
  })
})
