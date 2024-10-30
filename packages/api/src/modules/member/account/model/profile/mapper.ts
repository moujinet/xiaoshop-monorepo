import type { IMemberAccountInfo, IMemberProfileInfo, IMemberProfileList } from '@xiaoshop/shared'

import { objectToDict, pipeDict, toDict, toKeyValueMapping } from '~/utils/transformer'
import { MEMBER_CARD_TYPES, MEMBER_GENDERS, MEMBER_SOURCES, MEMBER_STATUSES } from '~/dicts'

import { MemberProfileEntity } from './entity'

/**
 * Transform entities to list
 */
export function toMemberProfileList(profiles: MemberProfileEntity[]) {
  return pipeDict<IMemberProfileList>(profiles, [
    row => objectToDict(row, 'status', MEMBER_STATUSES),
    row => objectToDict(row, 'source', MEMBER_SOURCES),
    row => objectToDict(row, 'gender', MEMBER_GENDERS),
    row => objectToDict(row, 'card.type', MEMBER_CARD_TYPES),
    row => ({
      ...row,
      account: toKeyValueMapping(row.account, 'key', 'value'),
    }),
  ])
}

/**
 * Transform entity
 */
export function toMemberProfileInfo(profile: MemberProfileEntity): IMemberProfileInfo {
  return {
    ...profile,
    status: toDict(profile.status, MEMBER_STATUSES),
    source: toDict(profile.source, MEMBER_SOURCES),
    gender: toDict(profile.gender, MEMBER_GENDERS),
    card: {
      ...profile.card,
      type: toDict(profile.card.type, MEMBER_CARD_TYPES),
    },
    account: toKeyValueMapping(profile.account, 'key', 'value') as IMemberAccountInfo,
  }
}
