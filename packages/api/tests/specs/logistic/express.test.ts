import { truncateTable, useRequest } from '~~/tests/utils'

describe('Logistic Module - Express', () => {
  beforeAll(async () => {
    await truncateTable([
      'logistic_express',
    ])
  })

  it('Create Express', async () => {
    await useRequest('post', '/logistic/express/create')
      .send({
        name: 'test',
      })
      .expect(200)
      .then(({ body }) => {
        expect(body.code).toEqual(0)
      })
  })

  it('Update Express', async () => {
    await useRequest('put', '/logistic/express/update')
      .query({ id: 1 })
      .send({
        name: 'test update',
      })
      .expect(200)
      .then(({ body }) => {
        expect(body.code).toEqual(0)
      })
  })

  it('Fetch Express Detail', async () => {
    const { body } = await useRequest('get', '/logistic/express/detail')
      .query({ id: 1 })
      .expect(200)

    expect(body.data.name).toEqual('test update')
  })

  it('Fetch Express Dict List', async () => {
    const { body } = await useRequest('get', '/logistic/express/dict/list')
      .expect(200)

    expect(body.data.length).toEqual(1)
  })

  it('Fetch Express Pages', async () => {
    const { body } = await useRequest('get', '/logistic/express/pages')
      .expect(200)

    expect(body.data.total).toEqual(1)
  })
})
