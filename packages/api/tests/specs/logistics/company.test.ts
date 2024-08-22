import { truncateTable, useRequest } from '~~/tests/utils'

describe('Logistics Module - Company', () => {
  beforeAll(async () => {
    await truncateTable([
      'manage_logistics_company',
    ])
  })

  it('Create Company', async () => {
    await useRequest('post', '/logistics/company/create')
      .send({
        name: 'test',
      })
      .expect(200)
  })

  it('Update Company', async () => {
    await useRequest('put', '/logistics/company/update')
      .query({ id: 1 })
      .send({
        name: 'test update',
      })
      .expect(200)
  })

  it('Fetch Company Detail', async () => {
    const { body } = await useRequest('get', '/logistics/company/detail')
      .query({ id: 1 })
      .expect(200)

    expect(body.data.name).toEqual('test update')
  })

  it('Fetch Company List', async () => {
    const { body } = await useRequest('get', '/logistics/company/list')
      .expect(200)

    expect(body.data.length).toEqual(1)
  })
})
