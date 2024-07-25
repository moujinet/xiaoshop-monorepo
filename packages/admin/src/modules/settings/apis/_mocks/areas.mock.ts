import { areas } from './areas.data'

export default defineMocks({
  /**
   * 获取地区列表
   */
  '/api/area/list': () => {
    return responseMock(areas)
  },
  /**
   * 获取地区详情
   */
  '/api/area/detail': ({ query }) => {
    return responseMock(areas.find(a => a.id === Number(query.id)))
  },
  '/api/area/create': () => {
    return responseMock()
  },
  '/api/area/update': () => {
    return responseMock()
  },
  '/api/area/delete': () => {
    return responseMock()
  },
})
