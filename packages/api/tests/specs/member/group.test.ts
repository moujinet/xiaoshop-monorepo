import {
  truncateTable,
  useRequest,
} from '~~/tests/utils'

describe('Member Module - Groups', () => {
  beforeAll(async () => {
    await truncateTable([
      'shop_member_group',
    ])
  })

  it('Create Member Group', async () => {
    await useRequest('post', '/member/group/create')
      .send({
        name: 'test',
        desc: 'test',
        conditions: [
          { key: 'gender', operator: 'in', name: '性别', value: 'male' },
        ],
      })
      .expect(200)
      .then(({ body }) => {
        expect(body.code).toEqual(0)
      })
  })

  it('Update Member Group', async () => {
    await useRequest('put', '/member/group/update')
      .query({ id: 1 })
      .send({
        name: 'test update',
        desc: 'test update',
        conditions: [
          { key: 'gender', operator: 'in', name: '性别', value: 'male' },
        ],
      })
      .expect(200)
      .then(({ body }) => {
        expect(body.code).toEqual(0)
      })
  })

  it('Fetch Member Group Detail', async () => {
    const { body } = await useRequest('get', '/member/group/detail')
      .query({ id: 1 })
      .expect(200)

    expect(body.data.name).toEqual('test update')
  })

  it('Fetch Member Group List', async () => {
    const { body } = await useRequest('get', '/member/group/dict/list')
      .expect(200)

    expect(body.data[0].name).toEqual('test update')
  })

  it('Fetch Member Group Pages', async () => {
    const { body } = await useRequest('get', '/member/group/pages')
      .expect(200)

    expect(body.data.result[0].name).toEqual('test update')
  })
})
