import { useRequest } from '#/request'
import { truncateTable } from '#/tools'

describe('Asset Module - Group', () => {
  beforeAll(async () => {
    await truncateTable([
      'asset_group',
    ])
  })

  describe('Admin', () => {
    it('Create Group', async () => {
      await useRequest('post', '/admin/asset/group/create')
        .send({
          type: 1,
          name: 'test',
          enableCompress: 0,
          enableWatermark: 0,
          enableThumbnail: 0,
        })
        .expect(200)
        .then(({ body }) => {
          expect(body.code).toEqual(0)
        })
    })

    it('Update Group', async () => {
      await useRequest('put', '/admin/asset/group/update')
        .query({ id: 1 })
        .send({
          name: 'test update',
          enableCompress: 0,
          enableWatermark: 0,
          enableThumbnail: 0,
        })
        .then(({ body }) => {
          expect(body.code).toEqual(0)
        })
    })

    it('Fetch Group Detail', async () => {
      const { body } = await useRequest('get', '/admin/asset/group/detail')
        .query({ id: 1 })
        .expect(200)

      expect(body.data.name).toEqual('test update')
    })

    it('Fetch Group List', async () => {
      const { body } = await useRequest('get', '/admin/asset/group/list')
        .query({ type: 1 })
        .expect(200)

      expect(body.data.length).toEqual(1)
    })

    it('Fetch Group Root List', async () => {
      const { body } = await useRequest('get', '/admin/asset/group/root/list')
        .query({ type: 1 })
        .expect(200)

      expect(body.data.length).toEqual(1)
    })
  })
})
