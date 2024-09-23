import { SystemUserStatus } from '@xiaoshop/shared'

import { getTableName, runSQL, truncateTable, useRequest } from '~~/tests/utils'

describe('System Auth Module - User', () => {
  beforeAll(async () => {
    await truncateTable([
      'system_user',
      'system_role',
      'system_user_has_roles',
      'system_department',
      'system_department_position',
    ])

    await runSQL([
      // Roles
      `INSERT INTO ${getTableName('system_role')} (\`name\`, \`permissions\`) VALUES ('角色', '["test.1", "test.2"]'), ('角色 1', '["test.1", "test.2"]')`,
      // Departments
      `INSERT INTO ${getTableName('system_department')} (\`name\`) VALUES ("部门 1"), ("部门 2")`,
      // Positions
      `INSERT INTO ${getTableName('system_department_position')} (\`department_id\`, \`name\`) VALUES (1, "职位 1"), (2, "职位 2")`,
    ])
  })

  describe('Admin', () => {
    it('Create User', async () => {
      await useRequest('post', '/system/user/create')
        .send({
          username: 'test',
          password: '123456',
          name: 'Test',
          mobile: '13400009988',
          roleIds: [1],
          departmentId: 1,
          positionId: 1,
          isAdmin: 0,
        })
        .expect(200)
        .then(({ body }) => {
          expect(body.code).toEqual(0)
        })
    })

    it('Update User', async () => {
      await useRequest('put', '/system/user/update')
        .query({ id: 1 })
        .send({
          name: 'Test',
          mobile: '13400009988',
          roleIds: [1, 2],
          departmentId: 2,
          positionId: 2,
        })
        .expect(200)
        .then(({ body }) => {
          expect(body.code).toEqual(0)
        })
    })

    it('Login User', async () => {
      const { body } = await useRequest('post', '/system/user/login')
        .send({
          username: 'test',
          password: '123456',
        })
        .expect(200)

      expect(body.data.token).toBeDefined()
    })

    it('Fetch User Detail', async () => {
      const { body } = await useRequest('get', '/system/user/detail')
        .query({ id: 1 })
        .expect(200)

      expect(body.data.department.id).toEqual(2)
    })

    it('Block User', async () => {
      await useRequest('put', '/system/user/block')
        .query({ id: 1 })
        .expect(200)
        .then(({ body }) => {
          expect(body.code).toEqual(0)
        })

      await useRequest('get', '/system/user/detail')
        .query({ id: 1 })
        .expect(200)
        .then(({ body }) => {
          expect(body.data.status.key).toEqual(SystemUserStatus.BLOCKED)
        })
    })

    it('Unblock User', async () => {
      await useRequest('put', '/system/user/unblock')
        .query({ id: 1 })
        .expect(200)
        .then(({ body }) => {
          expect(body.code).toEqual(0)
        })

      await useRequest('get', '/system/user/detail')
        .query({ id: 1 })
        .expect(200)
        .then(({ body }) => {
          expect(body.data.status.key).toEqual(SystemUserStatus.NORMAL)
        })
    })

    it('Fetch User Pages', async () => {
      const { body } = await useRequest('get', '/system/user/pages')
        .query({ page: 1, pageSize: 10 })
        .expect(200)

      expect(body.data.total).toEqual(1)
    })
  })
})
