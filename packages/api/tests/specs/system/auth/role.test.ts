import { truncateTable, useRequest } from '~~/tests/utils'

describe('System Auth Module - Role', () => {
  beforeAll(async () => {
    await truncateTable([
      'system_role',
    ])
  })

  describe('Admin', () => {
    it('Create Role', async () => {
      await useRequest('post', '/system/role/create')
        .send({
          name: 'test',
          desc: 'test',
          permissions: ['test.1', 'test.2'],
        })
        .expect(200)
        .then(({ body }) => {
          expect(body.code).toEqual(0)
        })
    })

    it('Update Role', async () => {
      await useRequest('put', '/system/role/update')
        .query({ id: 1 })
        .send({
          name: 'test',
          desc: 'test',
          permissions: ['test.1'],
        })
        .expect(200)
        .then(({ body }) => {
          expect(body.code).toEqual(0)
        })
    })

    it('Fetch Role Detail', async () => {
      const { body } = await useRequest('get', '/system/role/detail')
        .query({ id: 1 })
        .expect(200)

      expect(body.data.permissions).toEqual(['test.1'])
    })

    it('Fetch Role Pages', async () => {
      const { body } = await useRequest('get', '/system/role/pages')
        .expect(200)

      expect(body.data.total).toEqual(1)
    })

    it('Fetch Role Dict List', async () => {
      const { body } = await useRequest('get', '/system/role/dict/list')
        .expect(200)

      expect(body.data.length).toEqual(1)
    })
  })
})
