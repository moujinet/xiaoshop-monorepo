import type { IMemberCardUpgradeInfo, IMemberCardUpgradeList } from '@xiaoshop/shared'

import { objectToDict, pipeDict, toDict } from '~/utils/transformer'
import { MEMBER_CARD_TYPES, MEMBER_CARD_UPGRADE_METHODS } from '~/dicts'

import { MemberCardUpgradeEntity } from './entity'

/**
 * Transform entities to list
 */
export function toMemberCardUpgradeList(list: MemberCardUpgradeEntity[]) {
  return pipeDict<IMemberCardUpgradeList>(list, [
    row => objectToDict(row, 'type', MEMBER_CARD_TYPES),
    row => objectToDict(row, 'method', MEMBER_CARD_UPGRADE_METHODS),
  ])
}

/**
 * Transform entity
 */
export function toMemberCardUpgradeInfo(upgrade: MemberCardUpgradeEntity): IMemberCardUpgradeInfo {
  return {
    ...upgrade,
    type: toDict(upgrade.type, MEMBER_CARD_TYPES),
    method: toDict(upgrade.method, MEMBER_CARD_UPGRADE_METHODS),
  }
}
