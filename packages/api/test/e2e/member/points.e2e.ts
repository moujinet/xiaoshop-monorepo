import { useRequest } from '#/request'
import { getTableName, runSQL, truncateTable } from '#/tools'

describe('Member Module - Points', () => {
  beforeAll(async () => {
    await truncateTable([
      'member_points_rule',
    ])

    await runSQL([
      `INSERT INTO ${getTableName('member_points_rule')} (\`key\`, \`name\`, \`options\`) VALUES ('register', 'test', '{}')`,
    ])
  })

  describe('Rules', () => {
    it('Update Rule', async () => {
      await useRequest('put', '/admin/member/points/rule/update')
        .query({ key: 'register' })
        .send({
          desc: 'test',
          icon: 'test',
          options: { points: 1 },
        })
        .then(({ body }) => {
          expect(body.code).toEqual(0)
        })
    })

    it('Fetch Rule List', async () => {
      const { body } = await useRequest('get', '/admin/member/points/rule/list')
        .expect(200)

      expect(body.data.length).toEqual(1)
    })
  })

  describe('Change', () => {
    it('Fetch Change List', async () => {
      const { body } = await useRequest('get', '/admin/member/points/change/pages')
        .expect(200)

      expect(body.data.total).toBeDefined()
    })
  })
})
