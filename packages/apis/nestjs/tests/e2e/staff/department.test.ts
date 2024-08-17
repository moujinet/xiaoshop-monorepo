import { getRequest, truncateTable } from '~~/tests/utils'

describe('Staff Module - Department', () => {
  beforeAll(async () => {
    await truncateTable([
      'manage_staff_department',
    ])
  })

  it('Create Department', async () => {
    const { body } = await getRequest('post', '/staff/department/create')
      .send({
        parentId: 0,
        name: '部门 1',
        desc: '部门描述',
        sort: 2,
      })
      .expect(200)

    expect(body.code).toEqual(0)
  })

  it('Update Department', async () => {
    const { body } = await getRequest('put', '/staff/department/update')
      .query({ id: 1 })
      .send({
        parentId: 0,
        name: '部门 update',
        desc: '部门描述',
        sort: 1,
      })
      .expect(200)

    expect(body.code).toEqual(0)
  })

  it('Fetch Department Detail', async () => {
    const { body } = await getRequest('get', '/staff/department/detail')
      .query({ id: 1 })
      .expect(200)

    expect(body.data.name).toEqual('部门 update')
  })

  it('Fetch Department List', async () => {
    const { body } = await getRequest('get', '/staff/department/list')
      .expect(200)

    expect(body.data.length).toEqual(1)
  })

  it('Fetch Department Root List', async () => {
    const { body } = await getRequest('get', '/staff/department/root/list')
      .expect(200)

    expect(body.data[0].name).toEqual('部门 update')
  })

  it('Delete Department', async () => {
    const { body } = await getRequest('delete', '/staff/department/delete')
      .send({ id: 1 })
      .expect(200)

    expect(body.code).toEqual(0)
  })
})
