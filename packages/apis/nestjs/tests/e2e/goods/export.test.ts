import { getRequest, truncateTable } from '~~/tests/utils'

describe('Goods Module - Export', () => {
  beforeAll(async () => {
    await truncateTable([
      'shop_goods_export',
    ])
  })

  it('Create Goods Export Record', async () => {
    const { body } = await getRequest('post', '/goods/export/create')
      .send({
        status: 'in_stock',
        source: 'connect',
        categoryIds: [],
        groupId: 0,
        brandId: 0,
        tagId: 0,
      })
      .expect(200)

    expect(body.code).toEqual(0)
  })

  it('Fetch Goods Export Pages', async () => {
    const { body } = await getRequest('get', '/goods/export/pages')
      .expect(200)

    expect(body.data.total).toEqual(1)
  })

  it('Delete Goods Export Record', async () => {
    const { body } = await getRequest('delete', '/goods/export/delete')
      .send({ id: 1 })
      .expect(200)

    expect(body.code).toEqual(0)
  })
})
