import {
  runSQL,
  truncateTable,
  useRequest,
} from '~~/tests/utils'

describe('Member Module - Cards', () => {
  beforeAll(async () => {
    await truncateTable([
      'shop_member_card',
    ])

    await runSQL(`INSERT INTO \`shop_member_card\` (\`type\`, \`enable\`, \`key\`, \`name\`, \`desc\`, \`badge_style\`, \`card_style\`, \`need_exp\`, \`discount\`, \`points_ratio\`, \`free_shipping\`) VALUES
      ('level', 'Y', 'vip0', '注册会员', '会员等级', '{"icon": "", "textColor": "#424954", "bgColor": "#D8E1E2"}', '{"icon": "", "textColor": "#424954", "bgColor": "#D8E1E2", "bgImage": ""}', 100, 100, 1, 'N'),
      ('level', 'Y', 'vip1', '普通会员', '会员等级', '{"icon": "mingcute:vip-3", "textColor": "#547183", "bgColor": "#B5D0CD"}', '{"icon": "", "textColor": "#547183", "bgColor": "#B5D0CD", "bgImage": ""}', 200, 100, 1, 'N'),
      ('level', 'Y', 'vip2', '青铜会员', '会员等级', '{"icon": "mingcute:vip-3", "textColor": "#F3F8F4", "bgColor": "#B38264"}', '{"icon": "", "textColor": "#F3F8F4", "bgColor": "#B38264", "bgImage": ""}', 400, 100, 1.1, 'N'),
      ('level', 'Y', 'vip3', '白银会员', '会员等级', '{"icon": "mingcute:vip-4", "textColor": "#F3F8F4", "bgColor": "#7B86A2"}', '{"icon": "", "textColor": "#F3F8F4", "bgColor": "#7B86A2", "bgImage": ""}', 800, 100, 1.1, 'N'),
      ('level', 'Y', 'vip4', '黄金会员', '会员等级', '{"icon": "mingcute:vip-4", "textColor": "#F3F8F4", "bgColor": "#E1B60B"}', '{"icon": "", "textColor": "#F3F8F4", "bgColor": "#E1B60B", "bgImage": ""}', 1600, 100, 1.1, 'N'),
      ('level', 'Y', 'vip5', '铂金会员', '会员等级', '{"icon": "mingcute:vip-1", "textColor": "#F3F8F4", "bgColor": "#6177B0"}', '{"icon": "", "textColor": "#F3F8F4", "bgColor": "#6177B0", "bgImage": ""}', 3200, 100, 1.2, 'N'),
      ('level', 'Y', 'vip6', '钻石会员', '会员等级', '{"icon": "mingcute:vip-1", "textColor": "#F3F8F4", "bgColor": "#6D71A0"}', '{"icon": "", "textColor": "#F3F8F4", "bgColor": "#6D71A0", "bgImage": ""}', 6400, 100, 1.2, 'N'),
      ('level', 'Y', 'vip7', '星耀会员', '会员等级', '{"icon": "mingcute:vip-2", "textColor": "#61517B", "bgColor": "#A8A2B9"}', '{"icon": "", "textColor": "#61517B", "bgColor": "#A8A2B9", "bgImage": ""}', 10000, 100, 1.3, 'Y'),
      ('level', 'Y', 'vip8', '王者会员', '会员等级', '{"icon": "mingcute:vip-2", "textColor": "#903F38", "bgColor": "#F0C478"}', '{"icon": "", "textColor": "#903F38", "bgColor": "#F0C478", "bgImage": ""}', 20000, 100, 1.5, 'Y'),
      ('level', 'Y', 'vip9', '至尊会员', '会员等级', '{"icon": "mingcute:vip-2", "textColor": "#F0C478", "bgColor": "#3A3942"}', '{"icon": "", "textColor": "#F0C478", "bgColor": "#3A3942", "bgImage": ""}', 50000, 100, 2, 'Y')
    `)
  })

  it(`Fetch Member Card Level List`, async () => {
    const { body } = await useRequest('get', '/member/card/level/list')
      .expect(200)

    expect(body.data.length).toEqual(10)
  })

  it('Create Member Card', async () => {
    await useRequest('post', '/member/card/create')
      .send({
        name: 'test',
      })
      .expect(200)
      .then(({ body }) => {
        expect(body.code).toEqual(0)
      })
  })

  it('Update Member Card', async () => {
    await useRequest('put', '/member/card/update')
      .query({ id: 11 })
      .send({
        name: 'test update',
        desc: 'desc',
      })
      .expect(200)
      .then(({ body }) => {
        expect(body.code).toEqual(0)
      })
  })

  it('Fetch Member Card Detail', async () => {
    const { body } = await useRequest('get', '/member/card/detail')
      .query({ id: 11 })
      .expect(200)

    expect(body.data.name).toEqual('test update')
  })

  it('Fetch Member Custom Card List', async () => {
    const { body } = await useRequest('get', '/member/card/custom/list')
      .expect(200)

    expect(body.data.length).toEqual(1)
  })

  it('Fetch Member Card Dict List', async () => {
    const { body } = await useRequest('get', '/member/card/dict/list')
      .expect(200)

    expect(body.data.length).toEqual(11)
  })
})
