import { runSQL, truncateTable, useRequest } from '~~/tests/utils'

describe('Organize Module - Position', () => {
  beforeAll(async () => {
    await truncateTable([
      'manage_organize_department',
      'manage_organize_position',
    ])

    await runSQL([
      'INSERT INTO manage_organize_department (`name`) VALUES ("部门 1"), ("部门 2")',
    ])
  })

  it('Create Position', async () => {
    await useRequest('post', '/organize/position/create')
      .send({
        name: 'test',
        departmentId: 1,
      })
      .expect(200)
      .then(({ body }) => {
        expect(body.code).toEqual(0)
      })
  })

  it('Update Position', async () => {
    await useRequest('put', '/organize/position/update')
      .query({ id: 1 })
      .send({
        name: 'test update',
        departmentId: 2,
      })
      .expect(200)
      .then(({ body }) => {
        expect(body.code).toEqual(0)
      })
  })

  it('Fetch Position Detail', async () => {
    const { body } = await useRequest('get', '/organize/position/detail')
      .query({ id: 1 })
      .expect(200)

    expect(body.data.name).toEqual('test update')
    expect(body.data.departmentId).toEqual(2)
  })

  it('Fetch Position Pages', async () => {
    const { body } = await useRequest('get', '/organize/position/pages')
      .expect(200)

    expect(body.data.total).toEqual(1)
  })

  it('Fetch Position Dict List', async () => {
    const { body } = await useRequest('get', '/organize/position/dict/list')
      .query({ departmentId: 1 })
      .expect(200)

    expect(body.data.length).toEqual(0)
  })
})
