import type { IGoodsGroup } from '@/goods/types'

const data: IGoodsGroup[] = [
  { id: 1, name: '特价商品', sort: 1, createdTime: Date.now() },
  { id: 2, name: '热销商品', sort: 1, createdTime: Date.now() },
]

export default defineMocks({
  '/api/goods/group/list': () => {
    return responseMock<IGoodsGroup[]>(data)
  },
  '/api/goods/group/detail': ({ query }) => {
    return responseMock<IGoodsGroup>(
      data.find(d => d.id === Number(query.id)),
    )
  },
  '/api/goods/group/create': () => {
    return responseMock()
  },
  '/api/goods/group/update': () => {
    return responseMock()
  },
  '/api/goods/group/delete': () => {
    return responseMock()
  },
})
