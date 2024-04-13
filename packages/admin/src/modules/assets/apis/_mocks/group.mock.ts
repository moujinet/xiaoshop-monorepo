import type { IAssetGroup } from '@/assets/types'

const data = [
  { type: 'image', parentId: 0, name: '默认分组', createdTime: Date.now() },
  { type: 'video', parentId: 0, name: '默认分组', createdTime: Date.now() },
  { type: 'video', parentId: 0, name: '标准素材', createdTime: Date.now() },
  { type: 'icon', parentId: 0, name: '默认分组', createdTime: Date.now() },
  { type: 'icon', parentId: 0, name: '图标素材', createdTime: Date.now() },
  { type: 'video', parentId: 3, name: '风景', createdTime: Date.now() },
  { type: 'video', parentId: 3, name: '人物', createdTime: Date.now() },
  { type: 'video', parentId: 3, name: '动物', createdTime: Date.now() },
  { type: 'video', parentId: 3, name: '植物', createdTime: Date.now() },
  { type: 'icon', parentId: 5, name: '单色图标', createdTime: Date.now() },
  { type: 'icon', parentId: 5, name: '多色图标', createdTime: Date.now() },
  { type: 'icon', parentId: 5, name: '线性图标', createdTime: Date.now() },
  { type: 'icon', parentId: 5, name: '矢量图标', createdTime: Date.now() },
].map((item, index) => ({ ...item, id: index + 1 })) as IAssetGroup[]

export default defineMocks({
  '/api/asset/group/list': ({ query }) => {
    return responseMock(data.filter(g => g.type === query.type))
  },
  '/api/asset/group/roots': ({ query }) => {
    return responseMock(data.filter(g => g.parentId === 0 && g.type === query.type))
  },
  '/api/asset/group/detail': ({ query }) => {
    return responseMock(data.find(g => g.id === Number(query.id)))
  },
  '/api/asset/group/create': ({ body }) => {
    data.push({ id: data.length + 1, type: body.type, parentId: body.parentId, name: body.name, createdTime: Date.now() })
    return responseMock()
  },
  '/api/asset/group/update': () => {
    return responseMock()
    // return responseMock(undefined, '10001 - 保存失败', 10001)
  },
  '/api/asset/group/delete': () => {
    return responseMock()
  },
})
