import { getRequest, truncateTable } from '~~/tests/utils'

describe('Goods Module - Category', () => {
  beforeAll(async () => {
    await truncateTable([
      'shop_goods_category',
    ])
  })

  it('Create Goods Category', async () => {
    const { body } = await getRequest('post', '/goods/category/create')
      .send({
        parentId: 0,
        name: '分类名称',
        image: 'http://xiao.shop/image.png',
        sort: 1,
      })
      .expect(200)

    expect(body.code).toEqual(0)
  })

  it('Update Goods Category', async () => {
    const { body } = await getRequest('put', '/goods/category/update')
      .query({ id: 1 })
      .send({
        parentId: 0,
        name: '分类名称 (修改)',
        image: 'http://xiao.shop/image.png',
        sort: 1,
      })
      .expect(200)

    expect(body.code).toEqual(0)
  })

  it('Fetch Goods Category List', async () => {
    const { body } = await getRequest('get', '/goods/category/list')
      .expect(200)

    expect(body.data.length).toEqual(1)
  })

  it('Fetch Goods Category Root List', async () => {
    const { body } = await getRequest('get', '/goods/category/root/list')
      .expect(200)

    expect(body.data.length).toEqual(1)
    expect(Object.keys(body.data[0]).length).toEqual(2)
  })

  it('Goods Category Nested List', async () => {
    const { body } = await getRequest('get', '/goods/category/nested/list')
      .expect(200)

    expect(body.data.length).toEqual(1)
    expect(Object.keys(body.data[0]).length).toEqual(3)
  })

  it('Delete Goods Category', async () => {
    const { body } = await getRequest('delete', '/goods/category/delete')
      .send({ id: 1 })
      .expect(200)

    expect(body.code).toEqual(0)
  })

  it('Create Goods Category Without Image', async () => {
    const { body } = await getRequest('post', '/goods/category/create')
      .send({
        parentId: 0,
        name: '分类名称 (无图)',
        sort: 1,
      })
      .expect(200)

    expect(body.code).toEqual(0)
  })

  it('Create Goods Category With Image Is Empty', async () => {
    const { body } = await getRequest('post', '/goods/category/create')
      .send({
        parentId: 0,
        name: '分类名称 (无图) 1',
        image: '',
        sort: 1,
      })
      .expect(200)

    expect(body.code).toEqual(0)
  })
})
