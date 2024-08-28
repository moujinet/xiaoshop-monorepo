import { truncateTable, useRequest } from '~~/tests/utils'

describe('Auth Module - Role', () => {
  beforeAll(async () => {
    await truncateTable([
      'manage_auth_role',
    ])
  })

  it('Create Role', async () => {
    await useRequest('post', '/auth/role/create')
      .send({
        name: 'test',
        desc: 'test',
        permissions: ['test.1', 'test.2'],
      })
      .expect(200)
      .then(({ body }) => {
        expect(body.code).toEqual(0)
      })
  })

  it('Update Role', async () => {
    await useRequest('put', '/auth/role/update')
      .query({ id: 1 })
      .send({
        name: 'test',
        desc: 'test',
        permissions: ['test.1'],
      })
      .expect(200)
      .then(({ body }) => {
        expect(body.code).toEqual(0)
      })
  })

  it('Fetch Role Detail', async () => {
    const { body } = await useRequest('get', '/auth/role/detail')
      .query({ id: 1 })
      .expect(200)

    expect(body.data.permissions).toEqual(['test.1'])
  })

  it('Fetch Role Pages', async () => {
    const { body } = await useRequest('get', '/auth/role/pages')
      .expect(200)

    expect(body.data.total).toEqual(1)
  })

  it('Fetch Role Dict List', async () => {
    const { body } = await useRequest('get', '/auth/role/dict/list')
      .expect(200)

    expect(body.data.length).toEqual(1)
  })
})
