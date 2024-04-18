import type { IGoodsBrand } from '@/goods/types'

const data: IGoodsBrand[] = []

for (let i = 0; i < 10; i++) {
  data.push({
    id: i + 1,
    name: `品牌${i + 1}`,
    logo: {
      id: 1,
      type: 'image',
      path: 'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp',
    },
    desc: `品牌描述${i + 1}`,
    sort: 1,
    createdTime: Date.now(),
  })
}

export default defineMocks({
  '/api/goods/brand/list': () => {
    return responseMock<IGoodsBrand[]>(data)
  },
  '/api/goods/brand/detail': ({ query }) => {
    return responseMock<IGoodsBrand>(
      data.find(d => d.id === Number(query.id)),
    )
  },
  '/api/goods/brand/create': ({ body }) => {
    data.push({
      id: data.length + 1,
      name: body.name,
      logo: body.logo,
      desc: body.desc,
      sort: body.sort,
      createdTime: Date.now(),
    })

    return responseMock()
  },
  '/api/goods/brand/update': () => {
    return responseMock()
  },
  '/api/goods/brand/delete': () => {
    return responseMock()
  },
})
