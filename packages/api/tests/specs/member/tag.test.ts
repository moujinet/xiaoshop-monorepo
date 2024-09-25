import { truncateTable, useRequest } from '~~/tests/utils'

describe('Member Module - Tag', () => {
  beforeAll(async () => {
    await truncateTable([
      'member_tag',
    ])
  })

  describe('Admin', () => {
    it('Create Member Tag', async () => {
      await useRequest('post', '/member/tag/create')
        .send({
          name: 'test',
        })
        .expect(200)
        .then(({ body }) => {
          expect(body.code).toEqual(0)
        })
    })

    it('Update Member Tag', async () => {
      await useRequest('put', '/member/tag/update')
        .query({ id: 1 })
        .send({
          name: 'test update',
        })
        .expect(200)
        .then(({ body }) => {
          expect(body.code).toEqual(0)
        })
    })

    it('Fetch Member Tag', async () => {
      await useRequest('get', '/member/tag/detail')
        .query({ id: 1 })
        .expect(200)
        .then(({ body }) => {
          expect(body.data.name).toEqual('test update')
        })
    })

    it('Fetch Member Tag Dict List', async () => {
      await useRequest('get', '/member/tag/dict/list')
        .expect(200)
        .then(({ body }) => {
          expect(body.data[0].name).toEqual('test update')
        })
    })

    it('Fetch Member Tag Pages', async () => {
      await useRequest('get', '/member/tag/pages')
        .expect(200)
        .then(({ body }) => {
          expect(body.data.result[0].name).toEqual('test update')
        })
    })
  })
})
