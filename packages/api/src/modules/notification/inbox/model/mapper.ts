import type { INotificationInfo, INotificationList } from '@xiaoshop/shared'

import { objectToDict, pipeDict, toDict } from '~/utils/transformer'
import { NOTIFICATION_SCENES, NOTIFICATION_STATUSES } from '~/dicts/notification'

import { NotificationInboxEntity } from './entity'

/**
 * Transform entities to list
 */
export function toNotificationList(notifications: NotificationInboxEntity[]) {
  return pipeDict<INotificationList>(notifications, [
    row => objectToDict(row, 'scene', NOTIFICATION_SCENES),
    row => objectToDict(row, 'status', NOTIFICATION_STATUSES),
  ])
}

/**
 * Transform entity
 */
export function toNotificationInfo(notification: NotificationInboxEntity) {
  return {
    ...notification,
    scene: toDict(notification.scene, NOTIFICATION_SCENES),
    status: toDict(notification.status, NOTIFICATION_STATUSES),
  } as INotificationInfo
}
