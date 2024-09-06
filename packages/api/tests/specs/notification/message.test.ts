import { NotificationModule } from '@/notification/module'
import { NotificationService } from '@/notification/service'
import { createTestingModule, runSQL, truncateTable, useRequest } from '~~/tests/utils'

describe('Notification Module - Message', () => {
  beforeAll(async () => {
    await truncateTable([
      'shop_notification_message',
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

    const module = await createTestingModule([NotificationModule])
    const service = module.get(NotificationService)

    await service.sendTo(0, 'test.1', { name: 'xiaoshop' })
  })

  it('Fetch Notification Message Page List', async () => {
    const { body } = await useRequest('get', '/notification/message/pages')
      .expect(200)

    expect(body.data.total).toEqual(1)
  })

  it('Fetch Notification Message List', async () => {
    const { body } = await useRequest('get', '/notification/message/list')
      .expect(200)

    expect(body.data.length).toEqual(1)
  })

  it('Fetch Notification Message Detail', async () => {
    const { body } = await useRequest('get', '/notification/message/detail')
      .query({ id: 1 })
      .expect(200)

    expect(body.data.title).toEqual('test xiaoshop')
  })
})
