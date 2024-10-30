import { useRequest } from '#/request'
import { truncateTable } from '#/tools'

describe('Member Module - Group', () => {
  beforeAll(async () => {
    await truncateTable([
      'member_group',
    ])
  })

  describe('Admin', () => {
    it('Create Group', async () => {
      await useRequest('post', '/admin/member/group/create')
        .send({
          name: 'test',
          filters: [
            { name: 'test', key: 1, operator: 1, value: [1] },
          ],
        })
        .expect(200)
        .then(({ body }) => {
          expect(body.code).toEqual(0)
        })
    })

    it('Update Group', async () => {
      await useRequest('put', '/admin/member/group/update')
        .query({ id: 1 })
        .send({
          name: 'test update',
          filters: [
            { name: 'test', key: 1, operator: 1, value: [2] },
          ],
        })
        .then(({ body }) => {
          expect(body.code).toEqual(0)
        })
    })

    it('Fetch Group Detail', async () => {
      const { body } = await useRequest('get', '/admin/member/group/detail')
        .query({ id: 1 })
        .expect(200)

      expect(body.data.name).toEqual('test update')
    })

    it('Fetch Group Pages', async () => {
      const { body } = await useRequest('get', '/admin/member/group/pages')
        .expect(200)

      expect(body.data.total).toEqual(1)
    })

    it('Fetch Group Dict List', async () => {
      const { body } = await useRequest('get', '/admin/member/group/dict/list')
        .expect(200)

      expect(body.data.length).toEqual(1)
    })
  })
})
