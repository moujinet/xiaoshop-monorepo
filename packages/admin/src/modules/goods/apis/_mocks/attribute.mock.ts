import type { IGoodsAttributeTemplate, IGoodsAttributeTemplateAttribute } from '@/goods/types'

const templates: IGoodsAttributeTemplate[] = [
  { id: 1, name: '家具参数模板', desc: '常用家具参数模板', createdTime: Date.now() },
  { id: 2, name: '灯具参数模板', desc: '常用灯具参数模板', createdTime: Date.now() },
]

const attributes: IGoodsAttributeTemplateAttribute[] = [
  { id: 1, templateId: 1, name: '材质', type: 'checkbox', options: '实木,真皮,不锈钢,铝材,铝合金', createdTime: Date.now() },
  { id: 2, templateId: 1, name: '风格', type: 'radio', options: '新中,美式,欧式,中式,日式,田园', createdTime: Date.now() },
  { id: 3, templateId: 1, name: '产地', type: 'radio', options: '广东佛山,江西赣州', createdTime: Date.now() },
  { id: 4, templateId: 1, name: '系列', type: 'input', options: '', createdTime: Date.now() },
  { id: 5, templateId: 2, name: '材质', type: 'checkbox', options: '实木,真皮,不锈钢,铝材,铝合金', createdTime: Date.now() },
  { id: 6, templateId: 2, name: '风格', type: 'radio', options: '新中,美式,欧式,中式,日式,田园', createdTime: Date.now() },
  { id: 7, templateId: 2, name: '产地', type: 'radio', options: '广东中山,江苏南通', createdTime: Date.now() },
  { id: 8, templateId: 2, name: '系列', type: 'input', options: '', createdTime: Date.now() },
]

export default defineMocks({
  '/api/goods/attribute/template/list': () => {
    return responseMock<IGoodsAttributeTemplate[]>(templates)
  },
  '/api/goods/attribute/template/detail': ({ query }) => {
    return responseMock<IGoodsAttributeTemplate>(
      templates.find(d => d.id === Number(query.id)),
    )
  },
  '/api/goods/attribute/template/create': () => {
    return responseMock()
  },
  '/api/goods/attribute/template/update': () => {
    return responseMock()
  },
  '/api/goods/attribute/template/delete': () => {
    return responseMock()
  },
  '/api/goods/attribute/list': ({ query }) => {
    return responseMock<IGoodsAttributeTemplateAttribute[]>(
      attributes.filter(a => a.templateId === Number(query.templateId)),
    )
  },
  '/api/goods/attribute/detail': ({ query }) => {
    return responseMock<IGoodsAttributeTemplateAttribute>(
      attributes.find(a => a.id === Number(query.id)),
    )
  },
  '/api/goods/attribute/create': () => {
    return responseMock()
  },
  '/api/goods/attribute/update': () => {
    return responseMock()
  },
  '/api/goods/attribute/delete': () => {
    return responseMock()
  },
})
