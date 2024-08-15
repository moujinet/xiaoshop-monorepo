import { getRequest, truncateTable } from '~~/tests/utils'

describe('Goods Module - Brand', () => {
  beforeAll(async () => {
    await truncateTable([
      'shop_goods_brand',
    ])
  })

  it('Create Goods Brand', async () => {
    const { body } = await getRequest('post', '/goods/brand/create')
      .send({
        name: '品牌名称',
        desc: '品牌名称介绍',
        logo: 'https://www.example.com/image.png',
        sort: 1,
      })
      .expect(200)

    expect(body.code).toEqual(0)
  })

  it('Update Goods Brand', async () => {
    const { body } = await getRequest('put', '/goods/brand/update')
      .query({ id: 1 })
      .send({
        name: '品牌名称 (修改)',
        desc: '品牌名称介绍',
        logo: 'https://www.example.com/image.png',
        sort: 1,
      })
      .expect(200)

    expect(body.code).toEqual(0)
  })

  it('Fetch Goods Brand Detail', async () => {
    const { body } = await getRequest('get', '/goods/brand/detail')
      .query({ id: 1 })
      .expect(200)

    expect(body.data.name).toEqual('品牌名称 (修改)')
  })

  it('Goods Brand List', async () => {
    const { body } = await getRequest('get', '/goods/brand/list')
      .expect(200)

    expect(body.data.length).toEqual(1)
  })

  it('Goods Brand Dict List', async () => {
    const { body } = await getRequest('get', '/goods/brand/dict/list')
      .expect(200)

    expect(body.data.length).toEqual(1)
    expect(Object.keys(body.data[0]).length).toEqual(2)
  })

  it('Delete Goods Brand', async () => {
    const { body } = await getRequest('delete', '/goods/brand/delete')
      .send({ id: 1 })
      .expect(200)

    expect(body.code).toEqual(0)
  })

  it('Create Goods Brand Without Logo', async () => {
    const { body } = await getRequest('post', '/goods/brand/create')
      .send({
        name: '品牌名称 (无图)',
        desc: '品牌名称介绍',
        sort: 1,
      })
      .expect(200)

    expect(body.code).toEqual(0)
  })

  it('Create Goods Brand With Logo Is Empty String', async () => {
    const { body } = await getRequest('post', '/goods/brand/create')
      .send({
        name: '品牌名称 (无图) 1',
        desc: '品牌名称介绍',
        logo: '',
        sort: 1,
      })
      .expect(200)

    expect(body.code).toEqual(0)
  })
})
