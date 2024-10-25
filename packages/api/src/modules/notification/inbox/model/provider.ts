import { Inject, Provider } from '@nestjs/common'

import { NotificationInboxRepository } from './repository'

export const NotificationInboxRepo = () => Inject('NotificationInboxRepo')

export const NotificationInboxRepositoryProvider: Provider = {
  provide: 'NotificationInboxRepo',
  useClass: NotificationInboxRepository,
}
