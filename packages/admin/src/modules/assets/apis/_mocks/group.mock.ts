import type { IAssetGroup } from '@/assets/types'

const data: IAssetGroup[] = [
  { id: 1, parentId: 0, name: '默认分组', createdTime: Date.now() },
  { id: 2, parentId: 0, name: '标准素材', createdTime: Date.now() },
  { id: 3, parentId: 0, name: '图标素材', createdTime: Date.now() },
  { id: 4, parentId: 2, name: '风景', createdTime: Date.now() },
  { id: 5, parentId: 2, name: '人物', createdTime: Date.now() },
  { id: 6, parentId: 2, name: '动物', createdTime: Date.now() },
  { id: 7, parentId: 2, name: '植物', createdTime: Date.now() },
  { id: 8, parentId: 3, name: '单色图标', createdTime: Date.now() },
  { id: 9, parentId: 3, name: '多色图标', createdTime: Date.now() },
  { id: 10, parentId: 3, name: '线性图标', createdTime: Date.now() },
  { id: 11, parentId: 3, name: '矢量图标', createdTime: Date.now() },
]

export default defineMocks({
  '/api/asset/group/list': () => {
    return responseMock(data)
  },
  '/api/asset/group/roots': () => {
    return responseMock(data.filter(g => g.parentId === 0))
  },
  '/api/asset/group/detail': ({ query }) => {
    return responseMock(data.find(g => g.id === Number(query.id)))
  },
  '/api/asset/group/create': ({ body }) => {
    data.push({ id: data.length + 1, parentId: body.parentId, name: body.name, createdTime: Date.now() })
    return responseMock()
  },
  '/api/asset/group/update': () => {
    return responseMock()
  },
  '/api/asset/group/delete': () => {
    return responseMock()
  },
})
