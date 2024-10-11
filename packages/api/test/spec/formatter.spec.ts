import { afterDateTime, diffDateTime, formatDateTime } from '~/utils/formatter'

describe('Utils - Formatter', () => {
  it('Format DateTime', () => {
    expect(formatDateTime('2024/01/31')).toBe('2024-01-31 00:00:00')
  })

  it('Diff DateTime', () => {
    expect(diffDateTime('2024/01/30', '2024/01/31')).toBe(1)
  })

  it('After DateTime', () => {
    expect(afterDateTime('2024/01/30', 2, 'month').format('YYYY-MM-DD')).toBe('2024-03-29')
  })
})
