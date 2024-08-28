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

    const module = await createTestingModule([SettingsModule])
    await module.get(SettingsService).cleanCache()

    await runSQL([
      `INSERT INTO manage_settings (\`key\`, \`value\`) VALUES
      ('member.points.register', 'Y'),
      ('member.points.register.rule', '{"points": 100}'),
      ('member.points.order', 'Y'),
      ('member.points.order.rule', '{"perOrderRatio": 100}'),
      ('member.points.birthday', 'Y'),
      ('member.points.birthday.rule', '{"points": 500}'),
      ('member.points.signIn', 'Y'),
      ('member.points.signIn.rule', '{"points": 10, "perWeekRatio": 1.5, "perMonthRatio": 3}'),
      ('member.points.deduct', 'Y'),
      ('member.points.deduct.rule', '{"limit": 10000, "ratio": 10}')`,
    ])
  })

  it('Update Member Points Rule Options', async () => {
    await useRequest('put', '/member/points-rule/options/update')
      .send({
        key: 'register',
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
        key: 'register',
        enable: 'N',
      })
      .expect(200)
      .then(({ body }) => {
        expect(body.code).toEqual(0)
      })
  })

  it('Fetch Member Points Rule List', async () => {
    const { body } = await useRequest('get', '/member/points-rule/list').expect(
      200,
    )

    expect(body.data.length).toEqual(5)
  })

  it('Fetch Member Points Rule Detail', async () => {
    const { body } = await useRequest('get', '/member/points-rule/detail')
      .query({ key: 'register' })
      .expect(200)

    expect(body.data.rule.points).toEqual(1000)
  })
})
