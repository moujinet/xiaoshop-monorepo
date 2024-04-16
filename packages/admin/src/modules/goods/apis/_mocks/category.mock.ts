import type { IGoodsCategory } from '@/goods/types'

const data: IGoodsCategory[] = []
const templates: Array<[string, string[]]> = [
  ['灯具', ['吸顶灯', '吊灯', '台灯', '落地灯', '壁灯', '庭院灯', '装饰灯', '筒灯射灯', '节能灯']],
  ['家具', ['沙发', '床', '床垫', '餐桌', '衣柜', '书架', '鞋柜', '置物架', '儿童床']],
  ['饰品', ['相框', '花瓶', '桌面摆件', '流水摆件', '现代装饰画', '电表箱装饰画', '灯光画', '装饰贴', '创意饰品']],
  ['收纳', ['收纳袋', '收纳盒', '收纳篮', '收纳柜', '桌面收纳', '鞋子收纳', '旅行收纳', '夹缝收纳', '储物收纳']],
  ['布艺', ['地毯', '地垫', '窗帘', '飘窗垫', '蒲团', '沙发垫', '抱枕靠枕']],
]

let index = 0

templates.forEach((item) => {
  index++
  const root = index

  data.push({
    id: root,
    parentId: 0,
    name: item[0],
    sort: 1,
    createdTime: Date.now(),
  })

  item[1].forEach((name) => {
    index++
    data.push({
      id: index,
      parentId: root,
      name,
      sort: 1,
      createdTime: Date.now(),
    })
  })
})

export default defineMocks({
  '/api/goods/category/list': ({ query }) => {
    return responseMock<IGoodsCategory[]>(data.filter(d => d.parentId === Number(query.parentId)))
  },
  '/api/goods/category/detail': ({ query }) => {
    return responseMock<IGoodsCategory>(
      data.find(d => d.id === Number(query.id)),
    )
  },
  '/api/goods/category/create': () => {
    return responseMock()
  },
  '/api/goods/category/update': () => {
    return responseMock()
  },
  '/api/goods/category/delete': () => {
    return responseMock()
  },
})
