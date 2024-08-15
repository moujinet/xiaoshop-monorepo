import { getRequest, runSQL, truncateTable } from '~~/tests/utils'

describe('Staff Module - Position', () => {
  beforeAll(async () => {
    await truncateTable([
      'manage_staff_department',
      'manage_staff_position',
    ])

    await runSQL('INSERT INTO `manage_staff_department` (`name`) VALUES (\'部门 1\')')
  })

  it('Create Position', async () => {
    const { body } = await getRequest('post', '/staff/position/create')
      .send({
        departmentId: 1,
        name: '职位 1',
        desc: '职位描述',
        sort: 2,
      })
      .expect(200)

    expect(body.code).toEqual(0)
  })

  it('Update Position', async () => {
    const { body } = await getRequest('put', '/staff/position/update')
      .query({ id: 1 })
      .send({
        departmentId: 1,
        name: '职位 update',
        desc: '职位描述',
        sort: 1,
      })
      .expect(200)

    expect(body.code).toEqual(0)
  })

  it('Fetch Position Detail', async () => {
    const { body } = await getRequest('get', '/staff/position/detail')
      .query({ id: 1 })
      .expect(200)

    expect(body.data.name).toEqual('职位 update')
    expect(body.data.department.id).toEqual(1)
  })

  it('Fetch Position Pages', async () => {
    const { body } = await getRequest('get', '/staff/position/pages')
      .expect(200)

    expect(body.data.total).toEqual(1)
  })

  it('Fetch Position List', async () => {
    const { body } = await getRequest('get', '/staff/position/list')
      .query({ departmentId: 2 })
      .expect(200)

    expect(body.data.length).toEqual(0)
  })

  it('Delete Position', async () => {
    const { body } = await getRequest('delete', '/staff/position/delete')
      .send({ id: 1 })
      .expect(200)

    expect(body.code).toEqual(0)
  })
})
