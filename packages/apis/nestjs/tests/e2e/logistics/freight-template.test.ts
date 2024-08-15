import { getRequest, truncateTable } from '~~/tests/utils'

describe('Logistics Module - Freight Template', () => {
  beforeAll(async () => {
    await truncateTable([
      'manage_logistics_freight_template',
    ])
  })

  it('Create Freight Template', async () => {
    const { body } = await getRequest('post', '/logistics/freight-template/create')
      .send({
        name: 'template 1',
        calcMode: 'count',
        rules: [
          {
            locations: [[{ code: '11', name: '北京市' }]],
            first: 1,
            firstPrice: 2,
            continue: 3,
            continuePrice: 4,
          },
        ],
        enableFreeRules: 'Y',
        freeRules: [
          {
            locations: [[{ code: '11', name: '北京市' }]],
            overCount: 1,
            overAmount: 10,
          },
        ],
      })
      .expect(200)

    expect(body.code).toEqual(0)
  })

  it('Create Freight Template 2', async () => {
    const { body } = await getRequest('post', '/logistics/freight-template/create')
      .send({
        name: 'template 2',
        calcMode: 'count',
        rules: [
          {
            locations: [[{ code: '11', name: '北京市' }]],
            first: 1,
            firstPrice: 2,
            continue: 3,
            continuePrice: 4,
          },
        ],
        enableFreeRules: 'N',
        freeRules: [],
      })
      .expect(200)

    expect(body.code).toEqual(0)
  })

  it('Fetch Freight Template List', async () => {
    const { body } = await getRequest('get', '/logistics/freight-template/list')
      .expect(200)

    expect(body.data.length).toEqual(2)
  })

  it('Update Freight Template', async () => {
    const { body } = await getRequest('put', '/logistics/freight-template/update')
      .query({ id: 1 })
      .send({
        name: 'template 1',
        calcMode: 'count',
        rules: [
          {
            locations: [
              [{ code: '11', name: '北京市' }],
            ],
            first: 10,
            firstPrice: 20,
            continue: 30,
            continuePrice: 40,
          },
        ],
        enableFreeRules: 'Y',
        freeRules: [
          {
            locations: [
              [{ code: '11', name: '北京市' }],
            ],
            overCount: 2,
            overAmount: 20,
          },
        ],
      })
      .expect(200)

    expect(body.code).toEqual(0)
  })

  it('Fetch Freight Template Detail', async () => {
    const { body } = await getRequest('get', '/logistics/freight-template/detail')
      .query({ id: 1 })
      .expect(200)

    expect(body.code).toEqual(0)
  })

  it('Update Freight Template 2', async () => {
    const { body } = await getRequest('put', '/logistics/freight-template/update')
      .query({ id: 1 })
      .send({
        name: 'template 1',
        calcMode: 'count',
        rules: [
          {
            locations: [
              [{ code: '11', name: '北京市' }],
            ],
            first: 10,
            firstPrice: 20,
            continue: 30,
            continuePrice: 40,
          },
        ],
        enableFreeRules: 'N',
        freeRules: [],
      })
      .expect(200)

    expect(body.code).toEqual(0)
  })

  it('Delete Freight Template', async () => {
    const { body } = await getRequest('delete', '/logistics/freight-template/delete')
      .send({ id: 1 })
      .expect(200)

    expect(body.code).toEqual(0)
  })
})
