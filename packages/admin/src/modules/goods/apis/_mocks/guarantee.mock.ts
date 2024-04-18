import type { IGoodsGuarantee } from '@/goods/types'

const data: IGoodsGuarantee[] = [
  { id: 1, name: '7 天无理由', icon: { id: 1, type: 'image', path: 'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp' }, desc: '支持 7 天无理由退货(拆封后不支持)', sort: 1, createdTime: Date.now() },
  { id: 2, name: '正品保证', icon: { id: 1, type: 'image', path: 'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp' }, desc: '正品保证', sort: 1, createdTime: Date.now() },
  { id: 3, name: '免费安装', icon: { id: 1, type: 'image', path: 'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp' }, desc: '支持免费安装', sort: 1, createdTime: Date.now() },
]

export default defineMocks({
  '/api/goods/guarantee/list': () => {
    return responseMock<IGoodsGuarantee[]>(data)
  },
  '/api/goods/guarantee/detail': ({ query }) => {
    return responseMock<IGoodsGuarantee>(
      data.find(d => d.id === Number(query.id)),
    )
  },
  '/api/goods/guarantee/create': ({ body }) => {
    data.push({
      id: data.length + 1,
      name: body.name,
      icon: body.icon,
      desc: body.desc,
      sort: body.sort,
      createdTime: Date.now(),
    })

    return responseMock()
  },
  '/api/goods/guarantee/update': () => {
    return responseMock()
  },
  '/api/goods/guarantee/delete': () => {
    return responseMock()
  },
})
