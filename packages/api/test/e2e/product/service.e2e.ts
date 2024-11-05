import { useRequest } from '#/request'
import { truncateTable } from '#/tools'

describe('Product Module - Service', () => {
  beforeAll(async () => {
    await truncateTable([
      'product_service_extra',
      'product_service_addition',
    ])
  })

  describe('Product Extra Service', () => {
    describe('Admin', () => {
      it('Create Product Extra Service', async () => {
        await useRequest('post', '/admin/product/service/extra/create')
          .send({
            name: 'test',
          })
          .expect(200)
          .then(({ body }) => {
            expect(body.code).toEqual(0)
          })
      })

      it('Update Product Extra Service', async () => {
        await useRequest('put', '/admin/product/service/extra/update')
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

      it('Fetch Product Extra Service Detail', async () => {
        const { body } = await useRequest('get', '/admin/product/service/extra/detail')
          .query({ id: 1 })
          .expect(200)

        expect(body.data.name).toEqual('test update')
      })

      it('Fetch Product Extra Service Pages', async () => {
        const { body } = await useRequest('get', '/admin/product/service/extra/pages')
          .expect(200)

        expect(body.data.total).toEqual(1)
      })

      it('Fetch Product Extra Service Dict List', async () => {
        const { body } = await useRequest('get', '/admin/product/service/extra/dict/list')
          .expect(200)

        expect(body.data.length).toEqual(1)
      })
    })
  })

  describe('Product Addition Service', () => {
    describe('Admin', () => {
      it('Create Product Addition Service', async () => {
        await useRequest('post', '/admin/product/service/addition/create')
          .send({
            name: 'test',
            price: 100,
          })
          .expect(200)
          .then(({ body }) => {
            expect(body.code).toEqual(0)
          })
      })

      it('Update Product Addition Service', async () => {
        await useRequest('put', '/admin/product/service/addition/update')
          .query({ id: 1 })
          .send({
            name: 'test update',
            price: 100,
            desc: 'test',
          })
          .expect(200)
          .then(({ body }) => {
            expect(body.code).toEqual(0)
          })
      })

      it('Fetch Product Addition Service Detail', async () => {
        const { body } = await useRequest('get', '/admin/product/service/addition/detail')
          .query({ id: 1 })
          .expect(200)

        expect(body.data.name).toEqual('test update')
      })

      it('Fetch Product Addition Service Pages', async () => {
        const { body } = await useRequest('get', '/admin/product/service/addition/pages')
          .expect(200)

        expect(body.data.total).toEqual(1)
      })

      it('Fetch Product Addition Service Dict List', async () => {
        const { body } = await useRequest('get', '/admin/product/service/addition/dict/list')
          .expect(200)

        expect(body.data.length).toEqual(1)
      })
    })
  })
})
