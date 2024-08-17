import { getRequest, truncateTable } from '~~/tests/utils'

describe('Staff Module - Role', () => {
  beforeAll(async () => {
    await truncateTable([
      'manage_staff_role',
    ])
  })

  it('Create Role', async () => {
    const { body } = await getRequest('post', '/staff/role/create')
      .send({
        name: '角色 1',
        desc: '角色描述',
        permissions: [
          'space.module.page.action',
        ],
        sort: 2,
      })
      .expect(200)

    expect(body.code).toEqual(0)
  })

  it('Update Role', async () => {
    const { body } = await getRequest('put', '/staff/role/update')
      .query({ id: 1 })
      .send({
        name: '角色 update',
        desc: '角色描述',
        permissions: [
          'space.module.page.action',
          'space.module.page.action1',
        ],
        sort: 2,
      })
      .expect(200)

    expect(body.code).toEqual(0)
  })

  it('Fetch Role Detail', async () => {
    const { body } = await getRequest('get', '/staff/role/detail')
      .query({ id: 1 })
      .expect(200)

    expect(body.data.name).toEqual('角色 update')
    expect(body.data.permissions.length).toEqual(2)
  })

  it('Fetch Role Pages', async () => {
    const { body } = await getRequest('get', '/staff/role/pages')
      .expect(200)

    expect(body.data.total).toEqual(1)
  })

  it('Get Role List', async () => {
    const { body } = await getRequest('get', '/staff/role/list')
      .expect(200)

    expect(body.data.length).toEqual(1)
  })

  it('Delete Role', async () => {
    const { body } = await getRequest('delete', '/staff/role/delete')
      .send({ id: 1 })
      .expect(200)

    expect(body.code).toEqual(0)
  })
})
