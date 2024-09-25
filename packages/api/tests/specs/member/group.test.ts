import { truncateTable, useRequest } from '~~/tests/utils'

describe('Member Module - Group', () => {
  beforeAll(async () => {
    await truncateTable([
      'member_group',
    ])
  })

  describe('Admin', () => {
    it('Create Member Group', async () => {
      await useRequest('post', '/member/group/create')
        .send({
          name: 'test',
          filters: [
            { key: 1, operator: 1, name: 'test 1', value: ['1'] },
            { key: 2, operator: 1, name: 'test 2', value: ['1'] },
          ],
        })
        .expect(200)
        .then(({ body }) => {
          expect(body.code).toEqual(0)
        })
    })

    it('Update Member Group', async () => {
      await useRequest('put', '/member/group/update')
        .query({ id: 1 })
        .send({
          name: 'test update',
          filters: [
            { key: 1, operator: 1, name: 'test 1', value: ['1'] },
            { key: 2, operator: 1, name: 'test 2', value: ['1'] },
            { key: 3, operator: 1, name: 'test 3', value: ['1'] },
          ],
        })
        .expect(200)
        .then(({ body }) => {
          expect(body.code).toEqual(0)
        })
    })

    it('Fetch Member Group', async () => {
      await useRequest('get', '/member/group/detail')
        .query({ id: 1 })
        .expect(200)
        .then(({ body }) => {
          expect(body.data.name).toEqual('test update')
          expect(body.data.filters.length).toEqual(3)
        })
    })

    it('Fetch Member Group Dict List', async () => {
      await useRequest('get', '/member/group/dict/list')
        .expect(200)
        .then(({ body }) => {
          expect(body.data[0].name).toEqual('test update')
        })
    })

    it('Fetch Member Group Pages', async () => {
      await useRequest('get', '/member/group/pages')
        .expect(200)
        .then(({ body }) => {
          expect(body.data.result[0].name).toEqual('test update')
        })
    })
  })
})
