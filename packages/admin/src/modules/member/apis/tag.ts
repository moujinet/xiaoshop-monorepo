import type {
  IApiPaginationData,
  IMemberTag,
  IMemberTagDict,
  IMemberTagListItem,
} from '@xiaoshop/schema'
import type { IUseRequestReturn } from '~/utils/request'

/**
 * 获取会员标签分页列表
 *
 * @api get /admin/member/tag/pages
 * @param params Record<string, any>
 * @returns IUseRequestReturn<IApiPaginationData<IMemberTagListItem>>
 */
export function fetchMemberTagPages(
  params?: Record<string, any>,
): IUseRequestReturn<IApiPaginationData<IMemberTagListItem>> {
  return useRequest<IApiPaginationData<IMemberTagListItem>>({
    method: 'get',
    url: '/admin/member/tag/pages',
    params,
  })
}

/**
 * 获取会员标签字典
 *
 * @api get /admin/member/tag/dict/list
 * @returns IUseRequestReturn<IMemberTagDict[]>
 */
export function fetchMemberTagDictList(): IUseRequestReturn<IMemberTagDict[]> {
  return useRequest<IMemberTagDict[]>({
    method: 'get',
    url: '/admin/member/tag/dict/list',
  })
}

/**
 * 获取会员标签详情
 *
 * @api get /admin/member/tag/detail
 * @param id number
 * @returns IUseRequestReturn<IMemberTag>
 */
export function fetchMemberTag(id: number): IUseRequestReturn<IMemberTag> {
  return useRequest<IMemberTag>({
    method: 'get',
    url: '/admin/member/tag/detail',
    params: {
      id,
    },
  })
}

/**
 * 创建会员标签
 *
 * @api post /admin/member/tag/create
 * @param data Record<string, any>
 * @returns Promise<void>
 */
export function createMemberTag(data: Record<string, any>) {
  return usePromiseRequest({
    method: 'post',
    url: '/admin/member/tag/create',
    data,
  })
}

/**
 * 更新会员标签
 *
 * @api put /admin/member/tag/update
 * @param id number
 * @param data Record<string, any>
 * @returns Promise<void>
 */
export function updateMemberTag(id: number, data: Record<string, any>) {
  return usePromiseRequest({
    method: 'put',
    url: '/admin/member/tag/update',
    params: {
      id,
    },
    data,
  })
}

/**
 * 删除会员标签
 *
 * @api delete /admin/member/tag/delete
 * @param id number
 * @returns Promise<void>
 */
export function deleteMemberTag(id: number) {
  return usePromiseRequest({
    method: 'delete',
    url: '/admin/member/tag/delete',
    data: {
      id,
    },
  })
}
