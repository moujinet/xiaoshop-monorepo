import { Inject, Provider } from '@nestjs/common'

import { NotificationLogRepository } from './repository'

export const NotificationLogRepo = () => Inject('NotificationLogRepo')

export const NotificationLogRepositoryProvider: Provider = {
  provide: 'NotificationLogRepo',
  useClass: NotificationLogRepository,
}
