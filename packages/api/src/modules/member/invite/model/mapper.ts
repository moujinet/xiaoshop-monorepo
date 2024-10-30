import type { IMemberInviteInfo, IMemberInviteList } from '@xiaoshop/shared'

import { pipeDict, toDict } from '~/utils/transformer'
import { MEMBER_CARD_TYPES, MEMBER_GENDERS } from '~/dicts'

import { MemberInviteEntity } from './entity'

/**
 * Transform entities to list
 */
export function toMemberInviteList(invites: MemberInviteEntity[]) {
  return pipeDict<IMemberInviteList>(invites, [
    row => toMemberInviteInfo(row),
  ])
}

/**
 * Transform entity
 */
export function toMemberInviteInfo(invite: MemberInviteEntity): IMemberInviteInfo {
  return {
    id: invite.id,
    inviteeId: invite.inviteeId,
    avatar: invite.invitee.avatar,
    nickname: invite.invitee.nickname,
    gender: toDict(invite.invitee.gender, MEMBER_GENDERS),
    card: {
      ...invite.invitee.card,
      type: toDict(invite.invitee.card.type, MEMBER_CARD_TYPES),
    },
    orderCount: invite.invitee.orderCount,
    orderAmount: invite.invitee.orderAmount,
    lastLoginTime: invite.invitee.lastLoginTime,
    createdTime: invite.createdTime,
  }
}
