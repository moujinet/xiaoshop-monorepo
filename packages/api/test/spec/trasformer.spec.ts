import { objectToDict, pipeDict, toDict } from '~/utils/transformer'

describe('Utils - Transformer', () => {
  const dicts = [
    { key: 1, value: '正常' },
    { key: 2, value: '禁用' },
  ]

  it('To Dict', () => {
    expect(toDict(1, dicts)).toEqual({ key: 1, value: '正常' })
  })

  it('Object to Dict', () => {
    const obj = { status: 1, type: 1, level: 1 }

    expect(objectToDict(obj, 'status', dicts)).toEqual({
      status: { key: 1, value: '正常' },
      type: 1,
      level: 1,
    })
  })

  it('Pipe To Dict', () => {
    const list = [
      { status: 1, type: 1, level: 1 },
      { status: 2, type: 2, level: 2 },
    ]

    const result = pipeDict(list, [
      row => objectToDict(row, 'status', dicts),
      row => objectToDict(row, 'type', dicts),
      row => objectToDict(row, 'level', dicts),
    ])

    expect(result).toEqual([
      {
        status: { key: 1, value: '正常' },
        type: { key: 1, value: '正常' },
        level: { key: 1, value: '正常' },
      },
      {
        status: { key: 2, value: '禁用' },
        type: { key: 2, value: '禁用' },
        level: { key: 2, value: '禁用' },
      },
    ])
  })

  it('Pipe To Dict - Nested Object', () => {
    const list = [
      {
        status: 1,
        user: {
          name: 'test',
          status: 1,
          card: {
            id: 1,
            status: 2,
          },
        },
      },
    ]

    const result = pipeDict(list, [
      row => objectToDict(row, 'status', dicts),
      row => objectToDict(row, 'user.status', dicts),
      row => objectToDict(row, 'user.card.status', dicts),
    ])

    expect(result).toEqual([
      {
        status: {
          key: 1,
          value: '正常',
        },
        user: {
          card: {
            id: 1,
            status: {
              key: 2,
              value: '禁用',
            },
          },
          name: 'test',
          status: {
            key: 1,
            value: '正常',
          },
        },
      },
    ])
  })
})
