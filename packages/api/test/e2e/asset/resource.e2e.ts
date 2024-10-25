import { useRequest } from '#/request'
import { cleanDirs, getTableName, runSQL, truncateTable } from '#/tools'

const _data = 'test/__data__'
const _fixtures = 'test/__fixtures__'

describe('Asset Module - Resource', () => {
  beforeAll(async () => {
    await truncateTable([
      'asset_group',
      'asset_resource',
    ])

    const defaultGroups = [
      { name: '设计素材', parentId: 0, type: 1 },
      { name: '图标', parentId: 1, type: 1 },
      { name: '广告', parentId: 1, type: 1 },
      { name: '商品图片', parentId: 0, type: 1 },
      { name: '商品主图', parentId: 4, type: 1 },
      { name: '商品视频', parentId: 0, type: 2 },
    ]

    for (const group of defaultGroups) {
      await runSQL(
        `INSERT INTO \`${getTableName('asset_group')}\` (\`name\`, \`parent_id\`, \`type\`) VALUES ('${group.name}', ${group.parentId}, '${group.type}')`,
      )
    }

    await cleanDirs([`${_fixtures}/upload/**/*`])
  })

  describe('Upload', () => {
    it('Upload Image', async () => {
      await useRequest('post', '/admin/asset/upload/image')
        .attach('file', `${_data}/image/pass/1.jpg`)
        .field('groupId', 1)
        .expect(200)
        .then(({ body }) => {
          expect(body.data).toBeDefined()
        })
    })

    it('Upload Video', async () => {
      await useRequest('post', '/admin/asset/upload/video')
        .attach('file', `${_data}/video/pass/1.mp4`)
        .field('groupId', 6)
        .expect(200)
        .then(({ body }) => {
          expect(body.data).toBeDefined()
        })
    })

    it('Upload File', async () => {
      await useRequest('post', '/admin/asset/upload/file')
        .attach('file', `${_data}/excel/1.xlsx`)
        .expect(200)
        .then(({ body }) => {
          expect(body.data).toBeDefined()
        })
    })
  })

  describe('Admin', () => {
    it('Fetch Resource Pages', async () => {
      const { body } = await useRequest('get', '/admin/asset/resource/pages')
        .query({ type: 1 })
        .expect(200)

      expect(body.data.total).toEqual(1)
    })

    it('Fetch Resource Detail', async () => {
      const { body } = await useRequest('get', '/admin/asset/resource/detail')
        .query({ id: 1 })
        .expect(200)

      expect(body.data.name).toEqual('1.jpg')
    })
  })
})
