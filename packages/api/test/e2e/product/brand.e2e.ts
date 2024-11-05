import { useRequest } from '#/request'
import { truncateTable } from '#/tools'

describe('Product Module - Brand', () => {
  beforeAll(async () => {
    await truncateTable([
      'product_brand',
    ])
  })

  describe('Admin', () => {
    it('Create Brand', async () => {
      await useRequest('post', '/admin/product/brand/create')
        .send({
          name: 'test',
        })
        .expect(200)
        .then(({ body }) => {
          expect(body.code).toEqual(0)
        })
    })

    it('Update Brand', async () => {
      await useRequest('put', '/admin/product/brand/update')
        .query({ id: 1 })
        .send({
          name: 'test update',
          logo: 'test',
          desc: 'test',
        })
        .expect(200)
        .then(({ body }) => {
          expect(body.code).toEqual(0)
        })
    })

    it('Fetch Brand Detail', async () => {
      const { body } = await useRequest('get', '/admin/product/brand/detail')
        .query({ id: 1 })
        .expect(200)

      expect(body.data.name).toEqual('test update')
    })

    it('Fetch Brand Pages', async () => {
      const { body } = await useRequest('get', '/admin/product/brand/pages')
        .expect(200)

      expect(body.data.total).toEqual(1)
    })

    it('Fetch Brand Dict List', async () => {
      const { body } = await useRequest('get', '/admin/product/brand/dict/list')
        .expect(200)

      expect(body.data.length).toEqual(1)
    })
  })
})
