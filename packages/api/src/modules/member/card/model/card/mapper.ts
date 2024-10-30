import type { IMemberCardInfo, IMemberCardPlanInfo, IMemberCustomCardList } from '@xiaoshop/shared'

import { MEMBER_CARD_PLAN_TYPES } from '~/dicts'
import { objectToDict, pipeDict } from '~/utils/transformer'

import { MemberCardEntity } from './entity'

export function toMemberCardInfo(card: MemberCardEntity): IMemberCardInfo {
  return {
    ...card,
    plans: pipeDict(card.plans, [
      row => objectToDict(row, 'type', MEMBER_CARD_PLAN_TYPES),
    ]),
  }
}

export function toMemberCustomCardList(cards: MemberCardEntity[]) {
  return pipeDict<IMemberCustomCardList>(cards, [
    card => ({
      ...card,
      plans: pipeDict<IMemberCardPlanInfo>(card.plans, [
        row => objectToDict(row, 'type', MEMBER_CARD_PLAN_TYPES),
      ]),
    }),
  ])
}
