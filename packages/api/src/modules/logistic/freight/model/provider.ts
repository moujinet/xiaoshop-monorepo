import { Inject, Provider } from '@nestjs/common'

import { LogisticFreightTemplateRepository } from './repository'

export const LogisticFreightTemplateRepo = () => Inject('LogisticFreightTemplateRepo')

export const LogisticFreightTemplateRepositoryProvider: Provider = {
  provide: 'LogisticFreightTemplateRepo',
  useClass: LogisticFreightTemplateRepository,
}
