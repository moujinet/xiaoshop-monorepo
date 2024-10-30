import { useRequest } from '#/request'
import { getTableName, runSQL, truncateTable } from '#/tools'

describe('Member Module - Profile', () => {
  beforeAll(async () => {
    await truncateTable([
      'member_account',
      'member_profile',
      'member_tag',
      'member_has_tags',
      'member_card',
      'member_card_bind',
    ])

    await runSQL([
      `INSERT INTO ${getTableName('member_tag')} (\`name\`, \`color\`) VALUES
        ('Tag 1', 'red'),
        ('Tag 2', 'blue'),
        ('Tag 3', 'green')`,

      `INSERT INTO \`${getTableName(
        'member_card',
      )}\` (\`type\`, \`is_enabled\`, \`key\`, \`name\`, \`desc\`, \`badge_style\`, \`card_style\`, \`need_exp\`, \`discount\`, \`points_ratio\`, \`is_free_shipping\`, \`plans\`) VALUES
        (1, 1, 'vip1', '测试会员', '自定义会员', '{"icon": "", "textColor": "#424954", "bgColor": "#D8E1E2"}', '{"icon": "", "textColor": "#424954", "bgColor": "#D8E1E2", "bgImage": ""}', 100, 100, 1, 1, '[]'),
        (2, 1, 'svip1', '测试会员 1', '自定义会员', '{"icon": "", "textColor": "#424954", "bgColor": "#D8E1E2"}', '{"icon": "", "textColor": "#424954", "bgColor": "#D8E1E2", "bgImage": ""}', 100, 100, 1, 1, '[{ "id": 1, "type": 1, "due": 0, "price": 1900 }]')`,
    ])
  })

  describe('Admin', () => {
    it('Create Member', async () => {
      await useRequest('post', '/admin/member/create')
        .send({
          username: 'test',
          mobile: '13100000001',
          password: 'test123',
          gender: 1,
          tagIds: [1, 2],
        })
        .expect(200)
        .then(({ body }) => {
          expect(body.code).toEqual(0)
        })
    })

    it('Update Member Tags', async () => {
      await useRequest('put', '/admin/member/tags/update')
        .send({
          ids: [1],
          tagIds: [2],
        })
        .expect(200)
        .then(({ body }) => {
          expect(body.code).toEqual(0)
        })
    })

    it('Block Member', async () => {
      await useRequest('put', '/admin/member/block')
        .query({ id: 1 })
        .expect(200)
        .then(({ body }) => {
          expect(body.code).toEqual(0)
        })
    })

    it('Get Member Detail', async () => {
      await useRequest('get', '/admin/member/detail')
        .query({ id: 1 })
        .expect(200)
        .then(({ body }) => {
          expect(body.data.status.key).toEqual(3)
          expect(body.data.tags.length).toEqual(1)
        })
    })

    it('Get Member Pages', async () => {
      await useRequest('get', '/admin/member/pages')
        .expect(200)
        .then(({ body }) => {
          expect(body.data.total).toEqual(1)
        })
    })
  })
})
