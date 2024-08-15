import {
  getRequest,
  truncateTable,
} from '~~/tests/utils'

describe('Assets Module - Group', () => {
  beforeAll(async () => {
    await truncateTable([
      'app_assets_group',
    ])
  })

  it('Create Asset Group', async () => {
    const { body } = await getRequest('post', '/assets/group/create')
      .send({
        parentId: 0,
        type: 'image',
        name: 'test',
        enableCompress: 'Y',
        enableWatermark: 'Y',
        enableThumbnail: 'Y',
      })
      .expect(200)

    expect(body.code).toEqual(0)
  })

  it('Fetch Asset Group Detail', async () => {
    const { body } = await getRequest('get', '/assets/group/detail')
      .query({ id: 1 })
      .expect(200)

    expect(body.data.name).toEqual('test')
  })

  it('Update Asset Group', async () => {
    const { body } = await getRequest('put', '/assets/group/update')
      .query({ id: 1 })
      .send({
        parentId: 0,
        type: 'image',
        name: 'test 1',
        enableCompress: 'Y',
        enableWatermark: 'Y',
        enableThumbnail: 'Y',
      })
      .expect(200)

    expect(body.code).toEqual(0)
  })

  it('Fetch Asset Group List', async () => {
    const { body } = await getRequest('get', '/assets/group/list')
      .query({ type: 'image' })
      .expect(200)

    const test = body.data.find(d => d.id === 1)
    expect(test.name).toEqual('test 1')
  })

  it('Fetch Asset Group Root List', async () => {
    const { body } = await getRequest('get', '/assets/group/root/list')
      .query({ type: 'image' })
      .expect(200)

    const test = body.data.find(d => d.id === 1)
    expect(test.name).toEqual('test 1')
  })
})
