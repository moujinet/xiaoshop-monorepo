import { useRequest } from '#/request'
import { LogisticAddressType } from '@xiaoshop/shared'
import { getTableName, runSQL, truncateTable } from '#/tools'

describe('Logistic Module - Address', () => {
  beforeAll(async () => {
    await truncateTable([
      'logistic_address',
    ])

    await runSQL([
      `INSERT INTO \`${getTableName('logistic_address')}\` (\`member_id\`, \`owner\`, \`type\`, \`name\`, \`mobile\`, \`landline\`, \`location\`, \`address\`, \`postal_code\`) VALUES (1, 2, 1, 'test', '15000000001', '010-88887777-021', '[{"code": 11, "name": "BJ"}]', 'test', '110000')`,
    ])
  })

  describe('Buyer', () => {
    describe('Admin', () => {
      it('Get Buyer Address List', async () => {
        const { body } = await useRequest('get', '/admin/logistic/buyer/address/list')
          .query({
            memberId: 1,
            type: 1,
          })
          .expect(200)

        expect(body.data.length).toEqual(1)
      })

      it('Get Buyer Address Detail', async () => {
        const { body } = await useRequest('get', '/admin/logistic/buyer/address/detail')
          .query({
            memberId: 1,
            id: 1,
          })
          .expect(200)

        expect(body.data.name).toEqual('test')
      })
    })
  })

  describe('Seller', () => {
    describe('Admin', () => {
      it('Create Seller Address', async () => {
        await useRequest('post', '/admin/logistic/seller/address/create')
          .send({
            name: 'test',
            mobile: '15000000001',
            landline: '010-88887777-021',
            location: [{ code: '11', name: 'BJ' }],
            address: 'test',
            postalCode: '110000',
          })
          .expect(200)
          .then(({ body }) => {
            expect(body.code).toEqual(0)
          })
      })

      it('Update Seller Address', async () => {
        await useRequest('put', '/admin/logistic/seller/address/update')
          .query({ id: 2 })
          .send({
            name: 'test update',
            mobile: '15000000001',
            landline: '010-88887777-021',
            location: [{ code: '11', name: 'BJ' }],
            address: 'test',
            postalCode: '110000',
          })
          .expect(200)
          .then(({ body }) => {
            expect(body.code).toEqual(0)
          })
      })

      it('Get Seller Address Detail', async () => {
        const { body } = await useRequest('get', '/admin/logistic/seller/address/detail')
          .query({ id: 2 })
          .expect(200)

        expect(body.data.name).toEqual('test update')
      })

      it('Set Default Seller Address', async () => {
        const { body } = await useRequest('put', '/admin/logistic/seller/address/default/update')
          .query({ id: 2 })
          .expect(200)

        expect(body.code).toEqual(0)
      })

      it('Get Seller Address List', async () => {
        const { body } = await useRequest('get', '/admin/logistic/seller/address/list')
          .query({ type: LogisticAddressType.DELIVERY })
          .expect(200)

        expect(body.data.length).toEqual(1)
      })
    })
  })
})
