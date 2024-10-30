import { useRequest } from '#/request'
import { truncateTable } from '#/tools'

describe('Member Module - Tag', () => {
  beforeAll(async () => {
    await truncateTable([
      'member_tag',
    ])
  })

  describe('Admin', () => {
    it('Create Tag', async () => {
      await useRequest('post', '/admin/member/tag/create')
        .send({
          name: 'test',
        })
        .expect(200)
        .then(({ body }) => {
          expect(body.code).toEqual(0)
        })
    })

    it('Update Tag', async () => {
      await useRequest('put', '/admin/member/tag/update')
        .query({ id: 1 })
        .send({
          name: 'test update',
          color: 'blue',
        })
        .then(({ body }) => {
          expect(body.code).toEqual(0)
        })
    })

    it('Fetch Tag Detail', async () => {
      const { body } = await useRequest('get', '/admin/member/tag/detail')
        .query({ id: 1 })
        .expect(200)

      expect(body.data.name).toEqual('test update')
    })

    it('Fetch Tag Pages', async () => {
      const { body } = await useRequest('get', '/admin/member/tag/pages')
        .expect(200)

      expect(body.data.total).toEqual(1)
    })

    it('Fetch Tag Dict List', async () => {
      const { body } = await useRequest('get', '/admin/member/tag/dict/list')
        .expect(200)

      expect(body.data.length).toEqual(1)
    })
  })
})
