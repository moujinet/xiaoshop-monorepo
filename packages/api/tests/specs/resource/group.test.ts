import { truncateTable, useRequest } from '~~/tests/utils'

describe('Resource Module - Group', () => {
  beforeAll(async () => {
    await truncateTable(['resource_group'])
  })

  it('Create Group', async () => {
    await useRequest('post', '/resource/group/create')
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
    await useRequest('put', '/resource/group/update')
      .query({ id: 1 })
      .send({
        type: 1,
        name: 'test update',
        enableCompress: 0,
        enableWatermark: 0,
        enableThumbnail: 0,
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
      .query({ type: 1 })
      .expect(200)

    expect(body.data.length).toEqual(1)
  })

  it('Fetch Group Root List', async () => {
    const { body } = await useRequest('get', '/resource/group/root/list')
      .query({ type: 1 })
      .expect(200)

    expect(body.data.length).toEqual(1)
  })
})
