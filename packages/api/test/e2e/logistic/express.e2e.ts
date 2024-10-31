import { useRequest } from '#/request'
import { truncateTable } from '#/tools'

describe('Logistic Module - Express', () => {
  beforeAll(async () => {
    await truncateTable([
      'logistic_express',
    ])
  })

  describe('Admin', () => {
    it('Create Logistic Express', async () => {
      await useRequest('post', '/admin/logistic/express/create')
        .send({
          name: 'test',
          desc: 'test',
          logo: 'logo',
          url: 'test',
          sort: 2,
        })
        .expect(200)
        .then(({ body }) => {
          expect(body.code).toEqual(0)
        })
    })

    it('Update Logistic Express', async () => {
      await useRequest('put', '/admin/logistic/express/update')
        .query({ id: 1 })
        .send({
          name: 'test update',
          desc: 'test',
          logo: 'logo',
          url: 'test',
          sort: 2,
        })
        .expect(200)
        .then(({ body }) => {
          expect(body.code).toEqual(0)
        })
    })

    it('Get Logistic Express Detail', async () => {
      const { body } = await useRequest('get', '/admin/logistic/express/detail')
        .query({ id: 1 })
        .expect(200)

      expect(body.data.name).toEqual('test update')
    })

    it('Get Logistic Express Dict List', async () => {
      const { body } = await useRequest('get', '/admin/logistic/express/dict/list')
        .expect(200)

      expect(body.data.length).toEqual(1)
    })

    it('Get Logistic Express Pages', async () => {
      const { body } = await useRequest('get', '/admin/logistic/express/pages')
        .expect(200)

      expect(body.data.total).toEqual(1)
    })
  })
})
