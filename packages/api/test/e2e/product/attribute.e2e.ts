import { useRequest } from '#/request'
import { truncateTable } from '#/tools'
import { ProductAttributeOptionType } from '@xiaoshop/shared'

describe('Product Module - Attribute Template', () => {
  beforeAll(async () => {
    await truncateTable([
      'product_attribute_template',
    ])
  })

  describe('Admin', () => {
    it('Create Attribute Template', async () => {
      await useRequest('post', '/admin/product/attribute/template/create')
        .send({
          name: 'test',
          options: [
            {
              name: 'test',
              type: ProductAttributeOptionType.CHECKBOX,
              options: ['a', 'b'],
              defaultValue: ['a'],
            },
          ],
        })
        .expect(200)
        .then(({ body }) => {
          expect(body.code).toEqual(0)
        })
    })

    it('Update Attribute Template', async () => {
      await useRequest('put', '/admin/product/attribute/template/update')
        .query({ id: 1 })
        .send({
          name: 'test update',
          options: [
            {
              name: 'test',
              type: ProductAttributeOptionType.CHECKBOX,
              options: ['a', 'b'],
              defaultValue: ['a'],
            },
            {
              name: 'test 2',
              type: ProductAttributeOptionType.CHECKBOX,
              options: ['a', 'b'],
              defaultValue: ['a'],
            },
          ],
        })
        .expect(200)
        .then(({ body }) => {
          expect(body.code).toEqual(0)
        })
    })

    it('Fetch Attribute Template Detail', async () => {
      const { body } = await useRequest('get', '/admin/product/attribute/template/detail')
        .query({ id: 1 })
        .expect(200)

      expect(body.data.name).toEqual('test update')
    })

    it('Fetch Attribute Template Pages', async () => {
      const { body } = await useRequest('get', '/admin/product/attribute/template/pages')
        .expect(200)

      expect(body.data.total).toEqual(1)
    })

    it('Fetch Attribute Template Dict List', async () => {
      const { body } = await useRequest('get', '/admin/product/attribute/template/dict/list')
        .expect(200)

      expect(body.data.length).toEqual(1)
    })
  })
})
