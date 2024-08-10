import type { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { MemberStatus } from '@xiaoshop/schema'
import { createNestApplication, runSQL, truncateTable } from '~~/tests/application'
import { MemberModule } from '@/member/member.module'

describe('Member Module', () => {
  let app: INestApplication

  beforeAll(async () => {
    app = await createNestApplication([
      MemberModule,
    ])
    await app.init()

    await truncateTable([
      'shop_member_account',
      'shop_member_address',
      'shop_member_card_binding',
      'shop_member_card',
      'shop_member_group',
      'shop_member_has_tags',
      'shop_member_logout',
      'shop_member_points_rule',
      'shop_member_tag',
      'shop_member',
    ])
  })

  afterAll(async () => {
    await app.close()
  })

  // Member Card
  describe('Member Card', () => {
    it('Create Custom Member Card', async () => {
      const { body } = await request(app.getHttpServer())
        .post('/member/card/create')
        .send({
          type: 'custom',
          isEnabled: 'Y',
          name: 'Member vip 1',
          desc: 'Member vip 1',
          badge: {
            icon: 'icon',
            textColor: '#000000',
            bgColor: '#ffffff',
          },
          styles: {
            icon: 'icon',
            textColor: '#000000',
            bgColor: '#ffffff',
            bgImage: 'https://i.pravatar.cc/300',
          },
          plans: [
            { type: 'times', duration: 0, price: 10 },
            { type: 'times', duration: 0, price: 20 },
          ],
          needExp: 0,
          discount: 0,
          pointsRatio: 0,
          isFreeShipping: 'Y',
        })
        .expect(200)

      expect(body.code).toEqual(0)
    })

    it('Update Custom Member Card', async () => {
      const { body } = await request(app.getHttpServer())
        .put('/member/card/update?id=1')
        .send({
          type: 'custom',
          isEnabled: 'Y',
          name: 'Member vip 1',
          desc: 'Member vip 1',
          badge: {
            icon: 'icon',
            textColor: '#000000',
            bgColor: '#ffffff',
          },
          styles: {
            icon: 'icon',
            textColor: '#000000',
            bgColor: '#ffffff',
            bgImage: 'https://i.pravatar.cc/300',
          },
          plans: [
            { id: 1, type: 'times', duration: 0, price: 10 },
          ],
          needExp: 0,
          discount: 0,
          pointsRatio: 0,
          isFreeShipping: 'Y',
        })
        .expect(200)

      expect(body.code).toEqual(0)
    })

    it('Fetch Member Card Detail', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/member/card/detail?id=1')
        .expect(200)

      expect(body.data.name).toEqual('Member vip 1')
    })

    it('Update Member Card Status', async () => {
      const { body } = await request(app.getHttpServer())
        .put('/member/card/status/update?id=1')
        .send({
          status: 'N',
        })
        .expect(200)

      expect(body.code).toEqual(0)
    })

    it('Fetch Member Custom Card List', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/member/card/custom/list')
        .expect(200)

      expect(body.data.length).toEqual(1)
    })

    it('Fetch Member Level Card List', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/member/card/level/list')
        .expect(200)

      expect(body.data.length).toEqual(0)
    })
  })

  // Member Group
  describe('Member Group', () => {
    it('Create Member Group', async () => {
      const { body } = await request(app.getHttpServer())
        .post('/member/group/create')
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
      const { body } = await request(app.getHttpServer())
        .put('/member/group/update?id=1')
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
      const { body } = await request(app.getHttpServer())
        .get('/member/group/detail?id=1')
        .expect(200)

      expect(body.data.name).toEqual('group (修改)')
    })

    it('Fetch Member Group Pages', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/member/group/pages')
        .expect(200)

      expect(body.data.total).toEqual(1)
    })
  })

  // Member Tag
  describe('Member Tag', () => {
    it('Create Member Tag', async () => {
      const { body } = await request(app.getHttpServer())
        .post('/member/tag/create')
        .send({
          name: 'test',
        })
        .expect(200)

      expect(body.code).toEqual(0)
    })

    it('Update Member Tag', async () => {
      const { body } = await request(app.getHttpServer())
        .put('/member/tag/update?id=1')
        .send({
          name: 'test (修改)',
        })
        .expect(200)

      expect(body.code).toEqual(0)
    })

    it('Fetch Member Tag Detail', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/member/tag/detail?id=1')
        .expect(200)

      expect(body.data.name).toEqual('test (修改)')
    })

    it('Fetch Member Tag Pages', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/member/tag/pages')
        .expect(200)

      expect(body.data.total).toEqual(1)
    })
  })

  // Member Account
  describe('Member Account', () => {
    it('Create Member Profile', async () => {
      const { body } = await request(app.getHttpServer())
        .post('/member/create')
        .send({
          username: 'test',
          nickname: 'test',
          mobile: '13800006668',
          gender: 'male',
          location: [{ code: '44', name: '广东省' }, { code: '4420', name: '中山市' }],
          tagIds: [1],
          cardId: 1,
          cardPlanId: 1,
          points: 100,
        })
        .expect(200)

      expect(body.code).toEqual(0)

      await request(app.getHttpServer())
        .get('/member/profile?id=1')
        .expect(200)
        .then(({ body }) => {
          expect(body.data.nickname).toEqual('test')
        })

      await request(app.getHttpServer())
        .get('/member/account?id=1')
        .expect(200)
        .then(({ body }) => {
          expect(body.data.points).toEqual(100)
        })
    })

    it('Fetch Member Profile', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/member/profile?id=1')
        .expect(200)

      expect(body.data.nickname).toEqual('test')
    })

    it('Fetch Member Account', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/member/account?id=1')
        .expect(200)

      expect(body.data.points).toEqual(100)
    })

    it('Update Member Status', async () => {
      const { body } = await request(app.getHttpServer())
        .put('/member/status/update?id=1')
        .send({
          status: MemberStatus.BLOCKED,
        })
        .expect(200)

      expect(body.code).toEqual(0)
    })

    it('Update Member Tags', async () => {
      const { body } = await request(app.getHttpServer())
        .put('/member/tags/update?id=1')
        .send({
          tagIds: [1],
        })
        .expect(200)

      expect(body.code).toEqual(0)
    })

    it('Update Member Points Account', async () => {
      const { body } = await request(app.getHttpServer())
        .put('/member/account/points/update?id=1')
        .send({
          points: 1000,
        })
        .expect(200)

      expect(body.code).toEqual(0)
    })

    it('Bind Member Card', async () => {
      const { body } = await request(app.getHttpServer())
        .put('/member/card/bind')
        .send({
          memberId: 1,
          cardId: 1,
          cardPlanId: 1,
        })
        .expect(200)

      expect(body.code).toEqual(0)
    })

    it('Reset Member Password', async () => {
      const { body } = await request(app.getHttpServer())
        .put('/member/password/reset?id=1')
        .send({
          newPassword: '123456',
        })
        .expect(200)

      expect(body.code).toEqual(0)
    })

    it('Fetch Member Pages', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/member/pages')
        .expect(200)

      expect(body.data.total).toEqual(1)
    })
  })

  // Member Points Rule
  describe('Member Points Rule', () => {
    it('Init Default Member Points Rules', async () => {
      const sql = `INSERT INTO \`shop_member_points_rule\` (\`key\`, \`enable\`, \`name\`, \`desc\`, \`icon\`, \`options\`) VALUES `
      const values: string[] = [
        `('register', 'Y', '注册奖励', '注册会员时赠送的积分', 'mingcute:user-add-2', '{"points": 100}')`,
        `('ordering', 'Y', '消费奖励', '会员消费时, 赠送消费金额 100% 的积分', 'mingcute:shopping-bag-3', '{"perOrderRatio": 100}')`,
        `('birthday', 'Y', '生日有礼', '会员生日时赠送的积分', 'mingcute:birthday-2', '{"points": 500}')`,
        `('sign_in', 'Y', '签到奖励', '会员签到时赠送的积分', 'mingcute:checkbox', '{"points": 10, "perWeekRatio": 1.5, "perMonthRatio": 3}')`,
        `('deduction', 'Y', '积分抵现', '会员消费时, 积分抵扣一定金额', 'mingcute:cash', '{"limit": 10000, "ratio": 10}')`,
      ]

      await runSQL(sql + values.join(','))
    })

    it('Fetch Member Points Rule List', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/member/points/rule/list')
        .expect(200)

      expect(body.data.length).toEqual(5)
    })

    it('Fetch Member Points Rule Detail', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/member/points/rule/detail?key=register')
        .expect(200)

      expect(body.data.name).toEqual('注册奖励')
    })

    it('Update Member Points Rule Options', async () => {
      const { body } = await request(app.getHttpServer())
        .put('/member/points/rule/options/update')
        .send({
          key: 'register',
          options: { points: 1000 },
        })
        .expect(200)

      expect(body.code).toEqual(0)
    })

    it('Update Member Points Rule Status', async () => {
      const { body } = await request(app.getHttpServer())
        .put('/member/points/rule/status/update')
        .send({
          key: 'register',
          enable: 'N',
        })
        .expect(200)

      expect(body.code).toEqual(0)
    })
  })

  // Member Address
  describe('Member Address', () => {
    it('Create Member Address', async () => {
      const { body } = await request(app.getHttpServer())
        .post('/member/address/create')
        .send({
          memberId: 1,
          contractName: '测试',
          mobile: '13500009987',
          location: [{ code: '11', name: '北京' }],
          address: '测试',
          postCode: '110000',
          isDefault: 'Y',
        })
        .expect(200)

      expect(body.code).toEqual(0)
    })

    it('Update Member Address', async () => {
      const { body } = await request(app.getHttpServer())
        .put('/member/address/update?id=1')
        .send({
          memberId: 1,
          contractName: '测试 (修改)',
          mobile: '13500009987',
          location: [{ code: '11', name: '北京' }],
          address: '测试',
          postCode: '110000',
          isDefault: 'N',
        })
        .expect(200)

      expect(body.code).toEqual(0)
    })

    it('Fetch Member Address Detail', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/member/address/detail?id=1')
        .expect(200)

      expect(body.data.contractName).toEqual('测试 (修改)')
    })

    it('Fetch Member Address Pages', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/member/address/pages?memberId=1')
        .expect(200)

      expect(body.data.total).toEqual(1)
    })

    it('Fetch Member Address List', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/member/address/list?memberId=1')
        .expect(200)

      expect(body.data.length).toEqual(1)
    })

    it('Fetch Member Default Address', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/member/address/default?memberId=1')
        .expect(200)

      expect(body.data.id).toEqual(1)
    })

    it('Update Member Default Address', async () => {
      const { body } = await request(app.getHttpServer())
        .put('/member/address/default/update?memberId=1')
        .send({
          id: 1,
        })
        .expect(200)

      expect(body.code).toEqual(0)
    })

    it('Delete Member Address', async () => {
      const { body } = await request(app.getHttpServer())
        .delete('/member/address/delete')
        .send({
          id: 1,
        })
        .expect(200)

      expect(body.code).toEqual(0)
    })
  })

  // Member Logout
  describe('Member Logout', () => {
    it('Create Member Logout', async () => {
      const { body } = await request(app.getHttpServer())
        .post('/member/logout/create')
        .send({
          source: 'web',
          memberId: 1,
          username: 'admin',
          nickname: '管理员',
          mobile: '12345678901',
          reason: '测试注销',
        })
        .expect(200)

      expect(body.code).toEqual(0)
    })

    it('Fetch Member Logout Detail', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/member/logout/detail?id=1')
        .expect(200)

      expect(body.data.reason).toEqual('测试注销')
    })

    it('Update Member Logout Reason', async () => {
      const { body } = await request(app.getHttpServer())
        .put('/member/logout/reason/update?id=1')
        .send({
          reason: '测试修改',
        })
        .expect(200)

      expect(body.code).toEqual(0)

      await request(app.getHttpServer())
        .get('/member/logout/detail?id=1')
        .expect(200)
        .then(({ body }) => {
          expect(body.data.reason).toEqual('测试修改')
        })
    })

    it('Update Member Logout Status', async () => {
      const { body } = await request(app.getHttpServer())
        .put('/member/logout/status/update?id=1')
        .send({
          status: 'logout',
        })
        .expect(200)

      expect(body.code).toEqual(0)

      await request(app.getHttpServer())
        .get('/member/logout/detail?id=1')
        .expect(200)
        .then(({ body }) => {
          expect(body.data.status).toEqual('logout')
        })
    })
  })
})
