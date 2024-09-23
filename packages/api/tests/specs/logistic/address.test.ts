import { truncateTable, useRequest } from '~~/tests/utils'

describe('Logistic Module - Address', () => {
  beforeAll(async () => {
    await truncateTable([
      'logistic_address',
    ])
  })

  describe('Admin', () => {
    it('Create Address', async () => {
      await useRequest('post', '/logistic/address/create')
        .send({
          name: 'test 1',
          mobile: '13300000001',
          landline: '010-12345678',
          location: [[{ code: '11', name: '北京' }]],
          address: 'test 1',
          postalCode: '110000',
          isDefault: 1,
          type: 1,
        })
        .expect(200)
        .then(({ body }) => {
          expect(body.code).toEqual(0)
        })

      await useRequest('post', '/logistic/address/create')
        .send({
          name: 'test 2',
          mobile: '13300000001',
          landline: '010-12345678',
          location: [[{ code: '11', name: '北京' }]],
          address: 'test 2',
          postalCode: '110000',
          isDefault: 1,
          type: 1,
        })
        .expect(200)
        .then(({ body }) => {
          expect(body.code).toEqual(0)
        })
    })

    it('Update Address', async () => {
      await useRequest('put', '/logistic/address/update')
        .query({ id: 1 })
        .send({
          name: 'test 1 - update',
          mobile: '13300000001',
          landline: '010-12345678',
          location: [[{ code: '11', name: '北京' }]],
          address: 'test 1',
          postalCode: '110000',
          isDefault: 1,
          type: 1,
        })
        .expect(200)
        .then(({ body }) => {
          expect(body.code).toEqual(0)
        })
    })

    it('Fetch Address Pages', async () => {
      await useRequest('get', '/logistic/address/pages')
        .query({ type: 1 })
        .expect(200)
        .then(({ body }) => {
          expect(body.data.result[0].name).toEqual('test 1 - update')
          expect(body.data.result[0].isDefault).toEqual(1)
        })
    })

    it('Set Default Address', async () => {
      await useRequest('put', '/logistic/address/default/update')
        .query({ id: 2 })
        .expect(200)
        .then(({ body }) => {
          expect(body.code).toEqual(0)
        })
    })

    it('Fetch Default Address', async () => {
      await useRequest('get', '/logistic/address/default')
        .query({ type: 1 })
        .expect(200)
        .then(({ body }) => {
          expect(body.data.name).toEqual('test 2')
        })
    })
  })
})
