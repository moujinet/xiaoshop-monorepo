import { runSQL, truncateTable, useRequest } from '~~/tests/utils'

describe('Notification Module - Template', () => {
  beforeAll(async () => {
    await truncateTable([
      'shop_notification_template',
      'shop_notification_template_content',
    ])

    await runSQL([
      // Template
      `INSERT INTO \`shop_notification_template\` (\`key\`, \`enable\`, \`scope\`, \`scene\`, \`channels\`, \`name\`, \`desc\`) VALUES
      ('test.1', 1, 1, 1, '[1, 2, 3]', 'test', 'test')`,
      // Contents
      `INSERT INTO \`shop_notification_template_content\` (\`template_id\`, \`channel\`, \`title\`, \`content\`) VALUES
      (1, 1, 'test #{name}', 'test #{name}'),
      (1, 2, 'test #{name}', 'test #{name}'),
      (1, 3, 'test #{name}', 'test #{name}')`,
    ])
  })

  it('Fetch Notification Template List', async () => {
    const { body } = await useRequest('get', '/notification/template/list')
      .expect(200)

    expect(body.data.length).toEqual(1)
  })

  it('Update Notification Template Status', async () => {
    await useRequest('put', '/notification/template/status/update')
      .query({ id: 1 })
      .send({ enable: 0 })
      .expect(200)
      .then(({ body }) => {
        expect(body.code).toEqual(0)
      })
  })

  it('Fetch Notification Template Detail', async () => {
    const { body } = await useRequest('get', '/notification/template/detail')
      .query({ id: 1 })
      .expect(200)

    expect(body.data.enable).toEqual(0)
  })

  describe('Template Contents', () => {
    it('Update Notification Template Content', async () => {
      await useRequest('put', '/notification/template/content/update')
        .query({ id: 1 })
        .send({
          title: 'test #{name} update',
          content: 'test #{name} update',
        })
        .expect(200)
        .then(({ body }) => {
          expect(body.code).toEqual(0)
        })
    })

    it('Fetch Notification Template Content List', async () => {
      const { body } = await useRequest('get', '/notification/template/content/list')
        .query({ templateId: 1 })
        .expect(200)

      expect(body.data.length).toEqual(3)
      expect(body.data[0].title).toEqual('test #{name} update')
    })
  })
})
