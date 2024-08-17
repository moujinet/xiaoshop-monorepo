import { getRequest, truncateTable } from '~~/tests/utils'

describe('Logistics Module - Company', () => {
  beforeAll(async () => {
    await truncateTable([
      'manage_logistics_company',
    ])
  })

  it('Create Company', async () => {
    const { body } = await getRequest('post', '/logistics/company/create')
      .send({
        name: 'test',
        desc: 'test desc',
        url: 'http://www.test.com',
        sort: 1,
      })
      .expect(200)

    expect(body.code).toEqual(0)
  })

  it('Update Company', async () => {
    const { body } = await getRequest('put', '/logistics/company/update')
      .query({ id: 1 })
      .send({
        name: 'test update',
        desc: 'test desc',
        url: 'http://www.test.com',
        sort: 1,
      })
      .expect(200)

    expect(body.code).toEqual(0)
  })

  it('Fetch Company List', async () => {
    const { body } = await getRequest('get', '/logistics/company/list')
      .expect(200)

    const test = body.data.find(d => d.id === 1)
    expect(test.name).toEqual('test update')
  })

  it('Fetch Company Detail', async () => {
    const { body } = await getRequest('get', '/logistics/company/detail')
      .query({ id: 1 })
      .expect(200)

    expect(body.data.name).toEqual('test update')
  })
})
