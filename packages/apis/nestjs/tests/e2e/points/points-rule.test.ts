import { getRequest, runSQL, truncateTable } from '~~/tests/utils'

describe('Points Module - Points Rule', () => {
  beforeAll(async () => {
    await truncateTable([
      'shop_points_rule',
    ])

    const sql = `INSERT INTO \`shop_points_rule\` (\`key\`, \`enable\`, \`name\`, \`desc\`, \`icon\`, \`options\`) VALUES `
    const values: string[] = [
      `('register', 'Y', '注册奖励', '注册会员时赠送的积分', 'mingcute:user-add-2', '{"points": 100}')`,
      `('order', 'Y', '消费奖励', '会员消费时, 赠送消费金额 100% 的积分', 'mingcute:shopping-bag-3', '{"perOrderRatio": 100}')`,
      `('birthday', 'Y', '生日有礼', '会员生日时赠送的积分', 'mingcute:birthday-2', '{"points": 500}')`,
      `('signIn', 'Y', '签到奖励', '会员签到时赠送的积分', 'mingcute:checkbox', '{"points": 10, "perWeekRatio": 1.5, "perMonthRatio": 3}')`,
      `('deduct', 'Y', '积分抵现', '会员消费时, 积分抵扣一定金额', 'mingcute:cash', '{"limit": 10000, "ratio": 10}')`,
    ]

    await runSQL(sql + values.join(','))
  })

  it('Update Points Rule Options', async () => {
    const { body } = await getRequest('put', '/points/rule/options/update')
      .send({
        key: 'register',
        options: { points: 1000 },
      })
      .expect(200)

    expect(body.code).toEqual(0)
  })

  it('Update Points Rule Status', async () => {
    const { body } = await getRequest('put', '/points/rule/status/update')
      .send({
        key: 'register',
        enable: 'N',
      })
      .expect(200)

    expect(body.code).toEqual(0)
  })

  it('Fetch Points Rule List', async () => {
    const { body } = await getRequest('get', '/points/rule/list')
      .expect(200)

    expect(body.data.length).toEqual(5)
  })

  it('Fetch Points Rule Detail', async () => {
    const { body } = await getRequest('get', '/points/rule/detail')
      .query({ key: 'register' })
      .expect(200)

    expect(body.data.name).toEqual('注册奖励')
  })
})
