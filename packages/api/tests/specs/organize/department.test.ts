import { truncateTable, useRequest } from '~~/tests/utils'

describe('Organize Module - Department', () => {
  beforeAll(async () => {
    await truncateTable([
      'manage_organize_department',
    ])
  })

  it('Create Department', async () => {
    await useRequest('post', '/organize/department/create')
      .send({
        name: 'test',
      })
      .expect(200)
  })

  it('Update Department', async () => {
    await useRequest('put', '/organize/department/update')
      .query({ id: 1 })
      .send({
        name: 'test update',
      })
      .expect(200)
  })

  it('Fetch Department Detail', async () => {
    const { body } = await useRequest('get', '/organize/department/detail')
      .query({ id: 1 })
      .expect(200)

    expect(body.data.name).toEqual('test update')
  })

  it('Fetch Department List', async () => {
    const { body } = await useRequest('get', '/organize/department/list')
      .expect(200)

    expect(body.data.length).toEqual(1)
  })

  it('Fetch Department Dict List', async () => {
    const { body } = await useRequest('get', '/organize/department/dict/list')
      .expect(200)

    expect(body.data.length).toEqual(1)
  })

  it('Fetch Department Root List', async () => {
    const { body } = await useRequest('get', '/organize/department/root/list')
      .expect(200)

    expect(body.data.length).toEqual(1)
  })
})
