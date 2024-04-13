import type { IAsset } from '@/assets/types'

export const assets: IAsset[] = []

for (let i = 0; i < 200; i++) {
  assets.push({
    id: i + 1,
    groupId: 1,
    type: 'image',
    name: `demo-${i}.png`,
    path: `https://place.dog/800/800?t=${i}`,
    size: 1024,
    createdTime: Date.now(),
  })
}

export default defineMocks({
  '/api/asset/pages': ({ query }) => {
    return responsePaginationMock(
      assets.filter(a => a.groupId === Number(query.groupId)),
      query,
    )
  },
  '/api/asset/detail': ({ query }) => {
    return responseMock(assets.find(a => a.id === Number(query.id)))
  },
  '/api/asset/create': () => {
    return responseMock()
  },
  '/api/asset/update': () => {
    return responseMock()
  },
  '/api/asset/delete': () => {
    return responseMock()
  },
})
