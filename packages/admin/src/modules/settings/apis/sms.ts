import { DEFAULT_PAGE_SIZE } from '~/constants/defaults'

export interface IApiSmsLog {
  /**
   * 发送记录 ID
   */
  id: number
  /**
   * 短信标题
   */
  title: string
  /**
   * 短信内容
   */
  content: string
  /**
   * 手机号
   */
  phone: string
  /**
   * 发送状态
   */
  status: number
  /**
   * 发送结果
   */
  result: string
  /**
   * 发送时间
   */
  createdTime: string
  /**
   * 发送成功时间
   */
  sendedTime: string
}

/**
 * 短信发送记录列表项
 */
export type IApiSmsLogListItem = Omit<IApiSmsLog, 'content' | 'result'>

/**
 * 查询短信发送记录分页列表
 *
 * @param conditions {}
 * @returns Promise<IApiSmsLogListItem[]>
 */
export function fetchSmsLogList(
  conditions?: any,
) {
  const {
    status = undefined,
    keyword = undefined,
    page = 1,
    size = DEFAULT_PAGE_SIZE,
  } = conditions

  return useRequest<IApiPaginationResult<IApiSmsLogListItem>>({
    method: 'get',
    url: '/sms/log/list',
    params: {
      status,
      keyword,
      page,
      size,
    },
  })
}

/**
 * 获取短信发送记录详情
 *
 * @param id number
 * @returns IApiSmsLog
 */
export function fetchSmsLogDetail(id: number) {
  return useRequest<IApiSmsLog>({
    method: 'get',
    url: '/sms/log/detail',
    params: {
      id,
    },
  })
}
