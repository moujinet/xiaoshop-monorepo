import { truncateTable, useRequest } from '~~/tests/utils'

describe('System Organize Module - Department', () => {
  beforeAll(async () => {
    await truncateTable(['system_department'])
  })

  describe('Admin', () => {
    it('Create Department', async () => {
      await useRequest('post', '/system/department/create')
        .send({
          name: 'test 1',
        })
        .expect(200)
        .then(({ body }) => {
          expect(body.code).toEqual(0)
        })

      await useRequest('post', '/system/department/create')
        .send({
          parentId: 1,
          name: 'test 1-1',
        })
        .expect(200)
        .then(({ body }) => {
          expect(body.code).toEqual(0)
        })
    })

    it('Update Department', async () => {
      await useRequest('put', '/system/department/update')
        .query({ id: 1 })
        .send({
          name: 'test update',
        })
        .expect(200)
        .then(({ body }) => {
          expect(body.code).toEqual(0)
        })
    })

    it('Fetch Department Detail', async () => {
      const { body } = await useRequest('get', '/system/department/detail')
        .query({ id: 1 })
        .expect(200)

      expect(body.data.name).toEqual('test update')
    })

    it('Fetch Department List', async () => {
      const { body } = await useRequest('get', '/system/department/list')
        .expect(200)

      expect(body.data.length).toEqual(1)
      expect(body.data[0].children.length).toEqual(1)
    })

    it('Fetch Department Dict List', async () => {
      const { body } = await useRequest('get', '/system/department/dict/list')
        .expect(200)

      expect(body.data.length).toEqual(1)
      expect(body.data[0].children.length).toEqual(1)
    })

    it('Fetch Department Root List', async () => {
      const { body } = await useRequest('get', '/system/department/root/list')
        .expect(200)

      expect(body.data.length).toEqual(1)
    })
  })
})
