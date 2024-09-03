import { LogisticsCalcMode } from '@xiaoshop/shared'
import { truncateTable, useRequest } from '~~/tests/utils'

describe('Logistics Module - Template', () => {
  beforeAll(async () => {
    await truncateTable(['manage_logistics_template'])
  })

  it('Create Template', async () => {
    await useRequest('post', '/logistics/template/create')
      .send({
        name: 'test 1',
        calcMode: LogisticsCalcMode.COUNT,
        rules: [
          {
            locations: [[{ code: '11', name: '北京市' }]],
            first: 1,
            firstPrice: 10,
            continue: 1,
            continuePrice: 5,
          },
        ],
        enableFreeRules: 0,
      })
      .expect(200)
      .then(({ body }) => {
        expect(body.code).toEqual(0)
      })

    await useRequest('post', '/logistics/template/create')
      .send({
        name: 'test 2',
        calcMode: LogisticsCalcMode.COUNT,
        rules: [
          {
            locations: [[{ code: '11', name: '北京市' }]],
            first: 1,
            firstPrice: 10,
            continue: 1,
            continuePrice: 5,
          },
        ],
        enableFreeRules: 1,
        freeRules: [
          {
            locations: [[{ code: '11', name: '北京市' }]],
            overCount: 10,
            overAmount: 100,
          },
        ],
      })
      .expect(200)
      .then(({ body }) => {
        expect(body.code).toEqual(0)
      })
  })

  it('Update Template', async () => {
    await useRequest('put', '/logistics/template/update')
      .query({ id: 1 })
      .send({
        name: 'test 1 update',
        calcMode: LogisticsCalcMode.WEIGHT,
        rules: [
          {
            locations: [[{ code: '11', name: '北京市' }]],
            first: 1,
            firstPrice: 10,
            continue: 1,
            continuePrice: 5,
          },
        ],
        enableFreeRules: 1,
        freeRules: [
          {
            locations: [[{ code: '11', name: '北京市' }]],
            overCount: 10,
            overAmount: 100,
          },
        ],
      })
      .expect(200)
      .then(({ body }) => {
        expect(body.code).toEqual(0)
      })
  })

  it('Fetch Template', async () => {
    const { body } = await useRequest('get', '/logistics/template/detail')
      .query({ id: 1 })
      .expect(200)

    expect(body.data.name).toEqual('test 1 update')
    expect(body.data.calcMode).toEqual(LogisticsCalcMode.WEIGHT)
    expect(body.data.enableFreeRules).toEqual(1)
    expect(body.data.freeRules.length).toEqual(1)
  })

  it('Fetch Template List', async () => {
    const { body } = await useRequest('get', '/logistics/template/list').expect(
      200,
    )

    expect(body.data.length).toEqual(2)
  })
})
