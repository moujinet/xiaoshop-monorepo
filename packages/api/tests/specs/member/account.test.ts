import { MemberStatus } from '@xiaoshop/shared'

import { runSQL, truncateTable, useRequest } from '~~/tests/utils'

describe('Member Module - Account', () => {
  beforeAll(async () => {
    await truncateTable([
      'shop_member_account',
      'shop_member_card',
      'shop_member_tag',
      'shop_member_binding',
      'shop_member_has_tags',
      'shop_member_account_change',
    ])

    await runSQL([
      // Cards
      `INSERT INTO \`shop_member_card\` (\`type\`, \`enable\`, \`key\`, \`name\`, \`desc\`, \`badge_style\`, \`card_style\`, \`need_exp\`, \`discount\`, \`points_ratio\`, \`free_shipping\`, \`plans\`) VALUES
      (2, 1, 'svip1', '测试会员', '自定义会员', '{"icon": "", "textColor": "#424954", "bgColor": "#D8E1E2"}', '{"icon": "", "textColor": "#424954", "bgColor": "#D8E1E2", "bgImage": ""}', 100, 100, 1, 1, '[{ "id": 1, "type": 1, "due": 0, "price": 1900 }]'),
      (2, 1, 'svip2', '测试会员 1', '自定义会员', '{"icon": "", "textColor": "#424954", "bgColor": "#D8E1E2"}', '{"icon": "", "textColor": "#424954", "bgColor": "#D8E1E2", "bgImage": ""}', 100, 100, 1, 1, '[]')`,

      // Tags
      `INSERT INTO \`shop_member_tag\` (\`name\`, \`color\`) VALUES ('tag 1', 'arcoblue'), ('tag 2', 'blue')`,
    ])
  })

  it('Create Member Account', async () => {
    await useRequest('post', '/member/account/create')
      .send({
        username: 'test',
        nickname: 'Hello',
        mobile: '13500099876',
        avatar: 'https://example.com/avatar.png',
        gender: 1,
        location: [{ code: '11', name: '北京' }],
        tagIds: [1, 2],
        cardId: 1,
        cardPlanId: 1,
        points: 10,
      })
      .expect(200)
      .then(({ body }) => {
        expect(body.code).toEqual(0)
      })
  })

  it('Fetch Member Profile', async () => {
    const { body } = await useRequest('get', '/member/account/detail')
      .query({ id: 1 })
      .expect(200)

    expect(body.data.card.cardId).toEqual(1)
  })

  it('Update Member Status', async () => {
    await useRequest('put', '/member/account/status/update')
      .query({ id: 1 })
      .send({
        status: MemberStatus.BLOCKED,
      })
      .expect(200)
      .then(({ body }) => {
        expect(body.code).toEqual(0)
      })

    await useRequest('get', '/member/account/detail')
      .query({ id: 1 })
      .expect(200)
      .then(({ body }) => {
        expect(body.data.status).toEqual(MemberStatus.BLOCKED)
      })
  })

  it('Update Member Tags', async () => {
    await useRequest('put', '/member/account/tags/update')
      .query({ id: 1 })
      .send({
        tagIds: [1],
      })
      .expect(200)
      .then(({ body }) => {
        expect(body.code).toEqual(0)
      })

    await useRequest('get', '/member/account/detail')
      .query({ id: 1 })
      .expect(200)
      .then(({ body }) => {
        expect(body.data.tags.length).toEqual(1)
      })
  })

  it('Batch Update Member Tags', async () => {
    await useRequest('put', '/member/account/tags/batch/update')
      .send({
        memberIds: [1],
        tagIds: [1, 2],
      })
      .expect(200)
      .then(({ body }) => {
        expect(body.code).toEqual(0)
      })

    await useRequest('get', '/member/account/detail')
      .query({ id: 1 })
      .expect(200)
      .then(({ body }) => {
        expect(body.data.tags.length).toEqual(2)
      })
  })

  it('Batch Update Member Account', async () => {
    await useRequest('put', '/member/account/batch/update')
      .send({
        type: 1,
        memberIds: [1],
        key: 'points',
        value: 1000,
        reason: 'testing add',
      })
      .expect(200)
      .then(({ body }) => {
        expect(body.code).toEqual(0)
      })

    await useRequest('get', '/member/account/detail')
      .query({ id: 1 })
      .expect(200)
      .then(({ body }) => {
        expect(body.data.points).toEqual(1010)
      })
  })

  it('Reset Member Password', async () => {
    await useRequest('put', '/member/account/password/reset')
      .query({ id: 1 })
      .send({
        newPassword: 'hello123',
      })
      .expect(200)
      .then(({ body }) => {
        expect(body.code).toEqual(0)
      })
  })
})
