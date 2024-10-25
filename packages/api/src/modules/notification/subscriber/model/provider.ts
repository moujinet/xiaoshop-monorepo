import { Inject, Provider } from '@nestjs/common'

import { NotificationSubscriberRepository } from './repository'

export const NotificationSubscriberRepo = () => Inject('NotificationSubscriberRepo')

export const NotificationSubscriberRepositoryProvider: Provider = {
  provide: 'NotificationSubscriberRepo',
  useClass: NotificationSubscriberRepository,
}
