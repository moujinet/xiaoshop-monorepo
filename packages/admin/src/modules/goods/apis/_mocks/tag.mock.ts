import type { IGoodsTag } from '@/goods/types'

const data: IGoodsTag[] = [
  { id: 1, name: '新', sort: 1, createdTime: Date.now() },
  { id: 2, name: '热', sort: 1, createdTime: Date.now() },
  { id: 3, name: '荐', sort: 1, createdTime: Date.now() },
]

export default defineMocks({
  '/api/goods/tag/list': () => {
    return responseMock<IGoodsTag[]>(data)
  },
  '/api/goods/tag/detail': ({ query }) => {
    return responseMock<IGoodsTag>(
      data.find(d => d.id === Number(query.id)),
    )
  },
  '/api/goods/tag/create': () => {
    return responseMock()
  },
  '/api/goods/tag/update': () => {
    return responseMock()
  },
  '/api/goods/tag/delete': () => {
    return responseMock()
  },
})
