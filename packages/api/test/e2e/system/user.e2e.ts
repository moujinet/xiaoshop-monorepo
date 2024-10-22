import { useRequest } from '#/request'
import { SystemUserStatus } from '@xiaoshop/shared'
import { getTableName, runSQL, truncateTable } from '#/tools'

describe('System Auth Module - User', () => {
  beforeAll(async () => {
    await truncateTable([
      'system_user',
      'system_role',
      'system_user_has_roles',
    ])

    await runSQL([
      // Roles
      `INSERT INTO ${getTableName('system_role')} (\`name\`, \`permissions\`) VALUES ('角色', '["test.1", "test.2"]'), ('角色 1', '["test.1", "test.2"]')`,
    ])
  })

  describe('Admin', () => {
    it('Create User', async () => {
      await useRequest('post', '/admin/system/user/create')
        .send({
          username: 'test',
          password: 'test123456',
          name: 'Test',
          mobile: '13400009988',
          roleIds: [1],
          isAdmin: 0,
        })
        .expect(200)
        .then(({ body }) => {
          expect(body.code).toEqual(0)
        })
    })

    it('Update User', async () => {
      await useRequest('put', '/admin/system/user/update')
        .query({ id: 1 })
        .send({
          name: 'Test Update',
          mobile: '13400009988',
          roleIds: [1, 2],
        })
        .expect(200)
        .then(({ body }) => {
          expect(body.code).toEqual(0)
        })
    })

    it('Fetch User Detail', async () => {
      const { body } = await useRequest('get', '/admin/system/user/detail')
        .query({ id: 1 })
        .expect(200)

      expect(body.data.name).toEqual('Test Update')
    })

    it('Block User', async () => {
      await useRequest('put', '/admin/system/user/block')
        .query({ id: 1 })
        .expect(200)
        .then(({ body }) => {
          expect(body.code).toEqual(0)
        })

      await useRequest('get', '/admin/system/user/detail')
        .query({ id: 1 })
        .expect(200)
        .then(({ body }) => {
          expect(body.data.status.key).toEqual(SystemUserStatus.BLOCKED)
        })
    })

    it('Unblock User', async () => {
      await useRequest('put', '/admin/system/user/unblock')
        .query({ id: 1 })
        .expect(200)
        .then(({ body }) => {
          expect(body.code).toEqual(0)
        })

      await useRequest('get', '/admin/system/user/detail')
        .query({ id: 1 })
        .expect(200)
        .then(({ body }) => {
          expect(body.data.status.key).toEqual(SystemUserStatus.NORMAL)
        })
    })

    it('Fetch User Pages', async () => {
      const { body } = await useRequest('get', '/admin/system/user/pages')
        .query({ page: 1, pageSize: 10 })
        .expect(200)

      expect(body.data.total).toEqual(1)
    })
  })

  describe('Session', () => {
    it('Login User', async () => {
      const { body } = await useRequest('post', '/admin/login')
        .send({
          username: 'test',
          password: 'test123456',
        })
        .expect(200)

      expect(body.data.token).toBeDefined()
    })

    it('Current User Profile', async () => {
      const { body } = await useRequest('get', '/admin/profile')
        .expect(200)

      expect(body.data.name).toEqual('Admin')
    })
  })
})
