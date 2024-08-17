import { getRequest, runSQL, truncateTable } from '~~/tests/utils'

describe('Settings Module', () => {
  beforeAll(async () => {
    await truncateTable([
      'manage_settings',
    ])

    await runSQL(`INSERT INTO manage_settings (\`key\`, \`value\`) VALUES ('test.key', 'test')`)
  })

  it('Update Settings', async () => {
    const { body } = await getRequest('put', '/settings/update')
      .send([
        { key: 'test.key', value: 'test update' },
      ])
      .expect(200)

    expect(body.code).toEqual(0)
  })

  it('Settings List', async () => {
    const { body } = await getRequest('get', '/settings/list')
      .expect(200)

    const test = body.data.find(d => d.key === 'test.key')
    expect(test.value).toEqual('test update')
  })
})
