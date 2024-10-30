import type { IMemberUnregisterInfo, IMemberUnregisterList } from '@xiaoshop/shared'

import { MEMBER_UNREGISTER_STATUSES } from '~/dicts'
import { objectToDict, pipeDict, toDict } from '~/utils/transformer'

import { MemberUnregisterEntity } from './entity'

/**
 * Transform entities to list
 */
export function toMemberUnregisterList(entities: MemberUnregisterEntity[]) {
  return pipeDict<IMemberUnregisterList>(entities, [
    row => objectToDict(row, 'status', MEMBER_UNREGISTER_STATUSES),
  ])
}

/**
 * Transform entity
 */
export function toMemberUnregisterInfo(
  entity: MemberUnregisterEntity,
): IMemberUnregisterInfo {
  return {
    ...entity,
    status: toDict(entity.status, MEMBER_UNREGISTER_STATUSES),
  }
}
