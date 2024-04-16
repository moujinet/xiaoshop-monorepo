import Mock from 'mockjs'
import type { IApiSmsLog } from '@/settings/apis/sms'

const logs: IApiSmsLog[] = []

for (let i = 0; i < 100; i++) {
  logs.push({
    id: Mock.Random.increment(),
    title: Mock.Random.ctitle(5, 10),
    content: Mock.Random.cparagraph(1, 3),
    phone: '18800007777',
    status: Mock.Random.integer(1, 3),
    result: Mock.Random.cword(1, 3),
    createdTime: Mock.Random.date('yyyy-MM-dd HH:mm:ss'),
    sendedTime: Mock.Random.date('yyyy-MM-dd HH:mm:ss'),
  })
}

export default defineMocks({
  /**
   * 获取短信发送记录分页列表
   */
  '/api/sms/log/list': ({ query }) => {
    const { page = 1, size = 20 } = query
    return responsePaginationMock(
      logs.map(log => omit(log, ['content', 'result'])),
      {
        page,
        size,
      },
    )
  },
  /**
   * 获取短信发送记录分页列表
   */
  '/api/sms/log/detail': ({ query }) => {
    const { id } = query
    return responseMock(
      logs.find(l => l.id === Number(id)),
    )
  },
})
