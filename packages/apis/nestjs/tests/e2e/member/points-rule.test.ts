import { getRequest, runSQL, truncateTable } from '~~/tests/utils'

describe('Member Module - Points Rule', () => {
  beforeAll(async () => {
    await truncateTable([
      'shop_member_points_rule',
    ])

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
    const { body } = await getRequest('get', '/member/points/rule/list')
      .expect(200)

    expect(body.data.length).toEqual(5)
  })

  it('Fetch Member Points Rule Detail', async () => {
    const { body } = await getRequest('get', '/member/points/rule/detail')
      .query({ key: 'register' })
      .expect(200)

    expect(body.data.name).toEqual('注册奖励')
  })

  it('Update Member Points Rule Options', async () => {
    const { body } = await getRequest('put', '/member/points/rule/options/update')
      .send({
        key: 'register',
        options: { points: 1000 },
      })
      .expect(200)

    expect(body.code).toEqual(0)
  })

  it('Update Member Points Rule Status', async () => {
    const { body } = await getRequest('put', '/member/points/rule/status/update')
      .send({
        key: 'register',
        enable: 'N',
      })
      .expect(200)

    expect(body.code).toEqual(0)
  })
})
