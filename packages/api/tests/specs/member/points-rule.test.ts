import { MemberPointsRuleKey } from '@xiaoshop/shared'
import { SettingsModule } from '@/settings/module'
import { SettingsService } from '@/settings/service'
import {
  createTestingModule,
  runSQL,
  truncateTable,
  useRequest,
} from '~~/tests/utils'

describe('Member Module - Points Rule', () => {
  beforeAll(async () => {
    await truncateTable(['manage_settings'])

    await runSQL([
      `INSERT INTO manage_settings (\`key\`, \`value\`) VALUES
      ('member.points.register', '1'),
      ('member.points.register.rule', '{"points": 100}'),
      ('member.points.order', '1'),
      ('member.points.order.rule', '{"perOrderRatio": 100}'),
      ('member.points.birthday', '1'),
      ('member.points.birthday.rule', '{"points": 500}'),
      ('member.points.signIn', '1'),
      ('member.points.signIn.rule', '{"points": 10, "perWeekRatio": 1.5, "perMonthRatio": 3}'),
      ('member.points.deduct', '1'),
      ('member.points.deduct.rule', '{"limit": 10000, "ratio": 10}')`,
    ])
  })

  beforeEach(async () => {
    const module = await createTestingModule([SettingsModule])
    await module.get(SettingsService).cleanCache()
  })

  it('Update Member Points Rule Options', async () => {
    await useRequest('put', '/member/points-rule/options/update')
      .send({
        key: MemberPointsRuleKey.REGISTER,
        options: {
          points: 1000,
        },
      })
      .expect(200)
      .then(({ body }) => {
        expect(body.code).toEqual(0)
      })
  })

  it('Update Member Points Rule Status', async () => {
    await useRequest('put', '/member/points-rule/status/update')
      .send({
        key: MemberPointsRuleKey.REGISTER,
        enable: 1,
      })
      .expect(200)
      .then(async ({ body }) => {
        expect(body.code).toEqual(0)
      })
  })

  it('Fetch Member Points Rule List', async () => {
    const { body } = await useRequest('get', '/member/points-rule/list')
      .expect(200)

    expect(body.data.length).toEqual(5)
  })

  it('Fetch Member Points Rule Detail', async () => {
    const { body } = await useRequest('get', '/member/points-rule/detail')
      .query({ key: MemberPointsRuleKey.REGISTER })
      .expect(200)

    expect(body.data.rule.points).toEqual(1000)
  })
})
