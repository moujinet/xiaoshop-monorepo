import type { IMemberBindCard, IMemberCardBindInfo } from '@xiaoshop/shared'

import { toDict } from '~/utils/transformer'
import { MEMBER_CARD_PLAN_TYPES, MEMBER_CARD_TYPES } from '~/dicts'

import { MemberCardBindEntity } from './entity'

export function toMemberBindCard(bind: MemberCardBindEntity): IMemberBindCard {
  return {
    ...bind,
    type: toDict(bind.type, MEMBER_CARD_TYPES),
  }
}

export function toMemberCardBindInfo(bind: MemberCardBindEntity): IMemberCardBindInfo {
  return {
    ...bind,
    type: toDict(bind.type, MEMBER_CARD_TYPES),
    cardPlanType: toDict(bind.cardPlanType, MEMBER_CARD_PLAN_TYPES),
  }
}
