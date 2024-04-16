import Mock from 'mockjs'

const companies = [
  { name: 'EMS' },
  { name: '申通快递' },
  { name: '极兔快递' },
  { name: '顺丰速递' },
].map(
  (c, i) => ({ ...c, id: i + 1, url: Mock.Random.url('http'), sort: i }),
)

export default defineMocks({
  '/api/shipment/company/list': () => {
    return responseMock(
      companies,
    )
  },
  '/api/shipment/company/detail': ({ query }) => {
    return responseMock(
      companies.find(c => c.id === Number(query.id)),
    )
  },
  '/api/shipment/company/create': () => {
    return responseMock()
  },
  '/api/shipment/company/update': () => {
    return responseMock()
  },
  '/api/shipment/company/delete': () => {
    return responseMock()
  },
})
