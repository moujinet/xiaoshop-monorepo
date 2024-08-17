import { getRequest, runSQL, truncateTable } from '~~/tests/utils'

describe('Points Module - Points Change', () => {
  beforeAll(async () => {
    await truncateTable([
      'shop_points_rule',
      'shop_points_change_log',
      'shop_member_card',
      'shop_member',
      'shop_member_account',
      'shop_member_card_binding',
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

    await runSQL(
      `INSERT INTO \`shop_member_card\` (\`type\`, \`is_enabled\`, \`key\`, \`name\`, \`desc\`, \`badge_styles\`, \`card_styles\`, \`need_exp\`, \`discount\`, \`points_ratio\`, \`is_free_shipping\`) VALUES
      ('level', 'Y', 'vip0', '注册会员', '会员等级', '{"icon": "", "textColor": "#424954", "bgColor": "#D8E1E2"}', '{"icon": "", "textColor": "#424954", "bgColor": "#D8E1E2", "bgImage": ""}', 100, 100, 1, 'N')`,
    )

    await runSQL([
      'INSERT INTO `shop_member` (`username`, `nickname`, `card_binding_id`) VALUES ("test", "test", 1)',
      'INSERT INTO `shop_member_card_binding` (`member_id`, `card_id`, `key`, `name`, `type`) VALUES (1, 1, "vip0", "注册会员", "level")',
      'INSERT INTO `shop_member_account` (`member_id`, `key`, `value`) VALUES (1, "points", 1000)',
    ])
  })

  it('Change Points', async () => {
    const { body } = await getRequest('put', '/points/change')
      .send({
        type: 'deduct',
        memberId: 1,
        change: 100,
        reason: 'test',
      })
      .expect(200)

    expect(body.code).toEqual(0)
  })

  it('Fetch Points Change Log', async () => {
    const { body } = await getRequest('get', '/points/change/log/pages').expect(
      200,
    )

    expect(body.code).toEqual(0)
    expect(body.data.total).toEqual(1)
  })
})
