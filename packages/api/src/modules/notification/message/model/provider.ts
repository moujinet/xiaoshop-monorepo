import { Inject, Provider } from '@nestjs/common'

import { NotificationMessageRepository } from './repository'

export const NotificationMessageRepo = () => Inject('NotificationMessageRepo')

export const NotificationMessageRepositoryProvider: Provider = {
  provide: 'NotificationMessageRepo',
  useClass: NotificationMessageRepository,
}
