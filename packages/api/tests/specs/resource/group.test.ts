import { truncateTable, useRequest } from '~~/tests/utils'

describe('Resource Module - Group', () => {
  beforeAll(async () => {
    await truncateTable(['app_resource_group'])
  })

  it('Create Group', async () => {
    await useRequest('post', '/resource/group/create')
      .send({
        type: 'image',
        name: 'test',
        enableCompress: 'N',
        enableWatermark: 'N',
        enableThumbnail: 'N',
      })
      .expect(200)
      .then(({ body }) => {
        expect(body.code).toEqual(0)
      })
  })

  it('Update Group', async () => {
    await useRequest('put', '/resource/group/update')
      .query({ id: 1 })
      .send({
        type: 'image',
        name: 'test update',
        enableCompress: 'N',
        enableWatermark: 'N',
        enableThumbnail: 'N',
      })
      .expect(200)
      .then(({ body }) => {
        expect(body.code).toEqual(0)
      })
  })

  it('Fetch Group', async () => {
    const { body } = await useRequest('get', '/resource/group/detail')
      .query({ id: 1 })
      .expect(200)

    expect(body.data.name).toEqual('test update')
  })

  it('Fetch Group List', async () => {
    const { body } = await useRequest('get', '/resource/group/list')
      .query({ type: 'image' })
      .expect(200)

    expect(body.data.length).toEqual(1)
  })

  it('Fetch Group Root List', async () => {
    const { body } = await useRequest('get', '/resource/group/root/list')
      .query({ type: 'image' })
      .expect(200)

    expect(body.data.length).toEqual(1)
  })
})
