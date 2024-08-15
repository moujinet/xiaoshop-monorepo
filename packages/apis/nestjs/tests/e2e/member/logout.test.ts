import { getRequest, runSQL, truncateTable } from '~~/tests/utils'

describe('Member Module - Logout', () => {
  beforeAll(async () => {
    await truncateTable([
      'shop_member_logout',
    ])

    await runSQL('INSERT INTO `shop_member_logout` (`member_id`, `status`) VALUES (1, "pending")')
  })

  it('Update Member Logout Status', async () => {
    const { body } = await getRequest('put', '/member/logout/status/update')
      .query({ id: 1 })
      .send({ status: 'logout' })
      .expect(200)

    expect(body.code).toEqual(0)
  })
})
