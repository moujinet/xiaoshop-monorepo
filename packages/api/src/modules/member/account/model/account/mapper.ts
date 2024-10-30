import type { IMemberAccountInfo } from '@xiaoshop/shared'

import { toKeyValueMapping } from '~/utils/transformer'

import { MemberAccountEntity } from './entity'

/**
 * Transform entities to map
 */
export function toMemberAccountInfo(
  accounts: MemberAccountEntity[],
): IMemberAccountInfo {
  return toKeyValueMapping(accounts, 'key', 'value')
}
