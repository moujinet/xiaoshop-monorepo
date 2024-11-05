import { useRequest } from '#/request'
import { truncateTable } from '#/tools'

describe('Product Module - Group', () => {
  beforeAll(async () => {
    await truncateTable([
      'product_group',
    ])
  })

  describe('Admin', () => {
    it('Create Group', async () => {
      await useRequest('post', '/admin/product/group/create')
        .send({
          name: 'test',
        })
        .expect(200)
        .then(({ body }) => {
          expect(body.code).toEqual(0)
        })
    })

    it('Update Group', async () => {
      await useRequest('put', '/admin/product/group/update')
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

    it('Fetch Group Detail', async () => {
      const { body } = await useRequest('get', '/admin/product/group/detail')
        .query({ id: 1 })
        .expect(200)

      expect(body.data.name).toEqual('test update')
    })

    it('Fetch Group Pages', async () => {
      const { body } = await useRequest('get', '/admin/product/group/pages')
        .expect(200)

      expect(body.data.total).toEqual(1)
    })

    it('Fetch Group Dict List', async () => {
      const { body } = await useRequest('get', '/admin/product/group/dict/list')
        .expect(200)

      expect(body.data.length).toEqual(1)
    })
  })
})
