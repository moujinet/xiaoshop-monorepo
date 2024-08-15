import { getRequest, truncateTable } from '~~/tests/utils'

describe('Member Module - Card', () => {
  beforeAll(async () => {
    await truncateTable([
      'shop_member_card',
    ])
  })

  it('Create Custom Member Card', async () => {
    const { body } = await getRequest('post', '/member/card/create')
      .send({
        type: 'custom',
        isEnabled: 'Y',
        name: 'Member vip 1',
        desc: 'Member vip 1',
        badge: {
          icon: 'icon',
          textColor: '#000000',
          bgColor: '#ffffff',
        },
        styles: {
          icon: 'icon',
          textColor: '#000000',
          bgColor: '#ffffff',
          bgImage: 'https://i.pravatar.cc/300',
        },
        plans: [
          { type: 'times', duration: 0, price: 10 },
          { type: 'times', duration: 0, price: 20 },
        ],
        needExp: 0,
        discount: 0,
        pointsRatio: 0,
        isFreeShipping: 'Y',
      })
      .expect(200)

    expect(body.code).toEqual(0)
  })

  it('Update Custom Member Card', async () => {
    const { body } = await getRequest('put', '/member/card/update')
      .query({ id: 1 })
      .send({
        type: 'custom',
        isEnabled: 'Y',
        name: 'Member vip 1',
        desc: 'Member vip 1',
        badge: {
          icon: 'icon',
          textColor: '#000000',
          bgColor: '#ffffff',
        },
        styles: {
          icon: 'icon',
          textColor: '#000000',
          bgColor: '#ffffff',
          bgImage: 'https://i.pravatar.cc/300',
        },
        plans: [
          { id: 1, type: 'times', duration: 0, price: 10 },
        ],
        needExp: 0,
        discount: 0,
        pointsRatio: 0,
        isFreeShipping: 'Y',
      })
      .expect(200)

    expect(body.code).toEqual(0)
  })

  it('Fetch Member Card Detail', async () => {
    const { body } = await getRequest('get', '/member/card/detail')
      .query({ id: 1 })
      .expect(200)

    expect(body.data.name).toEqual('Member vip 1')
  })

  it('Update Member Card Status', async () => {
    const { body } = await getRequest('put', '/member/card/status/update')
      .query({ id: 1 })
      .send({
        status: 'N',
      })
      .expect(200)

    expect(body.code).toEqual(0)
  })

  it('Fetch Member Custom Card List', async () => {
    const { body } = await getRequest('get', '/member/card/custom/list')
      .expect(200)

    expect(body.data.length).toEqual(1)
  })

  it('Fetch Member Level Card List', async () => {
    const { body } = await getRequest('get', '/member/card/level/list')
      .expect(200)

    expect(body.data.length).toEqual(0)
  })
})
