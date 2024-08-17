import { getRequest, runSQL, truncateTable } from '~~/tests/utils'

describe('Staff Module - Account', () => {
  beforeAll(async () => {
    await truncateTable([
      'manage_staff_account',
      'manage_staff_role',
      'manage_staff_department',
      'manage_staff_position',
      'manage_staff_account_has_roles',
    ])

    await runSQL([
      'INSERT INTO `manage_staff_role` (`name`) VALUES (\'角色 1\')',
      'INSERT INTO `manage_staff_department` (`name`) VALUES (\'部门 1\')',
      'INSERT INTO `manage_staff_position` (`name`, `department_id`) VALUES (\'职位 1\', 1)',
    ])
  })

  it('Create Account', async () => {
    const { body } = await getRequest('post', '/staff/account/create')
      .send({
        username: 'staffA',
        password: '123456',
        name: '员工 1',
        mobile: '13333333333',
        roleIds: [1],
        departmentId: 1,
        positionId: 1,
        isAdmin: 'Y',
        status: 'normal',
      })
      .expect(200)

    expect(body.code).toEqual(0)
  })

  it('Update Account', async () => {
    const { body } = await getRequest('put', '/staff/account/update')
      .query({ id: 1 })
      .send({
        username: 'staffUpdate',
        name: '员工 1',
        mobile: '13333333333',
        roleIds: [1],
        departmentId: 1,
        positionId: 1,
        isAdmin: 'Y',
        status: 'normal',
      })
      .expect(200)

    expect(body.code).toEqual(0)
  })

  it('Fetch Account Detail', async () => {
    const { body } = await getRequest('get', '/staff/account/detail')
      .query({ id: 1 })
      .expect(200)

    expect(body.data.username).toEqual('staffUpdate')
    expect(body.data.roles.length).toEqual(1)
    expect(body.data.department.id).toEqual(1)
    expect(body.data.position.id).toEqual(1)
  })

  it('Fetch Account Pages', async () => {
    const { body } = await getRequest('get', '/staff/account/pages').expect(
      200,
    )

    expect(body.data.total).toEqual(1)
  })

  it('Delete Account', async () => {
    const { body } = await getRequest('delete', '/staff/account/delete')
      .send({ id: 1 })
      .expect(200)

    expect(body.code).toEqual(0)
  })
})
