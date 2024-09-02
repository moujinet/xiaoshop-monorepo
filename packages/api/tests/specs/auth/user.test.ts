import { runSQL, truncateTable, useRequest } from '~~/tests/utils'

describe('Auth Module - User', () => {
  beforeAll(async () => {
    await truncateTable([
      'manage_auth_user',
      'manage_auth_role',
      'manage_auth_user_has_roles',
      'manage_organize_department',
      'manage_organize_position',
    ])

    await runSQL([
      // Roles
      `INSERT INTO manage_auth_role (\`name\`, \`permissions\`) VALUES ('角色', '["test.1", "test.2"]'), ('角色 1', '["test.1", "test.2"]')`,
      // Departments
      'INSERT INTO manage_organize_department (`name`) VALUES ("部门 1"), ("部门 2")',
      // Positions
      'INSERT INTO manage_organize_position (`department_id`, `name`) VALUES (1, "职位 1"), (2, "职位 2")',
    ])
  })

  it('Create User', async () => {
    await useRequest('post', '/auth/user/create')
      .send({
        username: 'test',
        password: '123456',
        name: 'Test',
        mobile: '13400009988',
        roleIds: [1],
        departmentId: 1,
        positionId: 1,
        isAdmin: 'N',
        status: 'normal',
      })
      .expect(200)
      .then(({ body }) => {
        expect(body.code).toEqual(0)
      })
  })

  it('Update User', async () => {
    await useRequest('put', '/auth/user/update')
      .query({ id: 1 })
      .send({
        username: 'test',
        name: 'Test',
        mobile: '13400009988',
        roleIds: [1, 2],
        departmentId: 2,
        positionId: 2,
        isAdmin: 'N',
        status: 'normal',
      })
      .expect(200)
      .then(({ body }) => {
        expect(body.code).toEqual(0)
      })
  })

  it('Login User', async () => {
    const { body } = await useRequest('post', '/auth/user/login')
      .send({
        username: 'test',
        password: '123456',
      })
      .expect(200)

    expect(body.data.token).toBeDefined()
  })

  it('Fetch User Detail', async () => {
    const { body } = await useRequest('get', '/auth/user/detail')
      .query({ id: 1 })
      .expect(200)

    expect(body.data.department.id).toEqual(2)
  })

  it('Block User', async () => {
    await useRequest('put', '/auth/user/block')
      .send({ id: 1 })
      .expect(200)

    const { body } = await useRequest('get', '/auth/user/detail')
      .query({ id: 1 })
      .expect(200)

    expect(body.data.status).toEqual('blocked')
  })

  it('Unblock User', async () => {
    await useRequest('put', '/auth/user/unblock')
      .send({ id: 1 })
      .expect(200)

    const { body } = await useRequest('get', '/auth/user/detail')
      .query({ id: 1 })
      .expect(200)

    expect(body.data.status).toEqual('normal')
  })

  it('Fetch User Pages', async () => {
    const { body } = await useRequest('get', '/auth/user/pages')
      .query({ page: 1, pageSize: 10 })
      .expect(200)

    expect(body.data.total).toEqual(1)
  })
})
