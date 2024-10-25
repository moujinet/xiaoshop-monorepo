import type { INotificationLogInfo, INotificationLogList } from '@xiaoshop/shared'

import { objectToDict, pipeDict, toDict } from '~/utils/transformer'
import { NOTIFICATION_CHANNELS, NOTIFICATION_SCENES, NOTIFICATION_STATUSES, NOTIFICATION_TYPES } from '~/dicts/notification'

import { NotificationLogEntity } from './entity'

/**
 * Transform entities to list
 */
export function toNotificationLogList(logs: NotificationLogEntity[]) {
  return pipeDict<INotificationLogList>(logs, [
    row => objectToDict(row, 'type', NOTIFICATION_TYPES),
    row => objectToDict(row, 'scene', NOTIFICATION_SCENES),
    row => objectToDict(row, 'status', NOTIFICATION_STATUSES),
    row => objectToDict(row, 'channel', NOTIFICATION_CHANNELS),
  ])
}

/**
 * Transform entity
 */
export function toNotificationLogInfo(log: NotificationLogEntity) {
  return {
    ...log,
    type: toDict(log.type, NOTIFICATION_TYPES),
    scene: toDict(log.scene, NOTIFICATION_SCENES),
    status: toDict(log.status, NOTIFICATION_STATUSES),
    channel: toDict(log.channel, NOTIFICATION_CHANNELS),
  } as INotificationLogInfo
}
