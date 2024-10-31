import { useRequest } from '#/request'
import { truncateTable } from '#/tools'
import { LogisticFreightCalcMode } from '@xiaoshop/shared'

describe('Logistic Module - Freight', () => {
  beforeAll(async () => {
    await truncateTable([
      'logistic_freight_template',
    ])
  })

  describe('Template', () => {
    it('Create Create Logistic Freight Template', async () => {
      await useRequest('post', '/admin/logistic/freight/template/create')
        .send({
          name: 'test 1',
          calcMode: LogisticFreightCalcMode.COUNT,
          rules: [
            {
              locations: [[{ code: '11', name: '北京市' }]],
              first: 1,
              firstPrice: 10,
              continue: 1,
              continuePrice: 5,
            },
          ],
          enableFreeRules: 0,
        })
        .expect(200)
        .then(({ body }) => {
          expect(body.code).toEqual(0)
        })
    })

    it('Update Logistic Freight Template', async () => {
      await useRequest('put', '/admin/logistic/freight/template/update')
        .query({ id: 1 })
        .send({
          name: 'test update',
          calcMode: LogisticFreightCalcMode.COUNT,
          rules: [
            {
              locations: [[{ code: '11', name: '北京市' }]],
              first: 1,
              firstPrice: 10,
              continue: 1,
              continuePrice: 5,
            },
          ],
          enableFreeRules: 1,
          freeRules: [
            {
              locations: [[{ code: '11', name: '北京市' }]],
              overCount: 10,
              overAmount: 100,
            },
          ],
        })
        .expect(200)
        .then(({ body }) => {
          expect(body.code).toEqual(0)
        })
    })

    it('Get Logistic Freight Template Detail', async () => {
      const { body } = await useRequest('get', '/admin/logistic/freight/template/detail')
        .query({ id: 1 })
        .expect(200)

      expect(body.data.name).toEqual('test update')
    })

    it('Get Logistic Freight Template Dict List', async () => {
      const { body } = await useRequest('get', '/admin/logistic/freight/template/dict/list')
        .expect(200)

      expect(body.data.length).toEqual(1)
    })

    it('Get Logistic Freight Template Pages', async () => {
      const { body } = await useRequest('get', '/admin/logistic/freight/template/pages')
        .expect(200)

      expect(body.data.total).toEqual(1)
    })
  })
})
