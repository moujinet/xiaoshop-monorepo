import type {
  IEnabled,
  IMemberCard,
  IMemberCardDict,
  IMemberCustomCardListItem,
  IMemberLevelListItem,
} from '@xiaoshop/schema'
import type { IUseRequestReturn } from '~/utils/request'

/**
 * 获取会员等级列表
 *
 * @api get /admin/member/card/level/list
 * @returns IUseRequestReturn<IMemberLevelListItem[]>
 */
export function fetchMemberLevelList(): IUseRequestReturn<IMemberLevelListItem[]> {
  return useRequest<IMemberLevelListItem[]>({
    method: 'get',
    url: '/admin/member/card/level/list',
  })
}

/**
 * 获取自定义会员卡列表
 *
 * @api get /admin/member/card/custom/list
 * @returns IUseRequestReturn<IMemberCustomCardListItem[]>
 */
export function fetchMemberCustomCardList(): IUseRequestReturn<IMemberCustomCardListItem[]> {
  return useRequest<IMemberCustomCardListItem[]>({
    method: 'get',
    url: '/admin/member/card/custom/list',
  })
}

/**
 * 获取会员卡字典列表
 *
 * @api get /admin/member/card/dict/list
 * @returns IUseRequestReturn<IMemberCardDict[]>
 */
export function fetchMemberCardDictList(): IUseRequestReturn<IMemberCardDict[]> {
  return useRequest<IMemberCardDict[]>({
    method: 'get',
    url: '/admin/member/card/dict/list',
  })
}

/**
 * 获取会员卡详情
 *
 * @api get /admin/member/card/detail
 * @param id number
 * @returns IUseRequestReturn<IMemberCard>
 */
export function fetchMemberCard(id: number): IUseRequestReturn<IMemberCard> {
  return useRequest<IMemberCard>({
    method: 'get',
    url: '/admin/member/card/detail',
    params: {
      id,
    },
  })
}

/**
 * 创建自定义会员卡
 *
 * @api post /admin/member/card/create
 * @param data Record<string, any>
 * @returns Promise<void>
 */
export function createMemberCard(data: Record<string, any>) {
  return usePromiseRequest({
    method: 'post',
    url: '/admin/member/card/create',
    data,
  })
}

/**
 * 更新会员卡
 *
 * @api put /admin/member/card/update
 * @param id number
 * @param data Record<string, any>
 * @returns Promise<void>
 */
export function updateMemberCard(id: number, data: Record<string, any>) {
  return usePromiseRequest({
    method: 'put',
    url: '/admin/member/card/update',
    params: {
      id,
    },
    data,
  })
}

/**
 * 更新会员卡启用状态
 *
 * @api put /admin/member/card/status/update
 * @param id number
 * @param status IEnabled
 * @returns Promise<void>
 */
export function updateMemberCardStatus(id: number, status: IEnabled) {
  return usePromiseRequest({
    method: 'put',
    url: '/admin/member/card/status/update',
    params: {
      id,
    },
    data: {
      status,
    },
  })
}

/**
 * 删除自定义会员卡
 *
 * @api delete /admin/member/card/delete
 * @param id number
 * @returns Promise<void>
 */
export function deleteMemberCard(id: number) {
  return usePromiseRequest({
    method: 'delete',
    url: '/admin/member/card/delete',
    data: {
      id,
    },
  })
}
