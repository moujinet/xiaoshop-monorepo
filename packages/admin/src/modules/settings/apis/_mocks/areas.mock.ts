export default defineMocks({
  /**
   * 获取地区列表
   */
  '/api/area/list': () => {
    const areas = [
      { id: 1, parent: 0, name: '广东省', shortName: '广东', code: '440000' },
      { id: 2, parent: 1, name: '深圳市', shortName: '深圳', code: '440000' },
      { id: 3, parent: 2, name: '南山区', shortName: '南山', code: '440000' },
      { id: 4, parent: 2, name: '南山区1', shortName: '南山1', code: '440000' },
      { id: 5, parent: 2, name: '南山区2', shortName: '南山2', code: '440000' },
      { id: 6, parent: 2, name: '南山区3', shortName: '南山3', code: '440000' },
      { id: 7, parent: 0, name: '山东省', shortName: '山东', code: '440000' },
      { id: 8, parent: 1, name: '深圳市2', shortName: '深圳2', code: '440000' },
    ]

    return responseMock(areas)
  },
  /**
   * 获取地区详情
   */
  '/api/area/detail': () => {
    return responseMock({ id: 1, parent: 0, name: '广东省', shortName: '广东', code: '440000' })
  },
})
