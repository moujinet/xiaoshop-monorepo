import { useRequest } from '#/request'
import { truncateTable } from '#/tools'

describe('Product Module - Tag', () => {
  beforeAll(async () => {
    await truncateTable([
      'product_tag',
    ])
  })

  describe('Admin', () => {
    it('Create Tag', async () => {
      await useRequest('post', '/admin/product/tag/create')
        .send({
          name: 'test',
        })
        .expect(200)
        .then(({ body }) => {
          expect(body.code).toEqual(0)
        })
    })

    it('Update Tag', async () => {
      await useRequest('put', '/admin/product/tag/update')
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

    it('Fetch Tag Detail', async () => {
      const { body } = await useRequest('get', '/admin/product/tag/detail')
        .query({ id: 1 })
        .expect(200)

      expect(body.data.name).toEqual('test update')
    })

    it('Fetch Tag Pages', async () => {
      const { body } = await useRequest('get', '/admin/product/tag/pages')
        .expect(200)

      expect(body.data.total).toEqual(1)
    })

    it('Fetch Tag Dict List', async () => {
      const { body } = await useRequest('get', '/admin/product/tag/dict/list')
        .expect(200)

      expect(body.data.length).toEqual(1)
    })
  })
})
