import { cleanDirs, getTableName, runSQL, sleep, truncateTable, useRequest } from '~~/tests/utils'

const basePath = 'tests/__fixtures__'

describe('Resource Module - Resource', () => {
  beforeAll(async () => {
    await truncateTable(['resource', 'resource_group'])

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
        `INSERT INTO \`${getTableName('resource_group')}\` (\`name\`, \`parent_id\`, \`type\`) VALUES ('${group.name}', ${group.parentId}, '${group.type}')`,
      )
    }

    await cleanDirs([`${basePath}/upload/**/*`])
  })

  describe('Admin', () => {
    it('Upload Image Resource', async () => {
      await useRequest('post', '/resource/upload/image')
        .attach('file', `${basePath}/tmp/image/pass/1.jpg`)
        .field('groupId', 1)
        .expect(200)
        .then(({ body }) => {
          expect(body.data).toBeDefined()
        })
    })

    it('Fetch Resource Detail', async () => {
      const { body } = await useRequest('get', '/resource/detail')
        .query({ id: 1 })
        .expect(200)

      expect(body.data).toBeDefined()
    })

    it('Fetch Resource Pages', async () => {
      const { body } = await useRequest('get', '/resource/pages')
        .query({
          groupId: 1,
          type: 1,
        })
        .expect(200)

      expect(body.data.total).toEqual(1)
    })

    it('Delete Resource', async () => {
      await useRequest('delete', '/resource/delete')
        .send({ id: 1 })
        .expect(200)
        .then(async ({ body }) => {
          expect(body.code).toEqual(0)
          await sleep(10)
        })
    })
  })
})
