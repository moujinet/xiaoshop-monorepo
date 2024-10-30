import { useRequest } from '#/request'
import { getTableName, runSQL, truncateTable } from '#/tools'

describe('Member Module - Unregister', () => {
  beforeAll(async () => {
    await truncateTable([
      'member_unregister',
    ])

    await runSQL([
      `INSERT INTO ${getTableName('member_unregister')} (\`member_id\`, \`username\`, \`status\`) VALUES (1, 'test', 0)`,
    ])
  })

  describe('Audit', () => {
    it('Audit Member Unregister', async () => {
      const { body } = await useRequest('put', '/admin/member/unregister/audit')
        .query({ id: 1 })
        .send({
          status: 1,
          auditReason: 'test',
        })
        .expect(200)

      expect(body.code).toEqual(0)
    })

    it('Get Member Unregister Pages', async () => {
      const { body } = await useRequest('get', '/admin/member/unregister/apply/pages')
        .expect(200)

      expect(body.data.total).toEqual(1)
    })

    it('Get Member Unregister Detail', async () => {
      const { body } = await useRequest('get', '/admin/member/unregister/apply/detail')
        .query({ id: 1 })
        .expect(200)

      expect(body.data.status.key).toEqual(1)
    })
  })
})
