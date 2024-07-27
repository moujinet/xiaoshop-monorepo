import type { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { Enabled, StaffAccountStatus } from '@xiaoshop/schema'
import { EXCEPTION_EXISTS, EXCEPTION_NOT_FOUND } from '~/common/exception'
import { createNestApplication, truncateTable } from '~~/tests/application'
import { StaffsModule } from '@/staffs/staffs.module'

describe('Staffs Module', () => {
  let app: INestApplication

  beforeAll(async () => {
    app = await createNestApplication([
      StaffsModule,
    ])
    await app.init()

    await truncateTable([
      'manage_staff_position',
      'manage_staff_department',
      'manage_staff_role',
      'manage_staff_account_has_roles',
      'manage_staff_account',
      'manage_staff_log',
    ])
  })

  afterAll(async () => {
    await app.close()
  })

  describe('Department', () => {
    it('Create Department', async () => {
      const { body } = await request(app.getHttpServer())
        .post('/staffs/department/create')
        .send({
          parentId: 0,
          name: '部门 1',
          desc: '部门描述',
          sort: 2,
        })
        .expect(200)

      await request(app.getHttpServer())
        .post('/staffs/department/create')
        .send({
          parentId: 0,
          name: '部门 2',
          desc: '部门描述',
          sort: 1,
        })
        .expect(200)

      expect(body.code).toEqual(0)
    })

    it('Update Department', async () => {
      const { body } = await request(app.getHttpServer())
        .put('/staffs/department/update?id=1')
        .send({
          parentId: 0,
          name: '部门 update',
          desc: '部门描述',
          sort: 1,
        })
        .expect(200)

      expect(body.code).toEqual(0)
    })

    it('Get Department Detail', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/staffs/department/detail?id=1')
        .expect(200)

      expect(body.data.name).toEqual('部门 update')
    })

    it('Get Department List', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/staffs/department/list')
        .expect(200)

      expect(body.data.length).toEqual(2)
    })

    it('Get Department Root List', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/staffs/department/root/list')
        .expect(200)

      expect(body.data[0].name).toEqual('部门 2')
    })

    it('Get Department Detail Throw NotFoundException', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/staffs/department/detail?id=3')
        .expect(200)

      expect(body.code).toEqual(EXCEPTION_NOT_FOUND)
    })

    it('Create Department Throw ExistsException', async () => {
      const { body } = await request(app.getHttpServer())
        .post('/staffs/department/create')
        .send({
          parentId: 0,
          name: '部门 2',
          desc: '部门描述',
          sort: 1,
        })
        .expect(200)

      expect(body.code).toEqual(EXCEPTION_EXISTS)
    })

    it('Update Department Throw NotFoundException', async () => {
      const { body } = await request(app.getHttpServer())
        .put('/staffs/department/update?id=3')
        .send({
          parentId: 0,
          name: '部门 not found',
          desc: '部门描述',
          sort: 1,
        })
        .expect(200)

      expect(body.code).toEqual(EXCEPTION_NOT_FOUND)
    })

    it('Update Department Throw ExistsException', async () => {
      const { body } = await request(app.getHttpServer())
        .put('/staffs/department/update?id=1')
        .send({
          parentId: 0,
          name: '部门 2',
          desc: '部门描述',
          sort: 1,
        })
        .expect(200)

      expect(body.code).toEqual(EXCEPTION_EXISTS)
    })

    it('Delete Department', async () => {
      const { body } = await request(app.getHttpServer())
        .delete('/staffs/department/delete')
        .send({ id: 1 })
        .expect(200)

      expect(body.code).toEqual(0)
    })
  })

  describe('Position', () => {
    it('Create Position', async () => {
      const { body } = await request(app.getHttpServer())
        .post('/staffs/position/create')
        .send({
          departmentId: 2,
          name: '职位 1',
          desc: '职位描述',
          sort: 2,
        })
        .expect(200)

      await request(app.getHttpServer())
        .post('/staffs/position/create')
        .send({
          departmentId: 2,
          name: '职位 2',
          desc: '职位描述',
          sort: 1,
        })
        .expect(200)

      expect(body.code).toEqual(0)
    })

    it('Update Position', async () => {
      const { body } = await request(app.getHttpServer())
        .put('/staffs/position/update?id=1')
        .send({
          departmentId: 2,
          name: '职位 update',
          desc: '职位描述',
          sort: 1,
        })
        .expect(200)

      expect(body.code).toEqual(0)
    })

    it('Get Position Detail', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/staffs/position/detail?id=1')
        .expect(200)

      expect(body.data.name).toEqual('职位 update')
      expect(body.data.department.id).toEqual(2)
    })

    it('Get Position Pages', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/staffs/position/pages')
        .expect(200)

      expect(body.data.total).toEqual(2)
    })

    it('Get Position List', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/staffs/position/list?departmentId=2')
        .expect(200)

      expect(body.data.length).toEqual(2)
    })

    it('Get Position Detail Throw NotFoundException', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/staffs/position/detail?id=3')
        .expect(200)

      expect(body.code).toEqual(EXCEPTION_NOT_FOUND)
    })

    it('Create Position Throw ExistsException', async () => {
      const { body } = await request(app.getHttpServer())
        .post('/staffs/position/create')
        .send({
          departmentId: 2,
          name: '职位 2',
          desc: '职位描述',
          sort: 1,
        })
        .expect(200)

      expect(body.code).toEqual(EXCEPTION_EXISTS)
    })

    it('Update Position Throw NotFoundException', async () => {
      const { body } = await request(app.getHttpServer())
        .put('/staffs/position/update?id=3')
        .send({
          departmentId: 2,
          name: '职位 not found',
          desc: '职位描述',
          sort: 1,
        })
        .expect(200)

      expect(body.code).toEqual(EXCEPTION_NOT_FOUND)
    })

    it('Update Position Throw ExistsException', async () => {
      const { body } = await request(app.getHttpServer())
        .put('/staffs/position/update?id=1')
        .send({
          departmentId: 2,
          name: '职位 2',
          desc: '职位描述',
          sort: 1,
        })
        .expect(200)

      expect(body.code).toEqual(EXCEPTION_EXISTS)
    })

    it('Delete Position', async () => {
      const { body } = await request(app.getHttpServer())
        .delete('/staffs/position/delete')
        .send({ id: 1 })
        .expect(200)

      expect(body.code).toEqual(0)
    })
  })

  describe('Role', () => {
    it('Create Role', async () => {
      const { body } = await request(app.getHttpServer())
        .post('/staffs/role/create')
        .send({
          name: '角色 1',
          desc: '角色描述',
          permissions: [
            'space.module.page.action',
          ],
          sort: 2,
        })
        .expect(200)

      await request(app.getHttpServer())
        .post('/staffs/role/create')
        .send({
          name: '角色 2',
          desc: '角色描述',
          permissions: [
            'space.module.page.action',
          ],
          sort: 1,
        })
        .expect(200)

      expect(body.code).toEqual(0)
    })

    it('Update Role', async () => {
      const { body } = await request(app.getHttpServer())
        .put('/staffs/role/update?id=1')
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

    it('Get Role Detail', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/staffs/role/detail?id=1')
        .expect(200)

      expect(body.data.name).toEqual('角色 update')
      expect(body.data.permissions.length).toEqual(2)
    })

    it('Get Role Pages', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/staffs/role/pages')
        .expect(200)

      expect(body.data.total).toEqual(2)
    })

    it('Get Role List', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/staffs/role/list')
        .expect(200)

      expect(body.data.length).toEqual(2)
    })

    it('Get Role Detail Throw NotFoundException', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/staffs/role/detail?id=3')
        .expect(200)

      expect(body.code).toEqual(EXCEPTION_NOT_FOUND)
    })

    it('Create Role Throw ExistsException', async () => {
      const { body } = await request(app.getHttpServer())
        .post('/staffs/role/create')
        .send({
          name: '角色 2',
          desc: '角色描述',
          permissions: [
            'space.module.page.action',
          ],
          sort: 2,
        })
        .expect(200)

      expect(body.code).toEqual(EXCEPTION_EXISTS)
    })

    it('Update Role Throw NotFoundException', async () => {
      const { body } = await request(app.getHttpServer())
        .put('/staffs/role/update?id=3')
        .send({
          name: '角色 2',
          desc: '角色描述',
          permissions: [
            'space.module.page.action',
          ],
          sort: 2,
        })
        .expect(200)

      expect(body.code).toEqual(EXCEPTION_NOT_FOUND)
    })

    it('Update Role Throw ExistsException', async () => {
      const { body } = await request(app.getHttpServer())
        .put('/staffs/role/update?id=1')
        .send({
          name: '角色 2',
          desc: '角色描述',
          permissions: [
            'space.module.page.action',
          ],
          sort: 2,
        })
        .expect(200)

      expect(body.code).toEqual(EXCEPTION_EXISTS)
    })

    it('Delete Role', async () => {
      const { body } = await request(app.getHttpServer())
        .delete('/staffs/role/delete')
        .send({ id: 1 })
        .expect(200)

      expect(body.code).toEqual(0)
    })
  })

  describe('Account', () => {
    it('Create Account', async () => {
      const { body } = await request(app.getHttpServer())
        .post('/staffs/account/create')
        .send({
          username: 'staffA',
          password: '123456',
          name: '员工 1',
          mobile: '13333333333',
          roleIds: [2],
          departmentId: 2,
          positionId: 2,
          isAdmin: Enabled.YES,
          status: StaffAccountStatus.NORMAL,
        })
        .expect(200)

      await request(app.getHttpServer())
        .post('/staffs/account/create')
        .send({
          username: 'staffB',
          password: '123456',
          name: '员工 2',
          mobile: '13333333334',
          roleIds: [2],
          departmentId: 2,
          positionId: 2,
          isAdmin: Enabled.NO,
          status: StaffAccountStatus.EXIT,
        })
        .expect(200)

      expect(body.code).toEqual(0)
    })

    it('Update Account', async () => {
      const { body } = await request(app.getHttpServer())
        .put('/staffs/account/update?id=1')
        .send({
          username: 'staffUpdate',
          password: '123456',
          name: '员工 1',
          mobile: '13333333333',
          roleIds: [2],
          departmentId: 2,
          positionId: 2,
          isAdmin: Enabled.YES,
          status: StaffAccountStatus.NORMAL,
        })
        .expect(200)

      expect(body.code).toEqual(0)
    })

    it('Get Account Detail', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/staffs/account/detail?id=1')
        .expect(200)

      expect(body.data.username).toEqual('staffUpdate')
      expect(body.data.roles.length).toEqual(1)
      expect(body.data.department.id).toEqual(2)
      expect(body.data.position.id).toEqual(2)
    })

    it('Get Account Pages', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/staffs/account/pages')
        .expect(200)

      expect(body.data.total).toEqual(2)
    })

    it('Get Account Detail Throw NotFoundException', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/staffs/account/detail?id=3')
        .expect(200)

      expect(body.code).toEqual(EXCEPTION_NOT_FOUND)
    })

    it('Create Account Throw Name ExistsException', async () => {
      const { body } = await request(app.getHttpServer())
        .post('/staffs/account/create')
        .send({
          username: 'staffB',
          password: '123456',
          name: '员工 2',
          mobile: '13333333334',
          roleIds: [2],
          departmentId: 2,
          positionId: 2,
          isAdmin: Enabled.NO,
          status: StaffAccountStatus.EXIT,
        })
        .expect(200)

      expect(body.code).toEqual(EXCEPTION_EXISTS)
    })

    it('Create Account Throw Username ExistsException', async () => {
      const { body } = await request(app.getHttpServer())
        .post('/staffs/account/create')
        .send({
          username: 'staffC',
          password: '123456',
          name: '员工 2',
          mobile: '13333333334',
          roleIds: [2],
          departmentId: 2,
          positionId: 2,
          isAdmin: Enabled.NO,
          status: StaffAccountStatus.EXIT,
        })
        .expect(200)

      expect(body.code).toEqual(EXCEPTION_EXISTS)
    })

    it('Create Account Throw Mobile ExistsException', async () => {
      const { body } = await request(app.getHttpServer())
        .post('/staffs/account/create')
        .send({
          username: 'staffC',
          password: '123456',
          name: '员工 3',
          mobile: '13333333334',
          roleIds: [2],
          departmentId: 2,
          positionId: 2,
          isAdmin: Enabled.NO,
          status: StaffAccountStatus.EXIT,
        })
        .expect(200)

      expect(body.code).toEqual(EXCEPTION_EXISTS)
    })

    it('Update Account Throw NotFoundException', async () => {
      const { body } = await request(app.getHttpServer())
        .put('/staffs/account/update?id=3')
        .send({
          username: 'staffD',
          password: '123456',
          name: '员工 4',
          mobile: '13333333335',
          roleIds: [2],
          departmentId: 2,
          positionId: 2,
          isAdmin: Enabled.NO,
          status: StaffAccountStatus.EXIT,
        })
        .expect(200)

      expect(body.code).toEqual(EXCEPTION_NOT_FOUND)
    })

    it('Update Account Throw ExistsException', async () => {
      const { body } = await request(app.getHttpServer())
        .put('/staffs/account/update?id=1')
        .send({
          username: 'staffB',
          password: '123456',
          name: '员工 2',
          mobile: '13333333334',
          roleIds: [2],
          departmentId: 2,
          positionId: 2,
          isAdmin: Enabled.NO,
          status: StaffAccountStatus.EXIT,
        })
        .expect(200)

      expect(body.code).toEqual(EXCEPTION_EXISTS)
    })

    it('Delete Account', async () => {
      const { body } = await request(app.getHttpServer())
        .delete('/staffs/account/delete')
        .send({ id: 1 })
        .expect(200)

      expect(body.code).toEqual(0)
    })
  })

  describe('Log', () => {
    it('Get Log Pages', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/staffs/log/pages')
        .expect(200)

      expect(body.data.total).toEqual(0)
    })
  })
})
