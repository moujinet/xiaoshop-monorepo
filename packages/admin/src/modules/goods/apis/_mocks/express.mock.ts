import Mock from 'mockjs'
import type { IExpressCompany, IExpressPostman } from '@/goods/types/express'

const companies: IExpressCompany[] = []
const postmen: IExpressPostman[] = []

for (let i = 0; i < 5; i++) {
  companies.push({
    id: i + 1,
    name: Mock.Random.cword(5, 10),
    url: Mock.Random.url('https'),
    sort: 1,
    createdTime: Date.now(),
  })

  postmen.push({
    id: i + 1,
    name: Mock.Random.cname(),
    phoneNumber: Mock.Random.integer(10000000000, 19999999999).toString(),
    sort: 1,
    createdTime: Date.now(),
  })
}

export default defineMocks({
  // Company
  '/api/express/company/list': () => {
    return responseMock<IExpressCompany[]>(companies)
  },
  '/api/express/company/detail': ({ query }) => {
    return responseMock<IExpressCompany>(
      companies.find(d => d.id === Number(query.id)),
    )
  },
  '/api/express/company/create': () => {
    return responseMock()
  },
  '/api/express/company/update': () => {
    return responseMock()
  },
  '/api/express/company/delete': () => {
    return responseMock()
  },
  // Postman
  '/api/express/postman/list': () => {
    return responseMock<IExpressPostman[]>(postmen)
  },
  '/api/express/postman/detail': ({ query }) => {
    return responseMock<IExpressPostman>(
      postmen.find(d => d.id === Number(query.id)),
    )
  },
  '/api/express/postman/create': () => {
    return responseMock()
  },
  '/api/express/postman/update': () => {
    return responseMock()
  },
  '/api/express/postman/delete': () => {
    return responseMock()
  },
})
