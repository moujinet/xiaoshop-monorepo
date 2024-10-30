import { useRequest } from '#/request'
import { truncateTable } from '#/tools'

describe('Member Module - Invite', () => {
  beforeAll(async () => {
    await truncateTable([
      'member_invite',
    ])
  })

  describe('Query', () => {
    it('Get Member Invite Pages', async () => {
      const { body } = await useRequest('get', '/admin/member/invite/pages')
        .query({ memberId: 1 })
        .expect(200)

      expect(body.data.total).toEqual(0)
    })
  })
})
