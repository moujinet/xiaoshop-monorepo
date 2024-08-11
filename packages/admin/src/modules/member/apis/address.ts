import type {
  IApiPaginationData,
  IMemberAddressListItem,
} from '@xiaoshop/schema'
import type { IUseRequestReturn } from '~/utils/request'

/**
 * 获取会员收货地址分页列表
 *
 * @api get /admin/member/address/pages
 * @param params Record<string, any>
 * @returns IUseRequestReturn<IApiPaginationData<IMemberAddressListItem>>
 */
export function fetchMemberAddressPages(
  params?: Record<string, any>,
): IUseRequestReturn<IApiPaginationData<IMemberAddressListItem>> {
  return useRequest<IApiPaginationData<IMemberAddressListItem>>({
    method: 'get',
    url: '/admin/member/address/pages',
    params,
  })
}
