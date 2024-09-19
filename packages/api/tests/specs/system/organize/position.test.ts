import { getTableName, runSQL, truncateTable, useRequest } from '~~/tests/utils'

describe('System Organize Module - Position', () => {
  beforeAll(async () => {
    await truncateTable([
      'system_department',
      'system_department_position',
    ])

    await runSQL([
      `INSERT INTO ${getTableName('system_department')} (\`name\`) VALUES ("test 1"), ("test 2")`,
    ])
  })

  it('Create Position', async () => {
    await useRequest('post', '/system/department/position/create')
      .send({
        departmentId: 1,
        name: 'test',
      })
      .expect(200)
      .then(({ body }) => {
        expect(body.code).toEqual(0)
      })
  })

  it('Update Position', async () => {
    await useRequest('put', '/system/department/position/update')
      .query({ id: 1 })
      .send({
        departmentId: 2,
        name: 'test update',
      })
      .expect(200)
      .then(({ body }) => {
        expect(body.code).toEqual(0)
      })
  })

  it('Fetch Position Detail', async () => {
    const { body } = await useRequest('get', '/system/department/position/detail')
      .query({ id: 1 })
      .expect(200)

    expect(body.data.name).toEqual('test update')
    expect(body.data.departmentId).toEqual(2)
  })

  it('Fetch Position Pages', async () => {
    const { body } = await useRequest('get', '/system/department/position/pages')
      .expect(200)

    expect(body.data.total).toEqual(1)
  })

  it('Fetch Position Dict List', async () => {
    const { body } = await useRequest('get', '/system/department/position/dict/list')
      .query({ departmentId: 2 })
      .expect(200)

    expect(body.data.length).toEqual(1)
  })
})
