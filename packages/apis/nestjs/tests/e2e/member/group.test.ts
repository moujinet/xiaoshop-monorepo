import { getRequest, truncateTable } from '~~/tests/utils'

describe('Member Module - Group', () => {
  beforeAll(async () => {
    await truncateTable([
      'shop_member_group',
    ])
  })

  it('Create Member Group', async () => {
    const { body } = await getRequest('post', '/member/group/create')
      .send({
        name: 'group',
        desc: 'group',
        conditions: [
          {
            name: '会员性别',
            key: 'gender',
            operator: 'in',
            value: ['male', 'female'],
          },
        ],
      })
      .expect(200)

    expect(body.code).toEqual(0)
  })

  it('Update Member Group', async () => {
    const { body } = await getRequest('put', '/member/group/update')
      .query({ id: 1 })
      .send({
        name: 'group (修改)',
        desc: 'group',
        conditions: [
          {
            name: '会员性别',
            key: 'gender',
            operator: 'in',
            value: ['male', 'female'],
          },
        ],
      })
      .expect(200)

    expect(body.code).toEqual(0)
  })

  it('Fetch Member Group Detail', async () => {
    const { body } = await getRequest('get', '/member/group/detail')
      .query({ id: 1 })
      .expect(200)

    expect(body.data.name).toEqual('group (修改)')
  })

  it('Fetch Member Group Pages', async () => {
    const { body } = await getRequest('get', '/member/group/pages')
      .expect(200)

    expect(body.data.total).toEqual(1)
  })
})
