import type {
  IApiPaginationData,
  IMemberGroup,
  IMemberGroupDict,
  IMemberGroupListItem,
} from '@xiaoshop/schema'
import type { IUseRequestReturn } from '~/utils/request'

/**
 * 获取会员群体分页列表
 *
 * @api get /admin/member/group/pages
 * @param params Record<string, any>
 * @returns IUseRequestReturn<IApiPaginationData<IMemberGroupListItem>>
 */
export function fetchMemberGroupPages(
  params?: Record<string, any>,
): IUseRequestReturn<IApiPaginationData<IMemberGroupListItem>> {
  return useRequest<IApiPaginationData<IMemberGroupListItem>>({
    method: 'get',
    url: '/admin/member/group/pages',
    params,
  })
}

/**
 * 获取会员群体字典列表
 *
 * @api get /admin/member/group/dict/list
 * @returns IUseRequestReturn<IMemberGroupDict[]>
 */
export function fetchMemberGroupDictList(): IUseRequestReturn<IMemberGroupDict[]> {
  return useRequest<IMemberGroupDict[]>({
    method: 'get',
    url: '/admin/member/group/dict/list',
  })
}

/**
 * 获取会员群体详情
 *
 * @api get /admin/member/group/detail
 * @param id number
 * @returns IUseRequestReturn<IMemberGroup>
 */
export function fetchMemberGroup(id: number): IUseRequestReturn<IMemberGroup> {
  return useRequest<IMemberGroup>({
    method: 'get',
    url: '/admin/member/group/detail',
    params: {
      id,
    },
  })
}

/**
 * 创建会员群体
 *
 * @api post /admin/member/group/create
 * @param data Record<string, any>
 * @returns Promise<void>
 */
export function createMemberGroup(data: Record<string, any>) {
  return usePromiseRequest({
    method: 'post',
    url: '/admin/member/group/create',
    data,
  })
}

/**
 * 更新会员群体
 *
 * @api put /admin/member/group/update
 * @param id number
 * @param data Record<string, any>
 * @returns Promise<void>
 */
export function updateMemberGroup(id: number, data: Record<string, any>) {
  return usePromiseRequest({
    method: 'put',
    url: '/admin/member/group/update',
    params: {
      id,
    },
    data,
  })
}

/**
 * 删除会员群体
 *
 * @api delete /admin/member/group/delete
 * @param id number
 * @returns Promise<void>
 */
export function deleteMemberGroup(id: number) {
  return usePromiseRequest({
    method: 'delete',
    url: '/admin/member/group/delete',
    data: {
      id,
    },
  })
}
