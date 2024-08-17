import { getRequest, runSQL, truncateTable } from '~~/tests/utils'

describe('Member Module - Account', () => {
  beforeAll(async () => {
    await truncateTable([
      'shop_member',
      'shop_member_account',
      'shop_member_card',
      'shop_member_tag',
      'shop_member_has_tags',
    ])

    await runSQL([
      // Tags
      'INSERT INTO `shop_member_tag` (`name`) VALUES ("tag 1"), ("tag 2")',
      // Cards
      `INSERT INTO \`shop_member_card\` (\`type\`, \`is_enabled\`, \`key\`, \`name\`, \`desc\`, \`badge_styles\`, \`card_styles\`, \`need_exp\`, \`discount\`, \`points_ratio\`, \`is_free_shipping\`) VALUES
      ('level', 'Y', 'vip0', '注册会员', '会员等级', '{"icon": "", "textColor": "#424954", "bgColor": "#D8E1E2"}', '{"icon": "", "textColor": "#424954", "bgColor": "#D8E1E2", "bgImage": ""}', 100, 100, 1, 'N'),
      ('level', 'Y', 'vip1', '普通会员', '会员等级', '{"icon": "mingcute:vip-3", "textColor": "#547183", "bgColor": "#B5D0CD"}', '{"icon": "", "textColor": "#547183", "bgColor": "#B5D0CD", "bgImage": ""}', 200, 100, 1, 'N'),
      ('level', 'Y', 'vip2', '青铜会员', '会员等级', '{"icon": "mingcute:vip-3", "textColor": "#F3F8F4", "bgColor": "#B38264"}', '{"icon": "", "textColor": "#F3F8F4", "bgColor": "#B38264", "bgImage": ""}', 400, 100, 1.1, 'N'),
      ('level', 'Y', 'vip3', '白银会员', '会员等级', '{"icon": "mingcute:vip-4", "textColor": "#F3F8F4", "bgColor": "#7B86A2"}', '{"icon": "", "textColor": "#F3F8F4", "bgColor": "#7B86A2", "bgImage": ""}', 800, 100, 1.1, 'N'),
      ('level', 'Y', 'vip4', '黄金会员', '会员等级', '{"icon": "mingcute:vip-4", "textColor": "#F3F8F4", "bgColor": "#E1B60B"}', '{"icon": "", "textColor": "#F3F8F4", "bgColor": "#E1B60B", "bgImage": ""}', 1600, 100, 1.1, 'N'),
      ('level', 'Y', 'vip5', '铂金会员', '会员等级', '{"icon": "mingcute:vip-1", "textColor": "#F3F8F4", "bgColor": "#6177B0"}', '{"icon": "", "textColor": "#F3F8F4", "bgColor": "#6177B0", "bgImage": ""}', 3200, 100, 1.2, 'N'),
      ('level', 'Y', 'vip6', '钻石会员', '会员等级', '{"icon": "mingcute:vip-1", "textColor": "#F3F8F4", "bgColor": "#6D71A0"}', '{"icon": "", "textColor": "#F3F8F4", "bgColor": "#6D71A0", "bgImage": ""}', 6400, 100, 1.2, 'N'),
      ('level', 'Y', 'vip7', '星耀会员', '会员等级', '{"icon": "mingcute:vip-2", "textColor": "#61517B", "bgColor": "#A8A2B9"}', '{"icon": "", "textColor": "#61517B", "bgColor": "#A8A2B9", "bgImage": ""}', 10000, 100, 1.3, 'Y'),
      ('level', 'Y', 'vip8', '王者会员', '会员等级', '{"icon": "mingcute:vip-2", "textColor": "#903F38", "bgColor": "#F0C478"}', '{"icon": "", "textColor": "#903F38", "bgColor": "#F0C478", "bgImage": ""}', 20000, 100, 1.5, 'Y'),
      ('level', 'Y', 'vip9', '至尊会员', '会员等级', '{"icon": "mingcute:vip-2", "textColor": "#F0C478", "bgColor": "#3A3942"}', '{"icon": "", "textColor": "#F0C478", "bgColor": "#3A3942", "bgImage": ""}', 50000, 100, 2, 'Y')`,
    ])
  })

  it('Create Member Profile', async () => {
    const { body } = await getRequest('post', '/member/create')
      .send({
        username: 'test',
        nickname: 'test',
        mobile: '13800006668',
        gender: 'male',
        location: [{ code: '44', name: '广东省' }, { code: '4420', name: '中山市' }],
        tagIds: [1],
        cardId: 1,
        cardPlanId: 0,
        points: 100,
      })
      .expect(200)

    expect(body.code).toEqual(0)
  })

  it('Fetch Member Profile', async () => {
    const { body } = await getRequest('get', '/member/profile')
      .query({ id: 1 })
      .expect(200)

    expect(body.data.nickname).toEqual('test')
  })

  it('Fetch Member Account', async () => {
    const { body } = await getRequest('get', '/member/account')
      .query({ id: 1 })
      .expect(200)

    expect(body.data.points).toEqual(100)
  })

  it('Update Member Status', async () => {
    const { body } = await getRequest('put', '/member/status/update')
      .query({ id: 1 })
      .send({
        status: 'blocked',
      })
      .expect(200)

    expect(body.code).toEqual(0)
  })

  it('Update Member Tags', async () => {
    const { body } = await getRequest('put', '/member/tags/update')
      .query({ id: 1 })
      .send({
        tagIds: [2],
      })
      .expect(200)

    expect(body.code).toEqual(0)
  })

  it('Bind Member Card', async () => {
    const { body } = await getRequest('put', '/member/card/bind')
      .send({
        memberId: 1,
        cardId: 2,
        cardPlanId: 0,
      })
      .expect(200)

    expect(body.code).toEqual(0)
  })

  it('Reset Member Password', async () => {
    const { body } = await getRequest('put', '/member/password/reset')
      .query({ id: 1 })
      .send({
        newPassword: '123456',
      })
      .expect(200)

    expect(body.code).toEqual(0)
  })

  it('Fetch Member Pages', async () => {
    const { body } = await getRequest('get', '/member/pages')
      .expect(200)

    expect(body.data.total).toEqual(1)
  })
})
