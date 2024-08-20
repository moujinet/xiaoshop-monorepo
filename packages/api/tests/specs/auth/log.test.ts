import { runSQL, truncateTable, useRequest } from '~~/tests/utils'

describe('Auth Module - Log', () => {
  beforeAll(async () => {
    await truncateTable([
      'manage_auth_log',
    ])

    await runSQL([
      `INSERT INTO manage_auth_log (\`type\`, \`user_id\`, \`module\`, \`content\`, \`device\`, \`ip\`) VALUES ('user', 1, 'Test', 'test log', 'Jest', '127.0.0.1')`,
    ])
  })

  it('Fetch Log Pages', async () => {
    const { body } = await useRequest('get', '/auth/log/pages')
      .expect(200)

    expect(body.data.total).toBeDefined()
  })
})
