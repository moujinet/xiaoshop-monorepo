import { useRequest } from '#/request'
import { truncateTable } from '#/tools'

describe('Product Module - Category', () => {
  beforeAll(async () => {
    await truncateTable([
      'product_category',
    ])
  })

  describe('Admin', () => {
    it('Create Category', async () => {
      await useRequest('post', '/admin/product/category/create')
        .send({
          name: 'test',
        })
        .expect(200)
        .then(({ body }) => {
          expect(body.code).toEqual(0)
        })

      await useRequest('post', '/admin/product/category/create')
        .send({
          parentId: 1,
          name: 'test 1',
        })
        .expect(200)
        .then(({ body }) => {
          expect(body.code).toEqual(0)
        })
    })

    it('Update Category', async () => {
      await useRequest('put', '/admin/product/category/update')
        .query({ id: 1 })
        .send({
          name: 'test update',
          desc: 'test',
        })
        .expect(200)
        .then(({ body }) => {
          expect(body.code).toEqual(0)
        })
    })

    it('Fetch Category Detail', async () => {
      const { body } = await useRequest('get', '/admin/product/category/detail')
        .query({ id: 1 })
        .expect(200)

      expect(body.data.name).toEqual('test update')
    })

    it('Fetch Category List', async () => {
      const { body } = await useRequest('get', '/admin/product/category/list')
        .query({ parentId: 1 })
        .expect(200)

      expect(body.data.length).toEqual(1)
    })

    it('Fetch Category Root List', async () => {
      const { body } = await useRequest('get', '/admin/product/category/root/list')
        .expect(200)

      expect(body.data.length).toEqual(1)
    })

    it('Fetch Category Dict List', async () => {
      const { body } = await useRequest('get', '/admin/product/category/dict/list')
        .expect(200)

      expect(body.data.length).toEqual(1)
      expect(body.data[0].children).toBeDefined()
    })
  })
})
