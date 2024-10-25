import type { INotificationMessageContentList, INotificationMessageInfo, INotificationMessageList } from '@xiaoshop/shared'

import { pipeDict, toDict } from '~/utils/transformer'
import { NOTIFICATION_CHANNELS, NOTIFICATION_SCENES, NOTIFICATION_TYPES } from '~/dicts/notification'

import { NotificationMessageEntity } from './entity'

/**
 * Transform entities to list
 */
export function toNotificationMessageList(
  messages: NotificationMessageEntity[],
): INotificationMessageList[] {
  return pipeDict<INotificationMessageList>(messages, [
    row => ({
      ...row,
      channels: row.channels.map(
        (channel: number) => toDict(channel, NOTIFICATION_CHANNELS),
      ),
    }),
  ])
}

/**
 * Transform entities to content list
 */
export function toNotificationMessageContentList(
  messages: NotificationMessageEntity[],
): INotificationMessageContentList[] {
  const result: INotificationMessageContentList[] = []

  for (const message of messages) {
    for (const channel of message.channels) {
      result.push({
        id: message.id,
        type: message.type,
        scene: message.scene,
        channel,
        title: message.contents.find(c => c.channel === channel)?.title || '',
        content: message.contents.find(c => c.channel === channel)?.content || '',
      })
    }
  }

  return result
}

/**
 * Transform entity
 */
export function toNotificationMessageInfo(
  message: NotificationMessageEntity,
): INotificationMessageInfo {
  return {
    ...message,
    type: toDict(message.type, NOTIFICATION_TYPES),
    scene: toDict(message.scene, NOTIFICATION_SCENES),
    channels: message.channels.map(
      channel => toDict(channel, NOTIFICATION_CHANNELS),
    ),
  } as INotificationMessageInfo
}
