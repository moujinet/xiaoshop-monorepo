import { getRequest, runSQL, truncateTable } from '~~/tests/utils'

describe('Assets Module - Assets', () => {
  beforeAll(async () => {
    await truncateTable([
      'app_assets',
      'app_assets_group',
    ])

    const defaultGroups = [
      { name: '设计素材', parentId: 0, type: 'image' },
      { name: '图标', parentId: 1, type: 'image' },
      { name: '广告', parentId: 1, type: 'image' },
      { name: '商品图片', parentId: 0, type: 'image' },
      { name: '商品主图', parentId: 4, type: 'image' },
      { name: '商品视频', parentId: 0, type: 'video' },
    ]

    for (const group of defaultGroups) {
      await runSQL(`INSERT INTO app_assets_group (name, parent_id, type) VALUES ('${group.name}', ${group.parentId}, '${group.type}')`)
    }
  })

  it('Upload Image Asset', async () => {
    const { body } = await getRequest('post', '/assets/upload/image')
      .attach('file', 'tests/e2e/upload/__fixtures__/image/pass/1.jpg')
      .field('groupId', 1)
      .field('type', 'image')
      .field('enableCompress', 'Y')
      .field('enableThumbnail', 'Y')
      .field('enableWatermark', 'Y')
      .expect(200)

    expect(body.code).toEqual(0)
  })

  it('Fetch Asset Pages By Image Type', async () => {
    const { body } = await getRequest('get', '/assets/pages')
      .query({ type: 'image' })
      .expect(200)

    expect(body.data.total).toEqual(1)
  })

  it('Fetch Asset Detail', async () => {
    const { body } = await getRequest('get', '/assets/detail')
      .query({ id: 1 })
      .expect(200)

    expect(body.data.group.enableCompress).toEqual('N')
  })

  it('Upload Video Asset', async () => {
    const { body } = await getRequest('post', '/assets/upload/video')
      .attach('file', 'tests/e2e/upload/__fixtures__/video/pass/1.mp4')
      .field('groupId', 6)
      .field('type', 'video')
      .expect(200)

    expect(body.code).toEqual(0)
  })
})
