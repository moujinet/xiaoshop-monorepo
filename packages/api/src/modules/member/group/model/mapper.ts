import type { IMemberGroupFilter, IMemberGroupInfo } from '@xiaoshop/shared'

import { objectToDict, pipeDict } from '~/utils/transformer'
import { MEMBER_GROUP_FILTER_KEYS, MEMBER_GROUP_FILTER_OPERATORS } from '~/dicts/member/group'

import { MemberGroupEntity } from './entity'

/**
 * Transform entity to dict
 */
export function toMemberGroupInfo(group: MemberGroupEntity): IMemberGroupInfo {
  return {
    ...group,
    filters: pipeDict<IMemberGroupFilter>(group.filters, [
      filter => objectToDict(filter, 'key', MEMBER_GROUP_FILTER_KEYS),
      filter => objectToDict(filter, 'operator', MEMBER_GROUP_FILTER_OPERATORS),
    ]),
  }
}
