import { describe, expect, it } from 'vitest'
import { areas } from './_fixtures/areas'
import type { IArea } from '@/settings/types'

describe('areas', () => {
  it('transform', () => {
    const data: IArea[] = []

    areas
      .filter((area) => {
        return area.provinceCode === undefined && area.cityCode === undefined
      })
      .forEach((area) => {
        data.push({
          id: data.length + 1,
          provinceId: 0,
          cityId: 0,
          name: area.name,
          shortName: area.name,
          code: area.code.padEnd(6, '0'),
        })
      })

    data.forEach((item) => {
      areas
        .filter((area) => {
          return area.provinceCode === item.code.substring(0, item.code.length - 4) && area.cityCode === undefined
        })
        .forEach((area) => {
          data.push({
            id: data.length + 1,
            provinceId: item.id,
            cityId: 0,
            name: area.name,
            shortName: area.name,
            code: area.code.padEnd(6, '0'),
          })
        })
    })

    data
      .filter((item) => {
        return item.provinceId !== 0 && item.cityId === 0
      })
      .forEach((item) => {
        areas
          .filter((area) => {
            return area.cityCode === item.code.substring(0, item.code.length - 2)
          })
          .forEach((area) => {
            data.push({
              id: data.length + 1,
              provinceId: item.provinceId,
              cityId: item.id,
              name: area.name,
              shortName: area.name,
              code: area.code.padEnd(6, '0'),
            })
          })
      })

    expect(data).toMatchSnapshot()
  })
})
