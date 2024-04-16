import type { IGoodsService } from '@/goods/types'

const data: IGoodsService[] = [
  { id: 1, name: '上门安装', price: 30, desc: '上门安装', sort: 1, createdTime: Date.now() },
  { id: 2, name: '折旧换新', price: 50, desc: '折旧换新', sort: 1, createdTime: Date.now() },
  { id: 3, name: '只换不修', price: 90, desc: '只换不修', sort: 1, createdTime: Date.now() },
]

export default defineMocks({
  '/api/goods/service/list': () => {
    return responseMock<IGoodsService[]>(data)
  },
  '/api/goods/service/detail': ({ query }) => {
    return responseMock<IGoodsService>(
      data.find(d => d.id === Number(query.id)),
    )
  },
  '/api/goods/service/create': () => {
    return responseMock()
  },
  '/api/goods/service/update': () => {
    return responseMock()
  },
  '/api/goods/service/delete': () => {
    return responseMock()
  },
})
